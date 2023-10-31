// import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button, buttonVariants } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AlbumArtwork } from "../components/ui/movie-artwork";
import { films } from "../data/films";
import { playlists } from "../data/playlists";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Outlet, Link } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { LayoutDashboard } from "lucide-react";

function Home() {
  interface UserData {
    profile_name: string;
    about_me: string;
  }
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const { token } = useToken();

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
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
    <div className="bg-background dark min-h-screen flex flex-col gap-4 items-center px-12 pb-12">
      {/* Top Bar */}
      <div className="w-full h-[64px] place-content-between flex flex-row items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
          Rately
        </h4>
        {!token ? (
          <Button
            asChild
            variant="outline"
            className="text-secondary-foreground"
          >
            <Link to={`login`}>Login Admin</Link>
          </Button>
        ) : (
          <Button
            asChild
            variant="secondary"
            className="text-secondary-foreground"
          >
            <Link to={`dashboard`}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        )}
      </div>
      {/* Headline */}
      <div className="flex flex-col items-center gap-2 mt-32">
        <h1 className="scroll-m-20 text-2xl h-fit w-fit font-semibold tracking-tight text-secondary-foreground text-center">
          Pendapat mereka yang sudah nonton
        </h1>
        <p className="leading-7 text-muted-foreground text-center">
          Lihat seberapa banyak komentar positif dan negatif dari sebuah film.
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
      <Tabs defaultValue="all" className="flex flex-col items-center mt-8">
        <TabsList className="w-fit">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="positive">Paling Disukai</TabsTrigger>
          <TabsTrigger value="recent">Terbaru</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
            {films.map((film) => (
              <Link to={`movie`}>
                <AlbumArtwork
                  key={film.title}
                  album={film}
                  className="w-[250px]"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="positive">
          <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
            {films.map((film) => (
              <AlbumArtwork
                key={film.title}
                album={film}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
            {films.map((film) => (
              <AlbumArtwork
                key={film.title}
                album={film}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {/* FAQ & Footer */}
      <div className="w-full flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4 items-center max-w-[400px] w-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
            Tentang Website
          </h4>
          <Accordion
            type="single"
            collapsible
            className="w-full text-secondary-foreground"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Seberapa akurat klasifikasi yang diberikan?
              </AccordionTrigger>
              <AccordionContent>
                Akurasi dari hasil klasifikasi komentar positif dan negatif
                adalah 80%.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Komentar bersumber darimana?</AccordionTrigger>
              <AccordionContent>
                Semua komentar adalah komentar dari trailer resmi tiap film yang
                ada di YouTube.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Kenapa jumlah film nya sedikit?
              </AccordionTrigger>
              <AccordionContent>
                Sistem ini masih tahap awal dan berfokus untuk
                mengimplementasikan metode Support Vector Machine dengan data
                yang secukupnya.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <p className="text-xs text-muted-foreground">Built by Idham</p>
      </div>
    </div>
  );
}

export default Home;
