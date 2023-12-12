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
import { Comment } from "../components/ui/comment";

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
                src={movie?.trailer}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <div className="space-y-1">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
                  {movie?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {movie?.year} ‧ {movie?.genre}
                </p>
              </div>
            </div>
            <p className="leading-7 text-muted-foreground">
              {movie?.description}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 w-full grid items-start gap-6 xl:col-span-1 xl:grid-cols-1">
            <div className="space-y-1">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-foreground">
                Komentar
              </h4>
              <Tabs defaultValue="positive" className="flex flex-col pt-2">
                <TabsList className="w-full flex flex-row justify-between">
                  <TabsTrigger value="positive" className="w-full">
                    Positif (
                    {
                      movie?.comments.filter(
                        (comment) => comment.classification === "POSITIVE"
                      ).length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="neutral" className="w-full">
                    Netral (
                    {
                      movie?.comments.filter(
                        (comment) => comment.classification === "NEUTRAL"
                      ).length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="negative" className="w-full">
                    Negatif (
                    {
                      movie?.comments.filter(
                        (comment) => comment.classification === "NEGATIVE"
                      ).length
                    }
                    )
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="positive">
                  <ScrollArea className="rounded-md w-full h-[500px] border p-3">
                    <div className="space-y-8 text-secondary-foreground mt-2">
                      {movie?.comments
                        .filter(
                          (comment) => comment.classification === "POSITIVE"
                        )
                        .map((comment) => (
                          <Comment
                            key={comment.id}
                            data={comment.comment}
                            type="positive"
                          />
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="neutral">
                  <ScrollArea className="rounded-md w-full h-[500px] border p-3">
                    <div className="space-y-8 text-secondary-foreground mt-2">
                      {movie?.comments
                        .filter(
                          (comment) => comment.classification === "NEUTRAL"
                        )
                        .map((comment) => (
                          <Comment
                            key={comment.id}
                            data={comment.comment}
                            type="neutral"
                          />
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="negative">
                  <ScrollArea className="rounded-md w-full h-[500px] border p-3">
                    <div className="space-y-8 text-secondary-foreground mt-2">
                      {movie?.comments
                        .filter(
                          (comment) => comment.classification === "NEGATIVE"
                        )
                        .map((comment) => (
                          <Comment
                            key={comment.id}
                            data={comment.comment}
                            type="negative"
                          />
                        ))}
                    </div>
                  </ScrollArea>
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
