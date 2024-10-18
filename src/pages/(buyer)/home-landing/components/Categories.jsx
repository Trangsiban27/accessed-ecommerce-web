import React, { useEffect, useState } from "react";
import * as MaterialIcons from "@mui/icons-material"; // Import tất cả các icon
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Icon mặc định
import icon from "../../../../assets/smartphone-svgrepo-com.png";
import { Typography } from "@mui/material";
import { getLevel1Categories } from "../../../../services/categoryServices";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setIsLoading(true);
        const res = await getLevel1Categories();

        setCategory(res.data.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getCategory();
  }, []);

  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-5">
        <Typography variant="h5" sx={{ fontWeight: "600" }}>
          Our Top Categories
        </Typography>
        <button className="no-underline text-base font-medium">See All</button>
      </div>
      <div className="flex justify-between flex-wrap">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          category.slice(0, 10).map((item) => (
            <div
              className="flex flex-col justify-center items-center"
              style={{ margin: "10px" }}
            >
              <div className="bg-slate-200 rounded-full flex justify-center items-center text-xl cursor-pointer p-3 mb-2 w-20 h-20 hover:bg-gray-100">
                <img
                  src={item.icon}
                  alt="image"
                  className="object-cover w-2/3 h-2/3"
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-center">
                {item.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
