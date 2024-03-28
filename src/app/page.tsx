import Image from "next/image";
import image from "../img/background.png";

export default function Home() {
  return (
    <>
      <div className="flex items-center	">
        <Image src={image} alt="" />
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

      <div style={{ marginTop: "60px", marginBottom: "40px" }}>
        <div className="flex justify-start">
          <h3
            style={{
              marginLeft: "10px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            connecting people
          </h3>
        </div>
        <div className="flex justify-end">
          <h3
            style={{
              marginRight: "10px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            around the world...
          </h3>
        </div>
      </div>
      <div className="flex justify-center" style={{ margin: "-20px" }}>
        <button
          type="button"
          className="buttonGetStarted inline-block rounded-full bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          GET STARTED
        </button>
      </div>
    </>
  );
}
