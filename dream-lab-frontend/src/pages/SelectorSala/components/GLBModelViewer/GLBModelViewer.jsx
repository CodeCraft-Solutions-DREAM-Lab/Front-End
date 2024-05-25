import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CircularProgress from "@mui/material/CircularProgress";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const GLBModelViewer = ({ modelPath }) => {
	const mountRef = useRef(null);
	const rendererRef = useRef(null);
	const modelRef = useRef(null);
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		let container;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
		camera.position.set(0, 15, 0);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setClearColor(0x000000, 0);
		mountRef.current.appendChild(renderer.domElement);
		rendererRef.current = renderer;

		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);

		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight1.position.set(5, 5, 5).normalize();
		scene.add(directionalLight1);

		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight2.position.set(-5, -5, -5).normalize();
		scene.add(directionalLight2);

		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(0, 5, 0);
		scene.add(pointLight);

		//const loader = new GLTFLoader();
		const draco = new DRACOLoader();
		draco.setDecoderConfig({ type: "js" });
		draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
		draco.preload();

		// Pass the DRACOLoader to the GLTFLoader
		const loader = new GLTFLoader();
		loader.setDRACOLoader(draco);
		loader.load(
			modelPath,
			(gltf) => {
				const model = gltf.scene;
				modelRef.current = model;
				model.position.y += -2;

				const boundingBox = new THREE.Box3().setFromObject(model);
				const modelCenter = new THREE.Vector3();
				boundingBox.getCenter(modelCenter);

				model.position.copy(modelCenter).multiplyScalar(-1);

				container = new THREE.Object3D();
				container.add(model);
				scene.add(container);

				camera.aspect =
					mountRef.current.clientWidth / mountRef.current.clientHeight;
				camera.updateProjectionMatrix();

				const controls = new OrbitControls(camera, renderer.domElement);
				controls.target.set(0, 0, 0);
				controls.minDistance = 17;
				controls.maxDistance = 17;

				setLoading(false);
				animate();
			},
			undefined,
			(error) => {
				console.error("An error occurred", error);
			}
		);

		camera.position.z = 13;

		const handleResize = () => {
			const width = mountRef.current.clientWidth;
			const height = mountRef.current.clientHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		const animate = () => {
			requestAnimationFrame(animate);
			if (container) {
				container.rotation.y -= 0.01;
			}
			renderer.render(scene, camera);
		};

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
