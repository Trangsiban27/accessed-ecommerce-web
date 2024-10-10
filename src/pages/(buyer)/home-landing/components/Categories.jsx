import React, { useEffect, useState } from "react";
import * as MaterialIcons from "@mui/icons-material"; // Import tất cả các icon
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Icon mặc định
import icon from "../../../../assets/smartphone-svgrepo-com.png";
import { Typography } from "@mui/material";

function Categories() {
  const [categories, setCategories] = useState([]); // Lưu trữ danh sách danh mục
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Lưu trữ lỗi nếu có

  // Hàm để lấy component icon dựa trên tên icon
  const getIconComponent = (iconName) => {
    // Kiểm tra nếu iconName không phải là chuỗi, trả về icon mặc định
    if (typeof iconName !== "string") {
      return <HelpOutlineIcon />;
    }

    // Loại bỏ hậu tố 'Icon' nếu có
    const formattedIconName = iconName.endsWith("Icon")
      ? iconName.slice(0, -4)
      : iconName;

    // Lấy component icon từ MaterialIcons
    const IconComponent = MaterialIcons[formattedIconName];

    // Trả về component icon nếu tồn tại, ngược lại trả về icon mặc định
    return IconComponent ? (
      <IconComponent style={{ fontSize: 35 }} />
    ) : (
      <HelpOutlineIcon style={{ fontSize: 35 }} />
    );
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://be-ecommerce-gaa8.onrender.com/api/v1/categories"
  //         ); // Endpoint để lấy tất cả danh mục

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const responseJson = await response.json();
  //         console.log("Fetched categories:", responseJson.data);

  //         if (Array.isArray(responseJson.data)) {
  //           setCategories(responseJson.data);
  //         } else if (responseJson.data) {
  //           setCategories([responseJson.data]); // Đóng gói đối tượng đơn lẻ vào mảng
  //         } else {
  //           setCategories([]);
  //         }

  //         setLoading(false);
  //       } catch (err) {
  //         setError(err.message);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;
  //   if (!Array.isArray(categories) || categories.length === 0)
  //     return <div>No categories available</div>;

  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-5">
        <Typography variant="h5" sx={{ fontWeight: "600" }}>
          Our Top Categories
        </Typography>
        <button className="no-underline text-base font-medium">See All</button>
      </div>
      <div className="flex justify-between flex-wrap">
        {/* {categories.map((cate) => ( */}
        <div
          className="flex flex-col justify-center items-center"
          style={{ margin: "10px" }}
        >
          <div className="bg-slate-200 rounded-full flex justify-center items-center text-xl cursor-pointer p-3 mb-2 w-20 h-20">
            {/* {getIconComponent(cate.icon)} */}
            <img src={icon} alt="" />
          </div>
          {/* <div>{cate.name}</div> */}
          Smartphone
        </div>

        {/* ))} */}
      </div>
    </div>
  );
}

export default Categories;
