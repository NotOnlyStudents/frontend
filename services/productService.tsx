import getElements from "pages/lib/getElements";
import { Product } from "../interfaces/products/product"

const getAllProduct = async (): Promise<Product[]> => {
    const fetcher = new getElements('allProduct')
    const res = (
        await fetcher.getJSONAsRes(
          "GET",
        )
      ).props.response.result.items;
      return res;
}

/*export default productService = {
    getAllProduct,
}*/