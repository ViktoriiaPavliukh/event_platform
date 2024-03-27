"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import SelectItem from "./SelectItem";
import { UploadButton } from "@/lib/utils";
import { FileDownload } from "@mui/icons-material";
import FileUploader from "./FileUploader";
import "react-datepicker/dist/react-datepicker.css";
import { Event, LocationOn } from "@mui/icons-material";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  // event?: IEvent;
  // eventId?: string;
};

export const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
        <FormControl>
          <TextField
            id="location"
            type="text"
            fullWidth
            label="Location"
            variant="outlined"
            autoComplete="Location"
            defaultValue={initialValues.location}
            placeholder="Event location or Online"
            {...form.register("location")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <DatePicker
            placeholderText="Start Date"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            wrapperClassName="datePicker"
            customInput={
              <TextField
                fullWidth
                variant="outlined"
                label="Start Date"
                placeholder="Start Date"
                // autoComplete="Start date"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Event />
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        </FormControl>
        <FormControl>
          <DatePicker
            placeholderText="End Date"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            wrapperClassName="datePicker"
            customInput={
              <TextField
                fullWidth
                variant="outlined"
                label="End Date"
                placeholder="End Date"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Event />
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EventForm;
