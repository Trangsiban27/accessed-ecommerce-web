import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/ProductSlice";

import PopupImages from "./PopupImages";

const ProdImages = () => {
  const imageInputRef = useRef(null);
  const dispatch = useAppDispatch();
  const primaryImage = useAppSelector((state) => state.product.primaryImage);
  const productImages = useAppSelector((state) => state.product.productImages);
  const [openModal, setOpenModal] = useState(false);

  const updateField = (field, value) => {
    dispatch(updateProductField({ field, value }));
  };

  const onDrop = (acceptedFiles) => {
    const maxFiles = 10;
    const totalFiles = productImages.length + acceptedFiles.length;
    if (totalFiles > maxFiles) {
      const filesToAdd = maxFiles - productImages.length;
      acceptedFiles = acceptedFiles.slice(0, filesToAdd);
    }
    const newFiles = acceptedFiles.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));
    const prev_images = productImages;
    updateField("productImages", [...prev_images, ...newFiles]);
    updateField(
      "primaryImage",
      prev_images.length > 0 ? prev_images[0] : newFiles[0]
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    const updatedImages = productImages.filter(
      (item) => item.url !== primaryImage?.url
    );
    updateField("productImages", updatedImages);
    updateField(
      "primaryImage",
      updatedImages.length > 0 ? updatedImages[0] : null
    );
  };

  const handleReplaceImage = (file) => {
    const newImage = { file: file, url: URL.createObjectURL(file) };
    const updatedImages = productImages.map((img) =>
      img.url === primaryImage?.url ? newImage : img
    );
    updateField("productImages", updatedImages);
    updateField("primaryImage", newImage);
  };

  const handleReplaceClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      if (event.target && event.target.files) {
        const file = event.target.files[0];
        handleReplaceImage(file);
      }
    };
    inputElement.click();
  };

  return (
    <div className={`w-full rounded-lg mb-2 p-3`}>
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg">
          Product images <span className="text-red-600"> * </span>
          <span className="text-blue-700 text-sm">
            [{productImages.length} / 10 files]
          </span>
        </p>
        <PopupImages openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div className="flex w-full items-center p-2 px-5 rounded-lg border-2 h-[325px] border-solid border-gray-200 gap-3 relative">
        <div
          {...getRootProps()}
          className={`${
            productImages.length === 0
              ? "w-full"
              : productImages.length === 10
              ? "hidden"
              : "w-1/3"
          } ${
            isDragActive
              ? "border-blue-500 bg-gray-50"
              : "border-gray-300 bg-slate-100"
          } h-[calc(100%-14px)] my-2 flex items-center justify-center border-[1px] border-dashed rounded-md transition-colors ${
            productImages.length >= 10 ? "hidden" : ""
          }`}
        >
          <input {...getInputProps()} ref={imageInputRef} />
          <p className="text-sm font-medium text-blue-400">
            Upload or Drag Image
          </p>
        </div>
        <div
          className={`${
            productImages.length >= 10
              ? "w-full"
              : productImages.length > 0
              ? "w-2/3"
              : "hidden"
          } h-full flex items-center justify-center`}
        >
          <div
            className={`${
              productImages.length === 1 ? "w-full" : "w-1/2"
            } h-[calc(100%-14px)] flex items-center justify-center px-2 relative group`}
          >
            <img
              src={primaryImage?.url}
              alt={`Image file ${primaryImage?.file.name}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className={`w-[calc(100%-14px)] mx-2 h-full flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col gap-5`}
            >
              <Button
                className="text-white"
                variant="contained"
                onClick={() => handleReplaceClick()}
              >
                Replace
              </Button>
              <Button
                className="text-white"
                variant="contained"
                onClick={() => handleRemoveImage()}
              >
                Remove
              </Button>
            </div>
          </div>

          <div
            className={`${
              productImages.length === 1 ? "hidden" : "w-1/2"
            } h-[calc(100%-14px)] flex flex-col items-between justify-start gap-2`}
          >
            {productImages
              .filter((item) => item.url !== primaryImage?.url)
              .slice(0, 2)
              .map((item, index) => {
                return (
                  <div className="w-full h-1/2 relative" key={index}>
                    <img
                      src={item.url}
                      alt={`Image file ${item.file.name}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div
                      className={`w-full h-full flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white ${
                        index === 1 && productImages.length > 3 ? "" : "hidden"
                      }`}
                      onClick={() => setOpenModal(true)}
                    >
                      <span className="text-white opacity-1">
                        + {productImages.length - 3}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdImages;
