import * as yup from "yup";

// const SELLING_TYPES = ["ONLINE", "INSTORE", "BOTH"];
// const PACKAGE_UNITS = ["cm", "inch"];
// const UNIT_WEIGHTS = ["kg", "g"];

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
    .required("Tên sản phẩm là bắt buộc")
    .min(3, "Tên sản phẩm phải có ít nhất 3 ký tự"),

  description: yup
    .string()
    .required("Mô tả sản phẩm là bắt buộc")
    .min(10, "Mô tả phải có ít nhất 10 ký tự"),

  category: yup.object().required("Please select a category"),

  brandName: yup.string().required("Tên thương hiệu là bắt buộc"),

  // sellingType: yup
  //   .string()
  //   .oneOf(SELLING_TYPES, "Loại bán hàng không hợp lệ")
  //   .required("Loại bán hàng là bắt buộc"),

  // hasVariants: yup.boolean().required(),

  // originalPrice: yup
  //   .number()
  //   .positive("Giá gốc phải lớn hơn 0")
  //   .when("hasVariants", {
  //     is: false,
  //     then: (schema) => schema.required("Giá gốc là bắt buộc"),
  //   }),

  // sellingPrice: yup
  //   .number()
  //   .positive("Giá bán phải lớn hơn 0")
  //   .when("hasVariants", {
  //     is: false,
  //     then: (schema) => schema.required("Giá bán là bắt buộc"),
  //   })
  //   .test(
  //     "selling-price",
  //     "Giá bán không được lớn hơn giá gốc",
  //     function (value) {
  //       return (
  //         !value ||
  //         !this.parent.originalPrice ||
  //         value <= this.parent.originalPrice
  //       );
  //     }
  //   ),

  quantityAvailable: yup
    .integer("Số lượng phải là số nguyên")
    .min(0, "Số lượng không được âm")
    .when("hasVariants", {
      is: false,
      then: (schema) => schema.required("Số lượng là bắt buộc"),
    }),

  // weight: yup
  //   .number()
  //   .positive("Cân nặng phải lớn hơn 0")
  //   .required("Cân nặng sản phẩm là bắt buộc"),

  // unitWeight: yup
  //   .string()
  //   .oneOf(UNIT_WEIGHTS, "Đơn vị cân nặng không hợp lệ")
  //   .required("Đơn vị cân nặng là bắt buộc"),

  // length: yup.number().positive("Chiều dài phải lớn hơn 0"),

  // width: yup.number().positive("Chiều rộng phải lớn hơn 0"),

  // height: yup.number().positive("Chiều cao phải lớn hơn 0"),

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

  collections: yup.array().of(yup.object()),

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
