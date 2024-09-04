"use client";

import React, { useState } from "react";
import { TextField, Button, Callout} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
}); 
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/misc/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;


const IssueForm = ({issue}: {issue?:Issue}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false); 
      setError("An unexpected error has occurred");
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={onSubmit}
      >
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => {
            const { ref, ...rest } = field; // removes ref
            return <SimpleMDE placeholder="Enter the description" {...rest} />;
          }}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          Create New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
