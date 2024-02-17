"use client";

import ImageUpload from "@/app/components/ImageUpload";
import Input from "@/app/components/inputs/Input";
import Wrapper from "@/app/components/Wrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCamera } from "react-icons/bi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ProfileInput from "@/app/components/inputs/ProfileInput";
import UiLoader from "@/app/components/UiLoader";
import { capitalizeFirst } from "@/app/utils/capitalizeFirst";

const EditProfileClient = ({ currentUser }: any) => {
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

  const noUser =
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg";

  const router = useRouter();

  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const newData = {
      ...data,
        newName: capitalizeFirst(data.newName),
        newUsername: capitalizeFirst(data.newUsername)
    }
    if(data.bio.length < 1 ) {
      return toast.error("Bio must not be empty")
    }
    try {
      await axios.patch(`/api/editProfile/${currentUser.id}`, newData);
      toast.success("User updated");
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
        <h1 className="font-bold text-2xl mt-8 text-center font-mono">
          Edit Profile
        </h1>

        <form
          className="flex flex-col mt-4 max-w-xs lg:max-w-lg gap-4 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 mt-8">
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
