import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhotoGallery from "./component/PhotoGallery";
import Home from "./component/Home";
import CreatePost from "./component/CreatePost";
import About from "./component/About";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import SignIn from "./component/user/SignIn";
import SignUp from "./component/user/SignUp";
import NotFoundPage from "./component/NotFoundPage";
import PrivateComponent from "./component/PrivateComponent";
import { PrimeReactProvider } from 'primereact/api';

import { GoogleOAuthProvider } from '@react-oauth/google';




const App = () => {
  return (
    <>

<GoogleOAuthProvider clientId="885757766699-cq62sip1h3888i9chjkj507qo3337enj.apps.googleusercontent.com">
      <BrowserRouter>
     
      <PrimeReactProvider>
        <Navbar />
        <div className=" flex justify-center items-center min-h-[100vh]  bg-slate-800 h-auto w-full">
          <Routes>
            {/*................... Private routes.................. */}

            <Route element={<PrivateComponent />}>
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            {/*................... Public routes.................. */}
            <Route path="/" element={<Home />} />

            <Route path="/gallery" element={<PhotoGallery />} />
            <Route path="*" exact={true} element={<NotFoundPage />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
        </PrimeReactProvider>
       
      </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
