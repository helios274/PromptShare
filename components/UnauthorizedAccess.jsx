import Image from "next/image";
import React from "react";

const UnauthorizedAccess = () => {
  return (
    <>
      <h1 class="mt-12 md:mt-16 text-3xl md:text-5xl font-extrabold gradient-red">
        Unauthorized Access
      </h1>
      <p className="mt-5 text-md md:text-lg font-medium">
        You need to Sign In to access this page
      </p>
    </>
  );
};

export default UnauthorizedAccess;
