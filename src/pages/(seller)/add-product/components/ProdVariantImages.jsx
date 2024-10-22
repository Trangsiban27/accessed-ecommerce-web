import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Box } from "@mui/material";
import { PlusOne } from "@mui/icons-material";

const ProdVariantImages = () => {
  const { watch, setValue, control } = useFormContext();
  const [primaryVariant, setPrimaryVariant] = useState(null);

  const variants = useWatch({ control, name: "variants" });
  const primaryVariantType = useWatch({ control, name: "primaryVariantType" });
  const variantImages = watch("variantImages");

  useEffect(() => {
    if (variants && primaryVariantType) {
      const primary = variants.find((item) => item.type === primaryVariantType);
      if (primary) {
        setPrimaryVariant(primary);
      }
    }
  }, [variants, primaryVariantType]);

  useEffect(() => {
    if (primaryVariant?.values) {
      const newVariantImages = primaryVariant.values.map((item) => ({
        type: primaryVariant.type,
        value: item,
        images: [],
      }));

      const updatedImages = newVariantImages.map((newItem) => {
        const existingItem = variantImages.find(
          (oldItem) => oldItem.value === newItem.value
        );
        return existingItem || newItem;
      });

      setValue("variantImages", updatedImages, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [primaryVariant, setValue, variantImages]);

  if (!primaryVariant) {
    return (
      <Box className="mt-4 w-full p-4 bg-gray-50 rounded-lg mb-4">
        <Alert severity="info" className="mt-4">
          Please select a category and enter the primary variant values.
        </Alert>
      </Box>
    );
  }

  const handleImageDelete = (itemIndex, imageIndex) => {
    const newImages = [...variantImages];
    newImages[itemIndex].images = newImages[itemIndex].images.filter(
      (_, idx) => idx !== imageIndex
    );
    setValue("variantImages", newImages, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleImageAdd = (itemIndex, files) => {
    const newImages = [...variantImages];
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    newImages[itemIndex].images = [...newImages[itemIndex].images, ...fileUrls];

    setValue("variantImages", newImages, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Box className="mt-4 w-full mx-auto p-4 bg-gray-50 rounded-lg mb-4">
      <div className="space-y-3 pb-10 image-section transition ease-in-out delay-500">
        {variantImages.map((item, itemIndex) => (
          <div key={item.value} className="space-y-2">
            <p className="text-start capitalize">
              <span className="font-bold uppercase">{item.type}</span>:{" "}
              <span className="pl-2">{item.value}</span>
            </p>
            <div className="grid grid-cols-5 gap-4">
              {item.images.map((url, imageIndex) => (
                <div key={imageIndex} className="relative group">
                  <img
                    src={url}
                    alt={`${item.value} preview ${imageIndex + 1}`}
                    className="w-full h-32 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center bg-gray-500 rounded-full cursor-pointer hover:bg-gray-500/60"
                    onClick={() => handleImageDelete(itemIndex, imageIndex)}
                  >
                    <span className="text-white w-6 h-6 rounded-full">×</span>
                  </button>
                </div>
              ))}
              <label
                htmlFor={`file-${item.value}`}
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="file"
                  id={`file-${item.value}`}
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={(e) => handleImageAdd(itemIndex, e.target.files)}
                />
                <PlusOne className="h-8 w-8 text-gray-400" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProdVariantImages;
