import { strapiClient } from "@/lib/strapi/client";
import { strapiResponseSchema } from "@/lib/strapi/schemas/strapi";
import {
  categoriesSchema,
  categoryWithChildrenSchema,
  navigationCategoriesSchema,
} from "@/lib/strapi/schemas/category";
import * as v from "valibot";

const CATEGORIES_ENDPOINT = "/categories";

export const getCategories = async () => {
  const data = await strapiClient(CATEGORIES_ENDPOINT);

  const result = v.safeParse(strapiResponseSchema(categoriesSchema), data);

  if (!result.success) {
    console.error("Invalid Strapi response:", v.flatten(result.issues));
    throw new Error("Failed to parse categories response");
  }

  return result.output;
};

export const getCategoryBySlug = async (slug: string) => {
  const data = await strapiClient(
    `${CATEGORIES_ENDPOINT}?filters[slug][$eq]=${slug}&populate[subcategories][populate]=subcategories`,
  );

  const result = v.safeParse(
    strapiResponseSchema(v.array(categoryWithChildrenSchema)),
    data,
  );

  if (!result.success) {
    console.error("Invalid Strapi response:", v.flatten(result.issues));
    throw new Error("Failed to parse category response");
  }

  return result.output.data[0] ?? null;
};

export const getNavigationCategories = async () => {
  const data = await strapiClient(
    `${CATEGORIES_ENDPOINT}?filters[parent][$null]=true&populate[subcategories][populate]=subcategories`,
  );

  const result = v.safeParse(
    strapiResponseSchema(navigationCategoriesSchema),
    data,
  );

  if (!result.success) {
    console.error("Invalid Strapi response:", v.flatten(result.issues));
    throw new Error("Failed to parse navigation categories response");
  }

  return result.output;
};
