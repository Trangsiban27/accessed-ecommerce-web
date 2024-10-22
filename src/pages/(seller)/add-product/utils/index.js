export const generateVariantOptionsTable = (variants) => {
  console.log("generate variants table", variants);
  const variantTypes = variants.reduce((acc, variant) => {
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

  return allCombinations.map((combination) => {
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
};
