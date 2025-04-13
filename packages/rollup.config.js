import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss"; // CSS 처리를 위한 플러그인 추가

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    postcss({
      extensions: [".css"],
      extract: "styles.css", // CSS를 별도 파일로 추출
      minimize: true,
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
    }),
    terser(),
  ],
  external: ["react", "react-dom", "styled-components"],
};
