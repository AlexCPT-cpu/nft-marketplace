import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "darkgreen",
};

const Loader = ({ setLoading }: { setLoading: (state: boolean) => void }) => {
  return (
    <div className="z-50 w-full min-h-screen transition duration-300 bg-opacity-80 flex overflow-x-hidden overflow-y-hidden fixed inset-0 backdrop-blur-lg justify-center items-center">
      <div onClick={() => setLoading(false)} className="absolute top-3 right-5">
        <XMarkIcon className="text-black w-10 cursor-pointer" />
      </div>
      <div className="flex justify-center items-center">
        <ClipLoader
          color={"#ffffff"}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loader;
