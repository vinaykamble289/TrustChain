import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "https://esm.sh/@tailwindcss/typography?external=tailwindcss,postcss";
import forms from "@tailwindcss/forms";
import animate from "https://cdn.skypack.dev/tailwindcss-animate@1.0.5";

export default {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
    },
    extend: {
      colors: {
        'primary': '#ff49db',
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, aspectRatio, typography, forms({ strategy: "class" })],
};