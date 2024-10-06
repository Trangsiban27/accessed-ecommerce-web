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
    // dispatch(setInitialVariants( [{id: 1, type: 'Color', values: ['Red', 'Blue']}] ))
    setInitialVariants: (state, action) => {
      state.variants = action.payload;
    },

    // dispatch(setPrimaryVariantType('Color'))
    setPrimaryVariantType: (state, action) => {
      state.primaryVariantType = action.payload;
    },

    // dispatch(addVariantValue({ type: "Color", value: 'Green' }))
    addVariantValue: (state, action) => {
      const { type, value } = action.payload;
      const variant = state.variants.find((v) => v.type === type);
      if (variant) {
        variant.values.push(value);
      }
    },

    // dispatch(removeVariantValue({ type: "Color", value: 'Green' }))
    removeVariantValue: (state, action) => {
      const { type, value } = action.payload;
      const variant = state.variants.find((v) => v.type === type);
      if (variant) {
        variant.values = variant.values.filter((v) => v !== value);
      }
    },

    // dispatch(generateVariantOptionsTable())
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

    // dispatch(updateVariantOptionField({ index: 0, field: 'price', value: 100 }))
    updateVariantOptionField: (state, action) => {
      const { index, field, value } = action.payload;
      state.variantOptionsTable[index][field] = value;
    },

    // dispatch(updateAllVariantOptionBaseValues({ price: 100, salePrice: 90, quantity: 50, mrpPrice: 110, sku: 'SKU123' }))
    updateAllVariantOptionBaseValues: (state, action) => {
      const {
        sellingPrice,
        discountedPrice,
        quantityAvailable,
        originalPrice,
        sku,
      } = action.payload;
      state.variantOptionsTable = state.variantOptionsTable.map((item) => ({
        ...item,
        sellingPrice,
        discountedPrice,
        quantityAvailable,
        originalPrice,
        sku,
      }));
    },

    // dispatch(setVariantImages([{type: "Color" , value: "Blue" , images: ['url1']}]))
    setVariantImages: (state, action) => {
      state.variantImages = action.payload;
    },

    // dispatch(addNewVariantImages({value: "Blue" , new_images: ['url1']}))
    addNewVariantImages: (state, action) => {
      const { value, new_images } = action.payload;
      state.variantImages = state.variantImages.map((item) =>
        item.value === value
          ? { ...item, images: [...item.images, ...new_images] } // Return a new object with updated images
          : item
      );
    },

    // dispatch(removeVariantImage({value: "Blue" , remove_image: 'url1'}))
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
    // dispatch(addVariant())
    addVariant: (state) => {
      state.variants.push({
        id: state.variants.length,
        type: "",
        values: [],
      });
    },

    // dispatch(removeVariant({ id: 1 }))
    removeVariant: (state, action) => {
      state.variants = state.variants
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({ ...item, id: index }));
    },

    // dispatch(setVariantType({ id: 1, type: 'Size' }))
    setVariantType: (state, action) => {
      const { id, type } = action.payload;
      const variant = state.variants.find((v) => v.id === id);
      if (variant) {
        variant.type = type;
      }
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
  addVariant,
  removeVariant,
  setVariantType,
  addNewVariantImages,
  removeVariantImage,
} = variantSlice.actions;

export default variantSlice.reducer;
