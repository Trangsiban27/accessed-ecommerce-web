import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeatureProduct from "./components/FeatureProduct";

const HomeLanding = () => {
  return (
    <div className="mx-auto w-[80%]">
      <Banner></Banner>
      <Categories></Categories>
      <FeatureProduct></FeatureProduct>
    </div>
  );
};
export default HomeLanding;
