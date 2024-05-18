import { DonutChart, Legend } from "@tremor/react";
import { propTypes } from "react-bootstrap/esm/Image";

// Hooks
import { useState } from "react";

// Estilos
import "./GraficaPie.css";

function GraficaPie({ chartData, index, category }) {
    const [selectedLabel, setSelectedLabel] = useState(null);

    // Ordenar chartData de mayor a menor
    const sortedChartData = [...chartData].sort((a, b) => b.uso - a.uso);

    // Separar los primeros 5 elementos del resto
    const top5 = sortedChartData.slice(0, 5);
    const rest = sortedChartData.slice(5);

    let newChartData;

    // Si hay menos de 5 elementos, no se crea la categoría 'Otros'
    if (sortedChartData.length <= 5) {
        newChartData = [...top5];
    } else {
        // Sumar los valores de 'category' de los elementos restantes
        // y crear un nuevo objeto con la categoría 'Otros'
        const restCombined = {
            [index]: "Otros",
            [category]: rest.reduce((total, item) => total + item[category], 0),
        };

        // Crear un nuevo arreglo con los primeros 5 elementos y el objeto 'Otros'
        newChartData = [...top5, restCombined];
    }

    // Paleta de colores
    const colorPalette = [
        "indigo-300",
        "indigo-400",
        "indigo-500",
        "indigo-600",
        "indigo-700",
        "indigo-800",
        "violet-900",
        "violet-800",
        "violet-700",
        "violet-600",
        "violet-500",
        "violet-400",
        "violet-300",
    ];

    // Asignar un color a cada elemento del nuevo arreglo
    const colorScale = newChartData.map(
        (_, i) => colorPalette[i % colorPalette.length]
    );

    // Crear un arreglo con las categorías de la leyenda
    const legendCategories = newChartData.map((data) => data[index]);

    return (
        <div className="flex justify-between space-x-6">
            <DonutChart
                variant="donut"
                className="absolute top-0 left-0 h-full grafica-pie-chart"
                style={{ width: "50%", fontSize: "5vh" }}
                data={newChartData}
                index={index}
                category={category}
                colors={colorScale}
                onValueChange={(v) => setSelectedLabel(v ? v.uso : null)}
                showAnimation
                label={selectedLabel}
            />
            <Legend
                categories={legendCategories}
                colors={colorScale}
                className="absolute top-0 right-0 h-full"
                style={{ width: "50%" }}
            />
        </div>
    );
}

GraficaPie.propTypes = {
    chartData: propTypes.array,
    index: propTypes.string,
    category: propTypes.string,
};

export default GraficaPie;
