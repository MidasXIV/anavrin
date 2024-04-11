import { FC, useState } from "react";

import {
  ArrowRightIcon,
  CaretLeftIcon,
  FileIcon,
  LoopIcon,
  UploadIcon
} from "@radix-ui/react-icons";
import useDragDrop from "hooks/useDragDrop";
import { cn } from "@/utils/index";
import xlsx from "node-xlsx";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const ImportPortfolioDialog = ({ cancel, setUploadedPortfolio }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loadingState, setLoadingState] = useState<any>({});
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({});
  const [isVideoValid, setIsVideoValid] = useState<boolean>(false);
  const [acceptedTypes, setAcceptedTypes] = useState<string>(".xlsx");
  const [totalWeight, setTotalWeight] = useState<number>(0);

  const { dragOver, setDragOver, onDragOver, onDragLeave, fileDropError, setFileDropError } =
    useDragDrop();

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);

    const selectedFiles = Array.from(e.dataTransfer.files);

    // console.log the types of the files
    console.log(selectedFiles.map(file => file.type.split("/")[0]));

    if (
      selectedFiles.some(file => {
        const fileType = file.type.split("/")[0];
        return fileType !== "application";
      })
    ) {
      return setFileDropError("Invalid file type!");
    }

    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    setFileDropError("");
  };

  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as FileList);

    if (
      selectedFiles.some(file => {
        const fileType = file.type.split("/")[0];
        return fileType !== "application";
      })
    ) {
      return setFileDropError("Invalid file type!");
    }

    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    setFileDropError("");
  };
  return (
    <div className="h-60 w-full max-w-lg rounded-xl bg-white pb-4  dark:border-neutral-700 dark:bg-neutral-800">
      {/* <div className="border-b dark:border-neutral-700">
          <div className="flex justify-around">
            <div className="flex flex-row items-center justify-start gap-2 px-4 py-2">
              <div className="flex flex-row items-center justify-center rounded-full border p-2 dark:border-neutral-700">
                <UploadIcon className="h-5 w-5 text-neutral-600" />
              </div>
              <div>
                <p className="mb-0 font-semibold">Upload {acceptedTypes}</p>
                <p className="-mt-1 text-sm text-neutral-500">
                  Drag and drop your {acceptedTypes}. Will not be saved.
                </p>
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="flex flex-row items-center justify-center rounded-full border p-2 dark:border-neutral-700">
                <Button onClick={cancel} className="">
                  <CaretLeftIcon className="h-5 w-5 text-neutral-600" /> back
                </Button>
              </div>
            </div>
          </div>
        </div> */}

      <div className="flex items-center justify-between">
        <Button
          onClick={cancel}
          className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
        >
          <CaretLeftIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
          Back
        </Button>
        {files.length > 0 && (
          <Button
            className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
            onClick={() => setFiles([])}
          >
            <LoopIcon className="mr-1 inline-block h-4 w-4" />
            Reset
          </Button>
        )}
        <Button
          onClick={() => {
            setUploadedPortfolio(files[0]);
          }}
          disabled={files.length < 1}
          className="mb-2 rounded-full border border-gray-300 bg-neutral-100 px-4 py-1 text-sm text-neutral-500 transition-all hover:cursor-pointer hover:bg-neutral-200 hover:text-black dark:hover:bg-neutral-800"
        >
          <ArrowRightIcon className="mr-1 inline-block h-4 w-4 text-neutral-600" />
          Next
        </Button>
      </div>

      <form>
        <label htmlFor="file" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
          <div
            className={cn(
              "my-2 flex flex-col items-center justify-start rounded-xl border-[1.5px] border-dashed px-4 py-2 hover:cursor-pointer dark:border-neutral-700",
              dragOver && "border-blue-600 bg-blue-50"
            )}
          >
            <div className="flex flex-col items-center justify-start">
              <UploadIcon
                className={cn("my-4 h-5 w-5 text-neutral-600", dragOver && "text-blue-500")}
              />
              <p className="font-semibold">Choose a file or drag & drop it here</p>
              <p className="text-sm text-neutral-500">Only {acceptedTypes}. Up to 50 MB.</p>
              <div className="mb-2 mt-4 rounded-xl border bg-white px-3 py-1 drop-shadow-sm transition-all hover:cursor-pointer hover:drop-shadow dark:border-neutral-700 dark:bg-neutral-700">
                Select file
              </div>
            </div>
          </div>
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={fileSelect}
          multiple
        />
      </form>

      {files.length > 0 && (
        <div className="flex max-h-52 w-full flex-col items-center justify-start gap-2 overflow-auto border-t px-4 py-2 dark:border-neutral-700">
          <div className="flex w-full flex-row items-center justify-end">
            <p className="rounded-full bg-neutral-100 px-2 py-1 text-sm text-neutral-500">
              {files.length} {files.length === 1 ? "file" : "files"}
              {/* {formatBytes(totalWeight)} */}
            </p>
          </div>
          {files.map((file, index) => {
            const isLoading = loadingState[file.name];
            const preview = imagePreviews[file.name];

            // Check if file is an image
            const isImage = (file: string) => file.match(/image.*/);
            // Check if file is a video
            const isVideo = (file: string) => file.match(/video.*/);

            return (
              <div
                key={index}
                className="group flex w-full flex-row items-center justify-between rounded-lg border px-2 py-1 dark:border-neutral-700"
              >
                <div className="flex flex-row items-center justify-start gap-2">
                  {/* <div>
                                {isLoading ? (
                                  <div className="flex h-10 w-10 flex-row items-center justify-center gap-2 rounded-md border">
                                    <ActivityLogIcon className="h-4 w-4 animate-spin text-neutral-500" />
                                  </div>
                                ) : (
                                  preview && (
                                    <div className="relative h-10 w-10">
                                      {isImage(preview) && (
                                        <div className="relative h-10 w-10">
                                          <Image
                                            src={preview}
                                            alt="Preview"
                                            fill
                                            className="h-full w-full rounded-md border"
                                            style={{ objectFit: "cover" }}
                                          />
                                        </div>
                                      )}
                                      {isVideo(preview) && (
                                        <div className="relative flex h-10 w-10 flex-row items-center justify-center rounded-lg border text-neutral-500 transition-all hover:text-neutral-700">
                                          <Video className="h-5 w-5" />
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}
                              </div> */}
                  <div className="flex flex-col items-start justify-start gap-1">
                    <div className="flex flex-row items-center justify-start gap-2">
                      <div className="max-w-[300px] truncate">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="truncate hover:cursor-help">{file.name}</p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{file.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="text-xs text-neutral-500">{/* {formatBytes(file.size)} */}</p>
                      {!isLoading && (
                        <div className="flex flex-row items-center justify-start gap-1 rounded-full px-2 py-[0.5px] text-xs">
                          <div className="h-2 w-2 rounded-full bg-green-400" />
                          <p className="text-neutral-500">Uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-row items-center justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <button
                                    onClick={() => handlePreview(file)}
                                    className="hidden flex-row justify-end rounded-lg bg-neutral-100 p-1 text-neutral-400 transition-all hover:cursor-pointer hover:text-black group-hover:flex"
                                  >
                                    <Expand className="h-4 w-4" />
                                  </button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogTitle>{file.name}</DialogTitle>
                                  <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center rounded-xl bg-neutral-100 ">
                                    {previewImage ? (
                                      isImage(previewImage) ? (
                                        <Image
                                          src={previewImage}
                                          alt="Image Preview"
                                          fill
                                          className="h-full w-full rounded-md border"
                                          style={{ objectFit: "cover" }}
                                        />
                                      ) : isVideo(previewImage) ? (
                                        <video
                                          src={previewImage}
                                          controls
                                          className="h-full w-full rounded-md border"
                                          style={{ objectFit: "cover" }}
                                        />
                                      ) : null
                                    ) : (
                                      <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <button
                                className="hidden flex-row justify-end rounded-lg bg-neutral-100 p-1 text-neutral-400 transition-all hover:cursor-pointer hover:text-black group-hover:flex"
                                onClick={() => handleDelete(file.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div> */}
              </div>
            );
          })}
        </div>
      )}
      {fileDropError && (
        <div className="mx-2 my-2 flex flex-row items-center justify-center gap-2 rounded-lg border border-orange-200 bg-orange-50 py-1 text-center">
          <FileIcon className="h-4 w-4 text-orange-400" />
          <p className="text-sm font-medium text-orange-400">{fileDropError}</p>
        </div>
      )}
      <ul className="my-3 ml-6 list-disc [&>li]:mt-1">
        <li>
          Ensure your file contains relevant investment data such as token names, holdings, and fiat
          values.
        </li>
        <li>
          Anavrin will scan your uploaded file to identify key investment information, simplifying
          the integration process.
        </li>
        <li>Review the uploaded portfolio data before finalizing the import to ensure accuracy.</li>
        <li>Need help? Check our documentation or contact support for assistance.</li>
      </ul>
    </div>
  );
};

export default ImportPortfolioDialog;
