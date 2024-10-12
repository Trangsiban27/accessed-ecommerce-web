const getImagesForMatchingVariant = (selectedVariant, productVariants) => {
  if (!Array.isArray(productVariants)) {
    console.error("productVariants is not an array:", productVariants);
    return null;
  }

  for (const variant of productVariants) {
    let isMatch = true;

    const matchingOption = variant.variantOptions.find(
      (option) =>
        option.productType === selectedVariant.type &&
        option.valueName === selectedVariant.value
    );

    if (!matchingOption) {
      isMatch = false;
      break;
    }
    // for (const [type, value] of Object.entries(selectedVariant)) {
    // }

    if (isMatch) {
      return variant.images;
    }
  }

  return null;
};

export default getImagesForMatchingVariant;
