import {
  addProductImages,
  removeProductImage,
  replaceProductImage,
  setPrimaryImage,
  setProductField,
} from "../../../../store/slices/productSlice";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Star, Upload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
} from "@mui/material";

const ProdImages = () => {
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const primaryImage = useSelector((state) => state.product.primaryImage);
  const productImages = useSelector((state) => state.product.productImages);

  const onDrop = (acceptedFiles) => {
    const maxFiles = 10;
    const totalFiles = productImages.length + acceptedFiles.length;

    if (totalFiles > maxFiles) {
      const filesToAdd = maxFiles - productImages.length;
      acceptedFiles = acceptedFiles.slice(0, filesToAdd);
    }

    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    dispatch(addProductImages(newImages));
    dispatch(
      setPrimaryImage(
        productImages.length > 0 ? productImages[0] : newImages[0]
      )
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const updateField = (field, value) =>
    dispatch(setProductField({ field, value }));

  const RemoveImageInPopup = (url) => {
    const newImageList = productImages.filter((item) => item !== url);
    updateField("images", newImageList);
  };

  const handleAddMore = (event) => {
    const acceptedFiles = event.target.files;
    if (!acceptedFiles) return;
    const newFiles = Array.from(acceptedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    dispatch(addProductImages(newFiles));
  };

  const handleReplaceClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      if (event.target && event.target.files) {
        const file = event.target.files[0];
        dispatch(replaceProductImage(URL.createObjectURL(file)));
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
        <Button onClick={() => setOpenModal(true)}>
          <span className="capitalize"> All Images </span>
        </Button>

        <Dialog
          open={openModal}
          onOpenChange={setOpenModal}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle>All Images</DialogTitle>
          <DialogContent className="w-full h-[600px] p-6">
            <div className="flex items-start justify-between w-full h-full">
              <div className="w-1/2 p-3 h-full">
                {productImages?.length > 0 && (
                  <img
                    src={primaryImage || productImages[0]}
                    alt="Primary"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>

              <Grid2 className="w-1/2 p-3 max-h-full" container spacing={3}>
                {productImages.map((item, index) => (
                  <Grid2
                    size={4}
                    key={index}
                    className={`w-1/4 h-[120px] p-2 relative ${
                      primaryImage === item
                        ? "border-blue-500 border-2 border-solid"
                        : "border-gray-300 border border-dashed"
                    } rounded-md`}
                  >
                    <img
                      src={item}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() => dispatch(setPrimaryImage(item))}
                    />

                    {primaryImage === item ? (
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-300 flex items-center justify-center rounded-full">
                        <Star className="w-4 h-4 text-orange-400 fill-current" />
                      </div>
                    ) : (
                      <button
                        className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center bg-gray-500 rounded-full cursor-pointer hover:bg-gray-500/60"
                        onClick={() => RemoveImageInPopup(item)}
                      >
                        <span className="text-white w-6 h-6 rounded-full">
                          X
                        </span>
                      </button>
                    )}
                  </Grid2>
                ))}
              </Grid2>
            </div>
          </DialogContent>

          <Box className="p-4 flex items-center justify-end w-full">
            {productImages.length < 10 && (
              <div className="relative">
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Add Images
                </Button>
                <input
                  multiple
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleAddMore}
                />
              </div>
            )}
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </Box>
        </Dialog>
      </div>

      <div className="flex w-full items-center p-2 px-5 rounded-lg border-2 h-[325px] border-solid border-gray-200 gap-3 relative mt-3">
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
          } h-[calc(100%-14px)] my-2 flex items-center justify-center border-[1px] border-dashed rounded-md transition-colors cursor-pointer ${
            productImages.length >= 10 ? "hidden" : ""
          }`}
          onClick={() => imageInputRef.current.click()}
        >
          <input
            {...getInputProps()}
            ref={imageInputRef}
            aria-label="proudct images"
          />
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
            } h-full flex items-center justify-center px-2 py-1 relative group`}
          >
            <img
              src={primaryImage}
              alt={`Image file`}
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
                onClick={() => {
                  dispatch(removeProductImage(primaryImage));
                  dispatch(
                    setPrimaryImage(
                      productImages.length > 0 ? productImages[0] : ""
                    )
                  );
                }}
              >
                Remove
              </Button>
            </div>
          </div>

          <Grid2
            container
            className={`${
              productImages.length === 1 ? "hidden" : "w-1/2"
            } h-full flex flex-col items-between justify-start gap-2`}
          >
            {productImages
              .filter((item) => item !== primaryImage)
              .slice(0, 2)
              .map((item, index) => {
                return (
                  <Grid2
                    size={12}
                    className="w-full h-1/2 py-1 relative over"
                    key={index}
                  >
                    <img
                      src={item}
                      alt={`Image file`}
                      className="w-full h-full object-fill rounded-md"
                    />
                    <div
                      className={`w-full h-full py-1 flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white ${
                        index === 1 && productImages.length > 3 ? "" : "hidden"
                      }`}
                      onClick={() => setOpenModal(true)}
                    >
                      <span className="text-white h-[30px] opacity-1">
                        + {productImages.length - 3}
                      </span>
                    </div>
                  </Grid2>
                );
              })}
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default ProdImages;
