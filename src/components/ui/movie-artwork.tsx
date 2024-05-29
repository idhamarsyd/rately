// import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

import { Film } from "../../data/films";
import { playlists } from "../../data/playlists";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Film;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  positive?: number;
  negative?: number;
  neutral?: number;
  recommended?: boolean;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  positive,
  negative,
  neutral,
  recommended,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <div
              className={cn(
                "absolute z-10 flex flex-col px-2 py-1 bg-accent rounded-md mt-2 ml-2",
                recommended ? "visible" : "invisible"
              )}
            >
              <p className="text-xs">REKOMENDASI</p>
            </div>
            <img
              src={album.cover}
              alt={album.title}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>IMDb page</ContextMenuItem>
          <ContextMenuItem>Watch Trailer</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.title}</h3>
        <p className="text-xs text-muted-foreground">
          {album.year} • {album.genre}
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#00DFA2"
            viewBox="0 0 256 256"
          >
            <path d="M178.39,158c-11,19.06-29.39,30-50.39,30s-39.36-10.93-50.39-30a12,12,0,0,1,20.78-12c3.89,6.73,12.91,18,29.61,18s25.72-11.28,29.61-18a12,12,0,1,1,20.78,12ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM92,124a16,16,0,1,0-16-16A16,16,0,0,0,92,124Zm72-32a16,16,0,1,0,16,16A16,16,0,0,0,164,92Z"></path>
          </svg>

          <p className="text-xs font-medium">{positive}</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#F8DE22"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm52-52a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h80A12,12,0,0,1,180,160ZM76,108a16,16,0,1,1,16,16A16,16,0,0,1,76,108Zm104,0a16,16,0,1,1-16-16A16,16,0,0,1,180,108Z"></path>
          </svg>
          <p className="text-xs font-medium">{neutral}</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#F94C10"
            viewBox="0 0 256 256"
          >
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM76,108a16,16,0,1,1,16,16A16,16,0,0,1,76,108Zm104,0a16,16,0,1,1-16-16A16,16,0,0,1,180,108Zm-3.26,57a12,12,0,0,1-19.48,14,36,36,0,0,0-58.52,0,12,12,0,0,1-19.48-14,60,60,0,0,1,97.48,0Z"></path>
          </svg>
          <p className="text-xs font-medium">{negative}</p>
        </div>
      </div>
    </div>
  );
}
