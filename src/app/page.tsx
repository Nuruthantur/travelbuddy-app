import Image from "next/image";
import image from "../img/background.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-black h-screen flex flex-col justify-between">
      <div className="mt-3">
        <div className="flex items-center	">
          <Image src={image} alt="" priority />
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
      </div>

      <div className="flex flex-col">
        <div className="flex items-start">
          <h4 className="left">connecting people</h4>
        </div>
        <div className="flex items-end justify-end">
          <h4 className="right">around the world...</h4>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex">
          <Link
            href="/login"
            type="button"
            className="buttonGetStarted inline-block rounded-full bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
}
