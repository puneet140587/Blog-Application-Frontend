import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authenticate } from "../Authentication";

const PrivateRoutes = () => {
  return authenticate() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
