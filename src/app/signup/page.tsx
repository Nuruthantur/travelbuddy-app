"use client";
import { User } from "@/@types/User";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const Signup = () => {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [userCredentials, setUserCredentials] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("e target", e.target.files?.[0]);
    setSelectedFile(e.target.files?.[0] || "");
  };
  const handleInputCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...(userCredentials as User),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitImage = async () => {
    //picture upload
    const formdata = new FormData();
    formdata.append("userPicture", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    try {
      console.log("selectedFile", selectedFile);
      const response = await fetch(
        "http://localhost:3000/api/uploadimage",
        requestOptions
      );
      console.log("response of an image fetch", response);
      if (response.ok) {
        const result = await response.json();
        console.log("Image result", result.data.imageUrl);
        setUserCredentials({
          ...(userCredentials as User),
          userPicture: result.data.imageUrl,
          public_id: result.data.public_id,
        });
        // console.log("result of signup", result);
        setProfilePicture(result.data.imageUrl);
      }
      if (!response.ok) {
        alert("couldn't get response for uploading an image.");
      }
    } catch (error) {
      console.log("error uploading image", error);
      alert("Couldn't upload image");
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const email = e.target[0].value;
  //   const password = e.target[1].value;
  //   const userName = e.target[2].value;
  //   const userPicture = e.target.files?.[0];

  //   if (!isValidEmail(email)) {
  //     setError("Email is invalid");
  //     return;
  //   }

  //   if (!password || password.length < 5) {
  //     setError("Password is invalid");
  //     return;
  //   }

  //   if (userName === "") {
  //     return;
  //   }

  //   try {
  //     const res = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         userName,
  //       }),
  //     });
  //     if (res.status === 400) {
  //       setError("This email is alread registered");
  //     }
  //     if (res.status === 200) {
  //       setError("");
  //       const signedInRes = await signIn("credentials", {
  //         redirect: false,
  //         email,
  //         password,
  //       });
  //       if (signedInRes?.error) {
  //         setError("Invalid email or password");
  //         if (signedInRes?.url) router.replace("/dashboard");
  //       } else {
  //         setError("");
  //       }
  //     }
  //   } catch (error) {
  //     setError("Error, try again");
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async () => {
    if (userCredentials) {
      const { password } = userCredentials;
      if (password.length < 2 || password.length > 10) {
        alert("check your password again");
      }
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", userCredentials?.email);
      urlencoded.append("password", userCredentials.password);
      urlencoded.append("username", userCredentials?.userName);
      urlencoded.append(
        "userpicture",
        userCredentials?.userPicture
          ? userCredentials.userPicture
          : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
      );
      urlencoded.append(
        "public_id",
        userCredentials?.public_id ? userCredentials.public_id : ""
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          "http://localhost:3000/api/signup",
          requestOptions
        );
        const result = await response.json();
        console.log("result for signup", result);
      } catch (error) {
        console.log("error signing up a userrr", error);
      }
    } else {
      console.log("enter required fields first");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-normal mb-8">Signup</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              onChange={handleInputCredentialsChange}
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              onChange={handleInputCredentialsChange}
              required
            />

            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Username"
              onChange={handleInputCredentialsChange}
              required
            />
            <input type="file" onChange={handleFileSelect} />
            <button
              onClick={handleSubmitImage}
              className="uploadpicture"
              type="submit"
            >
              Upload A Picture
            </button>
            <div style={{ marginTop: "20px" }}>
              {profilePicture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  src={profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
                  alt="Empty Profile"
                  className="profile-picture"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Signup
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <Link
            href="/login"
            className="block text-center text-blue-400 hover:underline mt-2"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Signup;
