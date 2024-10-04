import { useCallback } from "react";
import { Box, Button } from "@mui/material";
import { MantineProvider } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { createProduct, uploadImageProduct } from "../../../api/ProductApi";
import { toast } from "../../../utils/Toastify";
import CustomDialog from "../../../components/CustomDialog";
import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import ProdPackages from "./components/ProdPackages";
import ProdSellingType from "./components/ProdSellingType";
import ProdInventory from "./components/ProdInventory";
import ProdVariantTable from "./components/ProdVariantTable";
import ProdVariants from "./components/ProdVariants";
import ProdImages from "./components/ProdImages";
import ProdBranchFeature from "./components/ProdBranchFeature";
import ProdSpecification from "./components/ProdSpecification";
import ProdPricing from "./components/ProdPricing";
import { resetProductData } from "../../../store/slices/ProductSlice";

const SubHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-start gap-3 px-5">
      <CustomDialog
        onCancel={() => {}}
        onAccept={() => navigate("/products")}
        title="Confirm Action"
        content="Are you sure you want to return to the product list?"
      >
        <div className="m-0">
          <Box className="rounded-lg w-[50px] h-[50px] flex items-center justify-center border-[2px] border-solid border-gray-400 px-0">
            <IconArrowLeft size={25} color="gray" />
          </Box>
        </div>
      </CustomDialog>
      <div>
        <p className="text-[gray] my-1 text-sm">Back to product list</p>
        <p className="font-medium text-xl my-0">Add New Product</p>
      </div>
    </div>
  );
};

const ActionButtons = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector((state) => state.product);
  const variants = useAppSelector((state) => state.variants.variants);
  const primary_variant = useAppSelector(
    (state) => state.variants.primaryVariant
  );
  const variants_table = useAppSelector(
    (state) => state.variants.combineVariantsTable
  );
  const variantImages = useAppSelector(
    (state) => state.variants.variantWithImages
  );

  const prepareProductPayload = useCallback(() => {
    const variantsPayload = variants_table.map((variant) => {
      const variantOptions = Object.entries(variant)
        .filter(
          ([key]) =>
            !["quantity", "price", "salePrice", "sku", "mrspPrice"].includes(
              key
            )
        )
        .map(([variantTypes, value]) => ({
          variantTypes,
          value: String(value),
        }));

      const imageUrls = variantImages
        .find((item) => item.value === variant[primary_variant])
        ?.images.map((it) => it.url);

      return {
        quantityAvailable: variant.quantity,
        price: variant.price,
        salePrice: variant.salePrice,
        sku: variant.sku,
        mrsp: variant.mrspPrice,
        imageURLs: imageUrls,
        variantOptions,
      };
    });

    const optionsPayload = variants.reduce((acc, item) => {
      acc[item.type] = item.values;
      return acc;
    }, {});

    const collectionsPayload = product.collections.map((item) => item.id);

    return {
      name: product.name,
      imageURL: null,
      primaryImageURL: null,
      description: product.description,
      brandName: product.brand,
      sellingTypes: product.sellingType,
      quantityAvailable: product.inventory.quantity,
      price: product?.pricing.price || 0,
      salePrice: product?.pricing.sale_price || 0,
      mrsp: product?.pricing.mrsp || 0,
      sku: product.inventory.sku,
      hasCollection: collectionsPayload?.length > 0,
      collections: collectionsPayload,
      categories: [
        product.category.level_1?.index,
        product.category.level_2?.index,
      ].filter(Boolean),
      dimensions: {
        weight: product?.packages_weight,
        length: product?.packages_size.length,
        width: product?.packages_size.width,
        height: product?.packages_size.height,
      },
      specification: product?.specification,
      hasVariants: product?.hasVariants,
      options: optionsPayload,
      variants: variantsPayload,
    };
  }, [product, variants, primary_variant, variants_table, variantImages]);

  const uploadImages = useCallback(
    async (productId) => {
      const tempImages = product.primaryImage
        ? [
            product.primaryImage,
            ...product.images.filter((item) => item !== product.primaryImage),
          ]
        : product.images;

      const productImages = new FormData();
      tempImages.forEach((image) => {
        productImages.append("file", image.file);
        URL.revokeObjectURL(image.url);
      });

      return await uploadImageProduct(productId, productImages);
    },
    [product.primaryImage, product.images]
  );

  const handleAddNewProduct = useCallback(async () => {
    try {
      const payload = prepareProductPayload();
      const response_data = await createProduct(payload);

      if (response_data.id) {
        toast.success("New product added successfully");
        const s3_response_data = await uploadImages(response_data.id);

        if (s3_response_data.id) {
          toast.success("Image of new product saved successfully");
          setTimeout(() => navigate("/products"), 1000);
        }
      }
    } catch (error) {
      console.error(
        "Failed to create product:",
        error instanceof Error ? error.message : String(error)
      );
      toast.error("Failed to create product. Please try again.");
    }
  }, [prepareProductPayload, uploadImages, navigate]);

  const handleDiscardAddProduct = useCallback(() => {
    dispatch(resetProductData());
  }, [dispatch]);

  return (
    <div className="w-full items-center justify-end gap-3 flex px-4 my-[30px] mb-[10px]">
      <CustomDialog
        onCancel={() => {}}
        onAccept={handleDiscardAddProduct}
        title="Confirm Action"
        content="Are you sure you want to discard this product?"
      >
        <Button className="rounded-md capitalize" variant="outlined">
          Discard
        </Button>
      </CustomDialog>
      <Button
        className="rounded-md capitalize"
        variant="contained"
        onClick={handleAddNewProduct}
      >
        Add Product
      </Button>
    </div>
  );
};

const AddProduct = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1600px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 scrollBar">
        <SubHeader />
        <div className="w-full flex items-start justify-center p-2 gap-3">
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdCategory />
            <MantineProvider>
              <ProdDescription />
            </MantineProvider>
            <ProdPackages />
            <ProdPricing />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdBranchFeature />
            <ProdInventory />
            <ProdSellingType />
            <ProdImages />
            <ProdSpecification />
          </div>
        </div>
        <ProdVariants />
        <ProdVariantTable />
        <ActionButtons />
      </div>
    </div>
  );
};

export default AddProduct;
