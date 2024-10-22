import { Box, Button } from "@mui/material";
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
  ProdVariantImages,
  ProdVariants,
  ProdVariantTable,
} from "./components";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

const AddProduct = () => {
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productModel,
    mode: "onSubmit",
  });
  const [tabIndex, setTabIndex] = useState(1);
  const handleChangeTabIndex = (e, new_value) => setTabIndex(new_value);

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
            <TabContext value={tabIndex}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTabIndex}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Basic Info" value="1" />
                  <Tab label="Details Info" value="2" />
                  <Tab label="Product Variant" value="3" />
                  <Tab label="Product Images" value="4" />
                  <Tab label="Shipping" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="w-full flex items-start justify-center gap-3">
                  <div className="w-1/2 flex flex-col items-center justify-start gap-4">
                    <ProdCategory />
                    <ProdPricing />
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-start gap-4">
                    <ProdBranchCollections />
                    <ProdSellingType />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <MantineProvider>
                  <ProdDescription />
                </MantineProvider>
                <ProdSpecification />
              </TabPanel>
              <TabPanel value="3">
                <ProdVariants />
                <ProdVariantTable />
              </TabPanel>
              <TabPanel value="4">
                <ProdImages />
                <ProdVariantImages />
              </TabPanel>
              <TabPanel value="5">
                <ProdInventory />
                <ProdPackages />
              </TabPanel>
            </TabContext>

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
