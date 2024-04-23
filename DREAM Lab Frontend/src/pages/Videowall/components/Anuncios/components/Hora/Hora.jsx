import React, { useEffect, useState } from "react";
import "./Hora.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function Hora() {
    const [time, setTime] = useState(new Date())
    const options = { hour: 'numeric', minute: '2-digit', hourCycle: 'h12' };

    /*console.log(time);*/

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000);
    },[])

    return (
        <div className="hora-container">
            <GlassCard borderRadius="2vh" classes={"hora-glasscard"}>
                <h1 className="hora-text">{time.toLocaleTimeString([], options).replace(/\./g, '').replace(/\s/g, '').toLowerCase().replace(/(am|pm)/, " $1")}</h1>
            </GlassCard>
        </div>
    );
}

export default Hora;

