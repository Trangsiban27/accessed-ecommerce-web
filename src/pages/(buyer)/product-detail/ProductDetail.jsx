import { useDispatch, useSelector } from "react-redux";
import ProductImage from "./components/product-image/ProductImage";
import ProductInfor from "./components/product-infor/ProductInfor";
import ReviewModal from "./components/review/components/ReviewModal";
import AddReviewModal from "./components/review/components/AddReviewModal";
import {
  getProductDetail,
  getProductSuggestions,
  selecteProductDetail,
  selecteProductSuggestions,
} from "../../../store/slices/ProductDetailSlice";
import { useEffect, useState } from "react";
import getImagesForMatchingVariant from "./utils/getImagesForVariant";
import FeaturedProduct from "../../../components/product/FeaturedProduct";

const OPTIONS = { loop: true };

// const ImageData = [
//   {
//     id: 1,
//     url: "https://images.unsplash.com/photo-1694033996901-60322b8740dc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 2,
//     url: "https://images.unsplash.com/photo-1694033996901-60322b8740dc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3,
//     url: "https://images.unsplash.com/photo-1726609939114-78ca262451e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 4,
//     url: "https://images.unsplash.com/photo-1721843431268-b8e380c6892f?q=80&w=2027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

const ProductDetail = () => {
  const [imagesVariant, setImagesVariant] = useState([]);
  const { isShowModal, isShowAddModal } = useSelector((state) => state.review);
  const productDetail = useSelector(selecteProductDetail);
  const productSuggestions = useSelector(selecteProductSuggestions);
  const { selectedPrimaryVariant } = useSelector(
    (state) => state.productDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail());
    dispatch(getProductSuggestions());
  }, [dispatch]);

  useEffect(() => {
    if (productDetail?.productVariants && selectedPrimaryVariant) {
      const images = getImagesForMatchingVariant(
        selectedPrimaryVariant,
        productDetail.productVariants
      );
      setImagesVariant(images);
    }
  }, [productDetail, selectedPrimaryVariant]);

  console.log("productSuggestions", productSuggestions);

  return (
    <>
      <div className="w-[100%] mt-10 flex gap-x-8 mx-auto">
        <ProductImage
          slides={
            imagesVariant !== null ? imagesVariant : productDetail?.images
          }
          options={OPTIONS}
        ></ProductImage>
        <ProductInfor productDetail={productDetail}></ProductInfor>
        {isShowModal && <ReviewModal></ReviewModal>}
        {isShowAddModal && <AddReviewModal></AddReviewModal>}
      </div>
      <div className="mt-16">
        <FeaturedProduct
          nameTitle="You may also know"
          productData={productSuggestions}
        ></FeaturedProduct>
      </div>
    </>
  );
};

export default ProductDetail;
