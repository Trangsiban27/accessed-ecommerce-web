import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../../../store/slices/productSlice";
import { Star, Upload, X } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

const ImagesPopup = (openModal = false, setOpenModal = () => {}) => {
  const dispatch = useDispatch();
  const productImages = useSelector((state) => state.product.productImages);
  const primaryImage = useSelector((state) => state.product.primaryImage);

  function updateField(field, value) {
    dispatch(setProductField({ field, value }));
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddMore = (event) => {
    const acceptedFiles = event.target.files;
    if (!acceptedFiles) return;

    const newFiles = Array.from(acceptedFiles).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const prev_images = productImages || [];
    updateField("images", [...prev_images, ...newFiles]);
  };

  const handleRemoveImage = (url) => {
    const newImageList = productImages.filter((item) => item.url !== url);
    updateField("images", newImageList);
  };

  const handleSetPrimaryImage = (file) => {
    updateField("primaryImage", file);
  };

  const FileInput = () => (
    <div className="relative">
      <Button variant="outline" className="gap-2">
        <Upload className="w-4 h-4" />
        Add Images
      </Button>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleAddMore}
        multiple
        accept="image/*"
      />
    </div>
  );

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTitle>All Images</DialogTitle>

      <DialogContent className="max-w-[1300px] w-full h-[600px] p-6">
        <div className="flex items-start justify-between w-full h-full">
          <div className="w-2/5 p-3 h-full">
            {productImages?.length > 0 && (
              <img
                src={primaryImage?.url || productImages[0].url}
                alt="Primary"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="w-3/5 p-3 flex items-start justify-start flex-wrap gap-2 overflow-y-auto max-h-full">
            {productImages.map((item, index) => (
              <div
                key={index}
                className={`w-1/4 h-[120px] p-2 relative ${
                  primaryImage?.url === item.url
                    ? "border-blue-500 border-2 border-solid"
                    : "border-gray-300 border border-dashed"
                } overflow-hidden rounded-md`}
              >
                <img
                  src={item.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => handleSetPrimaryImage(item)}
                />

                {primaryImage?.url === item.url ? (
                  <div className="absolute top-1 right-1">
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                  </div>
                ) : (
                  <button
                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-gray-500/45 rounded-full cursor-pointer hover:bg-gray-500/60"
                    onClick={() => handleRemoveImage(item.url)}
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>

      <Box className="p-4">
        {productImages.length < 10 && <FileInput />}
        <Button variant="outline" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default ImagesPopup;
