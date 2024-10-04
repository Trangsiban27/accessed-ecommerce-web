import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variantOptions: [],
  primaryVariantType: "",
  variantImages: [],
  variantOptionsTable: [],
};

export const VariantSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {
    addVariant: (state) => {
      state.variants = [
        ...state.variants,
        {
          id: state.variants.length,
          type: "",
          values: [],
        },
      ];
    },

    setVariantType: (state, action) => {
      const { id, new_type } = action.payload;
      state.variants = state.variants.map((item) =>
        item.id === id ? { ...item, type: new_type } : item
      );
    },

    setVariantValue: (state, action) => {
      const { id, new_value } = action.payload;
      state.variants = state.variants.map((item) =>
        item.id === id ? { ...item, values: [...item.values, new_value] } : item
      );
    },

    removeVariantValue: (state, action) => {
      const { id, remove_value } = action.payload;
      state.variants = state.variants.map((item) =>
        item.id === id
          ? {
              ...item,
              values: item.values.filter((item) => item !== remove_value),
            }
          : item
      );
    },

    initialVariants: (state, action) => {
      state.variants = action.payload.variants;
    },

    setPrimaryVariant: (state, action) => {
      state.primaryVariant = action.payload.variant;
    },

    removeVariant: (state, action) => {
      state.variants = state.variants
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({ ...item, id: index }));
    },

    initializeCombinations: (state, action) => {
      state.variants = action.payload;
      const variants = action.payload.reduce((acc, variant) => {
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

      const allCombinations = generateCombinations(Object.values(variants));

      state.variantOptionsTable = allCombinations.map((combination) => {
        const combinationObject = {
          price: 0,
          salePrice: 0,
          quantity: 0,
          mrspPrice: 0,
          sku: "",
        };
        Object.keys(variants).forEach((key, index) => {
          combinationObject[key] = combination[index];
        });
        return combinationObject;
      });
    },

    updateCombinationFieldValue: (state, action) => {
      const { index, field, value } = action.payload;
      if (
        field === "price" ||
        field === "salePrice" ||
        field === "mrspPrice" ||
        field === "quantity"
      ) {
        state.variantOptionsTable[index][field] = Number(value);
      } else {
        state.variantOptionsTable[index][field] = value;
      }
    },

    updateCombinationBaseValues: (state, action) => {
      const { price, salePrice, quantity, mrspPrice, sku } = action.payload;
      state.variantOptionsTable = state.variantOptionsTable.map((item) => ({
        ...item,
        price,
        salePrice,
        quantity,
        mrspPrice,
        sku,
      }));
    },

    updateVariantImages: (state, action) => {
      state.variantWithImages = action.payload.variantImages;
    },
  },
});

export const {
  addVariant,
  removeVariant,
  setVariantType,
  setPrimaryVariant,
  setVariantValue,
  removeVariantValue,
  updateVariantImages,
  updateCombinationBaseValues,
  initializeCombinations,
  updateCombinationFieldValue,
  initialVariants,
} = VariantSlice.actions;
