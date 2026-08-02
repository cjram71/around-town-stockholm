import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Around Town Stockholm",
    short_name: "Around Town",
    description: "Essential Stockholm services and everyday utilities in English and Swedish.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1efe5",
    theme_color: "#242422",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
