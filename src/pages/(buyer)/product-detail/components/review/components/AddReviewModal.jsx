import { useDispatch } from "react-redux";
import Overlay from "../../../../../../components/Overlay";
import { setIsShowAddModal } from "../../../../../../store/slices/ReviewSlice";
import { Button, Rating, TextField, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  content: yup
    .string()
    .min(6, "Content must be at least 6 characters")
    .required("Content required"),
  title: yup
    .string()
    .min(6, "Title must be at least 6")
    .required("title is required"),
});

const AddReviewModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [value, setValue] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [delivery, setDelivery] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsShowAddModal(false));
    console.log(123);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = (value) => {
    setRecommendation(value); // Lấy giá trị đã click và lưu vào state
    console.log("Selected:", value);
  };

  const handleClickDelivery = (value) => {
    setDelivery(value); // Lấy giá trị đã click và lưu vào state
    console.log("Selected:", value);
  };

  const onSubmit = (data) => {
    // const form = {
    //   content: data.content,
    //   rating: value,
    //   name: data.name,
    //   email: data.email,
    //   title: data.title,
    //   options: [
    //     {
    //       type: "RECOMMENDED",
    //       value: recommendation,
    //     },
    //     {
    //       type: "DELIVERY",
    //       value: delivery,
    //     },
    //   ],
    // };

    console.log(data);

    // dispatch(addReview(productId, form, token));
  };

  return (
    <Overlay handleClose={handleClose}>
      <div
        className="absolute top-[40px] h-[90vh] right-5 w-[35%] bg-white p-5 rounded-md text-start overflow-hidden scroll-smooth overflow-y-scroll animate-slideInRight"
        onClick={handleModalClick}
      >
        <div className="flex p-3 bg-white rounded-md shadow-md gap-x-3">
          <div className="overflow-hidden rounded-md size-20">
            <img
              src="https://images.unsplash.com/photo-1726682577615-728e4272a60c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <Typography
              variant="subtitle1"
              gutterBottom
              className=" text-start"
              sx={{ fontWeight: "600", marginBottom: "0" }}
            >
              DNA Black
            </Typography>
            <p className="text-[12px] font-semibold text-gray-400">Watch</p>
            <div className="flex gap-x-3">
              <span
              // className={`${data?.discountedPrice ? "line-through" : ""}`}
              >
                {/* ${data?.sellingPrice} */}
                <AttachMoneyIcon fontSize="small"></AttachMoneyIcon>
                <span className="text-lg font-semibold">120</span>
              </span>
              {/* <span>-</span> */}
              {/* {data?.discountedPrice && (
                <span className="font-semibold">${data?.discountedPrice}</span>
              )} */}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-10 gap-y-8"
        >
          <TextField
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
          />
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
          />

          <div>
            <Typography>Score</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>

          <TextField
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            required
            id="outlined-required"
            label="Title"
            defaultValue=""
          />

          <TextField
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
          />

          <div>
            <h1 className="font-semibold">Recommended</h1>
            <div className="flex mt-3 gap-x-4">
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  recommendation === "Yes"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClick("Yes")}
              >
                Yes
              </div>
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  recommendation === "No"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClick("No")}
              >
                No
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-semibold">
              This your order arrive within the time mentioned?
            </h1>
            <div className="flex mt-3 gap-x-4">
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  delivery === "Yes"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClickDelivery("Yes")}
              >
                Yes
              </div>
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  delivery === "No"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClickDelivery("No")}
              >
                No
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-3">
            <Button
              variant="contained"
              className="bg-[#4192d3] text-white"
              type="submit"
              sx={{ textTransform: "none", fontWeight: "600" }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              className="text-black border-2 border-gray-300"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                border: "1px solid #000",
                color: "#000",
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default AddReviewModal;
