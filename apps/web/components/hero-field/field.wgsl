// The Crafter knot as a halftone: a screen-space dot grid whose dots grow inside the
// knot and fade outside it, read from a signed distance grid computed once in JS.
// A slow band of light crosses it and dots swell under the pointer, like a lens.

struct Params {
  background: vec4f,
  // rgb: dot colour, a: dot opacity
  ink: vec4f,
  // xy: knot centre in px, z: knot size in px, w: rotation in radians
  knot: vec4f,
  // xy: pointer in px, z: pointer presence 0..1, w: cell size in px
  pointer: vec4f,
  // xy: size in px, z: time in s, w: grid resolution (cells per side)
  frame: vec4f,
}
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> sdf: array<f32>;

fn sdfAt(i: vec2i) -> f32 {
  let n = i32(params.frame.w);
  let c = clamp(i, vec2i(0), vec2i(n - 1));
  return sdf[c.y * n + c.x];
}

// Bilinear sample of the distance grid; outside the grid the knot is far away.
fn knotDistance(p: vec2f) -> f32 {
  let n = params.frame.w;
  if (p.x < 0.0 || p.y < 0.0 || p.x > 1.0 || p.y > 1.0) { return 1.0; }
  let g = p * (n - 1.0);
  let i = vec2i(floor(g));
  let f = fract(g);
  let a = mix(sdfAt(i), sdfAt(i + vec2i(1, 0)), f.x);
  let b = mix(sdfAt(i + vec2i(0, 1)), sdfAt(i + vec2i(1, 1)), f.x);
  return mix(a, b, f.y);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let size = params.frame.xy;
  let px = uv * size;
  let cell = params.pointer.w;
  let center = (floor(px / cell) + 0.5) * cell;

  // Cell centre in knot space (0..1), rotated about the knot centre.
  let s = sin(params.knot.w);
  let c = cos(params.knot.w);
  let rel = (center - params.knot.xy) / params.knot.z;
  let local = vec2f(rel.x * c + rel.y * s, -rel.x * s + rel.y * c) + 0.5;
  let d = knotDistance(local);

  // Inside the knot: full dots. A soft halo outside. A faint paper grid everywhere else.
  let inside = 1.0 - smoothstep(-0.01, 0.035, d);
  let halo = exp(-max(d, 0.0) * 26.0) * 0.25;
  var weight = max(inside, halo);

  // A diagonal band of light drifts across every ~14s.
  let t = params.frame.z;
  let band = sin((center.x * 0.6 + center.y) / max(size.y, 1.0) * 2.4 - t * 0.45);
  weight *= 0.78 + 0.22 * smoothstep(0.2, 1.0, band);

  // Lens: dots near the pointer swell.
  let toPointer = length(center - params.pointer.xy) / 220.0;
  let lens = exp(-toPointer * toPointer * 2.0) * params.pointer.z;
  weight = clamp(weight + lens * (0.25 + inside * 0.4), 0.0, 1.0);

  // Quieter toward the proof band at the bottom, so its text reads cleanly.
  weight *= mix(1.0, 0.35, smoothstep(0.52, 0.8, uv.y));

  let radius = cell * (0.06 + 0.4 * weight);
  let dist = length(px - center);
  let dot = 1.0 - smoothstep(radius - 0.8, radius + 0.8, dist);
  let base = 0.07;
  let alpha = params.ink.a * dot * max(weight, base);

  return vec4f(mix(params.background.rgb, params.ink.rgb, alpha), 1.0);
}
