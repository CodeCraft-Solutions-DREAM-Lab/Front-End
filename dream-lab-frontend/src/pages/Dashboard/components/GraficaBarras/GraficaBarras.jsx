import { BarChart } from "@tremor/react";
import { propTypes } from "react-bootstrap/esm/Image";

function GraficaBarras({ chartData, index, categories, colors }) {
    return (
        <BarChart
            className="absolute top-0 left-0 w-full h-full"
            data={chartData}
            index={index}
            categories={categories}
            colors={colors}
            onValueChange={(v) => console.log(v)}
            showAnimation
            showLegend={false}
            rotateLabelX={{ angle: -45 }}
        />
    );
}

GraficaBarras.propTypes = {
    titulo: propTypes.string,
    chartData: propTypes.array,
    index: propTypes.string,
    categories: propTypes.array,
};

export default GraficaBarras;
