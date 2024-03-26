"use client";

import Image from "next/image";
import image from "../../img/klipartz_cut.png";
import MultiStep from "./multi_step/MultiStep";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SingupPage2() {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[3].value;
    const lastName = e.target[4].value;
    const birthDate = e.target[5].value;
    const travelingDates = e.target[6].value;
    const travelingDestinations = e.target[7].value;
    const hobbies = e.target[8].value;
    const aboutYourself = e.target[9].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 5) {
      setError("Password is invalid");
      return;
    }

    if (userName === "") {
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userName,
          firstName,
          lastName,
          birthDate,
          travelingDates,
          travelingDestinations,
          hobbies,
          aboutYourself,
        }),
      });
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
          <MultiStep showStepNumber={true} handleSubmit={handleSubmit}/>
        </div>
      </>
    )
  );
}
