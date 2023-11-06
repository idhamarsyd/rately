import React, { useEffect } from "react";
import { Button, buttonVariants } from "../components/ui/button";
import { Outlet, Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import { useAppSelector, useAppDispatch } from "../stores/hooks";
import { fetchMovieDetail, selectMovieDetail } from "../stores/moviesSlice";

function Movie() {
  const movie = useAppSelector(selectMovieDetail);
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const dispatch = useAppDispatch();
  const movieId = useParams();

  useEffect(() => {
    dispatch(fetchMovieDetail(movieId.movieId!));
    console.log(movie);
  }, []);

  return (
    <div className="bg-background dark min-h-screen flex flex-col gap-4 items-center px-12 pb-12">
      {/* Header */}
      <div className="w-full h-fit flex flex-col mt-[32px] gap-4">
        {/* <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
          Rately
        </h4> */}
        <Button
          asChild
          variant="outline"
          className="text-secondary-foreground w-fit flex flex-row"
        >
          <Link to={`/`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Beranda
          </Link>
        </Button>
      </div>
      {/* Content */}
      {isLoading ? (
        "Loading..."
      ) : (
        // <h1 className="text-secondary-foreground">{movie.title}</h1>
        <div className="flex flex-col w-full items-start justify-center gap-6 mt-2 rounded-lg md:grid lg:grid-cols-3">
          <div className="md:col-span-2 grid items-start gap-3">
            <div className="space-y-4">
              <iframe
                className="w-full aspect-video"
                src={movie.trailer}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <div className="space-y-1">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
                  {movie.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {movie.year} ‧ {movie.genre}
                </p>
              </div>
            </div>
            <p className="leading-7 text-muted-foreground">
              {movie.description}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 w-full grid items-start gap-6 xl:col-span-1 xl:grid-cols-1">
            <div className="space-y-1">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
                Komentar
              </h4>
              <Tabs defaultValue="all" className="flex flex-col pt-2">
                <TabsList className="w-full flex flex-row justify-between">
                  <TabsTrigger value="all" className="w-full">
                    Semua (208)
                  </TabsTrigger>
                  <TabsTrigger value="positive" className="w-full">
                    Positif (200)
                  </TabsTrigger>
                  <TabsTrigger value="negative" className="w-full">
                    Negatif (8)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ScrollArea className="rounded-md w-full h-[500px] border p-3">
                    <div className="space-y-8 text-secondary-foreground mt-2">
                      <div className="flex">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src="https://githu/shadcn.png"
                            alt="Avatar"
                          />
                          <AvatarFallback>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="#22C55E"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                              />
                            </svg>
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-5">
                            this movie had my jaw on the floor. sophie wilde
                            knocked it out of the park and so did zoe terakes
                            and chris alosio. some particular scenes with riley
                            were were insane. the ending left me feeling empty
                            yet wanting more. really hoping for a sequel because
                            this cast had some impeccable chemistry. really wish
                            this movie could have made it to the two hour mark
                            because it was amazing. an amazing directorial debut
                            for the racka racka brothers hope they do more
                            horror movies
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @laacolee
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                          <AvatarImage src="/avatars/02.png" alt="Avatar" />
                          <AvatarFallback>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="#F43F5E"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                              />
                            </svg>
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-5">
                            Just finished watching it. 10/10. Very good. Great
                            acting, character development, the right amount of
                            gore, right amount of jumpscares, and even something
                            that could be believable if you genuinely believe in
                            supernatural and afterlife. Very well done!!!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            jackson
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                          <AvatarImage src="/avatars/02.png" alt="Avatar" />
                          <AvatarFallback>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="#F43F5E"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                              />
                            </svg>
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-5">
                            Just finished watching it. 10/10. Very good. Great
                            acting, character development, the right amount of
                            gore, right amount of jumpscares, and even something
                            that could be believable if you genuinely believe in
                            supernatural and afterlife. Very well done!!!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            jackson
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="positive">
                  <h1>Hello 2</h1>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
