import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
} from "@mui/material";
import {
  IconDeviceMobile,
  IconCpu,
  IconBattery,
  IconBrandAndroid,
  IconBrandApple,
  IconDroplet,
  IconRuler,
  IconWeight,
  IconScreenShare,
  IconMicrophone,
  IconVolume,
  IconWifi,
  IconBluetooth,
  IconFingerprint,
  IconAntenna,
  IconHeadphones,
  IconBrightness,
  IconColorSwatch,
  IconPalette,
  IconShirt,
  IconMoodSmile,
  IconBook,
  IconDiamond,
} from "@tabler/icons-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconId, IconCamera, IconAugmentedReality } from "@tabler/icons-react";
import { constant_specifications } from "../../../../constants/constant_specification";
import { updateProductField } from "../../../../store/slices/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

export const PRODUCT_ICONS = {
  GENERAL: IconId,
  CAMERA: IconCamera,
  DIMENSION: IconAugmentedReality,
  DEVICE: IconDeviceMobile,
  PROCESSOR: IconCpu,
  BATTERY: IconBattery,
  ANDROID: IconBrandAndroid,
  APPLE: IconBrandApple,
  WATER_RESISTANCE: IconDroplet,
  SIZE: IconRuler,
  WEIGHT: IconWeight,
  DISPLAY: IconScreenShare,
  MICROPHONE: IconMicrophone,
  AUDIO: IconVolume,
  WIFI: IconWifi,
  BLUETOOTH: IconBluetooth,
  FINGERPRINT: IconFingerprint,
  ANTENNA: IconAntenna,
  HEADPHONES: IconHeadphones,
  BRIGHTNESS: IconBrightness,
  COLOR: IconColorSwatch,
  MATERIAL: IconPalette,
  CLOTHING: IconShirt,
  COMFORT: IconMoodSmile,
  BOOK: IconBook,
  JEWELRY: IconDiamond,
};

const IconComponent = (name) => {
  const Icon = PRODUCT_ICONS[name] || PRODUCT_ICONS.GENERAL;
  return <Icon size={20} />;
};

const ProdSpecification = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category);
  const specification = useSelector((state) => state.product.specification);
  const generateAccordionData = (category) => {
    const primaryCategory =
      category.level_1.name?.toUpperCase() ||
      category.level_2.name?.toUpperCase() ||
      "IPHONE";

    return Object.entries(constant_specifications[primaryCategory]).map(
      ([key, value]) => {
        return {
          title: key,
          icon: <IconComponent name={key} />,
          fields: value,
        };
      }
    );
  };

  const accordionData = generateAccordionData(category);
  const handleUpdateValues = (key, value) => {
    dispatch(
      updateProductField({
        field: "specification",
        value: { ...specification, [key]: value },
      })
    );
  };

  const renderFields = (fields) => (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field}>
          <p className="my-0 mb-1 text-[#797474] text-sm">{field}</p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            value={specification[field] || ""}
            onChange={(e) => handleUpdateValues(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Specifications</p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full text-sm">
        {accordionData.map((section, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="flex items-center justify-start p-1 px-0">
                {section.icon}
                <span className="font-medium text-[#797474] text-[15px] px-3 capitalize">
                  {section.title.toLowerCase()}
                </span>
              </Box>
            </AccordionSummary>
            <AccordionDetails>{renderFields(section.fields)}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default ProdSpecification;
