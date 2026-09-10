import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // Setup Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, isMobile ? 95 : 80);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for maximum battery life
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Grid Topology Nodes - Scaled for device
    const gridCols = isMobile ? 14 : 22;
    const gridRows = isMobile ? 12 : 15;
    const totalNodes = gridCols * gridRows;
    const positions = new Float32Array(totalNodes * 3);
    const initialPositions = new Float32Array(totalNodes * 3);

    const spacingX = isMobile ? 6.0 : 6.5;
    const spacingY = isMobile ? 5.5 : 5.5;
    const offsetX = (gridCols * spacingX) / 2;
    const offsetY = (gridRows * spacingY) / 2;

    let pIdx = 0;
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = c * spacingX - offsetX + (Math.random() - 0.5) * 1.0;
        const y = r * spacingY - offsetY + (Math.random() - 0.5) * 1.0;
        const z = (Math.random() - 0.5) * 8;

        positions[pIdx] = x;
        positions[pIdx + 1] = y;
        positions[pIdx + 2] = z;

        initialPositions[pIdx] = x;
        initialPositions[pIdx + 1] = y;
        initialPositions[pIdx + 2] = z;

        pIdx += 3;
      }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 1.6 : 1.4,
      transparent: true,
      opacity: isMobile ? 0.35 : 0.45,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Connection lines
    const lineIndices: number[] = [];
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const current = r * gridCols + c;
        if (c < gridCols - 1 && Math.random() > 0.35) {
          lineIndices.push(current, current + 1);
        }
        if (r < gridRows - 1 && Math.random() > 0.35) {
          lineIndices.push(current, current + gridCols);
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: isMobile ? 0.06 : 0.08,
      blending: THREE.AdditiveBlending
    });

    const lineMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineMesh);

    // Mouse & Touch Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.02;
      targetY = (e.clientY - window.innerHeight / 2) * 0.02;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX - window.innerWidth / 2) * 0.02;
        targetY = (e.touches[0].clientY - window.innerHeight / 2) * 0.02;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Visibility detection
    let animationId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Camera lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(0, 0, 0);

      // Subtle wave distortion
      const posAttr = particlesGeometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < totalNodes; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        const x0 = initialPositions[ix];
        const y0 = initialPositions[iy];

        posArray[iz] = initialPositions[iz] + Math.sin(elapsed * 0.7 + (x0 + y0) * 0.06) * 2.5;
      }
      posAttr.needsUpdate = true;

      particleSystem.rotation.z = Math.sin(elapsed * 0.04) * 0.02;
      lineMesh.rotation.z = particleSystem.rotation.z;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationId);

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-35 sm:opacity-40 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
