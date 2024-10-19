import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variants: [],
  primaryVariantType: "",
  variantImages: [],
  variantOptionsTable: [],
};

export const variantSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {
    setInitialVariants: (state, action) => {
      const { variants } = action.payload;
      state.variants = variants;
    },

    setPrimaryVariantType: (state, action) => {
      const { primaryVariant } = action.payload;
      state.primaryVariantType = primaryVariant;
    },

    addVariantValue: (state, action) => {
      const { type, value } = action.payload;
      const variant = state.variants.find((v) => v.type === type);
      if (variant) {
        variant.values.push(value);
      }
    },

    removeVariantValue: (state, action) => {
      const { type, value } = action.payload;
      const variant = state.variants.find((v) => v.type === type);
      if (variant) {
        variant.values = variant.values.filter((v) => v !== value);
      }
    },

    generateVariantOptionsTable: (state) => {
      const variantTypes = state.variants.reduce((acc, variant) => {
        acc[variant.type] = variant.values;
        return acc;
      }, {});

      const generateCombinations = (arrays) => {
        const result = [];
        const combine = (index, current) => {
          if (index === arrays.length) {
            result.push(current);
            return;
          }
          for (let i = 0; i < arrays[index].length; i++) {
            combine(index + 1, [...current, arrays[index][i]]);
          }
        };
        combine(0, []);
        return result;
      };

      const allCombinations = generateCombinations(Object.values(variantTypes));
      state.variantOptionsTable = allCombinations.map((combination) => {
        const combinationObject = {
          sellingPrice: 0,
          discountedPrice: 0,
          quantityAvailable: 0,
          originalPrice: 0,
          sku: "",
        };
        Object.keys(variantTypes).forEach((key, index) => {
          combinationObject[key] = combination[index];
        });
        return combinationObject;
      });
    },

    updateVariantOptionField: (state, action) => {
      const { index, field, value } = action.payload;
      state.variantOptionsTable[index][field] = value;
    },

    updateAllVariantOptionBaseValues: (state, action) => {
      state.variantOptionsTable = state.variantOptionsTable.map((item) => ({
        ...item,
        ...action.payload,
      }));
    },

    setVariantImages: (state, action) => {
      const { variantImages } = action.payload;
      state.variantImages = variantImages;
    },

    addNewVariantImages: (state, action) => {
      const { value, new_images } = action.payload;
      state.variantImages = state.variantImages.map((item) =>
        item.value === value
          ? { ...item, images: [...item.images, ...new_images] }
          : item
      );
    },

    removeVariantImage: (state, action) => {
      const { value, remove_image } = action.payload;
      state.variantImages = state.variantImages.map((item) =>
        item.value === value
          ? {
              ...item,
              images: item.images.filter((url) => url !== remove_image),
            }
          : item
      );
    },
  },
});

export const {
  setInitialVariants,
  setPrimaryVariantType,
  addVariantValue,
  removeVariantValue,
  generateVariantOptionsTable,
  updateVariantOptionField,
  updateAllVariantOptionBaseValues,
  setVariantImages,
  addNewVariantImages,
  removeVariantImage,
} = variantSlice.actions;

export default variantSlice.reducer;
