import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Applebot", "Bingbot", "Googlebot"],
        allow: ["/"],
        disallow: "/dashboard/",
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
