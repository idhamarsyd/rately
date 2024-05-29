import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button, buttonVariants } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { AlbumArtwork } from "../components/ui/movie-artwork";
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
import { useAppSelector, useAppDispatch } from "../stores/hooks";
import {
  selectMovies,
  fetchMovies,
  fetchMovieDetail,
  searchMovie,
  fetchClassifiedMovies,
  selectClassifiedMovies,
} from "../stores/moviesSlice";

function Home() {
  const { token } = useToken();

  const movies = useAppSelector(selectClassifiedMovies);
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState<string>("all");

  useEffect(() => {
    dispatch(fetchClassifiedMovies());
  }, []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const enterHandler = () => {
    if (query !== "") {
      dispatch(searchMovie(query));
      setSearchStatus(true);
    }
  };

  const resetSearch = () => {
    setQuery("");
    dispatch(fetchClassifiedMovies());
    setSearchStatus(false);
  };

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
          Lihat seberapa banyak komentar positif, netral, dan negatif dari
          sebuah film.
        </p>
      </div>
      {/* Search bar */}
      <div className="flex w-full max-w-sm items-center space-x-2 mt-2 text-secondary-foreground">
        <Input
          type="text"
          placeholder="Judul film"
          className="text-secondary-foreground"
          onChange={(e) => inputHandler(e)}
          value={query}
        />
        <Button
          type="submit"
          variant="secondary"
          onClick={() => enterHandler()}
        >
          Cari
        </Button>
        {searchStatus ? (
          <Button type="submit" variant="ghost" onClick={() => resetSearch()}>
            Reset
          </Button>
        ) : (
          <></>
        )}
      </div>
      {/* Gallery */}
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        className="flex flex-col text-secondary-foreground items-center gap-2"
      >
        <TabsList className="w-fit">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="recommended">Rekomendasi</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {isLoading ? (
            // <h1 className="text-secondary-foreground">Getting the movies...</h1>
            <div className="flex flex-row items-center mt-8 gap-4">
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
              {movies.map((film) => (
                <Link
                  key={film.id}
                  to={`movie/${film.id}`}
                  onClick={() => dispatch(fetchMovieDetail(film.id))}
                >
                  <AlbumArtwork
                    key={film.title}
                    album={film}
                    className="w-[250px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                    recommended={
                      film.comments.filter(
                        (comment) => comment.classification === "POSITIVE"
                      ).length /
                        film.comments.length >=
                      0.6
                    }
                    positive={
                      film.comments.filter(
                        (comment) => comment.classification === "POSITIVE"
                      ).length
                    }
                    negative={
                      film.comments.filter(
                        (comment) => comment.classification === "NEGATIVE"
                      ).length
                    }
                    neutral={
                      film.comments.filter(
                        (comment) => comment.classification === "NEUTRAL"
                      ).length
                    }
                  />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="recommended">
          {isLoading ? (
            // <h1 className="text-secondary-foreground">Getting the movies...</h1>
            <div className="flex flex-row items-center mt-8 gap-4">
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
              <Skeleton className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground h-auto w-[250px] aspect-[3/4]" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 pb-4 mt-6 text-secondary-foreground">
              {movies
                .filter((film) => {
                  const positiveComments = film.comments.filter(
                    (comment) => comment.classification === "POSITIVE"
                  ).length;
                  const totalComments = film.comments.length;
                  return (
                    totalComments > 0 && positiveComments / totalComments >= 0.6
                  );
                })
                .sort((a, b) => {
                  const positiveRateA =
                    a.comments.filter(
                      (comment) => comment.classification === "POSITIVE"
                    ).length / a.comments.length;
                  const positiveRateB =
                    b.comments.filter(
                      (comment) => comment.classification === "POSITIVE"
                    ).length / b.comments.length;

                  // Sort in ascending order based on positive comments rate
                  return positiveRateA - positiveRateB;
                })
                .map((film) => (
                  <Link
                    key={film.id}
                    to={`movie/${film.id}`}
                    onClick={() => dispatch(fetchMovieDetail(film.id))}
                  >
                    <AlbumArtwork
                      key={film.title}
                      album={film}
                      className="w-[250px]"
                      aspectRatio="portrait"
                      width={250}
                      height={330}
                      positive={
                        film.comments.filter(
                          (comment) => comment.classification === "POSITIVE"
                        ).length
                      }
                      negative={
                        film.comments.filter(
                          (comment) => comment.classification === "NEGATIVE"
                        ).length
                      }
                      neutral={
                        film.comments.filter(
                          (comment) => comment.classification === "NEUTRAL"
                        ).length
                      }
                    />
                  </Link>
                ))}
            </div>
          )}
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
                Akurasi dari hasil klasifikasi komentar positif, negatif, dan
                netral adalah sekitar 70%.
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
