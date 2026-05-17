window.loadCrystal3D = (containerId, systemType) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Clear any stale canvas data

    // 1. Fix the 0px size bug: Use default layout values if container hasn't fully animated open yet
    const width = container.clientWidth || 220;
    const height = container.clientHeight || 180;

    // 2. Setup the 3D Space
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Studio Light Rig (Essential for depth illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 4. Case Insensitive Matching for Database Strings
    const normalizedSystem = systemType ? systemType.toLowerCase().trim() : '';
    let geometry;

    if (normalizedSystem.includes('isometric') || normalizedSystem.includes('cubic')) {
        geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    } else if (normalizedSystem.includes('tetragonal')) {
        geometry = new THREE.BoxGeometry(1.6, 2.8, 1.6);
    } else if (normalizedSystem.includes('orthorhombic')) {
        geometry = new THREE.BoxGeometry(1.4, 2.8, 2.0);
    } else if (normalizedSystem.includes('hexagonal') || normalizedSystem.includes('trigonal')) {
        geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.8, 6);
    } else if (normalizedSystem.includes('monoclinic')) {
        geometry = new THREE.BoxGeometry(1.4, 2.6, 2.0);
        geometry.applyMatrix4(new THREE.Matrix4().makeShear(0, 0, 0.7, 0, 0, 0)); // Obvious tilt
    } else if (normalizedSystem.includes('triclinic')) {
        geometry = new THREE.BoxGeometry(1.4, 2.6, 2.0);
        geometry.applyMatrix4(new THREE.Matrix4().makeShear(0.6, 0, 0.5, 0, 0.4, 0)); // Asymmetric skew
    } else {
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); // Clear visual fallback structure
    }

    // 5. Upgrade Material: Replace flat MeshBasic with high-end shiny MeshPhysicalMaterial
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6, // Gives it a realistic gemstone glass transparency
        ior: 1.5,
        transparent: true,
        side: THREE.DoubleSide
    });

    const crystal = new THREE.Mesh(geometry, material);

    // 6. Highlight structural outlines with high-contrast sharp wireframe lines
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 1.5 }));
    crystal.add(line);
    
    scene.add(crystal);
    camera.position.z = 5.5;

    // 7. Render Loop
    function animate() {
        requestAnimationFrame(animate);
        crystal.rotation.x += 0.003;
        crystal.rotation.y += 0.008;
        renderer.render(scene, camera);
    }
    animate();
};