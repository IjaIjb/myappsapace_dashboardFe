import React from "react";
import DashboardLayout from "../../../components/DashboardLayout";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { MdInfo } from "react-icons/md";
import TitleProduct from "./inner/TitleProduct";
import ProductPrice from "./inner/ProductPrice";
import Variants from "./inner/Variants";
import ProductInventory from "./inner/ProductInventory";

// interface MediaProps {
//     id: number;
//     file: File | null;
//   }
  
const ProductDetails = () => {

  return (
    <div>
      <DashboardLayout>
        <div>
          <div className="grid lg:grid-cols-12 gap-3 pb-6">
            <div className="col-span-8 flex flex-col gap-3">
<TitleProduct />
<ProductPrice />
<Variants />
<ProductInventory />



            </div>
            <div className="col-span-4"></div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProductDetails;
