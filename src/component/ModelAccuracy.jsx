import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const ModelAccuracy = () => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("accuracy", am4charts.PieChart);

    x.paddingRight = 10;
    x.paddingLeft = 10;
    x.data = [
      {
        confidence: "",
        value: 81,
        color: am4core.color("#24fd77"),
      },
      {
        confidence: "",
        value: 19,
        color: am4core.color("#b1b1b1"),
      },
    ];
    x.radius = am4core.percent(70);
    x.innerRadius = am4core.percent(40);
    x.startAngle = 180;
    x.endAngle = 360;

    var pieSeries = x.series.push(new am4charts.PieSeries());

    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "confidence";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.tooltipText = "";
    pieSeries.labels.template.disabled = true;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    var slice = pieSeries.slices.template;
    slice.states.getKey("hover").properties.scale = 1;
    slice.states.getKey("active").properties.shiftRadius = 0;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return <div id="accuracy" style={{ width: "410px", height: "100%" }}></div>;
};
export default ModelAccuracy;
