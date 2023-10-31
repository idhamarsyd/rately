import React from "react";
import { UserAuthForm } from "../components/ui/user-auth-form";
import { Button, buttonVariants } from "../components/ui/button";
import { Outlet, Link } from "react-router-dom";
import { playlists } from "../data/playlists";
import { Sidebar } from "../components/ui/sidebar";
import { useToken } from "../hooks/useToken";
import AuthRequired from "../hooks/authRequired";

function Dashboard() {
  const { removeToken } = useToken();

  return (
    <div className="bg-background dark min-h-screen flex flex-col gap-4">
      <div className="grid lg:grid-cols-5">
        <Sidebar
          token={removeToken}
          playlists={playlists}
          className="col-span-1 flex flex-col justify-between h-screen text-secondary-foreground border rounded-md sticky top-0"
        />
        <div className="w-full col-span-4 text-secondary-foreground">
          <AuthRequired />
          {/* <Outlet /> */}
          {/* </AuthRequired> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
