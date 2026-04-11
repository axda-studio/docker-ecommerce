import { ofetch } from "ofetch";

const strapiClient = ofetch.create({
  baseURL: `${process.env.STRAPI_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
});

interface CategoryInput {
  name: string;
  slug: string;
  subcategories?: CategoryInput[];
}

const menCategories: CategoryInput[] = [
  {
    name: "Limited Time",
    slug: "men-limited-time",
    subcategories: [
      { name: "Extra 20% Off Select Styles", slug: "men-extra-20-off" },
    ],
  },
  {
    name: "New & Featured",
    slug: "men-new-featured",
    subcategories: [
      { name: "New Arrivals", slug: "men-new-arrivals" },
      { name: "Best Sellers", slug: "men-best-sellers" },
      { name: "Latest Drops", slug: "men-latest-drops" },
      { name: "SNKRS Launch Calendar", slug: "men-snkrs-launch-calendar" },
    ],
  },
  {
    name: "Shoes",
    slug: "men-shoes",
    subcategories: [
      { name: "All Shoes", slug: "men-all-shoes" },
      { name: "Basketball", slug: "men-basketball-shoes" },
      { name: "Jordan", slug: "men-jordan-shoes" },
      { name: "Lifestyle", slug: "men-lifestyle-shoes" },
      { name: "Running", slug: "men-running-shoes" },
      { name: "Sandals & Slides", slug: "men-sandals-slides" },
      { name: "Soccer", slug: "men-soccer-shoes" },
      { name: "Training & Gym", slug: "men-training-gym-shoes" },
      { name: "Custom Shoes", slug: "men-custom-shoes" },
    ],
  },
  {
    name: "Clothing",
    slug: "men-clothing",
    subcategories: [
      { name: "All Clothing", slug: "men-all-clothing" },
      { name: "Hoodies & Sweatshirts", slug: "men-hoodies-sweatshirts" },
      { name: "Jackets & Vests", slug: "men-jackets-vests" },
      { name: "Pants", slug: "men-pants" },
      { name: "Shorts", slug: "men-shorts" },
      { name: "Swim", slug: "men-swim" },
      { name: "Tops & Graphic Tees", slug: "men-tops-graphic-tees" },
    ],
  },
  {
    name: "Accessories",
    slug: "men-accessories",
    subcategories: [
      { name: "All Accessories", slug: "men-all-accessories" },
      { name: "Bags & Backpacks", slug: "men-bags-backpacks" },
      { name: "Hats & Headwear", slug: "men-hats-headwear" },
      { name: "Socks", slug: "men-socks" },
    ],
  },
];

async function createCategory(
  category: CategoryInput,
  parentId?: number,
): Promise<number> {
  const payload: Record<string, unknown> = {
    name: category.name,
    slug: category.slug,
  };

  if (parentId) {
    payload.parent = parentId;
  }

  const response = await strapiClient<{ data: { id: number } }>(
    "/categories",
    {
      method: "POST",
      body: { data: payload },
    },
  );

  return response.data.id;
}

async function seedMenCategories() {
  console.log("Finding or creating Men level 1 category...");

  const existing = await strapiClient<{
    data: Array<{ id: number; slug: string }>;
  }>("/categories?filters[slug][$eq]=men");

  let menId: number;

  if (existing.data.length > 0) {
    menId = existing.data[0].id;
    console.log(`Found existing Men category (id: ${menId})`);
  } else {
    menId = await createCategory({ name: "Men", slug: "men" });
    console.log(`Created Men category (id: ${menId})`);
  }

  console.log("\nSeeding level 2 categories under Men...\n");

  for (const l2 of menCategories) {
    const l2Id = await createCategory(l2, menId);
    console.log(`  Created L2: ${l2.name} (id: ${l2Id})`);

    if (l2.subcategories) {
      for (const l3 of l2.subcategories) {
        const l3Id = await createCategory(l3, l2Id);
        console.log(`    Created L3: ${l3.name} (id: ${l3Id})`);
      }
    }
  }

  console.log("\nDone! Men category tree seeded successfully.");
}

seedMenCategories().catch(console.error);
