import * as v from "valibot";
import { categorySchema } from "./category";

export const productSchema = v.object({
  id: v.number(),
  documentId: v.string(),
  name: v.string(),
  description: v.nullable(v.string()),
  price: v.number(),
  createdAt: v.string(),
  updatedAt: v.string(),
  publishedAt: v.string(),
  images: v.nullable(v.string()),
  category: v.optional(categorySchema),
});

export const productsSchema = v.array(productSchema);
