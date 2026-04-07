export function createProgram(gl) {
  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_disturbance;
    uniform float u_focus;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform vec3 u_colorC;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = mat2(1.72, 1.18, -1.18, 1.72) * p;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float ar = u_resolution.x / u_resolution.y;
      vec2 p = (uv - 0.5) * vec2(ar, 1.0);
      vec2 cursor = (u_pointer - 0.5) * vec2(ar, 1.0);

      float t = u_time * 0.24;
      float cursorMask = exp(-length(p - cursor) * 3.2);
      float field = fbm(p * 2.2 + vec2(t * 0.62, -t * 0.44));
      float flow = fbm(p * 3.0 - vec2(t * 0.58, t * 0.18));
      vec2 warp = vec2(
        sin(p.y * 5.4 + flow * 2.3 - t * 1.4),
        cos(p.x * 4.9 + field * 2.1 + t * 1.2)
      ) * (0.028 + u_disturbance * 0.12 + cursorMask * 0.075);

      float swath = fbm((p + warp) * 3.25 + vec2(-t * 0.82, t * 0.4));
      float ridge = sin((p.x + p.y * 0.32 + swath * 0.48) * 7.6 - t * 2.2) * 0.5 + 0.5;
      float pocket = fbm((p - warp * 0.72) * 2.8 - vec2(t * 0.42, -t * 0.28));
      float highlight = clamp(cursorMask * (0.06 + u_disturbance * 0.22), 0.0, 1.0);
      float horizonGlow = smoothstep(1.08, -0.08, p.y + 0.22);
      float sunlight = smoothstep(0.58, -0.15, length(p - vec2(0.2 * ar, 0.36)));

      vec3 color = mix(u_colorA, u_colorB, ridge);
      color = mix(color, u_colorC, pocket * 0.38 + highlight * 0.48);
      color = mix(color, vec3(0.992, 0.956, 0.862), sunlight * 0.22 + horizonGlow * 0.12);

      float vignette = smoothstep(1.2, 0.12, length(p));
      float lift = 0.88 + vignette * 0.16;
      color *= lift;
      color += vec3(0.08, 0.05, 0.02) * highlight;
      color *= mix(0.97, 1.0, u_focus);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) {
    throw new Error("Failed to create WebGL program.");
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed.");
  }

  return program;
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile failed.");
  }

  return shader;
}
