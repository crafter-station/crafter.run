// Paper and light behind /font: a fine, static paper grain with soft fibres, lit by a
// warm diffuse light that drifts toward the pointer, like a lamp over a sheet of paper.
import { pcg2d, unitFloat } from "@vgpu/wgsl-std/hash";
import { simplex2d } from "@vgpu/wgsl-std/noise/simplex";

struct Params {
  background: vec4f,
  // rgb: paper shadow tone, a: grain strength
  ink: vec4f,
  // rgb: light colour, a: light strength
  accent: vec4f,
  // xy: light centre in px, z: light presence 0..1, w: device pixel ratio
  pointer: vec4f,
  // xy: size in px, z: time in s, w: unused
  frame: vec4f,
}
@group(0) @binding(0) var<uniform> params: Params;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let size = params.frame.xy;
  let px = uv * size;
  let dpr = params.pointer.w;

  // Grain: per-pixel white noise, plus long soft fibres stretched along x.
  let grain = unitFloat(pcg2d(vec2u(px)).x) - 0.5;
  let fibre = simplex2d(px / dpr * vec2f(0.012, 0.09));
  let paper = grain * params.ink.a + fibre * params.ink.a * 0.18;

  // Light: a wide gaussian around the pointer, breathing very slowly.
  let d = length(px - params.pointer.xy) / (max(size.x, size.y) * 0.42);
  let breathe = 0.92 + 0.08 * sin(params.frame.z * 0.35);
  let light = exp(-d * d * 2.2) * params.pointer.z * params.accent.a * breathe;

  var color = params.background.rgb;
  color = mix(color, params.accent.rgb, light);
  // Paper reads darker away from the light, so the grain is felt more than seen under it.
  color += paper * (1.0 - light * 0.6);
  color = mix(color, params.ink.rgb, (1.0 - exp(-d * d * 0.6)) * params.ink.a * 0.8);
  return vec4f(color, 1.0);
}
