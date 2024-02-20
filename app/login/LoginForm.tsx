"use client";

import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

export function LoginForm ({ currentUser }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if(currentUser) {
    return <p className="text-center">Redirecting...</p>
  }



  return (
    <>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="text"
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Submitting..." : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn('google')}
      />
      <p className="text-sm">
        Do not have an Account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </>
  );
};
