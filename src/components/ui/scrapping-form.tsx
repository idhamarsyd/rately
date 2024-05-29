"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import axios from "axios";
import { Icons } from "./icons";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
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
  trailerId: z.string({
    required_error: "Please insert the Trailer ID.",
  }),
  releaseDate: z.date({
    required_error: "Please choose the release date.",
  }),
});

export function ScrappingForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  //   const movies = useAppSelector(selectMoviesList);
  const { saveToken, token } = useToken();
  const [open, setOpen] = React.useState(false);

  const [error, setError] = React.useState<string>("");
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await dispatch(fetchMovies());
  //       console.log(movies);
  //     };

  //     fetchData();
  //   }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trailerId: "",
      releaseDate: undefined,
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
      url: "/get_comments",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      data: {
        trailerId: data.trailerId,
        releaseDate: data.releaseDate,
      },
      responseType: "blob",
    })
      .then((response) => {
        setError(response.statusText);
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Berhasil melakukan scrapping komentar",
            description: `Komentar berhasil scrapping.`,
          });
          form.reset();
        }, 2000);
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
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
              title: "Gagal melakukan scrapping komentar",
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
                name="trailerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Trailer</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          id="trailerId"
                          placeholder="ID Trailer."
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
                name="releaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Date</FormLabel>
                    <FormControl>
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </>
                    </FormControl>
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
            Scrapping Komentar
          </Button>
        </div>
      </form>
    </Form>
  );
}
