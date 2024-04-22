import { useState } from "react";
import "./Videowall.css";
import Anuncios from "./components/Anuncios/Anuncios.jsx";

const anunciosDefault = [
    {
        id: 1,
        img: "https://media.licdn.com/dms/image/C4E12AQHTZ7pyTmCfEw/article-cover_image-shrink_720_1280/0/1541423067327?e=2147483647&v=beta&t=4fBTi39dOwxthLmtYW4RGwseAA9kAXBPUdnQa_7PKx4",
        nombre: "Lab Default 1",
        sala: "Sala Default 1",
        date: "Lunes 15 de Febrero 3:00pm a 5:00pm",
    },
    {
        id: 2,
        img: "https://mms.businesswire.com/media/20190617005571/es/727944/5/Warner_Final_Zone5.1.jpg",
        nombre: "Lab Default 2",
        sala: "Sala Default 2",
        date: "Lunes 15 de Febrero 3:00pm a 5:00pm",
    },
    {
        id: 3,
        img: "https://d1tm14lrsghf7q.cloudfront.net/public/media/23459/conversions/21386-thumb.jpg",
        nombre: "Lab Default 3",
        sala: "Sala Default 3",
        date: "Lunes 15 de Febrero 3:00pm a 5:00pm",
    },
];

function Videowall() {
    const [data, setData] = useState(anunciosDefault);

    return (
        <div className="container-videowall">
            <div className="container-reservaciones">
                <p>Reservaciones</p>
            </div>
            <div className="container-anuncios">
                <Anuncios
                    data={data}
                    activeSlide={parseInt(Math.floor(data.length / 2))}
                />
            </div>
        </div>
    );
}

export default Videowall;
