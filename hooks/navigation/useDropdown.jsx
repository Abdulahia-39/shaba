import { useState } from "react";

export const useDropdown = (initial = {}) => {
  const [dropdown, setDropdown] = useState(initial);

  const toggle = (key) => {
    setDropdown((prev) => {
      const newState = Object.keys(prev).reduce((acc, k) => {
        acc[k] = k === key ? !prev[k] : false; // toggle selected, close others
        return acc;
      }, {});
      return newState;
    });
  };

  const closeAll = () =>
    setDropdown((prev) =>
      Object.fromEntries(Object.keys(prev).map((k) => [k, false]))
    );

  return { dropdown, toggle, closeAll };
};
