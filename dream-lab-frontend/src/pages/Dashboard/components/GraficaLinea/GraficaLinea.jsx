import { AreaChart } from "@tremor/react";
import { propTypes } from "react-bootstrap/esm/Image";

function GraficaLinea({ chartData, index, categories }) {
    return (
        <AreaChart
            className="absolute top-0 left-0 w-full h-full"
            data={chartData}
            index={index}
            categories={categories}
            colors={["indigo-300"]}
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
};

export default GraficaLinea;
