import { useState, useEffect } from "react";
import FashionArt from "./FashionArt";

export default function SmartImage({ src, art, alt = "", className = "" }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  if (failed || !src) {
    return <FashionArt {...art} className={`${art?.className || ""} ${className}`.trim()} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
    />
  );
}
