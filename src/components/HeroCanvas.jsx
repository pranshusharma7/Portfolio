import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Sphere / Torus Core
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#ffffff');
    const color2 = new THREE.Color('#a5b4fc'); // Subtle soft indigo
    const color3 = new THREE.Color('#64748b'); // Subtle slate

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral sphere distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 6.8 + (Math.random() - 0.5) * 1.8;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Subtle atmospheric gradient colors
      const mixedColor = i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : color3);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Wireframe Icosahedron inside
    const innerGeo = new THREE.IcosahedronGeometry(4.6, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.04
    });
    const innerMesh = new THREE.Mesh(innerGeo, wireMat);
    scene.add(innerMesh);

    // Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Base rotation + mouse tilt
      particleSystem.rotation.y = elapsedTime * 0.08 + currentMouseX * 0.5;
      particleSystem.rotation.x = elapsedTime * 0.04 + currentMouseY * 0.3;

      innerMesh.rotation.y = -elapsedTime * 0.05 + currentMouseX * 0.3;
      innerMesh.rotation.x = -elapsedTime * 0.03 + currentMouseY * 0.2;

      // Subtle breathing scale
      const scale = 1 + Math.sin(elapsedTime * 0.8) * 0.03;
      particleSystem.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-80"
      aria-hidden="true"
    />
  );
}
