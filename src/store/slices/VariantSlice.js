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
    // Payload: { variants: Array<Variant> }
    // Ví dụ: dispatch(setInitialVariants({ variants: [{id: 1, type: 'Color', values: ['Red', 'Blue']}] }))
    setInitialVariants: (state, action) => {
      state.variants = action.payload.variants;
    },

    // Payload: { type: string }
    // Ví dụ: dispatch(setPrimaryVariantType({ type: 'Color' }))
    setPrimaryVariantType: (state, action) => {
      state.primaryVariantType = action.payload.type;
    },

    // Payload: { variantId: number, value: string }
    // Ví dụ: dispatch(addVariantValue({ variantId: 1, value: 'Green' }))
    addVariantValue: (state, action) => {
      const { variantId, value } = action.payload;
      const variant = state.variants.find((v) => v.id === variantId);
      if (variant) {
        variant.values.push(value);
      }
    },

    // Payload: { variantId: number, value: string }
    // Ví dụ: dispatch(removeVariantValue({ variantId: 1, value: 'Green' }))
    removeVariantValue: (state, action) => {
      const { variantId, value } = action.payload;
      const variant = state.variants.find((v) => v.id === variantId);
      if (variant) {
        variant.values = variant.values.filter((v) => v !== value);
      }
    },

    // Payload: Không có
    // Ví dụ: dispatch(generateVariantOptionsTable())
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
          price: 0,
          salePrice: 0,
          quantity: 0,
          mrpPrice: 0,
          sku: "",
        };
        Object.keys(variantTypes).forEach((key, index) => {
          combinationObject[key] = combination[index];
        });
        return combinationObject;
      });
    },

    // Payload: { index: number, field: string, value: any }
    // Ví dụ: dispatch(updateVariantOptionField({ index: 0, field: 'price', value: 100 }))
    updateVariantOptionField: (state, action) => {
      const { index, field, value } = action.payload;
      state.variantOptionsTable[index][field] = value;
    },

    // Payload: { price: number, salePrice: number, quantity: number, mrpPrice: number, sku: string }
    // Ví dụ: dispatch(updateAllVariantOptionBaseValues({ price: 100, salePrice: 90, quantity: 50, mrpPrice: 110, sku: 'SKU123' }))
    updateAllVariantOptionBaseValues: (state, action) => {
      const { price, salePrice, quantity, mrpPrice, sku } = action.payload;
      state.variantOptionsTable = state.variantOptionsTable.map((item) => ({
        ...item,
        price,
        salePrice,
        quantity,
        mrpPrice,
        sku,
      }));
    },

    // Payload: { variantImages: Array<string> }
    // Ví dụ: dispatch(setVariantImages({ variantImages: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] }))
    setVariantImages: (state, action) => {
      state.variantImages = action.payload.variantImages;
    },

    // Payload: Không có
    // Ví dụ: dispatch(addVariant())
    addVariant: (state) => {
      state.variants.push({
        id: state.variants.length,
        type: "",
        values: [],
      });
    },

    // Payload: { id: number }
    // Ví dụ: dispatch(removeVariant({ id: 1 }))
    removeVariant: (state, action) => {
      state.variants = state.variants
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({ ...item, id: index }));
    },

    // Payload: { id: number, type: string }
    // Ví dụ: dispatch(setVariantType({ id: 1, type: 'Size' }))
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
} = variantSlice.actions;

export default variantSlice.reducer;
