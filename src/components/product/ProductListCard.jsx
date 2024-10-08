import { ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";

const ProductListCard = ({ product }) => {
  const { id, title, category, price, quantity, image } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <ListItem
      className="flex flex-row gap-5 border border-gray-300 p-2.5 rounded w-4/5 mt-4 shadow-lg hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 hover:cursor-pointer text-start items-center"
      onClick={handleClick}
    >
      <img
        src={image || "https://placehold.co/80x80"}
        alt={title}
        className="w-[80px] h-[80px] object-cover rounded-[5px]"
      />
      <div>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          {title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {category}
        </Typography>
        <Typography variant="subtitle1">{price}</Typography>
        <Typography variant="subtitle1">Quantity: {quantity}</Typography>
      </div>
    </ListItem>
  );
};

export default ProductListCard;
