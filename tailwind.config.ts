import type { Config } from "tailwindcss";
import fluid, { screens, fontSize } from "fluid-tailwind";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      fontSize,
      screens: {
        sml: "20rem",
        ...screens,
      },
      colors: {
        bg: "#0B1326",
        text: "#C7C4D7",
        primary: "#1000A9",
        secondary: "#64748B",
        bigText: "#DAE2FD",
        primaryLight: "#C0C1FF",
        lightOrange: "#FFB783",
        clearityLow: "#FFB4AB",
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
