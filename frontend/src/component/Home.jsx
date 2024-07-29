import React from "react";
import PhotoGallery from "./PhotoGallery";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const isLoggedIn = localStorage.getItem("users");
  const navigate = useNavigate()

  const goToGalleryHandler = () =>{
    if(isLoggedIn){
    navigate("/gallery")
    } else {
      navigate("/signIn") 
    }
  }


  return (
    <>
      <div className="">
        <section class="bg-white dark:bg-gray-700 py-10 bg-center bg-no-repeat bg-[url('https://i.ibb.co/B4TD6rb/pexels-anais-virel-1288641963-26409489.jpg')] bg-cover bg-blend-multiply">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 class=" bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl ">
            Keep Your Memories, Organized
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Relive your best memories with our photo gallery, Effortlessly store and share your life's moments.
            </p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <button
                type="button"
                onClick={goToGalleryHandler}
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-medium px-5 py-2.5 text-center me-2 mb-2"
              >
                Get Started
              </button>
            
            </div>
          </div>
        </section>

        <div className="w-full flex justify-center">
          <PhotoGallery />
        </div>
      </div>
    </>
  );
};

export default Home;
