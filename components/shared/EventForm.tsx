"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Box,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import { Event, LocationOn, AttachMoney } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import SelectItem from "./SelectItem";
import FileUploader from "./FileUploader";
import { useUploadThing } from "@/utils/uploadthings";
import { createEvent, updateEvent } from "../../lib/actions/event.actions";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@clerk/nextjs";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  userId?: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

export const EventForm = ({ type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const { user } = useUser();
  const userId: string =
    typeof user?.publicMetadata.userId === "string"
      ? user.publicMetadata.userId
      : "";

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // if (type === "Update") {
    //   if (!eventId) {
    //     router.back();
    //     return;
    //   }

    //   try {
    //     const updatedEvent = await updateEvent({
    //       userId,
    //       event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
    //       path: `/events/${eventId}`,
    //     });

    //     if (updatedEvent) {
    //       form.reset();
    //       router.push(`/events/${updatedEvent._id}`);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    if (type === "Update") {
      if (!eventId) {
        // Handle missing eventId
        return;
      }

      console.log("Updating event with eventId:", eventId);
      console.log("Event data:", values);
      console.log("UserId:", userId);

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        console.log("Updated event:", updatedEvent);

        if (updatedEvent) {
          // Handle successful update
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log("Error updating event:", error);
      }
    }
  }

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    form.setValue("startDateTime", date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    form.setValue("endDateTime", date);
  };
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "20px",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <FormControl>
          <TextField
            id="title"
            type="text"
            fullWidth
            label="Event Title"
            variant="outlined"
            autoComplete="title"
            defaultValue={initialValues.title}
            placeholder="Event Title"
            {...form.register("title")}
          />
          {form.formState.errors.title && (
            <FormHelperText error>
              {form.formState.errors.title.message}
            </FormHelperText>
          )}
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
          {form.formState.errors.description && (
            <FormHelperText error>
              {form.formState.errors.description.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <FileUploader
            imageUrl={form.watch("imageUrl")}
            onFieldChange={(value) => form.setValue("imageUrl", value)}
            setFiles={setFiles}
          />
          {form.formState.errors.imageUrl && (
            <FormHelperText error>
              {form.formState.errors.imageUrl.message}
            </FormHelperText>
          )}
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
          {form.formState.errors.location && (
            <FormHelperText error>
              {form.formState.errors.location.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <DatePicker
            placeholderText="Start Date"
            selected={startDate}
            onChange={handleStartDateChange}
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
                autoComplete="Start date"
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
            showTimeSelect
            minDate={startDate}
            onChange={handleEndDateChange}
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
        <FormControl>
          <TextField
            id="price"
            type="number"
            fullWidth
            label="Price"
            variant="outlined"
            autoComplete="Price"
            defaultValue={initialValues.price}
            placeholder="Add price"
            {...form.register("price")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FormControlLabel
                    control={
                      <Checkbox id="isFree" {...form.register("isFree")} />
                    }
                    label="Free Event"
                  />
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
          />
          {form.formState.errors.price && (
            <FormHelperText error>
              {form.formState.errors.price.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            id="url"
            type="text"
            fullWidth
            label="URL"
            variant="outlined"
            autoComplete="URL"
            defaultValue={initialValues.price}
            placeholder="Add URL"
            {...form.register("url")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
          {form.formState.errors.url && (
            <FormHelperText error>
              {form.formState.errors.url.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          disabled={form.formState.isSubmitting}
          sx={{
            display: "flex",
            justifySelf: "center",
            alignSelf: "center",
            padding: "10px 20px",
          }}
        >
          {form.formState.isSubmitting ? "Submit" : `${type} Event`}
        </Button>
      </form>
    </>
  );
};

export default EventForm;
