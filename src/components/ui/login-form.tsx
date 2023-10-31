"use client";

import React from "react";
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
import { toast } from "./use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().length(6, {
    message: "Password must be 6 characters.",
  }),
});

interface LoginForm extends React.HTMLAttributes<HTMLDivElement> {
  setToken: (token: string) => void;
}

export function ProfileForm({ setToken }: LoginForm) {
  //   interface LoginForm {
  //     username: string;
  //     password: string;
  //   }

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();
  //   const [loginForm, setLoginForm] = React.useState<LoginForm>({
  //     username: "",
  //     password: "",
  //   });

  //   function Login(event: React.SyntheticEvent) {
  //     axios({
  //       method: "POST",
  //       url: "/token",
  //       data: {
  //         email: loginForm.username,
  //         password: loginForm.password,
  //       },
  //     })
  //       .then((response) => {
  //         setToken(response.data.access_token);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log(error.response);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //         }
  //       });

  //     setLoginForm({
  //       username: "",
  //       password: "",
  //     });

  //     event.preventDefault();
  //   }

  //   function handleChange(event: React.SyntheticEvent,) {
  //     const {value, name} = event.target
  //     setLoginForm(prevNote => ({
  //         ...prevNote, [name]: value})
  //     )}

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "/token",
      data: {
        email: data.username,
        password: data.password,
      },
    })
      .then((response) => {
        setToken(response.data.access_token);
        setError(response.statusText);
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Login Success",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">You will be redirected.</code>
              </pre>
            ),
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
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
              title: "Login Failed",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{error.response.data.msg}</code>
                </pre>
              ),
            });
          }, 2000);
        }
      });
    // console.log(data.username);
  }
  // ...

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-secondary-foreground"
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="username"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <Button type="submit">Submit</Button> */}
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Masuk
          </Button>
        </div>
      </form>
    </Form>
  );
}
