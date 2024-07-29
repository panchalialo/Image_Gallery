import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "./mongoDb/userSchema.js";
import dotenv from 'dotenv'

dotenv.config();



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope:["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await userModel.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      console.log(existingUser)

      const newUser = await new userModel({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePhoto: profile.photos[0].value,
      }).save();
      done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
