"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { animate, frame, cancelFrame } from "motion";

function setupScene(main: HTMLDivElement, color: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(25, main.offsetWidth / main.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(main.offsetWidth, main.offsetHeight);
  renderer.setClearColor(0xffffff, 0);
  main.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 2, 2);
  const ambientLight = new THREE.AmbientLight(0x404040);

  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(cube);

  camera.position.z = 5;

  const rad = (degrees: number) => degrees * (Math.PI / 180);

  // Drive the Three.js render loop off Motion's frameloop
  const renderStep = () => renderer.render(scene, camera);
  frame.render(renderStep, true);

  const rotationAnimation = animate(
    cube.rotation,
    { y: rad(360), z: rad(360) },
    { duration: 10, repeat: Infinity, ease: "linear" }
  );

  const onResize = () => {
    const w = main.offsetWidth;
    const h = main.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    rotationAnimation.stop();
    cancelFrame(renderStep);
    main.removeChild(renderer.domElement);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}

export default function RotatingCube({
  width = 300,
  height = 200,
  color = 0x4ff0b7,
  trigger = "load",
}: {
  width?: number;
  height?: number;
  color?: number;
  /** "load" starts spinning immediately on mount; "inView" waits until scrolled into view. */
  trigger?: "load" | "inView";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = containerRef.current;
    if (!main) return;

    let teardown: (() => void) | null = null;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      teardown = setupScene(main, color);
    };

    if (trigger === "inView") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(main);
      return () => {
        observer.disconnect();
        teardown?.();
      };
    }

    start();
    return () => teardown?.();
  }, [color, trigger]);

  return <div ref={containerRef} style={{ width, height }} />;
}
