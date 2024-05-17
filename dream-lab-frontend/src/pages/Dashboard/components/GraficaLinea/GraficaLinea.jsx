import { AreaChart } from "@tremor/react";
import { propTypes } from "react-bootstrap/esm/Image";

function GraficaLinea({ chartData, index, categories, colors }) {
    return (
        <AreaChart
            className="absolute top-0 left-0 w-full h-full"
            data={chartData}
            index={index}
            categories={categories}
            colors={colors}
            onValueChange={(v) => console.log(v)}
            showAnimation
            showLegend={false}
            curveType="monotone"
        />
    );
}

GraficaLinea.propTypes = {
    titulo: propTypes.string,
    chartData: propTypes.array,
    index: propTypes.string,
    categories: propTypes.array,
    colors: propTypes.array,
};

export default GraficaLinea;
