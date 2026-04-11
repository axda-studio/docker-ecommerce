import { ofetch } from "ofetch";

export const strapiClient = ofetch.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
});
