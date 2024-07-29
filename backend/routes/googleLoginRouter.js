import passport from 'passport';

import '../auth.js'; // Import the auth configuration
import { Router } from "express";
import googleUserModel from "../mongoDb/googleUserSchema.js";
import { OAuth2Client } from "google-auth-library"
import axios from "axios"
import session from 'cookie-session';





const googleLoginRouter = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

googleLoginRouter.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    // Check if user already exists in database
    let user = await googleUserModel.findOne({ googleId: payload.sub });

    if (!user) {
      // Create new user if not found
      user = new googleUserModel({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        photo: payload.picture
      });
      await user.save();
    }

    // req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send('Error during authentication');
  }
});

// Logout route
googleLoginRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000');
});

// Fetch authenticated user
googleLoginRouter.get('/user', (req, res) => {
  if (req.session.userId) {
    googleUserModel.findById(req.session.userId, (err, user) => {
      if (err || !user) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(user);
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});


// googleLoginRouter.get('/auth/google/callback', async (req, res) => {
//   const code = req.query.code;
//   const clientID = process.env.GOOGLE_CLIENT_ID;
//   const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
//   const redirectURI = 'http://localhost:8080/auth/google/callback';

//   try {
//     const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
//       params: {
//         client_id: clientID,
//         client_secret: clientSecret,
//         redirect_uri: redirectURI,
//         grant_type: 'authorization_code',
//         code
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     const { access_token } = tokenResponse.data;

//     const userResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//       headers: {
//         Authorization: `Bearer ${access_token}`
//       }
//     });

// // console.log(userResponse.data)
// const userData = userResponse.data;
// const user = new googleUserModel({
//   id: userData.id,
//   email: userData.email,
//   name: userData.name,
//   picture: userData.picture
// });

// let gUser = await user.save();
// // console.log(gUser)
// res.redirect(`http://localhost:3000?user=${JSON.stringify(userData.name)}`);
//     // res.json(userResponse.data);
//   } catch (error) {
//     console.error('Error during authentication:');
//     res.status(500).send('Error during authentication');
//   }
// });

  export default googleLoginRouter;