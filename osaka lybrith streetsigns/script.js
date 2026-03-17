const BASE_W = 4912;
const BASE_H = 7360;

const layers = [
  { id: "L1", side: "L", x: 1138, y: 5127, w: 438, h: 964, z: 37 },
  { id: "L2", side: "L", x: 729, y: 4407, w: 404, h: 2143, z: 36 },
  { id: "L3", side: "L", x: 0, y: 0, w: 768, h: 2289, z: 35 },
  { id: "R1", side: "R", x: 3829, y: 2811, w: 365, h: 1143, z: 34 },
  { id: "L4", side: "L", x: -78, y: 4284, w: 460, h: 1208, z: 33 },
  { id: "L5", side: "L", x: 459, y: 6218, w: 630, h: 1310, z: 32 },
  { id: "L6", side: "L", x: 318, y: 4565, w: 598, h: 1210, z: 31 },
  { id: "L7", side: "L", x: -622, y: 5450, w: 1311, h: 1936, z: 30 },
  { id: "R2", side: "R", x: 3307, y: 5062, w: 276, h: 770, z: 29 },
  { id: "R3", side: "R", x: 3532, y: 5776, w: 293, h: 696, z: 28 },
  { id: "R4", side: "R", x: 3884, y: 5578, w: 505, h: 517, z: 27 },
  { id: "R5", side: "R", x: 3871, y: 4139, w: 516, h: 1425, z: 26 },
  { id: "R6", side: "R", x: 3307, y: 4139, w: 1094, h: 2333, z: 25 },
  { id: "L8", side: "L", x: 342, y: 2658, w: 575, h: 1296, z: 24 },
  { id: "R7", side: "R", x: 3552, y: 5957, w: 702, h: 1455, z: 23 },
  { id: "R8", side: "R", x: 4339, y: 5269, w: 592, h: 740, z: 22 },
  { id: "R9", side: "R", x: 4395, y: 3645, w: 654, h: 1478, z: 21 },
  { id: "L9", side: "L", x: 1307, y: 6775, w: 367, h: 739, z: 20 },
  { id: "R10", side: "R", x: 4082, y: -431, w: 721, h: 2884, z: 19 },
  { id: "R11", side: "R", x: 3256, y: 0, w: 361, h: 1233, z: 18 },
  { id: "R12", side: "R", x: 3238, y: 1232, w: 445, h: 1069, z: 17 },
  { id: "R13", side: "R", x: 3250, y: 2918, w: 433, h: 415, z: 16 },
  { id: "R14", side: "R", x: 2441, y: 5797, w: 216, h: 673, z: 15 },
  { id: "L10", side: "L", x: 989, y: 3368, w: 397, h: 1752, z: 14 },
  { id: "L11", side: "L", x: 857, y: 3691, w: 583, h: 589, z: 13 },
  { id: "L12", side: "L", x: 1541, y: 4591, w: 277, h: 1279, z: 12 },
  { id: "L13", side: "L", x: 869, y: 1874, w: 565, h: 907, z: 11 },
  { id: "R15", side: "R", x: 3250, y: 0, w: 379, h: 1221, z: 10 },
  { id: "R16", side: "R", x: 3622, y: 0, w: 511, h: 1683, z: 9 },
  { id: "R17", side: "R", x: 3268, y: 3727, w: 427, h: 427, z: 8 },
  { id: "R18", side: "R", x: 3286, y: 4147, w: 301, h: 697, z: 7 },
  { id: "R19", side: "R", x: 3586, y: 2372, w: 889, h: 505, z: 6 },
  { id: "R20", side: "R", x: 3937, y: 5798, w: 1196, h: 1972, z: 5 }
];

const canvas = document.getElementById("canvas");
const base = document.getElementById("base");

let scale = 1;

function createLayers() {
  layers.forEach(layer => {
    const div = document.createElement("div");
    div.classList.add("layer");
    div.style.backgroundImage = `url(${layer.id}.png)`;
    div.style.zIndex = layer.z;
    div.dataset.id = layer.id;
    canvas.appendChild(div);
  });
}

function layoutLayers() {
  const rect = canvas.getBoundingClientRect();
  scale = rect.width / BASE_W;

  layers.forEach(layer => {
    const el = canvas.querySelector(`[data-id="${layer.id}"]`);
    el.style.left = `${layer.x * scale}px`;
    el.style.top = `${layer.y * scale}px`;
    el.style.width = `${layer.w * scale}px`;
    el.style.height = `${layer.h * scale}px`;
  });
}

window.addEventListener("resize", layoutLayers);

base.addEventListener("load", () => {
  createLayers();
  layoutLayers();
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const strength = 0.4;

  layers.forEach(layer => {
    const el = canvas.querySelector(`[data-id="${layer.id}"]`);
    const dir = layer.side === "L" ? -1 : 1;
    el.style.transform = `translateX(${scrollY * strength * dir}px)`;
  });
});

document.addEventListener("mousemove", e => {
  const threshold = 180;

  layers.forEach(layer => {
    const el = canvas.querySelector(`[data-id="${layer.id}"]`);
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (dist < threshold) el.classList.add("glitch");
    else el.classList.remove("glitch");
  });
});
