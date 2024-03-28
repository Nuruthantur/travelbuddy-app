"use client";

import Image from "next/image";
import image from "../../img/background.png";
import MultiStep, { newUserValues } from "./multi_step/MultiStep";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

export default function Signup() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (formData: newUserValues) => {
    if (!isValidEmail(formData.email)) {
      setError("Email is invalid");
      return;
    }

    if (!formData.password || formData.password.length < 5) {
      setError("Password is invalid");
      return;
    }

    if (formData.userName === "") {
      return;
    }
    console.log("formData2 :>> ", formData);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("res :>> ", res);
      if (res.status === 400) {
        setError("This email is alread registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <>
        <div className="flex items-center">
          <Image src={image} alt="travel" style={{ marginTop: "30px" }} />
        </div>
        <div className="main_h1 flex justify-center">
          <h1
            style={{
              fontSize: "50px",
              marginTop: "-40px",
              color: "white",
            }}
          >
            Travel Buddy
          </h1>
        </div>
        <div className="flex text-white min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <MultiStep showStepNumber={true} handleSubmit={handleSubmit} />
        </div>
      </>
    )
  );
}

