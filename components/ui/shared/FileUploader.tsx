// "use client";
// import { useState, useCallback, Dispatch, SetStateAction } from "react";
// import { useDropzone } from "@uploadthing/react";
// import { generateClientDropzoneAccept } from "uploadthing/client";
// import { UploadThing } from "@/utils/uploadthings";
// import { Button } from "@mui/material";

// type FileUploaderProps = {
//   onFieldChange: (url: string) => void;
//   imageUrl: string;
//   // setFiles: Dispatch<SetStateAction<File[]>>;
// };


// function FileUploader({
//   imageUrl,
//   onFieldChange,
//   // setFiles
// }: FileUploaderProps) {
//   const [files, setFiles] = useState<File[]>([]);
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles(acceptedFiles);
//   }, []);

//   const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
//     onClientUploadComplete: () => {
//       alert("uploaded successfully!");
//     },
//     onUploadError: () => {
//       alert("error occurred while uploading");
//     },
//     onUploadBegin: () => {
//       alert("upload has begun");
//     },
//   });

//   const fileTypes = permittedFileInfo?.config
//     ? Object.keys(permittedFileInfo?.config)
//     : [];

//   // const { getRootProps, getInputProps } = useDropzone({
//   //   onDrop,
//   //   accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
//   // });
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
//   });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />

//       {imageUrl ? (
//         <div>
//           <img src={imageUrl} alt="image" width={250} height={250} />
//         </div>
//       ) : (
//         <div>
//           <img
//             src="/assets/icons/upload.svg"
//             width={77}
//             height={77}
//             alt="file upload"
//           />
//           <h3>Drag photo here</h3>
//           <p>SVG, PNG, JPG</p>
//           <div>
//             {files.length > 0 && (
//               <button onClick={() => startUpload(files)}>
//                 Upload {files.length} files
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//     // <div {...getRootProps()}>
//     //   <input {...getInputProps()} />
//     //   <div>
//     //     {files.length > 0 && (
//     //       <button onClick={() => startUpload(files)}>
//     //         Upload {files.length} files
//     //       </button>
//     //     )}
//     //   </div>
//     //   Drop files here!
//     // </div>
//   );
// }

"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { FileWithPath } from "react-dropzone";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@mui/material";
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
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
