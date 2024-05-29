"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import axios from "axios";
import { Icons } from "./icons";

import { Button } from "./button";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  comment: z.string(),
  movie: z.string({
    required_error: "Please select the movie.",
  }),
  label: z.string({
    required_error: "Please select the label.",
  }),
  category: z.string({
    required_error: "Please select the data category.",
  }),
});

export function CommentForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const movies = useAppSelector(selectMoviesList);
  const { saveToken, token } = useToken();
  const [open, setOpen] = React.useState(false);

  const [error, setError] = React.useState<string>("");
  const dispatch = useAppDispatch();

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
      comment: "",
      movie: undefined,
      label: undefined,
      category: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // toast({
    //   title: "Berhasil menambahkan data Komentar",
    //   //   description: `${JSON.stringify(data, null, 2)}`,
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    setIsLoading(true);
    axios({
      method: "POST",
      url: "/add_comment",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        comment: data.comment,
        movie: data.movie,
        label: data.label,
        category: data.category,
      },
    })
      .then((response) => {
        setError(response.statusText);
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Berhasil menambahkan data komentar",
            description: `Komentar untuk film ${data.movie} berhasil ditambahkan.`,
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
              title: "Gagal menambahkan data komentar",
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
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>Movie</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-label="Select movie"
                            aria-expanded={open}
                            className="flex-1 justify-between"
                          >
                            {field.value ? field.value : "Select movie"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 dark">
                          <Command>
                            <CommandInput placeholder="Cari film..." />
                            <CommandEmpty>Film tidak ditemukan.</CommandEmpty>
                            <ScrollArea className="rounded-md w-full h-[250px]">
                              <CommandGroup>
                                {movies.map((movie) => (
                                  <CommandItem
                                    key={movie.id}
                                    value={movie.title}
                                    onSelect={() => {
                                      // setSelectedPreset(preset);
                                      field.onChange(movie.title);
                                      setOpen(false);
                                    }}
                                  >
                                    {movie.title}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field?.value === movie.title
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
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
                        <SelectItem value="NEUTRAL">NEUTRAL</SelectItem>
                        <SelectItem value="NEGATIVE">NEGATIVE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark">
                        <SelectItem value="TESTING">TESTING</SelectItem>
                        <SelectItem value="TRAINING">TRAINING</SelectItem>
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
            Tambah Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
