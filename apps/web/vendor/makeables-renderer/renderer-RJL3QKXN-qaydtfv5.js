import{ca as i0}from"./entry2-7d66xwe6.js";import{Aa as r0,Ba as n0,Ca as C0,ga as I0,ra as T0,sa as J0,va as s0,wa as B0,xa as S0}from"./entry2-tqhcj7s1.js";import{Fa as o0,Ga as Y0,Ha as o,Ia as q0,Ja as a0,Ka as N0,La as t0,Ma as k0,Na as X0,Oa as e0,Pa as $1,Qa as G1}from"./entry2-sqq9drqx.js";import{Va as i}from"./entry2-73q8pw6v.js";var p0=`// vgsl-module: /Users/raillyhugo/Programming/crafter-station/makeables-main-cli/packages/renderer/src/bloom.wgsl
struct _vgsl_1115c165__Blur {
  direction: vec2f,
  extract: f32,
  threshold: f32,
}
@group(0) @binding(0) var<uniform> blur: _vgsl_1115c165__Blur;
@group(0) @binding(1) var source: texture_2d<f32>;
@group(0) @binding(2) var linearSampler: sampler;

fn _vgsl_1115c165__sampleSource(uv: vec2f) -> vec3f {
  let color = textureSampleLevel(source, linearSampler, uv, 0.0).rgb;
  return mix(color, max(color - vec3f(blur.threshold), vec3f(0.0)), blur.extract);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  var color = _vgsl_1115c165__sampleSource(uv) * 0.227027;
  color += (_vgsl_1115c165__sampleSource(uv + blur.direction * 1.384615) + _vgsl_1115c165__sampleSource(uv - blur.direction * 1.384615)) * 0.316216;
  color += (_vgsl_1115c165__sampleSource(uv + blur.direction * 3.230769) + _vgsl_1115c165__sampleSource(uv - blur.direction * 3.230769)) * 0.070270;
  return vec4f(color, 1.0);
}
`,Q1=["coated","metal","holographic","soft-touch"],Z1=["ribbons","contours","orbits","grain","chromatic-flow"];function _0(J){let H=new Uint8Array(12288),E=[0,0];if(J){let{width:D,height:p}=I0(J);for(let[T,a]of["front","back"].entries()){let X=J[a].layers.filter((F)=>F.kind==="effect"&&F.visible!==!1);E[T]=X.length,X.forEach((F,j)=>{let N=(T*24+j)*256;[F.x/D,F.y/p,F.w/D,F.h/p,(Z1.indexOf(F.effect)+1)/8,F.scale/6,F.opacity,1].forEach((L,_)=>{H[N+_]=Math.round(L*255)}),F.colors.forEach((L,_)=>{let R=N+8+_*4;H[R]=Number.parseInt(L.slice(1,3),16),H[R+1]=Number.parseInt(L.slice(3,5),16),H[R+2]=Number.parseInt(L.slice(5,7),16),H[R+3]=255})})}}if(J?.product==="card")L1(H,J.material.optics);return{bytes:H,mode:[J?.material.recipe?2:J?1:0,...E,J?.product==="card"?1+Q1.indexOf(J.material.stock??"coated"):0]}}var A1=["none","linear","radial","concentric"],F1=(J)=>[1,3,5].map((H)=>Number.parseInt(J.slice(H,H+2),16));function L1(J,H={}){let E=(X,F)=>F.forEach((j,N)=>{J[X*4+N]=Math.round(Math.min(1,Math.max(0,j))*255)}),D=(X,F,j)=>E(X,[...F?F1(F).map((N)=>N/255):[1,1,1],j]);E(8,[A1.indexOf(H.grain??"none")/4,(H.angle??0)/180,H.center?.x??0.5,H.center?.y??0.5]),D(9,H.foil,H.foil?1:0),D(10,H.light,H.light?1:0);let[p,T,a]=H.spectrum??[];D(11,p,H.spectrum?1:0),D(12,T,H.sparkle??0),D(13,a,H.relief??0.5),E(14,[H.grainStrength??0.5,H.sheen??0.5,H.diffraction==="radial"?1:0,1])}var j1=`// vgsl-module: /Users/raillyhugo/Programming/crafter-station/makeables-main-cli/packages/renderer/src/present.wgsl
@group(0) @binding(0) var scene: texture_2d<f32>;
@group(0) @binding(1) var glow: texture_2d<f32>;
@group(0) @binding(2) var linearSampler: sampler;

fn _vgsl_097cace2__present(color: vec3f) -> vec3f {
  let c = max(color * 0.82, vec3f(0.0));
  let mapped = clamp((c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14), vec3f(0.0), vec3f(1.0));
  return select(mapped * 12.92, 1.055 * pow(mapped, vec3f(1.0 / 2.4)) - 0.055, mapped > vec3f(0.0031308));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let base = textureSampleLevel(scene, linearSampler, uv, 0.0);
  if (base.a < 0.99) { return base; }
  let bloom = textureSampleLevel(glow, linearSampler, uv, 0.0).rgb * (1.0 - smoothstep(0.72, 0.82, uv.y));
  let grain = (fract(sin(dot(uv * vec2f(textureDimensions(scene)), vec2f(127.1, 311.7))) * 43758.5453) - 0.5) * 0.005;
  return vec4f(clamp(_vgsl_097cace2__present(base.rgb + bloom * 0.38) + grain, vec3f(0.0), vec3f(1.0)), base.a);
}
`,_1=`// vgsl-module: /Users/raillyhugo/Programming/crafter-station/makeables-main-cli/packages/renderer/src/prism.wgsl
struct _vgsl_a8d28296__Params {
  resolution: vec2f,
  angles: vec2f,
  pointer: vec2f,
  light: vec2f,
  spectral: f32,
  finish: f32,
  time: f32,
  lift: f32,
  fluidity: f32,
  activity: f32,
  surfaceKind: f32,
  thermal: f32,
  customMaterial: vec4f,
  coating: vec4f,
  faceRegion: vec4f,
  signature: vec4f,
  heat0: vec4f,
  heat1: vec4f,
  heat2: vec4f,
  heat3: vec4f,
  roll: f32,
  topographic: f32,
  designMode: vec4f,
}

@group(0) @binding(0) var<uniform> params: _vgsl_a8d28296__Params;
@group(0) @binding(1) var portrait: texture_2d<f32>;
@group(0) @binding(2) var printSampler: sampler;
@group(0) @binding(3) var opticalAtlas: texture_2d<f32>;
@group(0) @binding(4) var foil: texture_2d<f32>;
@group(0) @binding(5) var reversePrint: texture_2d<f32>;
@group(0) @binding(6) var materialField: texture_2d<f32>;
@group(0) @binding(7) var designMask: texture_2d<f32>;
@group(0) @binding(8) var designEffects: texture_2d<f32>;

fn _vgsl_a8d28296__hash(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn _vgsl_a8d28296__rotateX(p: vec3f, a: f32) -> vec3f {
  return vec3f(p.x, p.y * cos(a) - p.z * sin(a), p.y * sin(a) + p.z * cos(a));
}

fn _vgsl_a8d28296__rotateY(p: vec3f, a: f32) -> vec3f {
  return vec3f(p.x * cos(a) + p.z * sin(a), p.y, -p.x * sin(a) + p.z * cos(a));
}

fn _vgsl_a8d28296__rotateZ(p: vec3f, a: f32) -> vec3f {
  return vec3f(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a), p.z);
}

fn _vgsl_a8d28296__toLocal(p: vec3f) -> vec3f {
  return _vgsl_a8d28296__rotateX(_vgsl_a8d28296__rotateY(_vgsl_a8d28296__rotateZ(p, -params.roll), -params.angles.y), -params.angles.x);
}

fn _vgsl_a8d28296__toWorld(p: vec3f) -> vec3f {
  return _vgsl_a8d28296__rotateZ(_vgsl_a8d28296__rotateY(_vgsl_a8d28296__rotateX(p, params.angles.x), params.angles.y), params.roll);
}

fn _vgsl_a8d28296__linear(color: vec3f) -> vec3f {
  return select(color / 12.92, pow((color + 0.055) / 1.055, vec3f(2.4)), color > vec3f(0.04045));
}

fn _vgsl_a8d28296__roundedRect(p: vec2f, bounds: vec2f, radius: f32) -> f32 {
  let q = abs(p) - bounds + radius;
  return length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - radius;
}

fn _vgsl_a8d28296__printSize() -> vec2f {
  return select(vec2f(1.49, 2.26), vec2f(2.4, 1.512), params.designMode.w > 0.5);
}

fn _vgsl_a8d28296__badgeDistance(p: vec3f) -> f32 {
  if (params.designMode.w > 0.5) {
    let face = _vgsl_a8d28296__roundedRect(p.xy, vec2f(1.18, 0.736), 0.085);
    let q = vec2f(face, abs(p.z) - 0.012);
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - 0.020;
  }
  let face = _vgsl_a8d28296__roundedRect(p.xy, vec2f(0.75, 1.135), 0.105);
  let q = vec2f(face, abs(p.z) - 0.038);
  let body = min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - 0.020;
  let slot = _vgsl_a8d28296__roundedRect(p.xy - vec2f(0.0, 1.008), vec2f(0.156, 0.025), 0.024);
  let bevel = clamp(0.5 + 0.5 * (body + slot) / 0.014, 0.0, 1.0);
  return mix(-slot, body, bevel) + 0.014 * bevel * (1.0 - bevel);
}

fn _vgsl_a8d28296__geometricNormal(p: vec3f) -> vec3f {
  let e = vec2f(0.0006, 0.0);
  return normalize(vec3f(
    _vgsl_a8d28296__badgeDistance(p + e.xyy) - _vgsl_a8d28296__badgeDistance(p - e.xyy),
    _vgsl_a8d28296__badgeDistance(p + e.yxy) - _vgsl_a8d28296__badgeDistance(p - e.yxy),
    _vgsl_a8d28296__badgeDistance(p + e.yyx) - _vgsl_a8d28296__badgeDistance(p - e.yyx)
  ));
}

fn _vgsl_a8d28296__spectrum(phase: f32) -> vec3f {
  return 0.5 + 0.5 * cos(6.2831853 * (vec3f(0.0, 0.33, 0.67) + phase));
}

fn _vgsl_a8d28296__panel(direction: vec3f, forwardInput: vec3f, size: vec2f, feather: f32) -> f32 {
  let forward = normalize(forwardInput);
  let helper = select(vec3f(0.0, 1.0, 0.0), vec3f(0.0, 0.0, 1.0), abs(forward.y) > 0.92);
  let right = normalize(cross(helper, forward));
  let up = cross(forward, right);
  let facing = dot(direction, forward);
  if (facing <= 0.01) { return 0.0; }
  let local = abs(vec2f(dot(direction, right), dot(direction, up)) / facing);
  let edges = vec2f(1.0) - smoothstep(size, size + feather, local);
  return edges.x * edges.y;
}

fn _vgsl_a8d28296__studio(directionInput: vec3f) -> vec3f {
  let d = _vgsl_a8d28296__rotateX(_vgsl_a8d28296__rotateY(normalize(directionInput), params.light.x * 0.64), params.light.y * 0.52);
  let room = mix(vec3f(0.035, 0.042, 0.060), vec3f(0.18, 0.20, 0.24), smoothstep(-0.7, 0.8, d.y));
  let left = _vgsl_a8d28296__panel(d, vec3f(-0.48, 0.32, 0.81), vec2f(0.20, 0.65), 0.19);
  let right = _vgsl_a8d28296__panel(d, vec3f(0.61, 0.35, 0.71), vec2f(0.50, 0.15), 0.12);
  let ceiling = _vgsl_a8d28296__panel(d, vec3f(-0.12, 0.89, 0.40), vec2f(0.90, 0.17), 0.10);
  let fill = _vgsl_a8d28296__panel(d, vec3f(0.0, -0.70, 0.71), vec2f(0.55, 0.34), 0.25);
  return room + vec3f(1.0, 0.96, 0.92) * left * 3.4
    + vec3f(0.80, 0.89, 1.0) * right * 4.2
    + vec3f(1.0) * ceiling * 2.6 + vec3f(0.70, 0.76, 0.90) * fill * 0.85;
}

fn _vgsl_a8d28296__dielectricFresnel(ior: f32, facing: f32) -> f32 {
  let ratio = (ior - 1.0) / (ior + 1.0);
  let f0 = ratio * ratio;
  return f0 + (1.0 - f0) * pow(1.0 - clamp(facing, 0.0, 1.0), 5.0);
}

fn _vgsl_a8d28296__background() -> vec3f {
  if (params.finish > 1.5) { return vec3f(0.055, 0.057, 0.070); }
  if (params.finish > 0.5) { return vec3f(0.924, 0.91, 0.94); }
  return vec3f(0.938, 0.934, 0.918);
}

fn _vgsl_a8d28296__facet(p: vec2f) -> vec4f {
  let unique = p + (params.signature.xy - 0.5) * vec2f(0.21, 0.19);
  let uv = clamp(vec2f(unique.x / 1.6 + 0.5, 0.5 - unique.y / 2.4), vec2f(0.0), vec2f(0.99999));
  let texel = textureLoad(opticalAtlas, vec2i(uv * vec2f(textureDimensions(opticalAtlas))), 0);
  return vec4f(texel.xy * 2.0 - 1.0, (texel.z - 0.5) * 0.14, texel.w * 0.07);
}

fn _vgsl_a8d28296__printed(uv: vec2f) -> vec3f {
  let safe = clamp(uv, vec2f(0.001), vec2f(0.999));
  var color = textureSampleLevel(portrait, printSampler, safe, 0.0).rgb;
  if (params.surfaceKind > 0.5) { return _vgsl_a8d28296__linear(color); }
  if (params.finish > 0.5 && params.finish < 1.5) {
    let offset = vec2f(0.0027, 0.0);
    color = color * 0.4
      + textureSampleLevel(portrait, printSampler, safe + offset, 0.0).rgb * 0.15
      + textureSampleLevel(portrait, printSampler, safe - offset, 0.0).rgb * 0.15
      + textureSampleLevel(portrait, printSampler, safe + offset.yx, 0.0).rgb * 0.15
      + textureSampleLevel(portrait, printSampler, safe - offset.yx, 0.0).rgb * 0.15;
    color = mix(color, vec3f(0.82, 0.81, 0.91), 0.10);
  }
  if (params.finish > 1.5) { color *= vec3f(0.81, 0.86, 0.98); }
  return _vgsl_a8d28296__linear(color);
}

fn _vgsl_a8d28296__transmission(p: vec3f, ray: vec3f, normal: vec3f, ior: f32, depth: f32) -> vec4f {
  let inside = refract(ray, normal, 1.0 / ior);
  let travel = (-0.17 - depth - p.z) / min(inside.z, -0.1);
  let destination = p + inside * max(travel, 0.0);
  let uv = vec2f(destination.x / _vgsl_a8d28296__printSize().x + 0.5, 0.5 - destination.y / _vgsl_a8d28296__printSize().y);
  let absorption = vec3f(0.16, 0.065, 0.028) * select(1.0, 2.6, params.finish > 1.5);
  let attenuation = exp(-absorption * max(travel, 0.0));
  return vec4f(_vgsl_a8d28296__printed(uv) * attenuation, max(travel, 0.0));
}

fn _vgsl_a8d28296__heatSpot(p: vec2f, point: vec4f) -> f32 {
  return exp(-dot(p - point.xy, p - point.xy) / 0.065) * point.z;
}

fn _vgsl_a8d28296__materialSample(uv: vec2f) -> vec4f {
  let texel = vec2f(1.5 / 384.0, 1.5 / 576.0);
  return textureSampleLevel(materialField, printSampler, uv, 0.0) * 0.4
    + textureSampleLevel(materialField, printSampler, uv + vec2f(texel.x, 0.0), 0.0) * 0.15
    + textureSampleLevel(materialField, printSampler, uv - vec2f(texel.x, 0.0), 0.0) * 0.15
    + textureSampleLevel(materialField, printSampler, uv + vec2f(0.0, texel.y), 0.0) * 0.15
    + textureSampleLevel(materialField, printSampler, uv - vec2f(0.0, texel.y), 0.0) * 0.15;
}

fn _vgsl_a8d28296__ribbonColor(h: f32, uv: vec2f) -> vec3f {
  let pink = exp(-pow(abs((h + 0.03) / 0.22), 2.0)) * 0.92;
  let violet = exp(-pow(abs((h - 0.13) / 0.15), 2.0)) * 0.54;
  let cyan = exp(-pow(abs((h - 0.35) / 0.13), 2.0)) * 0.72;
  let halo = exp(-pow(abs((h + 0.31) / 0.14), 2.0)) * 0.48;
  var color = mix(vec3f(0.975, 0.94, 0.955), vec3f(0.96, 0.39, 0.99), pink);
  color = mix(color, vec3f(0.71, 0.49, 0.98), violet);
  color = mix(color, vec3f(0.57, 0.96, 0.98), cyan);
  color = mix(color, vec3f(0.64, 0.96, 0.96), halo);
  color += (_vgsl_a8d28296__hash(floor(uv * vec2f(1024.0, 1536.0))) - 0.5) * 0.022;
  return _vgsl_a8d28296__linear(clamp(color, vec3f(0.0), vec3f(1.0)));
}

fn _vgsl_a8d28296__reverseCard(p: vec3f, rd: vec3f, normal: vec3f) -> vec3f {
  let uv = clamp(vec2f(0.5 - p.x / _vgsl_a8d28296__printSize().x, 0.5 - p.y / _vgsl_a8d28296__printSize().y), vec2f(0.001), vec2f(0.999));
  let printedColor = textureSampleLevel(reversePrint, printSampler, uv, 0.0).rgb;
  var print = _vgsl_a8d28296__linear(printedColor);
  if (params.customMaterial.w > 0.5) {
    let ink = 1.0 - smoothstep(0.35, 0.87, max(max(printedColor.r, printedColor.g), printedColor.b));
    let lower = step(vec2f(76.0, 958.0) / vec2f(1024.0, 1536.0), uv);
    let upper = step(uv, vec2f(464.0, 1346.0) / vec2f(1024.0, 1536.0));
    let qr = select(lower.x * lower.y * upper.x * upper.y, textureSampleLevel(designMask, printSampler, uv, 0.0).g, params.designMode.x > 1.5);
    print = mix(_vgsl_a8d28296__ribbonColor(_vgsl_a8d28296__materialSample(uv).x, uv), print, max(ink, qr));
  }
  if (params.designMode.x > 1.5 && params.designMode.z > 0.0) {
    let protection = textureSampleLevel(designMask, printSampler, uv, 0.0).g;
    print = _vgsl_a8d28296__linear(_vgsl_a8d28296__applyDesignEffects(pow(max(print, vec3f(0.0)), vec3f(1.0 / 2.2)), uv, true, protection));
  }
  let front = pow(max(-normal.z, 0.0), 12.0);
  var optical = normal;
  if (params.coating.w > 0.0) {
    let field = _vgsl_a8d28296__materialSample(uv);
    let slope = field.yz * params.coating.x * 0.045;
    optical = normalize(mix(normal, normalize(vec3f(slope.x, -slope.y, -1.0)), front));
  }
  let reflected = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, optical))) * mix(1.0, 1.05 - params.customMaterial.x * 0.7, params.customMaterial.z);
  let edge = exp(-abs(_vgsl_a8d28296__roundedRect(p.xy, vec2f(0.746, 1.13), 0.109) + 0.012) * 310.0);
  let film = select(_vgsl_a8d28296__spectrum(p.y * 0.20 + params.light.x * 0.2 + params.signature.z), vec3f(0.33, 0.48, 0.72), params.topographic > 0.5);
  let sheenMask = smoothstep(0.73, 0.95, uv.x) * mix(0.02, 0.055, params.coating.w);
  let sheen = reflected * sheenMask * select(1.0, 0.2, params.surfaceKind > 0.5 && params.surfaceKind < 1.5);
  return mix(reflected * 0.25, print + sheen, front) + edge * (reflected * 0.25 + film * 0.15);
}

fn _vgsl_a8d28296__proceduralCard(p: vec3f, rd: vec3f, geometric: vec3f) -> vec3f {
  let uv = clamp(vec2f(p.x / _vgsl_a8d28296__printSize().x + 0.5, 0.5 - p.y / _vgsl_a8d28296__printSize().y), vec2f(0.001), vec2f(0.999));
  let field = _vgsl_a8d28296__materialSample(uv);
  let front = pow(max(geometric.z, 0.0), 12.0);
  let faceCenter = vec2f((params.faceRegion.x - 0.5) * _vgsl_a8d28296__printSize().x, (0.5 - params.faceRegion.y) * _vgsl_a8d28296__printSize().y);
  let radius = max(params.faceRegion.z, 0.1);
  let offset = p.xy - faceCenter;
  let faceOffset = offset / vec2f(radius * 1.8, radius * 2.8);
  let squaredOffset = faceOffset * faceOffset;
  let identity = smoothstep(0.2, 0.85, exp(-dot(squaredOffset, squaredOffset)));
  let footer = 1.0 - smoothstep(0.69, 0.88, uv.y);
  let mask = params.coating.w * (1.0 - identity) * footer;
  let slope = field.yz * params.coating.x * 0.075;
  let normal = normalize(mix(geometric, normalize(vec3f(-slope, 1.0)), front));
  let lens = slope * params.coating.y * 0.085 * mask;
  let chromatic = lens * params.customMaterial.y * 0.24;
  let r = _vgsl_a8d28296__printed(uv + lens + chromatic);
  let g = _vgsl_a8d28296__printed(uv + lens);
  let b = _vgsl_a8d28296__printed(uv + lens - chromatic);
  var photo = vec3f(r.r, g.g, b.b);
  if (params.customMaterial.w > 0.5) {
    let lower = step(vec2f(174.0, 510.0) / vec2f(1024.0, 1536.0), uv);
    let upper = step(uv, vec2f(850.0, 1174.0) / vec2f(1024.0, 1536.0));
    let portraitMask = select(lower.x * lower.y * upper.x * upper.y, textureSampleLevel(designMask, printSampler, uv, 0.0).r, params.designMode.x > 1.5);
    photo = mix(_vgsl_a8d28296__ribbonColor(field.x, uv), _vgsl_a8d28296__printed(uv), portraitMask);
  }
  if (params.designMode.x > 1.5 && params.designMode.y > 0.0) {
    let protection = textureSampleLevel(designMask, printSampler, uv, 0.0).r;
    photo = _vgsl_a8d28296__linear(_vgsl_a8d28296__applyDesignEffects(pow(max(photo, vec3f(0.0)), vec3f(1.0 / 2.2)), uv, false, protection));
  }
  let facing = clamp(dot(-rd, normal), 0.0, 1.0);
  let reflection = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, normal)));
  let roughness = params.customMaterial.x;
  let environment = mix(reflection, vec3f(dot(reflection, vec3f(0.2126, 0.7152, 0.0722))), roughness * 0.3);
  let thickness = 360.0 + field.x * 180.0;
  let film = 0.5 + 0.5 * cos(12.56637 * thickness * max(0.3, facing) / vec3f(650.0, 510.0, 475.0));
  let metal = params.surfaceKind > 1.5;
  let satin = params.surfaceKind > 0.5 && !metal;
  let fresnel = _vgsl_a8d28296__dielectricFresnel(1.52, facing);
  var coating = photo * (0.92 + field.x * 0.10 * params.coating.x);
  if (metal) {
    coating = mix(photo * 0.75, environment * vec3f(0.72, 0.79, 0.88), 0.64 - roughness * 0.3);
    coating += film * params.coating.z * 0.22;
  } else {
    let reflectance = mix(0.038 + fresnel * 0.3, 0.016, f32(satin));
    coating += environment * reflectance * (1.0 - roughness * 0.65);
    coating += film * params.coating.z * (0.055 + 0.09 * (1.0 - facing));
    let caustic = exp(-pow(abs((field.x - 0.12) / 0.055), 2.0)) * params.coating.y;
    coating += mix(vec3f(0.8, 0.91, 1.0), film, params.coating.z) * caustic * 0.08;
  }
  var color = mix(photo, coating, mask);
  if (params.topographic > 0.5) {
    let contour = 1.0 - smoothstep(0.01, 0.045, abs(fract(field.x * 13.0) - 0.5));
    let lightSweep = exp(-pow(abs((uv.x - 0.5 - params.light.x * 0.7) * 3.0), 2.0));
    let trace = mix(vec3f(0.20, 0.30, 0.48), vec3f(0.48, 0.64, 0.96), lightSweep);
    color += trace * contour * (1.0 - identity) * footer * 0.20;
  }
  color = mix(environment * select(vec3f(0.38, 0.45, 0.57), vec3f(0.68, 0.74, 0.84), metal), color, front);
  let lettering = textureSampleLevel(foil, printSampler, uv, 0.0);
  color = mix(color, _vgsl_a8d28296__linear(lettering.rgb) * (0.90 + film * params.coating.z * 0.07), lettering.a * front);
  let perimeter = _vgsl_a8d28296__roundedRect(p.xy, vec2f(0.746, 1.13), 0.109);
  let rim = exp(-abs(perimeter + 0.012) * 600.0);
  let bezel = exp(-abs(perimeter) * 220.0);
  color += rim * (environment * 0.27 + film * params.coating.z * 0.22 + 0.12);
  color += bezel * environment * 0.12;
  let slot = abs(_vgsl_a8d28296__roundedRect(p.xy - vec2f(0.0, 1.008), vec2f(0.163, 0.032), 0.028));
  color += exp(-slot * 400.0) * environment * 0.20;
  return max(color, vec3f(0.0));
}

fn _vgsl_a8d28296__smoothCard(p: vec3f, rd: vec3f, geometric: vec3f) -> vec3f {
  let uv = clamp(vec2f(p.x / _vgsl_a8d28296__printSize().x + 0.5, 0.5 - p.y / _vgsl_a8d28296__printSize().y), vec2f(0.001), vec2f(0.999));
  let photo = _vgsl_a8d28296__printed(uv);
  let front = pow(max(geometric.z, 0.0), 12.0);
  let chrome = params.surfaceKind > 1.5;
  let thermal = params.thermal > 0.5;
  let faceCenter = vec2f((params.faceRegion.x - 0.5) * _vgsl_a8d28296__printSize().x, (0.5 - params.faceRegion.y) * _vgsl_a8d28296__printSize().y);
  let offset = p.xy - faceCenter;
  let radius = max(params.faceRegion.z, 0.1);
  let identity = exp(-pow(abs(offset.x / (radius * 1.6)), 4.0) - pow(abs(offset.y / (radius * 2.6)), 4.0));
  let warp = params.fluidity * 0.045;
  let wave = vec2f(
    sin(p.y * 2.2 + params.time * 0.22 + params.signature.z * 6.28) * warp,
    cos(p.x * 2.8 - params.time * 0.16) * warp
  );
  let slope = vec2f(p.x * 0.18 + p.y * 0.06, p.y * 0.06 - p.x * 0.03) + wave;
  let normal = normalize(mix(geometric, normalize(vec3f(slope, 1.0)), front));
  let reflected = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, normal))) * mix(1.0, 1.05 - params.customMaterial.x * 0.7, params.customMaterial.z);
  let facing = clamp(dot(-rd, normal), 0.0, 1.0);
  let perimeter = _vgsl_a8d28296__roundedRect(p.xy, vec2f(0.746, 1.13), 0.109);
  let edge = exp(-abs(perimeter + 0.012) * 100.0);
  let hairline = exp(-abs(perimeter + 0.013) * 760.0);
  let scratch = _vgsl_a8d28296__hash(floor(p.xy * vec2f(3100.0, 1800.0)));
  let grain = (scratch - 0.5) * select(0.018, 0.075, thermal);
  var color = photo * (0.96 + grain);
  if (chrome) {
    let sweep = p.x + p.y * 0.38 - params.light.x * 1.2 + params.light.y * 0.35;
    let broad = exp(-pow(abs((sweep + 0.39) / 0.31), 2.0));
    let strip = exp(-pow(abs((sweep - 0.53) / (0.055 + params.customMaterial.x * 0.11)), 2.0));
    let darkBand = exp(-pow(abs((sweep - 0.16) / 0.19), 2.0));
    let metallic = vec3f(0.88, 0.94, 1.0) * (0.025 + broad * 0.31 + strip * 0.42);
    let portraitMask = 1.0 - identity * 0.72;
    let footerMask = 1.0 - smoothstep(0.65, 0.86, uv.y) * 0.93;
    color = photo * (0.88 + broad * 0.35 - darkBand * 0.29);
    color += (reflected * 0.08 + metallic) * portraitMask * footerMask;
    color = mix(reflected * vec3f(0.62, 0.68, 0.75), color, front);
    color += edge * reflected * 0.20 + hairline * vec3f(0.75, 0.86, 1.0);
    color += grain * 0.025;
  } else {
    let clearcoat = _vgsl_a8d28296__dielectricFresnel(1.46, facing);
    color += reflected * clearcoat * 0.10 * (1.0 - identity * 0.80);
    let warm = mix(vec3f(0.85, 0.018, 0.17), vec3f(1.0, 0.27, 0.012), 0.5 + 0.5 * sin(p.y * 3.6 + p.x * 2.0));
    let inkEdge = select(vec3f(0.27, 0.36, 0.48), warm, thermal);
    let wear = 0.38 + scratch * 0.62;
    let edgeBloom = exp(-abs(perimeter + 0.015) * 37.0);
    color = mix(inkEdge * 0.16, color, front);
    color += (edge * 0.40 + edgeBloom * 0.18) * inkEdge * wear;
    color += hairline * mix(vec3f(0.55), inkEdge, 0.65) * 0.4;
    if (thermal) {
      let heat = min(1.0, _vgsl_a8d28296__heatSpot(p.xy, params.heat0) + _vgsl_a8d28296__heatSpot(p.xy, params.heat1) * 0.72 + _vgsl_a8d28296__heatSpot(p.xy, params.heat2) * 0.48 + _vgsl_a8d28296__heatSpot(p.xy, params.heat3) * 0.25);
      let pigment = mix(vec3f(0.9, 0.025, 0.045), vec3f(1.0, 0.53, 0.035), heat);
      color = mix(color, color * 0.68 + pigment * 0.5, heat * (1.0 - identity * 0.45) * (1.0 - smoothstep(0.70, 0.84, uv.y)));
    }
  }
  let lettering = textureSampleLevel(foil, printSampler, uv, 0.0);
  color += _vgsl_a8d28296__spectrum(p.y * 0.35 + params.light.x * 0.2 + params.signature.z) * edge * params.customMaterial.y * 0.2;
  let foilColor = _vgsl_a8d28296__linear(lettering.rgb) * select(0.90, 0.88 + dot(reflected, vec3f(0.04)), chrome);
  color = mix(color, foilColor, lettering.a * front);
  let slot = abs(_vgsl_a8d28296__roundedRect(p.xy - vec2f(0.0, 1.008), vec2f(0.163, 0.032), 0.028));
  if (params.designMode.w < 0.5) { color += exp(-slot * 400.0) * select(vec3f(0.12, 0.10, 0.18), reflected * 0.30, chrome); }
  return max(color, vec3f(0.0));
}

fn _vgsl_a8d28296__applyDesignEffects(inputColor: vec3f, uv: vec2f, back: bool, protectedMask: f32) -> vec3f {
  var color = inputColor;
  let count = i32(select(params.designMode.y, params.designMode.z, back));
  let rowStart = select(0, 24, back);
  for (var i = 0; i < min(count, 24); i++) {
    let box = textureLoad(designEffects, vec2i(0, rowStart + i), 0);
    let config = textureLoad(designEffects, vec2i(1, rowStart + i), 0);
    let local = (uv - box.xy) / max(box.zw, vec2f(0.001));
    if (all(local >= vec2f(0.0)) && all(local <= vec2f(1.0))) {
      let a = textureLoad(designEffects, vec2i(2, rowStart + i), 0).rgb;
      let b = textureLoad(designEffects, vec2i(3, rowStart + i), 0).rgb;
      let c = textureLoad(designEffects, vec2i(4, rowStart + i), 0).rgb;
      let kind = i32(round(config.x * 8.0));
      let scale = config.y * 6.0;
      let t = params.time * 0.2;
      let q = local + params.light * 0.07;
      var wave = sin(q.x * 5.0 * scale + sin(q.y * 4.0 + t) * 2.5 - t);
      var line = 0.0;
      if (kind == 2) {
        wave = sin((length(q - vec2f(0.4, 0.6)) * 12.0 + sin(q.x * 8.0 + t) * 0.7) * scale);
        line = pow(abs(wave), 18.0) * 0.18;
      } else if (kind == 3) {
        wave = sin(length((q - vec2f(0.5)) * vec2f(1.0, 0.8)) * 30.0 * scale - t);
        line = pow(abs(wave), 22.0) * 0.2;
      } else if (kind == 4) {
        wave = _vgsl_a8d28296__hash(floor(q * 1000.0)) * 0.3;
      }
      let band = 0.5 + 0.5 * wave;
      var art = mix(a, b, smoothstep(0.05, 0.7, band));
      art = mix(art, c, smoothstep(0.55, 0.97, band));
      art += line;
      if (kind == 5) {
        let position = vec2f((local.x - 0.5) * 1.49, (0.5 - local.y) * 2.26);
        let time = params.time * 0.2;
        let bend = sin(position.y * 2.4 + time * 0.22 + params.signature.x * 1.7) * 0.28 + sin(position.y * 1.15 - time * 0.14) * 0.13;
        let offset = position - params.light * vec2f(0.745, -1.13);
        let touch = exp(-dot(offset, offset) * 4.0) * (params.light.x * 0.20 - params.light.y * 0.12);
        let flow = (position.x * 0.9 + bend + touch) * scale;
        let pink = exp(-pow(abs((flow + 0.03) / 0.22), 2.0)) * 0.92;
        let violet = exp(-pow(abs((flow - 0.13) / 0.15), 2.0)) * 0.54;
        let cyan = exp(-pow(abs((flow - 0.35) / 0.13), 2.0)) * 0.72;
        let halo = exp(-pow(abs((flow + 0.31) / 0.14), 2.0)) * 0.48;
        art = mix(a, b, pink);
        art = mix(art, mix(b, c, 0.34), violet);
        art = mix(art, c, cyan);
        art = mix(art, mix(c, a, 0.15), halo);
        art += (_vgsl_a8d28296__hash(floor(uv * vec2f(1024.0, 1536.0))) - 0.5) * 0.022;
      }
      let border = smoothstep(0.0, 0.007, min(min(local.x, local.y), min(1.0-local.x, 1.0-local.y)));
      color = mix(color, art, config.z * (1.0 - protectedMask) * border);
    }
  }
  return color;
}

fn _vgsl_a8d28296__layeredDesignCard(p: vec3f, rd: vec3f, normal: vec3f) -> vec3f {
  let back = p.z < 0.0;
  let uv = clamp(vec2f(select(p.x, -p.x, back) / _vgsl_a8d28296__printSize().x + 0.5, 0.5 - p.y / _vgsl_a8d28296__printSize().y), vec2f(0.0), vec2f(1.0));
  var color = textureSampleLevel(portrait, printSampler, uv, 0.0).rgb;
  if (back) { color = textureSampleLevel(reversePrint, printSampler, uv, 0.0).rgb; }
  let mask = textureSampleLevel(designMask, printSampler, uv, 0.0);
  let protectedMask = select(mask.r, mask.g, back);
  color = _vgsl_a8d28296__applyDesignEffects(color, uv, back, protectedMask);
  color = _vgsl_a8d28296__linear(color);
  let facing = abs(dot(normal, -rd));
  let rim = pow(1.0 - facing, 3.0);
  let reflected = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, normal)));
  let finish = params.surfaceKind;
  let roughness = clamp(params.customMaterial.x, 0.0, 1.0);
  let strength = select(0.025, 0.22, finish > 1.5) * (1.0 - roughness * 0.85);
  color += reflected * (rim * 0.38 + strength * (1.0-protectedMask));
  color += _vgsl_a8d28296__spectrum(uv.x + uv.y * 0.4 + params.light.x * 0.3) * params.customMaterial.y * (rim * 0.3 + 0.16 * (1.0-protectedMask)) * (1.0 - roughness * 0.5);
  return max(color, vec3f(0.0));
}


// Layered cards: the print sits on a physical stock tuned by per-card optics (designEffects
// row 0, texels 8–14). The finish map (foil texture) marks foil (r front, g back) and front
// relief (b). Stock: designMode.w 1 coated, 2 metal, 3 holographic, 4 soft-touch.
struct _vgsl_a8d28296__CardOptics {
  grain: i32,
  angle: f32,
  center: vec2f,
  foil: vec4f,
  light: vec3f,
  hasSpectrum: bool,
  spectrumA: vec3f,
  spectrumB: vec3f,
  spectrumC: vec3f,
  sparkle: f32,
  relief: f32,
  grainStrength: f32,
  sheen: f32,
  radial: bool,
}

fn _vgsl_a8d28296__cardOptics() -> _vgsl_a8d28296__CardOptics {
  let t8 = textureLoad(designEffects, vec2i(8, 0), 0);
  let t9 = textureLoad(designEffects, vec2i(9, 0), 0);
  let t10 = textureLoad(designEffects, vec2i(10, 0), 0);
  let t11 = textureLoad(designEffects, vec2i(11, 0), 0);
  let t12 = textureLoad(designEffects, vec2i(12, 0), 0);
  let t13 = textureLoad(designEffects, vec2i(13, 0), 0);
  let t14 = textureLoad(designEffects, vec2i(14, 0), 0);
  var o: _vgsl_a8d28296__CardOptics;
  o.grain = i32(round(t8.x * 4.0));
  o.angle = t8.y * 3.14159265;
  o.center = t8.zw;
  o.foil = t9;
  o.light = select(vec3f(0.95, 0.97, 1.0), _vgsl_a8d28296__linear(t10.rgb), t10.a > 0.5);
  o.hasSpectrum = t11.a > 0.5;
  o.spectrumA = _vgsl_a8d28296__linear(t11.rgb);
  o.spectrumB = _vgsl_a8d28296__linear(t12.rgb);
  o.spectrumC = _vgsl_a8d28296__linear(t13.rgb);
  o.sparkle = t12.a;
  o.relief = t13.a;
  o.grainStrength = t14.x;
  o.sheen = t14.y;
  o.radial = t14.z > 0.5;
  return o;
}

fn _vgsl_a8d28296__luma(color: vec3f) -> f32 { return dot(color, vec3f(0.2126, 0.7152, 0.0722)); }

// The card's own three-stop spectrum, or the full rainbow when none is set.
fn _vgsl_a8d28296__cardSpectrum(o: _vgsl_a8d28296__CardOptics, phase: f32) -> vec3f {
  if (!o.hasSpectrum) { return _vgsl_a8d28296__spectrum(phase); }
  let t = fract(phase) * 3.0;
  let ab = mix(o.spectrumA, o.spectrumB, smoothstep(0.0, 1.0, t));
  let bc = mix(o.spectrumB, o.spectrumC, smoothstep(1.0, 2.0, t));
  let ca = mix(o.spectrumC, o.spectrumA, smoothstep(2.0, 3.0, t));
  return select(select(ca, bc, t < 2.0), ab, t < 1.0);
}

// Grain streaks in the card's own direction: straight, rays from a center, or rings.
fn _vgsl_a8d28296__cardGrain(o: _vgsl_a8d28296__CardOptics, uv: vec2f) -> f32 {
  let aspect = vec2f(1.587, 1.0);
  let q = (uv - o.center) * aspect;
  var coordinate = 0.0;
  var along = 0.0;
  if (o.grain == 2) {
    coordinate = atan2(q.y, q.x) * 520.0;
    along = length(q) * 6.0;
  } else if (o.grain == 3) {
    coordinate = length(q) * 1300.0;
    along = atan2(q.y, q.x) * 3.0;
  } else {
    let direction = vec2f(cos(o.angle), sin(o.angle));
    coordinate = dot(uv * aspect, vec2f(-direction.y, direction.x)) * 1400.0;
    along = dot(uv * aspect, direction) * 7.0;
  }
  return _vgsl_a8d28296__hash(vec2f(floor(coordinate), floor(along))) * 0.6 + _vgsl_a8d28296__hash(vec2f(floor(coordinate * 0.5), 3.0)) * 0.4 - 0.5;
}

fn _vgsl_a8d28296__designedCard(p: vec3f, rd: vec3f, geometric: vec3f) -> vec3f {
  let o = _vgsl_a8d28296__cardOptics();
  let back = p.z < 0.0;
  let uv = clamp(vec2f(select(p.x, -p.x, back) / _vgsl_a8d28296__printSize().x + 0.5, 0.5 - p.y / _vgsl_a8d28296__printSize().y), vec2f(0.0), vec2f(1.0));
  var print = textureSampleLevel(portrait, printSampler, uv, 0.0).rgb;
  if (back) { print = textureSampleLevel(reversePrint, printSampler, uv, 0.0).rgb; }
  let mask = textureSampleLevel(designMask, printSampler, uv, 0.0);
  let inked = select(mask.r, mask.g, back);
  let base = _vgsl_a8d28296__linear(_vgsl_a8d28296__applyDesignEffects(print, uv, back, inked));
  let finish = textureSampleLevel(foil, printSampler, uv, 0.0);
  let foiled = select(finish.r, finish.g, back);
  let stock = i32(round(params.designMode.w));
  let roughness = clamp(params.customMaterial.x, 0.0, 1.0);
  let iridescence = params.customMaterial.y;

  // Relief tilts the normal along the edges of raised artwork.
  let texel = 3.0 / vec2f(textureDimensions(foil));
  var normal = geometric;
  var relief = vec2f(0.0);
  if (!back) {
    let hx = textureSampleLevel(foil, printSampler, uv + vec2f(texel.x, 0.0), 0.0).b - textureSampleLevel(foil, printSampler, uv - vec2f(texel.x, 0.0), 0.0).b;
    let hy = textureSampleLevel(foil, printSampler, uv + vec2f(0.0, texel.y), 0.0).b - textureSampleLevel(foil, printSampler, uv - vec2f(0.0, texel.y), 0.0).b;
    relief = vec2f(hx, -hy) * (0.4 + o.relief * 1.6);
    normal = normalize(geometric - vec3f(relief * 0.9, 0.0) * sign(geometric.z));
  }
  let facing = clamp(abs(dot(normal, -rd)), 0.0, 1.0);
  let reflected = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, normal)));
  let fresnel = _vgsl_a8d28296__dielectricFresnel(1.5, facing);
  let front = pow(abs(geometric.z), 10.0);

  // The moving highlight: a straight band, or a ring around the center for radial designs.
  let offset = (uv - o.center) * vec2f(1.587, 1.0);
  let tilt = params.light.x * 0.85 - params.light.y * 0.25 + params.angles.y * 0.9 - params.angles.x * 0.4;
  var sweep = uv.x * 0.9 + uv.y * 0.32 - tilt;
  if (o.radial) { sweep = length(offset) * 1.1 - tilt * 0.8 + 0.2; }
  let width = mix(0.05, 0.34, o.sheen) + roughness * 0.12;
  let band = exp(-pow(abs((sweep - 0.55) / width), 2.0));
  let broad = exp(-pow(abs((sweep - 0.45) / 0.42), 2.0));
  let grain = _vgsl_a8d28296__cardGrain(o, uv) * select(0.0, o.grainStrength, o.grain > 0);
  let glint = pow(_vgsl_a8d28296__hash(floor(uv * vec2f(700.0, 441.0)) + floor(params.angles * 24.0)), 30.0) * o.sparkle;

  var surface = base;
  if (stock == 2) {
    // Metal: the print is an anodized tint, the grain runs the design's own direction.
    let tint = mix(vec3f(_vgsl_a8d28296__luma(base)), base, 0.88);
    let highlight = mix(o.light, tint * 2.2 + 0.1, 0.3);
    surface = tint * (0.62 + broad * 0.5 + _vgsl_a8d28296__luma(reflected) * 0.12) * (1.0 + grain * 0.5);
    surface += highlight * band * (0.62 - roughness * 0.4) * (1.0 + grain * 1.4);
    surface += o.light * glint * band;
  } else if (stock == 3) {
    // Holographic: the card's spectrum appears where the light catches the laminate.
    var phase = uv.x * 1.6 + uv.y * 0.9 + tilt * 2.0;
    if (o.radial) { phase = length(offset) * 3.2 + sin(atan2(offset.y, offset.x) * 6.0) * 0.03 - tilt * 1.8; }
    let grating = sin(phase * 180.0) * 0.5 + 0.5;
    let rainbow = _vgsl_a8d28296__cardSpectrum(o, phase + grating * 0.05);
    let strength = (0.02 + broad * 0.05 + band * 0.36) * (0.4 + iridescence);
    surface = base + rainbow * strength * (1.0 - _vgsl_a8d28296__luma(base) * 0.5);
    surface += reflected * fresnel * 0.10 + glint * 0.8 * (band + 0.25) * rainbow;
    surface *= 1.0 + grain * 0.2;
  } else if (stock == 4) {
    // Soft-touch: the laminate scatters light; a low, wide sheen in the light's color.
    let tooth = (_vgsl_a8d28296__hash(floor(uv * vec2f(1600.0, 1008.0))) - 0.5) * 0.035;
    surface = base * (0.97 + tooth + grain * 0.1) + vec3f(_vgsl_a8d28296__luma(reflected)) * 0.03 + o.light * broad * 0.04;
    surface += o.light * glint * 0.4;
  } else {
    // Coated print keeps its prism, satin or chrome surface; the highlight takes the card's light.
    let chrome = params.surfaceKind > 1.5;
    let strength = select(0.03, 0.24, chrome) * (1.0 - roughness * 0.85);
    surface = base + reflected * (strength + fresnel * 0.12) + o.light * band * 0.10 * (1.0 - roughness);
    surface += _vgsl_a8d28296__cardSpectrum(o, uv.x + uv.y * 0.4 + tilt) * iridescence * (0.16 + band * 0.24) * (1.0 - roughness * 0.5);
    surface += o.light * glint * (0.5 + band) + grain * 0.04;
  }
  // Protected ink stays legible: it only receives the laminate's clear reflection.
  let ink = base + reflected * select(0.03, 0.0, stock == 4) * (0.5 + fresnel);
  var color = mix(surface, ink, inked);

  // Foil: the card's foil color (or the layer's ink) becomes a mirror that flares with the light.
  let metalInk = select(base * 1.5, mix(_vgsl_a8d28296__linear(o.foil.rgb), base * 1.5, 0.2), o.foil.a > 0.5);
  let foilTint = mix(vec3f(0.6), metalInk, 0.78);
  let foilFlare = band * 1.6 + broad * 0.35 + fresnel * 0.4;
  let foilColor = foilTint * (0.24 + reflected * 0.5 + foilFlare) + _vgsl_a8d28296__cardSpectrum(o, sweep * 2.4 + uv.y) * iridescence * band * 0.3;
  color = mix(color, foilColor + o.light * glint * 0.6, foiled * front);

  // Embossed edges: lit toward the light, shadowed away from it.
  let lightDirection = normalize(vec2f(-0.6 + params.light.x - params.angles.y, 0.7 - params.light.y + params.angles.x));
  let edge = dot(relief, lightDirection) * 1.6;
  color *= 1.0 + clamp(edge, -0.5, 0.65) * front;

  // The card's own edge: a thin bevel lit in the card's light color, brighter on metal.
  let rim = pow(1.0 - clamp(abs(dot(geometric, -rd)), 0.0, 1.0), 3.0);
  color += mix(reflected, o.light * _vgsl_a8d28296__luma(reflected) * 1.3, 0.4) * rim * select(0.34, 0.6, stock == 2);
  return max(color, vec3f(0.0));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.resolution.x / params.resolution.y;
  let screen = vec2f((uv.x * 2.0 - 1.0) * aspect, 1.0 - uv.y * 2.0);
  let originWorld = vec3f(0.0, 0.0, 3.7);
  let card = params.designMode.w > 0.5;
  let framing = min(1.0, aspect / select(0.64, 1.58, card));
  let focalLength = select(2.58, 3.55, card) * framing;
  let directionWorld = normalize(vec3f(screen, -focalLength));
  let ro = _vgsl_a8d28296__toLocal(originWorld - vec3f(0.0, params.lift, 0.0));
  let rd = _vgsl_a8d28296__toLocal(directionWorld);
  var distance = max(length(ro) - 1.55, 0.0);
  var hit = false;
  let tolerance = 0.18 / params.resolution.y;
  var p = ro + rd * distance;
  for (var i = 0; i < 72; i++) {
    p = ro + rd * distance;
    let stepDistance = _vgsl_a8d28296__badgeDistance(p);
    if (stepDistance < tolerance) { hit = true; break; }
    distance += stepDistance;
    if (distance > 6.0) { break; }
  }
  let shadowPosition = screen - vec2f(0.02 + params.angles.y * 0.09, -0.92) * framing;
  let shadowFade = smoothstep(-1.0, -0.90, screen.y) * smoothstep(0.0, 0.18, aspect - abs(screen.x));
  let shadow = exp(-pow(abs(shadowPosition.x / (0.55 * framing)), 2.0) - pow(abs(shadowPosition.y / (0.10 * framing)), 2.0)) * 0.18 * shadowFade;
  if (!hit) {
    let plane = ro + rd * (-ro.z / rd.z);
    let slot = _vgsl_a8d28296__roundedRect(plane.xy - vec2f(0.0, 1.008), vec2f(0.156, 0.025), 0.024);
    if (!card && params.surfaceKind > 0.5 && slot < 0.0) { return vec4f(0.0006, 0.0008, 0.0012, 1.0); }
    return vec4f(vec3f(0.19, 0.19, 0.24) * shadow, shadow);
  }

  let geometric = _vgsl_a8d28296__geometricNormal(p);
  if (params.designMode.x > 0.5 && params.designMode.x < 1.5) {
    if (params.designMode.w > 0.5) { return vec4f(_vgsl_a8d28296__designedCard(p, rd, geometric), 1.0); }
    return vec4f(_vgsl_a8d28296__layeredDesignCard(p, rd, geometric), 1.0);
  }
  if (p.z < -0.005) { return vec4f(_vgsl_a8d28296__reverseCard(p, rd, geometric), 1.0); }
  if (params.coating.w > 0.0) { return vec4f(_vgsl_a8d28296__proceduralCard(p, rd, geometric), 1.0); }
  if (params.surfaceKind > 0.5) { return vec4f(_vgsl_a8d28296__smoothCard(p, rd, geometric), 1.0); }
  let facets = _vgsl_a8d28296__facet(p.xy);
  let face = pow(max(geometric.z, 0.0), 16.0);
  let footer = smoothstep(-0.77, -0.55, p.y);
  let faceCenter = vec2f((params.faceRegion.x - 0.5) * _vgsl_a8d28296__printSize().x, (0.5 - params.faceRegion.y) * _vgsl_a8d28296__printSize().y);
  let faceRadius = max(params.faceRegion.z, 0.1);
  let faceOffset = p.xy - faceCenter;
  let identity = exp(-pow(abs(faceOffset.x / (faceRadius * _vgsl_a8d28296__printSize().x)), 4.0) - pow(abs(faceOffset.y / (faceRadius * _vgsl_a8d28296__printSize().y)), 4.0));
  let flowPhase = params.time * 0.38 + params.signature.z * 6.283;
  let flow = vec2f(
    sin(p.y * 7.2 + p.x * 2.8 + flowPhase) * 0.55 + cos(p.y * 4.1 - p.x * 6.3 - flowPhase * 0.73) * 0.45,
    cos(p.x * 6.2 - p.y * 2.9 + flowPhase * 0.81) * 0.55 + sin(p.y * 3.8 + p.x * 4.7 - flowPhase * 0.6) * 0.45
  );
  let edgeFade = smoothstep(0.0, 0.07, -_vgsl_a8d28296__roundedRect(p.xy, select(vec2f(0.74, 1.12), vec2f(1.19, 0.746), params.designMode.w > 0.5), 0.10));
  let flowMask = face * footer * (1.0 - identity) * edgeFade;
  let flowAmount = mix(0.018, 0.10, params.fluidity) * (1.0 + params.activity * 0.8);
  let softenedFacets = facets.xy * mix(0.48, 0.76, smoothstep(0.0, 0.022, facets.w));
  let opticalNormal = softenedFacets + flow * flowAmount * flowMask;
  let facetedNormal = normalize(vec3f(opticalNormal, sqrt(max(1.0 - dot(opticalNormal, opticalNormal), 0.05))));
  var normal = normalize(mix(geometric, facetedNormal, face * footer * 0.78));
  if (dot(normal, -rd) < 0.0) { normal = -normal; }
  let facing = clamp(dot(-rd, normal), 0.0, 1.0);
  let fresnel = _vgsl_a8d28296__dielectricFresnel(1.52, facing);
  let dispersion = 0.095 * params.spectral;
  let depth = (0.025 + facets.z * 0.48) * footer;
  let eyeLeft = exp(-pow(abs((faceOffset.x + faceRadius * 0.67) / (faceRadius * 0.48)), 4.0) - pow(abs((faceOffset.y - faceRadius * 0.28) / (faceRadius * 0.26)), 4.0));
  let eyeRight = exp(-pow(abs((faceOffset.x - faceRadius * 0.67) / (faceRadius * 0.48)), 4.0) - pow(abs((faceOffset.y - faceRadius * 0.28) / (faceRadius * 0.26)), 4.0));
  let transmissionNormal = normalize(mix(geometric, normal, 0.50 * (1.0 - max(identity * 0.82, max(eyeLeft, eyeRight) * 0.92))));
  let r = _vgsl_a8d28296__transmission(p, rd, transmissionNormal, 1.52 - dispersion, depth);
  let g = _vgsl_a8d28296__transmission(p, rd, transmissionNormal, 1.52, depth);
  let b = _vgsl_a8d28296__transmission(p, rd, transmissionNormal, 1.52 + dispersion, depth);
  var transmitted = vec3f(r.r, g.g, b.b);

  let printEdge = _vgsl_a8d28296__roundedRect(p.xy, select(vec2f(0.737, 1.12), vec2f(1.187, 0.746), params.designMode.w > 0.5), 0.10);
  let printOpacity = 1.0 - smoothstep(-0.006, 0.008, printEdge);
  let reflectedDirection = _vgsl_a8d28296__toWorld(reflect(rd, normal));
  let headRegion = exp(-pow(abs(faceOffset.x / (faceRadius * 1.76)), 4.0) - pow(abs(faceOffset.y / (faceRadius * 3.04)), 6.0));
  let reflection = _vgsl_a8d28296__studio(reflectedDirection) * (1.0 - headRegion * 0.80);
  let rimEnvironment = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(refract(rd, geometric, 1.0 / 1.52)));
  let clearEdge = _vgsl_a8d28296__linear(_vgsl_a8d28296__background()) * vec3f(0.48, 0.56, 0.66) + rimEnvironment * 0.12;
  transmitted = mix(clearEdge, transmitted, printOpacity);
  transmitted += vec3f(0.004, 0.009, 0.018) * printOpacity;

  let filmPhase = params.signature.w * 0.2 + facets.z * 4.0 + (1.0 - facing) * 4.5 + params.light.x * 0.35;
  let film = _vgsl_a8d28296__spectrum(filmPhase);
  let filmAmount = params.spectral * (0.008 + pow(1.0 - facing, 1.5) * 0.085);
  let fresnelRgb = clamp(vec3f(fresnel) + film * filmAmount, vec3f(0.0), vec3f(1.0));
  var color = transmitted * (vec3f(1.0) - fresnelRgb) + reflection * fresnelRgb;
  let pearlEdge = exp(-pow(abs((abs(p.x) - 0.65) / 0.13), 2.0)) * (1.0 - identity);
  let pearlLight = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, geometric))) * vec3f(0.024, 0.026, 0.030);
  color += pearlLight * pearlEdge * face * footer;
  let panelLuminance = dot(reflection, vec3f(0.2126, 0.7152, 0.0722));
  let panelHighlight = smoothstep(0.7, 3.0, panelLuminance) * 0.006 * face;
  color += reflection * panelHighlight;

  let focusX = -0.42 + params.light.x * 0.58;
  let focusY = -0.23 - params.light.y * 0.60 + sin(params.time * 0.27) * 0.10;
  let leftSpot = exp(-pow(abs((p.x - focusX) / 0.28), 2.0) - pow(abs((p.y - focusY) / 0.50), 2.0));
  let rightSpot = exp(-pow(abs((p.x - 0.53 + params.light.x * 0.2) / 0.19), 2.0) - pow(abs((p.y - 0.62 + params.light.y * 0.5) / 0.32), 2.0));
  let seam = exp(-pow(abs((facets.w - 0.005) / 0.010), 2.0));
  let litFacet = smoothstep(0.035, 0.30, dot(opticalNormal, normalize(vec2f(-0.8 + params.light.x, 0.45 - params.light.y))));
  let caustic = seam * (leftSpot + rightSpot * 0.55) * litFacet * face * footer * (1.0 - identity * 0.86);
  let rainbow = _vgsl_a8d28296__spectrum(facets.w * 22.0 + dot(opticalNormal, vec2f(0.35, -0.25)) + params.light.x * 0.4);
  color += rainbow * caustic * params.spectral * 0.30;
  let ribbonCoordinate = p.x - focusX + (p.y - focusY) * 0.24 + sin(p.y * 5.0 + flowPhase) * mix(0.015, 0.08, params.fluidity);
  let ribbon = exp(-pow(abs(ribbonCoordinate / 0.035), 2.0)) * exp(-pow(abs((p.y - focusY) / 0.29), 2.0));
  let ribbonHalo = exp(-pow(abs(ribbonCoordinate / 0.12), 2.0)) * exp(-pow(abs((p.y - focusY) / 0.42), 2.0));
  let ribbonColor = mix(vec3f(0.82, 0.90, 1.0), _vgsl_a8d28296__spectrum(ribbonCoordinate * 7.0 + 0.12), params.spectral * 0.75);
  color += (ribbon * 0.29 + ribbonHalo * 0.028) * ribbonColor * face * footer * (1.0 - identity);

  let foilRay = refract(rd, geometric, 1.0 / 1.52);
  let foilPoint = p + foilRay * max((-0.015 - p.z) / min(foilRay.z, -0.1), 0.0);
  let foilUv = vec2f(foilPoint.x / _vgsl_a8d28296__printSize().x + 0.5, 0.5 - foilPoint.y / _vgsl_a8d28296__printSize().y);
  let lettering = textureSampleLevel(foil, printSampler, clamp(foilUv, vec2f(0.0), vec2f(1.0)), 0.0);
  let foilFilm = _vgsl_a8d28296__spectrum(foilUv.x * 0.46 + foilUv.y * 0.28 + params.light.x * 0.5 + params.angles.y * 0.7);
  let foilReflection = _vgsl_a8d28296__studio(_vgsl_a8d28296__toWorld(reflect(rd, geometric)));
  let foilColor = _vgsl_a8d28296__linear(lettering.rgb) * (vec3f(0.76) + foilFilm * params.spectral * 0.17) + foilReflection * 0.038;
  color = mix(color, foilColor, lettering.a * printOpacity * face);

  let perimeter = _vgsl_a8d28296__roundedRect(p.xy, vec2f(0.746, 1.13), 0.109);
  let rim = exp(-abs(perimeter) * 620.0);
  let innerRim = exp(-abs(perimeter + 0.021) * 570.0);
  let polishedRim = exp(-abs(perimeter + 0.012) * 820.0);
  let rimLight = clamp(0.65 - p.x * 0.6 + p.y * 0.17 + dot(p.xy / max(length(p.xy), 0.001), params.light) * 0.55, 0.15, 1.4);
  color += rim * mix(vec3f(0.28), film * 0.42 + 0.13, params.spectral * 0.55) * rimLight;
  color += innerRim * vec3f(0.09, 0.12, 0.17);
  color += polishedRim * vec3f(0.55, 0.63, 0.74) * rimLight;
  let glintY = 0.61 - params.light.y * 0.85 + sin(params.time * 0.23) * 0.15;
  let edgeGlint = exp(-pow(abs((p.y - glintY) / 0.19), 2.0)) * smoothstep(0.58, 0.73, abs(p.x));
  color += (rim + polishedRim) * edgeGlint * mix(vec3f(1.0), film * 0.8 + 0.25, params.spectral * 0.65) * 0.75;
  let slotEdge = abs(_vgsl_a8d28296__roundedRect(p.xy - vec2f(0.0, 1.008), vec2f(0.163, 0.032), 0.028));
  color += exp(-slotEdge * 360.0) * rimEnvironment * 0.16;
  let surfaceTexture = _vgsl_a8d28296__hash(p.xy * 1630.0);
  let mist = (pow(surfaceTexture, 14.0) - 0.067) * (0.010 + panelHighlight * 0.6) * face * footer;
  color += mist;
  return vec4f(max(color, vec3f(0.0)), 1.0);
}
`;function l0(J,H,E){return J.document?.product==="card"&&!J.document.material.recipe?s0(J,E):n0(J,H)}function R1(J,H,E,D,p,T,a,X){let F=I0(E.document??{}),j=[F.width,F.height],N=!1,O,L,_,R,B,w,l,t,Q0,s,Z0,A0,x,I=H,G=E,W=D,S,r,e,$0,U,G0,K0="",b=H.side==="back"?Math.PI:0,w0=0,g=Array.from({length:4},()=>[0,0,0,0]),x0=0,d=0,V0,Y,v=0,U0=performance.now(),f=0,y=0,c=0,u=0,E0=0,R0=0,F0=0,L0=0,P0=0,O0=H.fluid?1:0,b0,v0,f0,h=new AbortController,K=window.matchMedia("(prefers-reduced-motion: reduce)"),y0=T||new URLSearchParams(window.location.search).has("still"),W0=($)=>{if(N)return;c0(),X($ instanceof Error?$.message:"No se pudo iniciar el vidrio.")},h0=($)=>{if(!O||N)return;let Q=r0($,W,!1,G,U);if(!A0)A0=O.device.createTexture({size:j,format:"rgba8unorm",usage:["texture_binding","copy_dst","render_attachment"],label:"portrait-print"});O.gpu.queue.copyExternalImageToTexture({source:Q},{texture:A0.gpu},j)},j0=($)=>{if(!L||!_||!R||!B||!w||!l||!t||!Q0)return;if(W.recipe?.field&&Z0&&s)$.pass(Z0,s);$.pass(R,_),$.pass(B,l),$.pass(w,t),$.pass(L,Q0)},D0=()=>{if(!O||!_||!L||N||T||document.hidden||I.active===!1||x)return;U0=performance.now(),x=a0(O,($)=>{if(!_||!L)return;try{let Q=performance.now(),Z=Math.min((Q-U0)/1000,0.05);U0=Q;let V=I.motion&&!K.matches&&!y0,C=I.side==="back"?Math.PI:0;[b,w0]=i0(b,w0,C,Z,K.matches||y0),J.dataset.side=Math.abs(C-b)<0.002?I.side==="back"?"back":"front":"turning",J.dataset.facing=String(Math.cos(b));for(let H0 of g)H0[2]=V?H0[2]*Math.exp(-Z*1.7):0;if(V)v+=Z*(0.84+i(G.signature).values[1]*0.32)*(W.recipe?W.recipe.motion.speed*2:1);let M=1-Math.exp(-Z*8);c+=(f-c)*M,u+=(y-u)*M;let P=Math.sin(v*0.26)*0.014,n=Math.sin(v*0.21)*0.023,z=K.matches?0:c*0.82+Math.sin(v*0.31)*0.19,m=K.matches?0:u*0.58+Math.sin(v*0.23)*0.14,A=Math.max(1,Math.ceil(Z/0.008333333333333333)),q=Z/A;for(let H0=0;H0<A;H0++)F0+=((z-E0)*48-F0*12)*q,L0+=((m-R0)*48-L0*12)*q,E0+=F0*q,R0+=L0*q;P0+=(Math.min(1,Math.hypot(F0,L0)*0.65)-P0)*(1-Math.exp(-Z*3)),O0=K.matches?I.fluid?1:0:O0+((I.fluid?1:0)-O0)*(1-Math.exp(-Z*5));let z0=Math.sin(b),k=W.recipe?W.recipe.motion.amplitude*2:1,H1=K.matches?0:(u*0.1+P)*k+z0*0.09,J1=(1+Math.cos(b))*0.5,N1=b+(K.matches?0:(c*0.21-0.075+n)*J1*k);_.set({params:{angles:I.flat?[0,b]:[H1,N1],roll:K.matches||I.flat?0:z0*-0.14,heat0:g[0],heat1:g[1],heat2:g[2],heat3:g[3],pointer:K.matches?[0,0]:[c*k,u*k],light:K.matches?[0,0]:[E0*k,R0*k],time:K.matches?0:v,activity:K.matches?0:P0,fluidity:O0,lift:K.matches||I.flat?0:Math.sin(v*0.34)*0.009*k+z0*0.045}}),s?.set({field:{time:K.matches?0:v,pointer:K.matches?[0,0]:W.recipe?.shader?[c,u]:[c*k,u*k]}}),j0($)}catch(Q){$.cancel(),queueMicrotask(()=>W0(Q))}})},m0=()=>{if(document.hidden)x?.stop(),x=void 0;else D0()},g0=($)=>{let Q=J.getBoundingClientRect();if(f=Math.max(-1,Math.min(1,(($.clientX-Q.left)/Q.width-0.5)*2)),y=Math.max(-1,Math.min(1,(($.clientY-Q.top)/Q.height-0.5)*2)),performance.now()-x0>60&&I.motion&&!K.matches&&I.side!=="back"){let Z=Q.width/Q.height,V=2.58*Math.min(1,Z/0.64);g=[[f*Z*3.7/V,-y*3.7/V,1,0],...g.slice(0,3)],x0=performance.now()}},M0=()=>{f=0,y=0},d0=($)=>{if($.key==="ArrowLeft")f=Math.max(-1,f-0.22);else if($.key==="ArrowRight")f=Math.min(1,f+0.22);else if($.key==="ArrowUp")y=Math.max(-1,y-0.22);else if($.key==="ArrowDown")y=Math.min(1,y+0.22);else if($.key==="Home")M0();else return;$.preventDefault()};J.addEventListener("pointermove",g0),J.addEventListener("pointerleave",M0),J.addEventListener("keydown",d0),document.addEventListener("visibilitychange",m0);let c0=()=>{if(N)return;N=!0,h.abort(),d++,S?.close(),S=void 0,J0(U),x?.stop(),x=void 0,b0?.(),v0?.(),f0?.(),J.removeEventListener("pointermove",g0),J.removeEventListener("pointerleave",M0),J.removeEventListener("keydown",d0),document.removeEventListener("visibilitychange",m0),L?.dispose(),O?.dispose()};async function O1(){let $=G.portraitUrl;if(Y&&Y.url!==$)Y.abort.abort(),Y=void 0;if(V0===$)return;if(!Y){let Q=new AbortController,Z={url:$,abort:Q,promise:C0($,AbortSignal.any([h.signal,Q.signal])).then((V)=>{if(N||Q.signal.aborted)throw V.close(),new DOMException("Aborted","AbortError");S?.close(),S=V,V0=$}).finally(()=>{if(Y===Z)Y=void 0})};Y=Z}await Y.promise}async function u0(){let $=d;await O1();let Q=G.document?JSON.stringify(G.imageUrls??{}):"";if(Q!==K0){let Z=await T0(G,h.signal);if(N||$!==d)throw J0(Z),new DOMException("Aborted","AbortError");J0(U),U=Z,K0=Q}if(N||$!==d)throw new DOMException("Aborted","AbortError");if(!O||!_||!r||!e||!S)return;if(h0(S),G0)O.gpu.queue.writeTexture({texture:G0.gpu},_0(G.document).bytes,{bytesPerRow:256},[64,48]);if($0&&G.document)O.gpu.queue.copyExternalImageToTexture({source:B0(G,U)},{texture:$0.gpu},j);O.gpu.queue.copyExternalImageToTexture({source:S0(G,W,S,U)},{texture:e.gpu},j),O.gpu.queue.copyExternalImageToTexture({source:l0(G,W,U)},{texture:r.gpu},j),_.set({params:{topographic:G.design==="andes"||G.document?.material.effect==="topographic"?1:0,designMode:_0(G.document).mode,coating:X0(W.recipe?.field),faceRegion:[W.face.x,W.face.y,W.face.radius,0],spectral:W.recipe?W.recipe.material.iridescence/0.5:I.spectral,surfaceKind:["prism","satin","chrome"].indexOf(W.surface??"prism"),customMaterial:W.recipe?[W.recipe.material.roughness,W.recipe.material.iridescence,1,G.edition?.layout==="ribbon"||G.document?.material.effect==="ribbons"?1:0]:[0,0,0,0],thermal:W.filter==="thermal"?1:0,signature:i(G.signature).values}}),s?.set({field:{...k0(W.recipe?.field),seed:i(G.signature).values}}),l?.set({blur:{threshold:G.design==="andes"||G.edition||G.document?1.1:0.42}}),q0(O,j0)}async function W1(){while(!N){let $=d;try{await u0();return}catch(Q){if($===d)throw Q}}}return(async()=>{try{if(O=await t0(),N)return O.dispose();v0=O.onError(W0);let $=O.gpu,Q=(A)=>{A.preventDefault(),W0(Error(A.error.message))};$.addEventListener("uncapturederror",Q),f0=()=>$.removeEventListener("uncapturederror",Q),$.lost.then((A)=>{if(!N)W0(Error(A.message||"Se perdió la conexión con el vidrio."))});let Z=G.portraitUrl,V=await C0(Z,h.signal);while(!N&&Z!==G.portraitUrl)V.close(),Z=G.portraitUrl,V=await C0(Z,h.signal);if(N){V.close();return}if(S=V,U=await T0(G,h.signal),K0=G.document?JSON.stringify(G.imageUrls??{}):"",N){J0(U);return}if(V0=Z,h0(V),$0=O.device.createTexture({size:j,format:"rgba8unorm",usage:["texture_binding","copy_dst","render_attachment"],label:"design-motion-mask"}),G.document)O.gpu.queue.copyExternalImageToTexture({source:B0(G,U)},{texture:$0.gpu},j);G0=O.device.createTexture({size:[64,48],format:"rgba8unorm",usage:["texture_binding","copy_dst"],label:"design-effects"}),O.gpu.queue.writeTexture({texture:G0.gpu},_0(G.document).bytes,{bytesPerRow:256},[64,48]),r=O.device.createTexture({size:j,format:"rgba8unorm",usage:["texture_binding","copy_dst","render_attachment"],label:"nacre-foil"}),O.gpu.queue.copyExternalImageToTexture({source:l0(G,W,U)},{texture:r.gpu},j),e=O.device.createTexture({size:j,format:"rgba8unorm",usage:["texture_binding","copy_dst","render_attachment"],label:"prism-reverse"}),O.gpu.queue.copyExternalImageToTexture({source:S0(G,W,S,U)},{texture:e.gpu},j);let C=await fetch(`${p.replace(/\/$/,"")}/facets.bin.gz`,{signal:h.signal});if(!C.ok||!C.body)throw Error("No se pudo cargar el cristal.");let M=await new Response(C.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();if(N)return;if(M.byteLength!==6291456)throw Error("El mapa del cristal está incompleto.");let P=O.device.createTexture({size:[1024,1536],format:"rgba8unorm",usage:["texture_binding","copy_dst"],label:"prism-facet-optics"});O.gpu.queue.writeTexture({texture:P.gpu},M,{bytesPerRow:4096},[1024,1536]),L=o0(O,J,{...T?{size:F.id==="card"?[1600,1100]:[1080,1440],autoResize:!1,dpr:1}:{dpr:H.dpr??[1.5,2]},alphaMode:"premultiplied"}),Z0=N0(O,{size:F.id==="card"?[576,363]:[384,576],format:"rgba16float",label:"procedural-material-field"});let n=e0;if(W.recipe?.shader)try{if(await G1(W.recipe,h.signal),N)return;n=$1(W.recipe.shader.code),J.dataset.labStatus="ready"}catch{if(N)return;J.dataset.labStatus="fallback"}else delete J.dataset.labStatus;s=o(O,n,{set:{field:{time:0,pointer:[0,0],seed:i(G.signature).values,...k0(W.recipe?.field)}}}),_=o(O,_1,{label:"prism-glass",set:{params:{topographic:G.design==="andes"||G.document?.material.effect==="topographic"?1:0,designMode:_0(G.document).mode,resolution:L.size,coating:X0(W.recipe?.field),angles:[0,H.side==="back"?Math.PI:T||H.flat?0:-0.075],roll:0,heat0:[0,0,0,0],heat1:[0,0,0,0],heat2:[0,0,0,0],heat3:[0,0,0,0],faceRegion:[W.face.x,W.face.y,W.face.radius,0],surfaceKind:["prism","satin","chrome"].indexOf(W.surface??"prism"),customMaterial:W.recipe?[W.recipe.material.roughness,W.recipe.material.iridescence,1,G.edition?.layout==="ribbon"||G.document?.material.effect==="ribbons"?1:0]:[0,0,0,0],thermal:W.filter==="thermal"?1:0,signature:i(G.signature).values,pointer:[0,0],light:[0,0],spectral:W.recipe?W.recipe.material.iridescence/0.5:I.spectral,finish:I.finish,time:0,lift:0,activity:0,fluidity:O0},designMask:$0,designEffects:G0,portrait:A0,foil:r,reversePrint:e,materialField:Z0,opticalAtlas:P,printSampler:Y0(O,{minFilter:"linear",magFilter:"linear"})}});let z=(A,q)=>[Math.max(1,Math.round(A/4)),Math.max(1,Math.round(q/4))],m=Y0(O,{minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});if(R=N0(O,{size:L.size,format:"rgba16float",label:"prism-hdr"}),B=N0(O,{size:z(...L.size),format:"rgba16float",label:"prism-glow-x"}),w=N0(O,{size:B.size,format:"rgba16float",label:"prism-glow-y"}),l=o(O,p0,{set:{blur:{direction:[1/B.size[0],0],extract:1,threshold:G.design==="andes"||G.edition||G.document?1.1:0.42},source:R,linearSampler:m}}),t=o(O,p0,{set:{blur:{direction:[0,1/w.size[1]],extract:0,threshold:0.42},source:B,linearSampler:m}}),Q0=o(O,j1,{set:{scene:R,glow:w,linearSampler:m}}),b0=L.onResize(({width:A,height:q})=>{if(_?.set({params:{resolution:[A,q]}}),R?.resize([A,q]),B?.resize(z(A,q)),w?.resize(z(A,q)),B&&w)l?.set({blur:{direction:[1/B.size[0],0]}}),t?.set({blur:{direction:[0,1/w.size[1]]}})}),await Promise.all([s.compile({colors:["rgba16float"]}),_.compile({colors:["rgba16float"]}),l.compile({colors:["rgba16float"]}),t.compile({colors:["rgba16float"]}),Q0.compile({colors:[L.format]})]),await O.settled(),await W1(),N)return;q0(O,j0),J.dataset.ready="true",a(),D0()}catch($){if(!N)W0($)}})(),{setOptions($){if(N)return;if(I=$,$.active===!1)x?.stop(),x=void 0;else D0();_?.set({params:{finish:$.finish,spectral:W.recipe?W.recipe.material.iridescence/0.5:$.spectral}})},async setContent($,Q){if(N)throw new DOMException("Aborted","AbortError");if(G=$,W=Q,d++,!_||!O||!r)return;await u0()},async exportImage(){if(!O||!L||!_||N)throw Error("El badge no está listo.");q0(O,j0);let[$,Q]=L.size,Z=G.design==="andes"||G.edition||G.document?"#050406":W.surface&&W.surface!=="prism"?"#efeeea":["#efeeea","#ece8f0","#0e0f12"][I.finish],V=await L.read();if(N)throw Error("El badge se cerró.");let C=document.createElement("canvas");C.width=$,C.height=Q;let M=C.getContext("2d");if(!M)throw Error("No se pudo guardar la imagen.");let P=new Uint8ClampedArray(V);for(let A=0;A<P.length;A+=4){let q=P[A+3]/255;if(q>0&&q<1)P[A]/=q,P[A+1]/=q,P[A+2]/=q}let n=new ImageData(P,C.width,C.height),z=document.createElement("canvas");z.width=C.width,z.height=C.height,z.getContext("2d")?.putImageData(n,0,0),M.fillStyle=Z,M.fillRect(0,0,C.width,C.height),M.drawImage(z,0,0);let m=await new Promise((A)=>C.toBlob(A));if(!m||N)throw Error("No se pudo exportar el badge.");return m},dispose:c0}}export{R1 as startPrism};
