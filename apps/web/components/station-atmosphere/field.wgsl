// Original Crafter field: slow Cassini contours, drawn directly into alpha.
// A single fullscreen pass, without textures, ray marching or post-processing.
struct Params {
  time: f32,
  aspect: f32,
}
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<uniform> ink: vec4f;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  var p = (uv - vec2f(0.5, 0.4)) * vec2f(params.aspect, 1.2);
  let drift = params.time * 0.035;
  p.y += sin(p.x * 2.6 + drift) * 0.045;
  p.x += sin(p.y * 3.0 - drift * 0.7) * 0.028;

  let left = length(p - vec2f(0.48, 0.0));
  let right = length(p + vec2f(0.48, 0.0));
  let field = sqrt(left * right);
  let phase = field * 19.0 - drift * 0.12;
  let width = max(fwidth(phase) * 0.38, 0.004);
  let line = 1.0 - smoothstep(width, width * 1.8, abs(fract(phase) - 0.5));

  // Keep the center quiet for the heading and description.
  let quiet = 1.0 - 0.8 * exp(-p.x * p.x * 2.0 - pow((p.y - 0.13) * 5.0, 2.0));
  let edge = 1.0 - smoothstep(0.9, 1.7, length(p));
  let lowerFade = 1.0 - smoothstep(0.62, 1.0, uv.y);
  let glow = exp(-abs(field - 0.62) * 14.0) * 0.1;
  let sideFade = smoothstep(0.02, 0.22, uv.x) * (1.0 - smoothstep(0.78, 0.98, uv.x));
  let alpha = (line + glow) * ink.a * quiet * edge * lowerFade * sideFade;
  return vec4f(ink.rgb * alpha, alpha);
}
