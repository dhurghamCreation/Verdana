import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PlantPlanet() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 5.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    // Main globe with deep emerald green material
    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 5),
      new THREE.MeshPhysicalMaterial({
        color: 0x0f5c39,
        roughness: 0.5,
        clearcoat: 0.6,
        emissive: 0x032719,
        emissiveIntensity: 0.45,
      })
    );

    // Translucent topographic wireframe
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.54, 2),
      new THREE.MeshBasicMaterial({
        color: 0x8ab89a,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    );

    // Amber orbital delivery ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.016, 12, 160),
      new THREE.MeshBasicMaterial({
        color: 0xe28b27,
        transparent: true,
        opacity: 0.75,
      })
    );
    ring.rotation.set(1.15, 0.25, 0);

    // Secondary sage ring
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({
        color: 0x8ab89a,
        transparent: true,
        opacity: 0.35,
      })
    );
    ring2.rotation.set(0.65, -0.4, 0.3);

    world.add(globe, wire, ring, ring2);

    // Glowing botanical grower nodes on the globe surface
    const markerGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xf6ede2 });

    const growerLocations = [
      [0.8, 1.25, 0.45],
      [-1.1, 0.65, 0.85],
      [1.3, -0.45, 0.65],
      [-0.55, -1.35, 0.45],
      [0.08, 0.2, 1.5],
      [0.9, -0.9, -0.8],
      [-0.7, 0.2, -1.3],
    ];

    growerLocations.forEach(([x, y, z]) => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);

      // Add a small pulsating beacon aura
      const aura = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0xe28b27,
          transparent: true,
          opacity: 0.5,
        })
      );
      aura.position.set(x, y, z);
      world.add(marker, aura);
    });

    // Lighting
    const light = new THREE.DirectionalLight(0xf6ede2, 3.2);
    light.position.set(4, 3, 5);
    scene.add(light, new THREE.AmbientLight(0x8ab89a, 1.6));

    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.4;
      targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };

    mount.addEventListener('pointermove', onPointerMove);

    const resize = () => {
      const size = Math.max(280, Math.min(mount.clientWidth, 580));
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      world.rotation.y += 0.0022;
      world.rotation.x += (targetX - world.rotation.x) * 0.03;
      world.rotation.z += (targetY - world.rotation.z) * 0.03;
      ring.rotation.z += 0.0025;
      ring2.rotation.z -= 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mount.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      globe.geometry.dispose();
      wire.geometry.dispose();
      ring.geometry.dispose();
      ring2.geometry.dispose();
      markerGeometry.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="planet-shell" aria-label="Interactive Verdana Botanical Globe">
      <div ref={mountRef} className="planet-canvas" aria-hidden="true" />
      <div className="planet-label planet-label-one">
        <span />28 Certified Ethical Growers
      </div>
      <div className="planet-label planet-label-two">
        <span />Climate-Controlled Routes
      </div>
      <div className="planet-label planet-label-three">
        <span />Lifelong Botanist Care
      </div>
    </div>
  );
}
