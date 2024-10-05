import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const ProductSpecification = () => {
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
          <div className="flex justify-start w-full py-3 border-b border-gray-200 gap-x-5 last:border-0">
            <p className="w-[10%] text-start font-semibold">Display: </p>
            <span className="w-full max-w-[90%] text-ellipsis overflow-hidden">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </div>
          <div className="flex justify-start w-full py-3 border-b border-gray-200 gap-x-5 last:border-0">
            <p className="w-[10%] text-start font-semibold">Display: </p>
            <span className="w-full max-w-[90%] text-ellipsis overflow-hidden">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </div>
          <div className="flex justify-start w-full py-3 border-b border-gray-200 gap-x-5 last:border-0">
            <p className="w-[10%] text-start font-semibold">Display: </p>
            <span className="w-full max-w-[90%] text-ellipsis overflow-hidden">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductSpecification;
