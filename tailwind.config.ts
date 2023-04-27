import { type Config } from "tailwindcss";

export default {
  
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

// tailwind.config.ts

// import type { Config } from 'tailwindcss';

// const config: Config = {
//   mode: 'jit',
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default config;
