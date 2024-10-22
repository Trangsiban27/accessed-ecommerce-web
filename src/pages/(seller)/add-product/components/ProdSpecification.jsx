import {
  Accordion,
  AccordionSummary,
  TextField,
  Box,
  Grid2,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconCamera,
  IconDeviceLaptop,
  IconId,
  IconRuler,
} from "@tabler/icons-react";
import { SPECIFICATIONS_GROUPS } from "../constants/specifications_groups";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const GROUP_ICONS = {
  SPECIFICATIONS: <IconDeviceLaptop size={22} />,
  CAMERA: <IconCamera size={22} />,
  DIMENSION: <IconRuler size={22} />,
};

const groupSpecificationForm = (specifications) => {
  const grouped = {};
  SPECIFICATIONS_GROUPS?.forEach((group) => {
    grouped[group.group_name] = [];
  });
  specifications?.forEach((spec) => {
    const group = SPECIFICATIONS_GROUPS?.find((group) =>
      group.options.some(
        (option) => option.toLowerCase() === spec.key.toLowerCase()
      )
    );
    if (group) {
      grouped[group.group_name].push(spec);
    } else {
      if (!grouped["OTHER"]) {
        grouped["OTHER"] = [];
      }
      grouped["OTHER"].push(spec);
    }
  });
  return Object.entries(grouped)
    .map(([groupName, specs]) => ({
      group_name: groupName,
      group_options: specs,
    }))
    .filter((group) => group.group_options.length > 0);
};

const ProdSpecification = () => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: "specifications",
  });

  if (fields.length === 0)
    return (
      <>
        <p className="font-medium text-lg text-start mb-3 px-3">
          Specifications
        </p>
        <Alert severity="info" className="mt-4 mx-3">
          No specifications available. They will be loaded based on the selected
          product category.
        </Alert>
      </>
    );

  const specificationFormData = groupSpecificationForm(fields);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start mb-3">Specifications</p>
      <div className="rounded-lg h-full text-sm">
        {specificationFormData?.map((section, sectionIndex) => (
          <Accordion key={sectionIndex} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="flex items-center justify-start p-1 px-0">
                {GROUP_ICONS[section.group_name] || <IconId size={22} />}
                <span className="font-medium text-[#212020] text-[15px] px-3 capitalize">
                  {section?.group_name.toLowerCase()}
                </span>
              </Box>
            </AccordionSummary>

            <Grid2 container spacing={2} className="px-3 mb-3">
              {section?.group_options.map((item, itemIndex) => {
                const fieldIndex = fields.findIndex(
                  (field) => field.key === item.key
                );
                return (
                  <Grid2 item size={6} key={itemIndex}>
                    <p className="my-0 mb-1 text-[#212020] font-normal text-sm text-start capitalize">
                      {item?.key.toLowerCase()}
                    </p>
                    <Controller
                      name={`specifications.${fieldIndex}.value`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                          size="small"
                          error={!!error}
                          helperText={error ? "This field is required" : ""}
                        />
                      )}
                    />
                  </Grid2>
                );
              })}
            </Grid2>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default ProdSpecification;
