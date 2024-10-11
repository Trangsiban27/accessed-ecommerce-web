import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PropTypes from "prop-types";
import capitalizeFirstLetter from "../../../../../../utils/FormatString";

const ProductSpecification = ({ specifications = [] }) => {
  return (
    <div className="mt-10">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="font-bold"
        >
          <AccountTreeIcon></AccountTreeIcon>
          <span className="ml-3">Specification</span>
        </AccordionSummary>
        <AccordionDetails>
          {specifications.length > 0 &&
            specifications?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full py-3 border-b border-gray-200 gap-x-5 last:border-0"
              >
                <p className="w-[10%] text-start font-semibold">
                  {capitalizeFirstLetter(item.name)}:{" "}
                </p>
                <span className="w-full w-[90%] text-ellipsis overflow-hidden">
                  {item.value}
                </span>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

ProductSpecification.propTypes = {
  specifications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductSpecification;
