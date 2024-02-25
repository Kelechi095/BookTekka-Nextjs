"use client";

import ImageUpload from "@/app/components/ImageUpload";
import Input from "@/app/components/inputs/Input";
import Wrapper from "@/app/components/Wrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ProfileInput from "@/app/components/inputs/ProfileInput";
import UiLoader from "@/app/components/UiLoader";
import { capitalizeFirst } from "@/app/utils/capitalizeFirst";
import { noUser } from "@/app/utils/noUser";
import { SafeUser } from "@/types";

interface EditProfileClientProps {
  currentUser: SafeUser | null;
}

const EditProfileClient = ({ currentUser }: EditProfileClientProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      newName: currentUser?.name,
      newUsername: currentUser?.username,
      bio: currentUser?.bio ? currentUser.bio : "",

      image: currentUser?.image ? currentUser.image : "",
    },
  });

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const router = useRouter();

  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const newData = {
      ...data,
      newName: capitalizeFirst(data.newName),
      newUsername: capitalizeFirst(data.newUsername),
    };
    if (data.bio.length < 1) {
      return toast.error("Bio must not be empty");
    }
    try {
      await axios.patch(`/api/editProfile/${currentUser?.id}`, newData);
      toast.success("Profile updated");
      router.push("/profile");
      reset();
      router.refresh();
      setIsLoading(false);
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!currentUser) return <UiLoader />;

  return (
    <Wrapper>
      <div className="">
        <form
          className="flex flex-col max-w-xs lg:max-w-lg mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3 mt-8">
            <ImageUpload
              onChange={(value) => setCustomValue("image", value)}
              value={image}
              userPhoto={currentUser?.image ? currentUser?.image : noUser}
            />
            <Input
              id="newName"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="newUsername"
              label="Username"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <ProfileInput
              id="bio"
              label="Bio"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>

          <button
            className="bg-cyan-800 rounded text-white py-2 hover:opacity-95 disabled:opacity-80 w-24 text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default EditProfileClient;
