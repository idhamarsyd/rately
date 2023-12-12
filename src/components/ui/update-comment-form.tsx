"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import axios from "axios";
import { Icons } from "./icons";

import { Button } from "./button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Label } from "./label";
import { toast } from "./use-toast";
import { ScrollArea } from "./scroll-area";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { fetchMovies } from "../../stores/moviesSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { fetchComments, selectMoviesList } from "../../stores/commentsSlice";
import { useToken } from "../../hooks/useToken";

const formSchema = z.object({
  comment: z.string(),
  movie: z.string({
    required_error: "Please select the movie.",
  }),
  //   movie: z.string(),
  label: z.string({
    required_error: "Please select the label.",
  }),
});

export type Comment = {
  id: number;
  comment: string;
  movie: string;
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
};

export function UpdateCommentForm({ comment, movie, label, id }: Comment) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMoviesList);
  const { saveToken, token } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchMovies());
      console.log(movies);
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: comment,
      movie: movie,
      label: label,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios({
      method: "PUT",
      url: `/update_comment/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        comment: data.comment,
        movie: data.movie,
        label: data.label,
      },
    })
      .then((response) => {
        setError(response.statusText);
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Berhasil mengupdate data komentar",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Komentar {data.movie} telah diupdate
                </code>
              </pre>
            ),
          });
          form.reset();
          dispatch(fetchComments());
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log("Error");
          setError(error.response.data.msg);
          setTimeout(() => {
            setIsLoading(false);
            toast({
              title: "Gagal mengupdate data film",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{error.response.data.msg}</code>
                </pre>
              ),
            });
          }, 2000);
        }
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-secondary-foreground"
      >
        <div className="grid gap-2">
          <ScrollArea className="h-[400px]">
            <div className="grid gap-1 overflow-visible">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Komentar</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          id="comment"
                          placeholder="Komentar film..."
                          type="text"
                          disabled={isLoading}
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="movie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movie</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the movie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark">
                        {movies.map((movie) => (
                          <SelectItem value={movie.title} key={movie.id}>
                            {movie.title}
                          </SelectItem>
                        ))}
                        {/* <SelectItem value="Talk To Me">Talk To Me</SelectItem>
                        <SelectItem value="Elementals">Elementals</SelectItem> */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark">
                        <SelectItem value="POSITIVE">POSITIVE</SelectItem>
                        <SelectItem value="NEGATIVE">NEGATIVE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>

          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
