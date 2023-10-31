import React, { useEffect } from "react";
import { UserAuthForm } from "../components/ui/user-auth-form";
import { ProfileForm } from "../components/ui/login-form";
import { Toaster } from "../components/ui/toaster";
import { useToken } from "../hooks/useToken";
import AuthRequired from "../hooks/authRequired";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";

function Login() {
  const { saveToken, token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="bg-background dark min-h-screen flex flex-col gap-4 items-center px-12 justify-center">
      <div className="w-full h-[64px] flex flex-row items-center justify-center absolute top-0">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
          Rately
        </h4>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-secondary-foreground">
            Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan username dan password.
          </p>
        </div>
        {/* <UserAuthForm className="text-secondary-foreground" /> */}
        <ProfileForm setToken={saveToken} />
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
