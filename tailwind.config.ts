import type { Config } from "tailwindcss";
import fluid, { screens, fontSize, extract } from "fluid-tailwind";

const config: Config = {
  content: { files: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], extract: extract },

  theme: {
    extend: {
      fontSize,
      screens: {
        xs: "20rem",
        ...screens,
      },
      fontFamily: {
        inter: "var(--font-inter)",
        manrope: "var(--font-manrope)",
      },
      colors: {
        bg: "#0B1326",
        text: "#C7C4D7",
        primary: "#1000A9",
        secondary: "#64748B",
        bigText: "#DAE2FD",
        primaryLight: "#C0C1FF",
        lightOrange: "#FFB783",
        bad: "#FFB4AB",
        neutral: "#fde68a",
        good: "#bbf7d0",
        recording: "#FFB4AB",
        recordingBg: "rgba(147, 0, 10, 0.2)",
      },
      backgroundImage: {
        linear: "linear-gradient(90deg, #C0C1FF 0%, #8083FF 100%)",
      },
    },
  },

  plugins: [fluid],
};

export default config;
