import axios from "axios";
import { useEffect, useState } from "react";
import GallerySkeleton from "./GallerySkeleton";
import { useLocation, useNavigate } from "react-router-dom";

const PhotoGallery = ({filename}) => {
  const [photos, setPhotos] = useState([]);

  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxAltImage, setLightboxAltImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const creatPostNavigate = () => {
    navigate("/createPost");
  };
  useEffect(() => {
    if (photos) {
      fetchPhoto();
    }
  }, []);



  const openLightbox = (image, alt) => {
    setLightboxImage(image);
    setLightboxAltImage(alt);
  };

  const closeLightbox = () => {
    setLightboxImage("");
    setLightboxAltImage("");
  };

  const fetchPhoto = () => {
    axios
      .get("http://localhost:8080/get")
      .then((res) => {
        console.log(res.data);
       
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  //search product
  const searchInputHandler = (e) => {
    let key = e.target.value;
    console.log(e.target.value);
    if (key) {
      axios
        .get(`http://localhost:8080/search/${key}`)
        .then((res) => {
          console.log(res.data);
          setPhotos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchPhoto();
    }
  };



  //download image function

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = ["file.jpg","file.png"];
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <div className=" w-9/12 mt-20 ">
        {location.pathname === "/gallery" ? (
          <>
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-4 flex flex-wrap items-center justify-between my-10">
              <form class="">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Photos..."
                    onChange={searchInputHandler}
                  />
                </div>
              </form>

              <div className="flex justify-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={creatPostNavigate}
                  className="flex gap-2 text-white inline bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-medium px-5 py-2.5 text-center me-2 mb-2"
                >
                  Upload Photo
                  <span className="inline">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white text-sm"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-end max-w-75 mb-10">
              <form class="">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block md:w-[500px] sm:w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Photos..."
                    onChange={searchInputHandler}
                  />
                </div>
              </form>
            </div>
          </>
        )}

        <div className="text-left ">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            All Photos
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Stay up to date and move work forward with Flowbite on iOS &
            Android. Download the app today.
          </p>
        </div>

        {photos.length === 0 ? (
          <GallerySkeleton />
        ) : (
          <div className="my-10">
            <div className="gallery relative">
              {photos.map((data, index) => (
                <button
                  type="button"
                  className="gallery__item h-full relative "
                  key={index}
                  onClick={() => openLightbox(data.image)}
                >
                  <img
                    className="gallery__image w-full h-full object-cover"
                    src={data.image}
                    alt={data.name}
                  />

                  <div className=" bg-gray-800/50  z-10 flex flex-wrap items-center justify-between absolute bottom-0 w-full left-0 z-10 px-2">
                    <div className=" w-75 max-w-75 p-2">
                     
                      <h1 className="text-medium text-bold text-gray-200 text-left">
                        {data.name}
                      </h1>
                    </div>

                    <div className="w-35 h-auto">
                      <button type="button" onClick={() => downloadFile(data._id)}>
                        <span className="inline">
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {lightboxImage && (
              <div className="lightbox z-50">
                <button
                  type="button"
                  className="lightbox__close-button"
                  onClick={closeLightbox}
                >
                  &times;
                </button>
                <img
                  className="lightbox__image"
                  src={lightboxImage}
                  alt={lightboxAltImage}
                />
                <button
                  type="button"
                  className="lightbox__bg"
                  onClick={closeLightbox}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoGallery;
