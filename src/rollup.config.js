import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "index.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      emitCss: true
    }),

    // we'll extract any component/imported CSS out into
    // a separate file — better for performance
    postcss({
      extract: "public/bundle.css",
      minimize: production
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ]
};
