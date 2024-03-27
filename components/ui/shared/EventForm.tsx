"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import SelectItem from "./SelectItem";
import { UploadButton } from "@/lib/utils";
import { FileDownload } from "@mui/icons-material";
import FileUploader from "./FileUploader";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  // event?: IEvent;
  // eventId?: string;
};

export const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = eventDefaultValues;
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
  }
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <FormControl>
          <TextField
            id="title"
            // type="text"
            fullWidth
            label="Event Title"
            variant="outlined"
            autoComplete="title"
            defaultValue={initialValues.title}
            placeholder="Event Title"
            {...form.register("title")}
          />
          {/* {form.errors.title && (
            <FormHelperText error>{form.errors.title.message}</FormHelperText>
          )} */}
        </FormControl>
        <FormControl fullWidth>
          <SelectItem
            value={form.watch("categoryId")}
            onChangeHandler={(value) => form.setValue("categoryId", value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            type="text"
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={9}
            autoComplete="Description"
            defaultValue={initialValues.description}
            placeholder="Description"
            {...form.register("description")}
          />
          {/* {form.errors.title && (
            <FormHelperText error>{form.errors.title.message}</FormHelperText>
          )} */}
        </FormControl>
        <FormControl>
          {/* <TextField
            id="imageUrl"
            fullWidth
            label="Image"
            variant="outlined"
            multiline
            rows={9}
            // autoComplete="Description"
            // defaultValue={initialValues.description}
            placeholder="Upload image"
            {...form.register("imageUrl")}
          />  */}

          <FileUploader
            imageUrl={form.watch("imageUrl")}
            onFieldChange={(value) => form.setValue("imageUrl", value)}
            setFiles={setFiles}
          />
          {/* {form.errors.title && (
            <FormHelperText error>{form.errors.title.message}</FormHelperText>
          )}
          {/* <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          /> */}
        </FormControl>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EventForm;
