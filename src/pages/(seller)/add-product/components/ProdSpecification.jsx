import {
  IconCamera,
  IconDeviceLaptop,
  IconId,
  IconRuler,
} from "@tabler/icons-react";
import { PRODUCT_SPECIFICATIONS } from "../../../../constants/constant_specification";
import {
  Accordion,
  AccordionSummary,
  TextField,
  Box,
  Grid2,
} from "@mui/material";
import { updateSpecification } from "../../../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SECTION_ICONS = {
  SPECIFICATION: <IconDeviceLaptop size={22} />,
  CAMERA: <IconCamera size={22} />,
  DIMENSION: <IconRuler size={22} />,
};

const ProdSpecification = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const specifications = useSelector((state) => state.product.specifications);

  console.log(categories);

  const generateAccordionData = () => {
    const primaryCategory =
      categories[1]?.name?.toUpperCase() ||
      categories[0]?.name?.toUpperCase() ||
      "IPHONE";

    console.log(primaryCategory);

    return Object.entries(PRODUCT_SPECIFICATIONS[primaryCategory]).map(
      ([key, value]) => {
        return {
          title: key,
          icon: SECTION_ICONS[key] || <IconId size={22} />,
          fields: value,
        };
      }
    );
  };

  const accordionData = generateAccordionData();

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start mb-3">Specifications</p>
      <div className="rounded-lg h-full text-sm">
        {accordionData?.map((section, index) => (
          <Accordion key={index} className="pb-3">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="flex items-center justify-start p-1 px-0">
                {section?.icon}
                <span className="font-medium text-[#212020] text-[15px] px-3 capitalize">
                  {section?.title.toLowerCase()}
                </span>
              </Box>
            </AccordionSummary>

            <Grid2 container spacing={2} className="px-3 mb-2">
              {section?.fields.map((field) => (
                <Grid2 size={6} key={field}>
                  <p className="my-0 mb-1 text-[#212020] text-sm text-start capitalize">
                    {field}
                  </p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={(specifications && specifications[field]) || ""}
                    onChange={(e) =>
                      dispatch(
                        updateSpecification({
                          name: field,
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </Grid2>
              ))}
            </Grid2>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default ProdSpecification;
