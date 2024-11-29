import AllProducts from "./AllProducts/AllProducts";
import Carousel from "./Carousel";
import FabrioBanner from "./fabrioBanner/FabrioBanner";
import SingleFlashSale from "./FlashSale/SingleFlashSale";
import HorizontalCarousel from "./horizontal/HorizontalCarousel";
import NewArrival from "./newArrivalProducts/NewArrival";
import SummerCollection from "./SummerCollection/SummerCollection";
import WinterCollection from "./WinterCollection/WinterCollection";
import ComboOffer from "./comboOfferBanner/ComboOffer";
const Layout = () => {
  return (
    <div>
      <Carousel />
      <HorizontalCarousel />
      <NewArrival />
      <SingleFlashSale />
      <ComboOffer />
      <WinterCollection />
      <SummerCollection />
      <AllProducts />
      <FabrioBanner />
    </div>
  );
};

export default Layout;
