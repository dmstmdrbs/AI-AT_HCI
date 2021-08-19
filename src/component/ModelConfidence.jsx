import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import styled from "styled-components";

am4core.useTheme(am4themes_animated);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const ModelConfidence = ({}) => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("confidence", am4charts.GaugeChart);

    x.innerRadius = am4core.percent(80);
    x.paddingRight = 10;
    x.paddingLeft = 10;

    // Normal axis
    var axis = x.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.disabled = true;

    // Axis for ranges
    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    var range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    // Main label
    var label = x.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 25;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "20%";

    // Hand
    var hand = x.hands.push(new am4charts.ClockHand());
    hand.axis = axis;
    hand.pin.disabled = true;
    hand.value = 50;
    hand.innerRadius = am4core.percent(50);
    hand.radius = am4core.percent(80);
    hand.startWidth = 10;

    hand.events.on("propertychanged", function (ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      axis.invalidate();
    });

    var value = Math.round(Math.random() * 100);
    label.text = value + "%";
    var animation = new am4core.Animation(
      hand,
      {
        property: "value",
        to: value,
      },
      700,
      am4core.ease.cubicOut,
    ).start();

    // Axis labels
    var label0 = x.radarContainer.createChild(am4core.Label);
    label0.isMeasured = false;
    label0.y = 10;
    label0.horizontalCenter = "middle";
    label0.verticalCenter = "top";
    label0.text = "Low confidence";

    label0.adapter.add("x", function (x, target) {
      return -(
        axis.renderer.pixelInnerRadius +
        (axis.renderer.pixelRadius - axis.renderer.pixelInnerRadius) / 2
      );
    });

    var label1 = x.radarContainer.createChild(am4core.Label);
    label1.isMeasured = false;
    label1.y = 10;
    label1.horizontalCenter = "middle";
    label1.verticalCenter = "top";
    label1.text = "High confidence";

    label1.adapter.add("x", function (x, target) {
      return (
        axis.renderer.pixelInnerRadius +
        (axis.renderer.pixelRadius - axis.renderer.pixelInnerRadius) / 2
      );
    });

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <Container>
      <div id="confidence" style={{ width: "300px", height: "200px" }}></div>
    </Container>
  );
};
export default ModelConfidence;
