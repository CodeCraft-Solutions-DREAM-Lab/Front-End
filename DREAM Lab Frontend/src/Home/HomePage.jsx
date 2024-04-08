import { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import SpeechBotCard from "./SpeechBotCard";
import "../App.css";
import RecommendationsCarousel from "./RecommendationsCarousel";
import Navbar from "../components/general/NavBar.jsx"; // Import the Navbar component
import "./HomePage.css";
import axios from "axios";


const OPTIONS = { dragFree: true, loop: true, startIndex: 0};

const unsplash_prefix = "https://images.unsplash.com/photo-";
const unsplash_suffix =
  "?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  const IMAGES = [
    { id: "1", url: "/ImagenSalaVR.png", title: "Sala VR" },
    { id: "2", url: "/ImagenUsoRouters.png", title: "Deep Net" },
    { id: "3", url: "/ImagenExpGoogle.png", title: "Testing Land" },
    {
      id: "4",
      url: `${unsplash_prefix}1496753480864-3e588e0269b3${unsplash_suffix}`,
      title: "Electric Garage",
    },
    {
      id: "5",
      url: `${unsplash_prefix}1613346945084-35cccc812dd5${unsplash_suffix}`,
      title: "Electric Garage",
    },
    {
      id: "6",
      url: `${unsplash_prefix}1516681100942-77d8e7f9dd97${unsplash_suffix}`,
      title: "Electric Garage",
    },
    {
      id: "7",
      url: `${unsplash_prefix}1709777114364-f1d4da772786${unsplash_suffix}`,
      title: "Electric Garage",
    },
    { id: "8", url: "/ImagenCursoSwift.png", title: "Curso de Swift" },
    { id: "9", url: "/ImagenConnections.png", title: "Deep Net" },
    { id: "10", url: "/ImagenCursoSwift.png", title: "Curso de Swift" },
    { id: "11", url: "/ImagenConnections.png", title: "Deep Net" },
  ];

const initialData = [
  {
    bgColor: "#F54748",
    img: "/ImagenSalaVR.png",
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    bgColor: "#7952B3",
    img: "/ImagenSalaVR.png",
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    bgColor: "#1597BB",
    img: "/ImagenSalaVR.png",
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

function HomePage() {
  const [processedTranscript, setProcessedTranscript] = useState("");
  const [data, setData] = useState(initialData);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get("/experiencias")
      .then(response => {
        setExperiences(response.data);
      })
      .catch(error => {
        console.error("Error fetching experiences:", error);
      });
  }, []);

  useEffect(() => {
    if (processedTranscript) {
      const recommendations = processedTranscript
        .split(/\d+\.\s+/)
        .filter((item) => item.trim() !== "");
      const newData = initialData.slice(0, recommendations.length);
      newData.forEach((item, index) => {
        item.title = recommendations[index];
      });
      setData(newData);
      setShowRecommendations(true);
    }
  }, [processedTranscript]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  

  const handleProcessedText = (processedText) => {
    setProcessedTranscript(processedText);
  };

  console.log("Processed Transcript in HomePage:", processedTranscript);
  return (
    <>
      <Navbar visible={visible} /> {/* Use the Navbar component */}
       <div className="background-container">
        <div className="home-background-image-container">
          <div className="left-blobs-container">
            <img
              src="/src/images/blob-left.png"
              alt="Left Image"
              className="left-image"
            />
            <img
              src="/src/images/small-blob.png"
              alt="Mini blob"
              className="mini-blob"
            />
          </div>
          <img
            src="/src/images/blob-right.png"
            alt="Right Image"
            className="right-image"
          />
        </div>
      </div>
      <div className="page-content">
        

        <SpeechBotCard height="25rem" onProcessedText={handleProcessedText} />

        {showRecommendations && (
          <RecommendationsCarousel
            data={data}
            activeSlide={parseInt(Math.floor(data.length / 2))}
          />
        )}


        <div className="carousel-container">
          <h1>RECOMENDACIONES</h1>
          <ImageSlider images={IMAGES} titles={IMAGES.map((item) => item.title)} options={OPTIONS} />
        </div>
        <div className="carousel-container">
        <h1>SALAS</h1>
          <ImageSlider images={IMAGES} options={OPTIONS} />
        </div>
        <div className="carousel-container">
        <h1>PRÁCTICAS AUTODIRIGIDAS</h1>
          <ImageSlider images={experiences.map(experience => ({
                id: experience.idExperiencia,
                url: experience.portadaURL,
                title: experience.nombre
              }))} options={OPTIONS} />
        </div>
        <div className="carousel-container">
        <h1>UNIDADES DE FORMACIÓN</h1>
          <ImageSlider images={IMAGES} options={OPTIONS} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
