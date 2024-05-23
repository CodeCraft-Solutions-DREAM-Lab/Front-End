import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CircularProgress from "@mui/material/CircularProgress";

const GLBModelViewer = ({ modelPath }) => {
	const mountRef = useRef(null);
	const rendererRef = useRef(null);
	const modelRef = useRef(null); // Define modelRef here
	const [centerPoint, setCenterPoint] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		let model; // Declare model variable
		let container;

		// Create scene
		const scene = new THREE.Scene();

		// Create camera
		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000); // Aspect ratio set to 1

		// Set camera position and rotation to look down at the model
		camera.position.set(0, 15, 0); // Adjust the height and distance
		camera.lookAt(0, 0, 0); // Look at the center of the scene

		// Create renderer and set the background to be transparent
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setClearColor(0x000000, 0); // Set clear color to black with 0 alpha (transparent)
		mountRef.current.appendChild(renderer.domElement);
		rendererRef.current = renderer;

		// Add lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
		scene.add(ambientLight);

		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight1.position.set(5, 5, 5).normalize();
		scene.add(directionalLight1);

		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight2.position.set(-5, -5, -5).normalize();
		scene.add(directionalLight2);

		const pointLight = new THREE.PointLight(0xffffff, 1); // Point light
		pointLight.position.set(0, 5, 0);
		scene.add(pointLight);

		// Add a marker at the center of the scene
		const markerGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Create a small red sphere
		const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
		const marker = new THREE.Mesh(markerGeometry, markerMaterial); // Create the mesh
		scene.add(marker); // Add the marker to the scene

		// Load model
		const loader = new GLTFLoader();
		loader.load(
			modelPath,
			(gltf) => {
				model = gltf.scene;

				model.position.y += -2;
				// Calculate center point of the model
				const boundingBox = new THREE.Box3().setFromObject(model);
				const modelCenter = new THREE.Vector3();
				boundingBox.getCenter(modelCenter);
				setCenterPoint(modelCenter);

				// Move the model so its center matches the scene center
				model.position.copy(modelCenter).multiplyScalar(-1);

				// Create a container object
				container = new THREE.Object3D();
				container.add(model);
				scene.add(container);

				// Set initial rotation of the container (adjust these values as needed)
				//container.rotation.x = Math.PI / 4; // Rotate around X axis
				container.rotation.y = (Math.PI / 4) * -1; // Rotate around Y axis
				container.rotation.z = 0; // Rotate around Z axis

				// Set camera aspect ratio
				const aspectRatio =
					mountRef.current.clientWidth / mountRef.current.clientHeight;
				camera.aspect = aspectRatio;
				camera.updateProjectionMatrix();

				// Set controls to rotate around the container's center
				// Set up OrbitControls to rotate around the container's center
				const controls = new OrbitControls(camera, renderer.domElement);
				controls.target.set(0, 0, 0); // Set controls' target to the scene center
				controls.minDistance = 17; // Minimum zoom distance
				controls.maxDistance = 17; // Maximum zoom distan
				controls.update();
				setLoading(false); // Model has loaded
				animate();
			},
			undefined,
			(error) => {
				console.error("An error occurred", error);
			}
		);

		// Set initial camera position
		camera.position.z = 13; // Adjust this value to set the initial zoom level

		// Handle window resize
		const handleResize = () => {
			const width = mountRef.current.clientWidth;
			const height = mountRef.current.clientHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		// Call handleResize initially to set correct sizing
		handleResize();
		window.addEventListener("resize", handleResize);

		// Animation loop
		// Animate function
		const animate = () => {
			requestAnimationFrame(animate);

			// Check if model is defined
			if (container) {
				// Rotate the model
				container.rotation.y -= 0.01;
			}

			renderer.render(scene, camera);
		};

		//animate();

		// Cleanup
		return () => {
			if (rendererRef.current) {
				rendererRef.current.domElement.remove();
			}
			window.removeEventListener("resize", handleResize);
		};
	}, [modelPath]);

	return (
		<div
			ref={mountRef}
			style={{ width: "100%", height: "100%", position: "relative" }}
		>
			{loading && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 1,
						color: "white",
					}}
				>
					<CircularProgress color="inherit" />
				</div>
			)}
		</div>
	);
};

export default GLBModelViewer;
