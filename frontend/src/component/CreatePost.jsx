import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    title: "",
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const inputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const fileUploadHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setInputData({ ...inputData, image: e.target.files[0] });
  };


  const uploadPhotoHandler = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("image", inputData.image);
    data.append("name", inputData.name);
    data.append("title", inputData.title);

    axios
      .post("http://localhost:8080/upload", data)
      .then((res) => {
        navigate("/gallery");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    
      if(!inputData.name || !inputData.title || !inputData.image) {
        setErrorMessage(true)
      }
   
  };

  return (
    <>
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Upload Your Photo Here
        </h5>
        <form
          encType="multipart/form-data"
          onSubmit={uploadPhotoHandler}
          action="/upload"
          method="post"
        >
          <div>
            <label
              for="small-input"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white text-left"
            >
              Author Name
            </label>
            <input
              type="text"
              id="small-input"
              placeholder="John Doe"
              name="name"
              value={inputData.name}
              onChange={inputHandler}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
           {errorMessage && !inputData.name && <span className="text-sm text-red-500 text-left">Please fill the name</span>}
          </div>
          <div>
            <label
              for="small-input"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white text-left"
            >
              Title
            </label>
            <input
              type="text"
              id="small-input"
              name="title"
              placeholder="A cat on the wall..."
              value={inputData.title}
              onChange={inputHandler}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errorMessage && !inputData.title && <span className="text-sm text-red-500 text-left">Please fill the title</span>}
          </div>
          <div className="flex items-center mt-10 justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {!selectedFile ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center relative justify-center pt-5 pb-6">
                  <img src={preview} className=" w-4/12 object-contain" />
                </div>
              )}

              <input
                id="dropzone-file"
                type="file"
                name="image"
                className="hidden"
                accept=".png, .jpg, .jpeg"
                onChange={fileUploadHandler}
              />
               {errorMessage && !inputData.image && <span className="text-sm text-red-500 text-left">Upload the image</span>}
            </label>
           
          </div>
          

          <button
            type="submit"
            class="text-white mt-5 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Post Image
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
