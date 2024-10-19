import { PRODUCT_SPECIFICATIONS } from "../constants/constant_specification";
import {
  addProductImages,
  removeProductImage,
  replaceProductImage,
  setProductField,
  setSpecificationField,
} from "../store/slices/productSlice";

let server_response = PRODUCT_SPECIFICATIONS;

export function updateProductField(dispatch, field, value) {
  return dispatch(setProductField({ field, value }));
}

export function updateProductSpecification(dispatch, field, value) {
  return dispatch(setSpecificationField({ field, value }));
}

export function dropNewProductImage(dispatch, productImages, acceptedFiles) {
  const maxFiles = 10;
  const totalFiles = productImages.length + acceptedFiles.length;

  if (totalFiles > maxFiles) {
    const filesToAdd = maxFiles - productImages.length;
    acceptedFiles = acceptedFiles.slice(0, filesToAdd);
  }

  const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
  dispatch(addProductImages(newImages));
  dispatch(
    setProductField({
      field: "primaryImage",
      value: productImages.length > 0 ? productImages[0] : newImages[0],
    })
  );
}

export function addNewProducImages(dispatch, productImages, acceptedFiles) {
  if (!acceptedFiles) return;
  const maxFiles = 10;
  const totalFiles = productImages.length + acceptedFiles.length;

  if (totalFiles > maxFiles) {
    const filesToAdd = maxFiles - productImages.length;
    acceptedFiles = acceptedFiles.slice(0, filesToAdd);
  }
  const newFiles = Array.from(acceptedFiles).map((file) =>
    URL.createObjectURL(file)
  );
  dispatch(addProductImages(newFiles));
}

export function removeProductPrimaryImage(
  dispatch,
  primaryImage,
  productImages
) {
  dispatch(removeProductImage(primaryImage));
  dispatch(
    setProductField({
      field: "primaryImage",
      value: productImages.length > 0 ? productImages[0] : "",
    })
  );
}

export function replaceProductPrimaryImage(dispatch, image) {
  dispatch(replaceProductImage(image));
}

export function generateSpecificationForm(categories) {
  const primaryCategory =
    categories[1]?.name?.toUpperCase() ||
    categories[0]?.name?.toUpperCase() ||
    "IPHONE";

  return Object.entries(server_response[primaryCategory]).map(
    ([key, value]) => {
      return {
        title: key,
        fields: value,
      };
    }
  );
}
