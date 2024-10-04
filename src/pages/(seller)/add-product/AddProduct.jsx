import { MantineProvider } from "@mantine/core";

import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const product = useSelector((state) => state.product);

  console.log(product);
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1440px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 scrollBar">
        {/* <SubHeader /> */}
        <div className="w-full flex items-start justify-center p-2 gap-3">
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdCategory />
            <MantineProvider>
              <ProdDescription />
            </MantineProvider>
            {/* <ProdPackages /> */}
            {/* <ProdPricing /> */}
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            {/* <ProdBranchFeature />
            <ProdInventory />
            <ProdSellingType />
            <ProdImages />
            <ProdSpecification /> */}
          </div>
        </div>
        {/* <ProdVariants />
        <ProdVariantTable />
        <ActionButtons /> */}
      </div>
    </div>
  );
};

export default AddProduct;
