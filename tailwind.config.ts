import type { Config } from "tailwindcss";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

const config: Config = {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    extract,
  },
  theme: {
    extend: {
      fontSize,
      screens: {
        sml: "20rem",
        ...screens,
      },
      fontFamily: {},
      colors: {},
    },
  },
  plugins: [fluid],
};
export default config;
