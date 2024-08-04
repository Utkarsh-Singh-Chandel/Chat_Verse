import React, { useState } from "react";
import Gender from "./Gender";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [image, setImage] = useState("");

  const { loading, signup } = useSignUp();
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  const handleImageSubmit = (e) => {
    // e.preventDefault();


    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dubsnzbjy");
    const url = "https://api.cloudinary.com/v1_1/dubsnzbjy/image/upload";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setInputs({ ...inputs, profilePic: data.secure_url });
      })
      .catch((err) => {
        console.log("Error in uploading image", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //sign up user using hooks
    await signup(inputs);
  };
  return (
    <div className="text-white flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div
        className="w-full p-6 rounded-lg shadow-md bg-gray-400
    bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 "
      >
        <h1 className="text-3xl  font-semibold text-center ">
          SignUp
          <span className="text-blue-500"> ChatVerse</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10 text-black"
              value={inputs.fullName}
              text
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base ">Username</span>
            </label>
            <input
              type="text"
              placeholder="john"
              className=" text-black w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base ">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className=" text-black w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base ">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className=" text-black w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="pt-2">
            <label className="text-base">Gender</label>
            <Gender
              onCheckboxChange={handleCheckboxChange}
              selectedGender={inputs.gender}
            />
          </div>
         
  <div className="flex flex-col gap-2">
        <label className="text-base">Profile Pic (Optional)</label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label
            htmlFor="fileInput"
            className="btn-sm px-4 py-2 pt-[0.4rem] bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Choose File
          </label>
          <button
          type="button"
            onClick={handleImageSubmit}
            className="btn-sm px-4 py-2 pt-[0.4rem] bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            Upload
          </button>
        </div>
      </div>

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="text-gray-200  btn-block rounded-lg  bg-blue-600 btn-sm mt-2  hover:bg-blue-800 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
