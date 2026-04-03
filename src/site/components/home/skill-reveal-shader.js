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

      float t = u_time * 0.42;
      float cursorMask = exp(-length(p - cursor) * 4.5);
      float field = fbm(p * 2.8 + vec2(t * 1.2, -t * 0.85));
      float flow = fbm(p * 4.0 - vec2(t * 0.9, t * 0.34));
      vec2 warp = vec2(
        sin(p.y * 7.0 + flow * 3.4 - t * 2.4),
        cos(p.x * 6.2 + field * 3.0 + t * 2.1)
      ) * (0.05 + u_disturbance * 0.26 + cursorMask * 0.18);

      float swath = fbm((p + warp) * 4.2 + vec2(-t * 1.35, t * 0.82));
      float ridge = sin((p.x + p.y * 0.46 + swath * 0.55) * 11.0 - t * 4.4) * 0.5 + 0.5;
      float pocket = fbm((p - warp * 0.85) * 3.6 - vec2(t * 0.74, -t * 0.56));
      float highlight = clamp(cursorMask * (0.12 + u_disturbance * 0.52), 0.0, 1.0);

      vec3 color = mix(u_colorA, u_colorB, ridge);
      color = mix(color, u_colorC, pocket * 0.66 + highlight);

      float vignette = smoothstep(1.16, 0.14, length(p));
      float lift = 0.81 + vignette * 0.27;
      color *= lift;
      color += vec3(0.02, 0.03, 0.06) * highlight;
      color *= mix(0.92, 1.0, u_focus);

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
