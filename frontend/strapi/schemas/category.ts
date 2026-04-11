import * as v from "valibot";

export const categorySchema = v.object({
  id: v.number(),
  documentId: v.string(),
  name: v.string(),
  slug: v.string(),
  createdAt: v.string(),
  updatedAt: v.string(),
  publishedAt: v.string(),
});

export const categoryWithChildrenSchema = v.object({
  ...categorySchema.entries,
  subcategories: v.optional(v.array(categorySchema)),
});

export const navigationCategorySchema = v.object({
  ...categorySchema.entries,
  subcategories: v.optional(v.array(categoryWithChildrenSchema)),
});

export const categoriesSchema = v.array(categorySchema);
export const navigationCategoriesSchema = v.array(navigationCategorySchema);
