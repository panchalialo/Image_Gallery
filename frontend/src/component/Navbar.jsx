import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("users");
  const [tooltipShow, setTooltipShow] = useState(false);
  const toast = useRef(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(JSON.parse(isLoggedIn).photo);
  // }, [isLoggedIn]);
  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have successfully Logged out",
      life: 3000,
    });
    localStorage.removeItem("users");
    navigate("/");
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have dined",
      life: 3000,
    });
  };

  const goToSignInPageHandler = () => {
    navigate("/signIn");
  };

  const tooltiphandler = () => {
    setTooltipShow(true);
  };

  const tooltiphandlerleave = () => {
    setTooltipShow(false);
  };

  const logoutHandler = () => {
    confirmDialog({
      message: "Are you sure you want to Logged Out?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
    });
    // if(accept){
    // localStorage.removeItem("users");
    // navigate("/");
    // }
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full fixed z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          >
            <svg
              className="w-10 h-10 text-blue-500 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                clip-rule="evenodd"
              />
            </svg>

            <span className="self-center sm:text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
              PhotoGallery
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <>
                <div class=" flex items-center gap-4">
                  <div class=" w-max-full relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-r from-sky-600 to-indigo-400 rounded-full dark:bg-gray-600">
                    {/* <span class="font-medium text-2xl capitalize text-gray-600 dark:text-gray-300">
                      {JSON.parse(isLoggedIn)?.name[0]}
                    </span> */}
                    {JSON.parse(isLoggedIn)?.photo ? (
                      <img src={JSON.parse(isLoggedIn)?.photo} />
                    ) : (
                      <span class="font-medium text-2xl capitalize text-gray-600 dark:text-gray-300">
                        {JSON.parse(isLoggedIn)?.name[0]}
                      </span>
                    )}
                  </div>
                  <div class="font-medium dark:text-white">
                    <div>{JSON.parse(isLoggedIn)?.name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {JSON.parse(isLoggedIn)?.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logoutHandler}
                  onMouseEnter={tooltiphandler}
                  onMouseLeave={tooltiphandlerleave}
                  className="select-none "
                >
                  <svg
                    class="sm:mx-3  sm:w-9 sm:h-9 text-sky-300"
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
                      d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                    />
                  </svg>
                </button>
                {tooltipShow && (
                  <div
                    data-tooltip="tooltip-bottom"
                    class="absolute z-50 whitespace-normal break-words right-20 bottom-0 rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                  >
                    Log Out
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={goToSignInPageHandler}
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 mb-2"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
