// Copy node icons into dist/ after tsc (tsc does not copy non-TS assets).
import { cpSync, mkdirSync } from "node:fs";

mkdirSync("dist/nodes/Halu", { recursive: true });
cpSync("nodes/Halu/halu.svg", "dist/nodes/Halu/halu.svg");
console.log("copied node icons to dist/");
