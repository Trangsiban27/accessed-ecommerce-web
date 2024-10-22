import * as yup from "yup";

// const SELLING_TYPES = ["ONLINE", "INSTORE", "BOTH"];
// const PACKAGE_UNITS = ["cm", "inch"];
const UNIT_WEIGHTS = ["kg", "g"];

// const specificationSchema = yup.object().shape({
//   name: yup.string().required("Tên thông số kỹ thuật là bắt buộc"),
//   value: yup.string().required("Giá trị thông số kỹ thuật là bắt buộc"),
// });

// const variantValueSchema = yup.object().shape({
//   name: yup.string().required("Tên biến thể là bắt buộc"),
//   values: yup
//     .array()
//     .of(yup.string())
//     .min(1, "Cần ít nhất một giá trị cho biến thể"),
// });

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter product name")
    .min(3, "Product name requires at least 3 characters"),

  description: yup
    .string()
    .required("Please enter product description")
    .min(200, "Description requires at least 200 characters"),

  category: yup.object().required("Please select a category"),

  brandName: yup.string().required("Please select a brand"),

  originalPrice: yup
    .number()
    .nullable()
    .positive("The mrsp price must be a positive number")
    .when("hasVariants", {
      is: false,
      then: (schema) => schema.required("Please enter the mrsp price"),
    }),

  sellingPrice: yup
    .number()
    .nullable()
    .positive("The price must be a positive number")
    .when("hasVariants", {
      is: false,
      then: (schema) => schema.required("Please enter the price"),
    })
    .test(
      "selling-price",
      "Price must be larger than mrsp price",
      function (value) {
        return (
          !value ||
          !this.parent.originalPrice ||
          value > this.parent.originalPrice
        );
      }
    ),

  quantityAvailable: yup
    .number()
    .nullable()
    .min(0, "Quantity must be a positive number")
    .when("hasVariants", {
      is: false,
      then: (schema) => schema.required("Please enter the quantity"),
    }),

  weight: yup
    .number()
    .nullable()
    .positive("Weight must be greater than 0")
    .required("Product weight is required"),

  unitWeight: yup
    .string()
    .oneOf(UNIT_WEIGHTS, "Invalid weight unit")
    .required("Weight unit is required"),

  length: yup.number().nullable().positive("Length must be greater than 0"),

  width: yup.number().nullable().positive("Width must be greater than 0"),

  height: yup.number().nullable().positive("Height must be greater than 0"),

  // packageUnit: yup
  //   .string()
  //   .oneOf(PACKAGE_UNITS, "Đơn vị kích thước không hợp lệ")
  //   .when(["length", "width", "height"], {
  //     is: (length, width, height) => length || width || height,
  //     then: (schema) =>
  //       schema.required("Đơn vị kích thước là bắt buộc khi có kích thước"),
  //   }),

  // primaryImage: yup.string().required("Ảnh chính của sản phẩm là bắt buộc"),

  // productImages: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "Phải có ít nhất một ảnh sản phẩm"),

  // specifications: yup
  //   .array()
  //   .of(specificationSchema)
  //   .when("hasSpecification", {
  //     is: true,
  //     then: (schema) => schema.min(1, "Phải có ít nhất một thông số kỹ thuật"),
  //   }),

  // variants: yup
  //   .array()
  //   .of(variantValueSchema)
  //   .when("hasVariants", {
  //     is: true,
  //     then: (schema) =>
  //       schema
  //         .min(1, "Phải có ít nhất một loại biến thể")
  //         .test(
  //           "variant-options",
  //           "Mỗi biến thể phải có ít nhất một giá trị",
  //           function (variants) {
  //             return (
  //               variants?.every((variant) => variant.values?.length > 0) ??
  //               false
  //             );
  //           }
  //         ),
  //   }),

  // variantOptionsTable: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       sku: yup.string().required("SKU là bắt buộc cho mỗi biến thể"),
  //       price: yup
  //         .number()
  //         .positive("Giá biến thể phải lớn hơn 0")
  //         .required("Giá là bắt buộc cho mỗi biến thể"),
  //       quantity: yup
  //         .number()
  //         .integer("Số lượng phải là số nguyên")
  //         .min(0, "Số lượng không được âm")
  //         .required("Số lượng là bắt buộc cho mỗi biến thể"),
  //     })
  //   )
  //   .when("hasVariants", {
  //     is: true,
  //     then: (schema) => schema.min(1, "Phải có ít nhất một tùy chọn biến thể"),
  //   }),
});
