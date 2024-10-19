import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";

const ReviewItem = () => {
  return (
    <div className="w-full p-5 mt-5 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <div>
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} fontSize="10" sx={{ color: "#f9639b" }} />
          ))}
        </div>
        <span className="font-semibold">Sep 5, 2024</span>
      </div>
      <div className="w-full mt-6">
        <Typography
          variant="subtitle1"
          gutterBottom
          className=" text-start"
          sx={{ fontWeight: "600" }}
        >
          Sinbad
        </Typography>
        <Typography variant="body1" gutterBottom className=" text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ducimus
          quaerat consectetur, autem animi dolor, doloribus ab perferendis, et
          nesciunt cumque. Porro obcaecati enim quod impedit animi deleniti ut
          magnam.
        </Typography>
      </div>
      <ul className="mt-8">
        <li className="flex items-center justify-between px-2 py-4 border-b border-gray-100 last:border-0">
          <Typography
            variant="subtitle1"
            gutterBottom
            className=" text-start"
            sx={{ fontWeight: "500" }}
          >
            Shipping
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className=" text-start"
            sx={{ fontWeight: "500" }}
          >
            Yes
          </Typography>
        </li>
        <li className="flex items-center justify-between px-2 py-4 border-b border-gray-100 last:border-0">
          <Typography
            variant="subtitle1"
            gutterBottom
            className=" text-start"
            sx={{ fontWeight: "500" }}
          >
            Shipping
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className=" text-start"
            sx={{ fontWeight: "500" }}
          >
            Yes
          </Typography>
        </li>
      </ul>
    </div>
  );
};

export default ReviewItem;
