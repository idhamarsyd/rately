import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Button, buttonVariants } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { AlbumArtwork } from "./components/ui/movie-artwork";
// import { listenNowAlbums, madeForYouAlbums } from "./data/films";
import { playlists } from "./data/playlists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { UserAuthForm } from "./components/ui/user-auth-form";

function App() {
  return (
    <div className="bg-background dark min-h-screen flex flex-col gap-4 items-center px-12">
      {/* Top Bar */}
      <div className="w-full h-[64px] place-content-between flex flex-row items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
          Rately
        </h4>
        <Button variant="outline" className="text-secondary-foreground">
          Login Admin
        </Button>
      </div>
      {/* Headline */}
      <div className="flex flex-col items-center gap-2 mt-32">
        <h1 className="scroll-m-20 text-2xl h-fit w-fit font-semibold tracking-tight text-secondary-foreground text-center">
          Pendapat mereka yang sudah nonton
        </h1>
        <p className="leading-7 text-secondary-foreground text-muted-foreground text-center">
          Lihat seberapa banyak komentar positif, negatif, atau netral dari
          sebuah film.
        </p>
      </div>
      {/* Search bar */}
      <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
        <Input
          type="text"
          placeholder="Judul film"
          className="text-secondary-foreground"
        />
        <Button type="submit" variant="secondary">
          Cari
        </Button>
      </div>
      {/* Gallery */}
      {/* <Tabs defaultValue="all" className="flex flex-col items-center mt-8">
        <TabsList className="w-fit">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="positive">Paling Disukai</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
            {madeForYouAlbums.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="positive">
          <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
            {madeForYouAlbums.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs> */}
      {/* Login Component */}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-secondary-foreground">
            Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan username dan password.
          </p>
        </div>
        <UserAuthForm className="text-secondary-foreground" />
      </div>
    </div>
  );
}

export default App;
