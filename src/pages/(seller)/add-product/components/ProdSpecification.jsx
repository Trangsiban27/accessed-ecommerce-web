import {
  Accordion,
  AccordionSummary,
  TextField,
  Box,
  Grid2,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconCamera,
  IconDeviceLaptop,
  IconId,
  IconRuler,
} from "@tabler/icons-react";
import { setSpecificationField } from "../../../../store/slices/productSlice";
import { PRODUCT_SPECIFICATIONS } from "../../../../constants/constant_specification";

const SECTION_ICONS = {
  SPECIFICATION: <IconDeviceLaptop size={22} />,
  CAMERA: <IconCamera size={22} />,
  DIMENSION: <IconRuler size={22} />,
};

function generateSpecificationForm(categories) {
  const primaryCategory =
    categories[1]?.name?.toUpperCase() ||
    categories[0]?.name?.toUpperCase() ||
    "IPHONE";

  return Object.entries(PRODUCT_SPECIFICATIONS[primaryCategory]).map(
    ([key, value]) => {
      return {
        title: key,
        fields: value,
      };
    }
  );
}

const ProdSpecification = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const specifications = useSelector((state) => state.product.specifications);
  const specificationAccordion = generateSpecificationForm(categories);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start mb-3">Specifications</p>
      <div className="rounded-lg h-full text-sm">
        {specificationAccordion?.map((section, index) => (
          <Accordion key={index} className="pb-3">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="flex items-center justify-start p-1 px-0">
                {SECTION_ICONS[section.title] || <IconId size={22} />}
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
                        setSpecificationField({ field, value: e.target.value })
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