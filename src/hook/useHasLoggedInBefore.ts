import { useState, useEffect } from "react";

const useHasLoggedInBefore = () => {
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);

  useEffect(() => {
    const loggedInBefore = localStorage.getItem("hasLoggedInBefore");
    setHasLoggedInBefore(loggedInBefore === "true" ? true : false);
  }, []);

  return hasLoggedInBefore;
};

export default useHasLoggedInBefore;
