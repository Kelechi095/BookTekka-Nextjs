"use client";

import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm = ({ currentUser }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(data.password !== data.confirmPassword) return toast.error("Passwords don't match")

    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/newUser");
            router.refresh();
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if (currentUser) {
    return <p className="text-center">Redirecting...</p>;
  }

  return (
    <>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
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
      <Input
        id="confirmPassword"
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Submitting..." : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn("google")}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
