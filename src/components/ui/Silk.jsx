/* eslint-disable react/no-unknown-property */
import React, { forwardRef, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color, ShaderMaterial } from 'three';

const hexToNormalizedRGB = (hex) => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float cosA = cos(angle);
  float sinA = sin(angle);
  mat2 rotation = mat2(cosA, -sinA, sinA, cosA);
  return rotation * (uv - 0.5) + 0.5;
}

void main() {
  vec2 uv = rotateUvs(vUv, uRotation);
  vec2 scaledUv = uv * uScale;

  float t = uTime * uSpeed;

  float n1 = noise(scaledUv * 3.0 + t * 0.1);
  float n2 = noise(scaledUv * 6.0 - t * 0.15 + 1000.0);
  float n3 = noise(scaledUv * 12.0 + t * 0.05 + 2000.0);

  float combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
  combined = pow(combined, 1.5) * uNoiseIntensity;

  float wave1 = sin(scaledUv.x * 3.0 + t * 0.3 + combined * 2.0) * 0.5 + 0.5;
  float wave2 = sin(scaledUv.y * 4.0 - t * 0.2 + combined * 3.0) * 0.5 + 0.5;
  float wave3 = sin((scaledUv.x + scaledUv.y) * 2.0 + t * 0.15) * 0.5 + 0.5;

  float pattern = wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25;
  pattern = smoothstep(0.1, 0.9, pattern + combined * 0.3);

  vec3 darkColor = uColor * 0.15;
  vec3 midColor = uColor * 0.6;
  vec3 lightColor = uColor * 1.2;

  vec3 finalColor;
  if (pattern < 0.5) {
    finalColor = mix(darkColor, midColor, pattern * 2.0);
  } else {
    finalColor = mix(midColor, lightColor, (pattern - 0.5) * 2.0);
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const SilkMaterial = forwardRef(({ speed = 5, scale = 1, color = '#1E4D38', noiseIntensity = 1.5, rotation = 0 }, ref) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();

  const [r, g, b] = hexToNormalizedRGB(color);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(r, g, b) },
      uRotation: { value: rotation },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
});

SilkMaterial.displayName = 'SilkMaterial';

const Silk = ({ speed = 5, scale = 1, color = '#1E4D38', noiseIntensity = 1.5, rotation = 0, style = {}, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <SilkMaterial
          speed={speed}
          scale={scale}
          color={color}
          noiseIntensity={noiseIntensity}
          rotation={rotation}
        />
      </Canvas>
    </div>
  );
};

export default Silk;
