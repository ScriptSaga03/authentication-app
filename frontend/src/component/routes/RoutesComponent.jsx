import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import VerificationResult from "../helper/VerificationResult";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'
import VerifyEmail from "../helper/emailVarify";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PrivateComponent from "../pages/PrivateComponent";

function RoutesComponent() {
  const { isSignedUp } = useContext(UserContext);
  return (
    <Routes>
      {/* Public Routes*/}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify" element={isSignedUp  ? <Navigate to="/signup" /> :<VerificationResult/> } />

     
    {/* Private routes */}
      <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Dashboard/>}/>
      </Route>

      {/* Wildcard Redirect */}
      <Route path="*" element={<Navigate to="/signin" />} /> 
    </Routes>
  );
}

export default RoutesComponent;