import * as v from "valibot";

export const strapiPaginationSchema = v.object({
  page: v.number(),
  pageSize: v.number(),
  pageCount: v.number(),
  total: v.number(),
});

export const strapiResponseSchema = <T extends v.GenericSchema>(
  dataSchema: T,
) =>
  v.object({
    data: dataSchema,
    meta: v.object({
      pagination: v.optional(strapiPaginationSchema),
    }),
  });

export type StrapiResponseType<T extends v.GenericSchema> = v.InferOutput<
  ReturnType<typeof strapiResponseSchema<T>>
>;
