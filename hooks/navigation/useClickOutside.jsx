import { useEffect } from "react";

export const useOutsideClick = (refs = [], callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      );

      if (clickedOutside) callback();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [refs, callback]);
};
