import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { Outlet, Link, NavLink } from "react-router-dom";
import { Playlist } from "../../data/playlists";
import { LogOut, LogOutIcon, Home } from "lucide-react";
import axios from "axios";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
  token: () => void;
}

export function Sidebar({ className, playlists, token }: SidebarProps) {
  function Logout() {
    axios({
      method: "POST",
      url: "/logout",
    })
      .then((response) => {
        token();
        console.log("logout");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div className={cn("pb-4", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <NavLink to={``} end>
              {({ isActive, isPending }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  Overview
                </Button>
              )}
            </NavLink>
            <NavLink to={`klasifikasi`}>
              {({ isActive, isPending }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                  Klasifkasi
                </Button>
              )}
            </NavLink>
            <NavLink to={`comment-data`}>
              {({ isActive, isPending }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start ({i})"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  Data Komentar
                </Button>
              )}
            </NavLink>
            <NavLink to={`film-data`}>
              {({ isActive, isPending }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="m16 6 4 14" />
                    <path d="M12 6v14" />
                    <path d="M8 8v12" />
                    <path d="M4 4v16" />
                  </svg>
                  Data Film
                </Button>
              )}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="px-7 flex flex-col gap-4">
        <Button
          asChild
          variant="secondary"
          className="text-secondary-foreground w-fill flex flex-row"
        >
          <Link to={`/`}>
            <Home className="mr-2 h-4 w-4" />
            Halaman Utama
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="text-secondary-foreground w-fill flex flex-row"
        >
          <Link to={`/`} onClick={Logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Link>
        </Button>
      </div>
    </div>
  );
}
