import { useEffect } from "react";

const useScript = ({ url, innerHTML }) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.innerHTML = innerHTML;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [innerHTML, url]);
};

export default useScript;
