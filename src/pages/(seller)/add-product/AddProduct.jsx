import { MantineProvider } from "@mantine/core";
import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import ProdPackages from "./components/ProdPackages";
import ProdPricing from "./components/ProdPricing";
import ProdBranchFeature from "./components/ProdBranchFeature";
import ProdInventory from "./components/ProdInventory";
import ProdSellingType from "./components/ProdSellingType";
import ProdImages from "./components/ProdImages";
import ProdSpecification from "./components/ProdSpecification";
import ProdVariants from "./components/ProdVariants";
import ProdVariantTable from "./components/ProdVariantTable";

const AddProduct = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1440px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 scrollBar">
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
      </div>
    </div>
  );
};

export default AddProduct;
