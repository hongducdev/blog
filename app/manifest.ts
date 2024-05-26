import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "blog.hongducdev.com",
    short_name: "blog.hongducdev.com",
    description:
      "A personal blog by hongdudev. I write about web development, programming, and tech.",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    theme_color: "#1e1e2e",
    background_color: "#a6e3a1",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    prefer_related_applications: true,
    related_applications: [
      {
        platform: "webapp",
        url: "https://blog.hongducdev.com/manifest.json",
      },
      {
        platform: "webapp",
        url: "https://blog.hongducdev.com/manifest.webmanifest",
      },
    ],
    scope: "/",
  };
}
