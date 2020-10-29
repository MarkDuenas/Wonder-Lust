import React, { useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Logout = () => {
  useEffect(() => {
    axios
      .delete("http://localhost:8000/api/logout", {
        withCredentials: true,
      })
      .then(navigate("/"))
      .catch((err) => console.log(err));
  });
  return <div></div>;
};

export default Logout;
