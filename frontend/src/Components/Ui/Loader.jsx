import React from "react";
import loaderGif from "../../Images/UI/loading-gif.gif";

export default function Loader({ loadingText, isLoading, error, extraErrorMessage, className, isBorder }) {
  return (
    <>
      <div className={`${className} w-full h-[400px] md:h-[600px] flex items-center justify-center flex-col ${isBorder? 'border-b':''}`}>
        {/* If there is no error but loading  */}
        {!error && isLoading && (
          <>
            <img loading="lazy" className="mx-auto block w-[25px]" src={loaderGif} alt="Loader" />
            <p className="text-center mt-2">{loadingText || "Couldn't load"}</p>
          </>
        )}
        {/* if there is an error  */}
        {error && !isLoading && (
          <p className="text-center mt-2 text-red-600">
            {error?.message}! {extraErrorMessage ?? ""}
          </p>
        )}
      </div>
    </>
  );
}
