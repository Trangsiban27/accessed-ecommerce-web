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
import { SPECIFICATIONS_GROUPS } from "../constants/specifications_groups";

const GROUP_ICONS = {
  SPECIFICATIONS: <IconDeviceLaptop size={22} />,
  CAMERA: <IconCamera size={22} />,
  DIMENSION: <IconRuler size={22} />,
};

const groupSpecificationForm = (specifications) => {
  const grouped = {};
  SPECIFICATIONS_GROUPS?.forEach(group => {
    grouped[group.group_name] = [];
  });
  specifications?.forEach(spec => {
    const group = SPECIFICATIONS_GROUPS?.find(group => 
      group.options.some(option => 
        option.toLowerCase() === spec.key.toLowerCase()
      )
    );
    if (group) {
      grouped[group.group_name].push(spec);
    } else {
      if (!grouped['OTHER']) {
        grouped['OTHER'] = [];
      }
      grouped['OTHER'].push(spec);
    }
  });
  return Object.entries(grouped).map(([groupName, specs]) => ({
    group_name: groupName,
    group_options: specs
  })).filter(group => group.group_options.length > 0);
};

const ProdSpecification = () => {
  const dispatch = useDispatch();
  const specifications = useSelector((state) => state.product.specifications);

  if(specifications.length === 0) return <></>

  const specificationFormData = groupSpecificationForm(specifications);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start mb-3">Specifications</p>
      <div className="rounded-lg h-full text-sm">
        {specificationFormData?.map((section, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="flex items-center justify-start p-1 px-0">
                {GROUP_ICONS[section.group_name] || <IconId size={22} />}
                <span className="font-medium text-[#212020] text-[15px] px-3 capitalize">
                  {section?.group_name.toLowerCase()}
                </span>
              </Box>
            </AccordionSummary>

            <Grid2 container spacing={2} className="px-3 mb-3">
              {section?.group_options.map((item, index) => (
                <Grid2 size={6} key={index}>
                  <p className="my-0 mb-1 text-[#212020] font-normal text-sm text-start capitalize">
                    {item?.key.toLowerCase()}
                  </p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    value={(specifications.find(spec => spec.key === item?.key).value) || ""}
                    onChange={(e) =>
                     dispatch(
                        setSpecificationField({ key: item?.key, value: e.target.value })
                      )}
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
