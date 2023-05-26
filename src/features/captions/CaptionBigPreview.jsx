import React from "react";

const CaptionBigPreview = ({photo, caption, style}) => {
  return (
    <div>
      <div className="relative">
        <img className="rounded-lg my-3 w-full" src={photo?.image_url} />
        <h1 className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-black bg-opacity-40 p-4 m-0 rounded-lg text-center">
          <span className={style}>{caption}</span>
        </h1>
      </div>
    </div>
  );
}

export default CaptionBigPreview;