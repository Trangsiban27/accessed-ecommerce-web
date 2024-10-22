import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "./schema/schema";
import { productModel } from "../../../models/productModel";
import { MantineProvider } from "@mantine/core";
import {
  ProdBranchCollections,
  ProdCategory,
  ProdDescription,
  ProdImages,
  ProdInventory,
  ProdPackages,
  ProdPricing,
  ProdSellingType,
  ProdSpecification,
  ProdVariants,
  ProdVariantTable,
} from "./components";

const AddProduct = () => {
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productModel,
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col items-center justify-start w-full max-w-[1440px] h-full p-3 mx-auto">
          <div className="w-full h-full my-2 scrollBar">
            <div className="w-full flex items-start justify-center p-2 gap-3">
              <div className="w-1/2 flex flex-col items-center justify-start gap-4">
                <ProdCategory />
                <MantineProvider>
                  <ProdDescription />
                </MantineProvider>
                <ProdPackages />
                <ProdPricing />
              </div>
              <div className="w-1/2 flex flex-col items-center justify-start gap-4">
                <ProdBranchCollections />
                <ProdInventory />
                <ProdSellingType />
                <ProdImages />
                <ProdSpecification />
              </div>
            </div>
            <ProdVariants />
            <ProdVariantTable />

            {/* Action Buttons */}
            <div className="w-full flex items-center justify-end gap-3 px-4 my-[30px] mb-[10px]">
              <Button
                className="rounded-md capitalize"
                variant="outlined"
                onClick={() => methods.reset()}
                type="button"
              >
                Discard
              </Button>
              <Button
                className="rounded-md capitalize"
                variant="contained"
                type="submit"
              >
                {methods.formState.isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
