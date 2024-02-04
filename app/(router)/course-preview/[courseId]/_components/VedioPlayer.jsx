import React from "react";

const VedioPlayer = ({ vedioUrl, poster }) => {
  return (
    <video
      width={1000}
      height={250}
      controls
      key={vedioUrl}
      className="rounded-sm"
      poster={poster}
    >
      <source src={vedioUrl} type="video/mp4" />
    </video>
  );
};

export default VedioPlayer;
