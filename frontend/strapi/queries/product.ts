import { strapiClient } from "@/lib/strapi/client";
import { strapiResponseSchema } from "@/lib/strapi/schemas/strapi";
import { productSchema, productsSchema } from "@/lib/strapi/schemas/product";
import * as v from "valibot";

const PRODUCTS_ENDPOINT = "/products";

export const getProductsByCategory = async (slug: string) => {
  const data = await strapiClient(
    `${PRODUCTS_ENDPOINT}?filters[category][slug][$eq]=${slug}&populate=*`,
  );

  const result = v.safeParse(strapiResponseSchema(productsSchema), data);

  if (!result.success) {
    console.error("Invalid Strapi response:", v.flatten(result.issues));
    throw new Error("Failed to parse products response");
  }

  return result.output;
};

export const getProductById = async (id: string) => {
  const data = await strapiClient(`${PRODUCTS_ENDPOINT}/${id}`, {
    query: {
      populate: "*",
    },
  });

  const result = v.safeParse(strapiResponseSchema(productSchema), data);

  if (!result.success) {
    console.error("Invalid Strapi response:", v.flatten(result.issues));
    throw new Error("Failed to parse product response");
  }

  return result.output;
};
