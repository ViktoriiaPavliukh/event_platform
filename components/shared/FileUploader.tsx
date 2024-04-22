"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { FileWithPath } from "react-dropzone";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="image" width={250} height={250} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CloudUploadIcon
            sx={{ width: "50px", height: "50px", color: "#d3cbc5" }}
          />
          <Button type="button" sx={{ padding: "10px 20px" }}>
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
