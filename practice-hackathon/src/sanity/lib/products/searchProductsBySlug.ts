import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export const searchProductsBySlug = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[_type == "product" && name match $searchParam] | order(name asc)
    `);
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`,
      },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};
