// export const

import { PRODUCT_VARIANTS } from "../constants/constant_variants";
import {
  addNewVariantImages,
  addVariantValue,
  generateVariantOptionsTable,
  removeVariantImage,
  removeVariantValue,
  setInitialVariants,
  setPrimaryVariantType,
  setVariantImages,
  updateAllVariantOptionBaseValues,
  updateVariantOptionField,
} from "../store/slices/variantsSlice";

export function addProductVariantValue(dispatch, type, value) {
  dispatch(addVariantValue({ type, value: value.trim() }));
}

export function removeProductVariantValue(dispatch, type, value) {
  return dispatch(removeVariantValue({ type, value: value.trim() }));
}

export function generateProductVariantOptionsTable(dispatch) {
  return dispatch(generateVariantOptionsTable());
}

export function updateProductVariantOptionField(dispatch, index, field, value) {
  return dispatch(updateVariantOptionField({ index, field, value }));
}

export function updateAllProductVariantOptionBaseValues(dispatch, baseValues) {
  return dispatch(updateAllVariantOptionBaseValues(baseValues));
}

export function updatePrimaryVariantType(dispatch, type) {
  dispatch(setPrimaryVariantType(type));
  dispatch(generateVariantOptionsTable());
}

export function initialProductVariantImages(dispatch, type, values) {
  return dispatch(
    setVariantImages(
      values?.map((item) => ({
        type,
        value: item,
        images: [],
      }))
    )
  );
}

export function removeProductVariantImage(dispatch, value, remove_image) {
  dispatch(
    removeVariantImage({
      value,
      remove_image,
    })
  );
}

export function addProductVariantImage(dispatch, value, new_images) {
  dispatch(
    addNewVariantImages({
      value,
      new_images,
    })
  );
}

export function initialProductVariantsByCategory(dispatch, categories) {
  const primaryCategory =
    categories[1]?.name?.toUpperCase() ||
    categories[0]?.name?.toUpperCase() ||
    "BOOK";

  const productVariant = PRODUCT_VARIANTS.find(
    (item) => item.name.toUpperCase() === primaryCategory
  );

  dispatch(setInitialVariants({ variants: productVariant.default_variants }));
  dispatch(
    setPrimaryVariantType({
      primaryVariant: productVariant.default_variants[0].type,
    })
  );
}
