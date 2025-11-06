import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "fs";

// Parse input to get starting point
const input = await Bun.file("input/input_real_part3.txt").text();
const startingPoint = input.split("=")[1].replace("[", "").replace("]", "").split(",");
const a = parseInt(startingPoint[0], 10);
const b = parseInt(startingPoint[1], 10);

// Canvas setup
const WIDTH = 1001;
const HEIGHT = 1001;
const SCALE = 1; // Adjust for larger output
const canvas = createCanvas(WIDTH * SCALE, HEIGHT * SCALE);
const ctx = canvas.getContext("2d");

// Color scheme
const colors = [
  "#000428", "#004e92", "#1a7fa0", "#43aa8b", 
  "#90be6d", "#f9c74f", "#f8961e", "#f3722c", "#f94144"
];

function AddComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
  return [complexX + resultX, complexY + resultY];
}

function multiplyComplexNumbers(complexX: number, complexY: number, resultX: number, resultY: number): [number, number] {
  return [complexX * resultX - complexY * resultY, complexX * resultY + complexY * resultX];
}

function divideComplexNumbers(complexX: number, complexY: number): [number, number] {
  return [Math.trunc(complexX / 100000), Math.trunc(complexY / 100000)];
}

function getIterationCount(x: number, y: number, maxIterations: number): number {
  let [resX, resY] = [0, 0];
  
  for (let cycle = 0; cycle < maxIterations; cycle++) {
    [resX, resY] = multiplyComplexNumbers(resX, resY, resX, resY);
    [resX, resY] = divideComplexNumbers(resX, resY);
    [resX, resY] = AddComplexNumbers(x, y, resX, resY);
    
    if (resX > 1000000 || resX < -1000000 || resY > 1000000 || resY < -1000000) {
      return cycle;
    }
  }
  
  return maxIterations;
}

function getColor(iterations: number, maxIterations: number): string {
  if (iterations === maxIterations) {
    return "#000000"; // Points in the set are black
  }
  
  const normalized = iterations / maxIterations;
  const colorIndex = Math.floor(normalized * (colors.length - 1));
  return colors[Math.min(colorIndex, colors.length - 1)];
}

// Create frames with increasing iteration depth
const MAX_ITERATIONS = 100;
const FRAMES = 50;

console.log("Generating visualization frames...");
console.log(`Starting point: [${a}, ${b}]`);

for (let frame = 0; frame < FRAMES; frame++) {
  const currentMaxIterations = Math.floor((frame + 1) * (MAX_ITERATIONS / FRAMES));
  
  console.log(`Frame ${frame + 1}/${FRAMES} - Max iterations: ${currentMaxIterations}`);
  
  // Clear canvas
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);
  
  // Render fractal
  let engravedPoints = 0;
  
  for (let i = 0; i <= 1000; i++) {
    for (let j = 0; j <= 1000; j++) {
      const x = a + i * 1;
      const y = b + j * 1;
      
      const iterations = getIterationCount(x, y, currentMaxIterations);
      
      if (iterations === currentMaxIterations) {
        engravedPoints++;
      }
      
      const color = getColor(iterations, currentMaxIterations);
      ctx.fillStyle = color;
      ctx.fillRect(i * SCALE, j * SCALE, SCALE, SCALE);
    }
  }
  
  // Add frame info
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  ctx.fillText(`Iterations: ${currentMaxIterations}`, 10, 30);
  ctx.fillText(`Points in set: ${engravedPoints}`, 10, 60);
  
  // Save frame
  const buffer = canvas.toBuffer("image/png");
  writeFileSync(`frames/frame_${String(frame).padStart(4, "0")}.png`, buffer);
}

console.log("\n✓ Frames generated in ./frames/ directory");
console.log("\nTo create an animation, run:");
console.log("  ffmpeg -framerate 10 -pattern_type glob -i 'frames/*.png' -c:v libx264 -pix_fmt yuv420p animation.mp4");
console.log("\nOr create a GIF:");
console.log("  ffmpeg -framerate 10 -pattern_type glob -i 'frames/*.png' -vf 'scale=500:-1:flags=lanczos' animation.gif");
