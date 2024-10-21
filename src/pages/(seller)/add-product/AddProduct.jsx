import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useSelector } from "react-redux";
import { productSchema } from "./schema";
import { productModel } from "../../../models/productModel";

import ProdCategory from "./components/ProdCategory";
import ProdDescription from "./components/ProdDescription";
import { MantineProvider } from "@mantine/core";
// import ProdPackages from "./components/ProdPackages";
// import ProdPricing from "./components/ProdPricing";
// import ProdBranchFeature from "./components/ProdBranchFeature";
// import ProdInventory from "./components/ProdInventory";
// import ProdSellingType from "./components/ProdSellingType";
// import ProdImages from "./components/ProdImages";
// import ProdSpecification from "./components/ProdSpecification";
// import ProdVariants from "./components/ProdVariants";
// import ProdVariantTable from "./components/ProdVariantTable";

const AddProduct = () => {
  // Typed selector
  // const product = useSelector((state) => state.product);

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productModel,
    mode: "onSubmit",
  });

  // const onSubmit = async (data) => {
  //   try {
  //     console.log("Form data:", data);
  //     console.log("Product data:", product);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-start w-full max-w-[1440px] h-full p-3 mx-auto">
        <div className="w-full h-full my-2 scrollBar">
          <div className="w-full flex items-start justify-center p-2 gap-3">
            {/* Left Column */}
            <div className="w-1/2 flex flex-col items-center justify-start gap-4">
              <ProdCategory />
              <MantineProvider>
                <ProdDescription />
              </MantineProvider>
              {/*  <ProdPackages />
              <ProdPricing /> */}
            </div>

            {/* Right Column */}
            <div className="w-1/2 flex flex-col items-center justify-start gap-4">
              {/* <ProdBranchFeature />
              <ProdInventory />
              <ProdSellingType />
              <ProdImages />
              <ProdSpecification /> */}
            </div>
          </div>

          {/* <ProdVariants />
          <ProdVariantTable /> */}

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-end gap-3 px-4 my-[30px] mb-[10px]">
            <Button
              className="rounded-md capitalize"
              variant="outlined"
              onClick={() => methods.reset()}
            >
              Discard
            </Button>
            <Button
              className="rounded-md capitalize"
              variant="contained"
              onClick={() => console.log(methods.getValues())}
            >
              {methods.formState.isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddProduct;
