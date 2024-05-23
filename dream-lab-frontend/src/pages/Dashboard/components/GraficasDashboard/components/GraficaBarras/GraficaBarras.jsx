import { BarChart } from "@tremor/react";
import { propTypes } from "react-bootstrap/esm/Image";

function GraficaBarras({ chartData, index, category }) {
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

    return (
        <BarChart
            className="absolute top-0 left-0 w-full h-full"
            data={newChartData}
            index={index}
            categories={[category]}
            colors={["indigo-300"]}
            onValueChange={(v) => console.log(v)}
            showAnimation
            showLegend={false}
            // rotateLabelX={{ angle: -45 }}
        />
    );
}

GraficaBarras.propTypes = {
    chartData: propTypes.array,
    index: propTypes.string,
    category: propTypes.string,
};

export default GraficaBarras;
