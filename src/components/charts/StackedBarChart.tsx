import * as d3 from "d3";
import { useEffect, useState } from "react";
import { convertTime, sum } from "../../worker/worker";
import "./StackedBarChart.css";

type Props = {
  projects: project[];
  totalTime: number;
};

const StackedBarChart = ({ projects, totalTime }: Props) => {
  const [data, setData] = useState<bar[]>([]);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [showData, setShowData] = useState<bar>();
  const [toolTipPos, seToolTipPos] = useState({ x: 0, y: 0 });

  const margin = { top: 10, right: 30, bottom: 20, left: 50 };
  const width = 460 - margin.left - margin.right;
  const height = 50 - margin.top - margin.bottom;

  const yScale = d3.scaleLinear().domain([0, totalTime]).range([0, width]);
  const colorScale = d3
    .scaleOrdinal(d3.schemeSet3)
    .domain(projects.map((p) => p.id));

  useEffect(() => {
    const filterdProjects = projects.filter(
      (p) => p.total_seconds > totalTime / 10
    );

    const _data: bar[] = projects.map((p: project) => {
      return {
        name: p.name,
        x: 0,
        y: 0,
        w: yScale(p.total_seconds),
        seconds: p.total_seconds,
        color: colorScale(p.id),
        label: convertTime(p.total_seconds),
      };
    });

    for (let i = 1; i < _data.length; i++) {
      _data[i].x = _data[i - 1].x + _data[i - 1].w;
    }

    if (projects.length - filterdProjects.length < 1) {
      setData(_data);
      return;
    }

    // その他で括りたい場合
    const remainData = _data.slice(0, filterdProjects.length);
    const _delete = _data.slice(
      projects.length - filterdProjects.length,
      projects.length
    );
    const otherTime = sum(_delete.map((d) => d.seconds));

    remainData.push({
      name: "その他",
      x:
        _data[filterdProjects.length - 1].x +
        _data[filterdProjects.length - 1].w,
      y: 0,
      w: yScale(otherTime),
      seconds: otherTime,
      color: "#AAAAAA",
      label: convertTime(otherTime),
    });

    setData(remainData);
  }, [projects]);

  const handleMouseover = function (d: bar) {
    setShowToolTip(true);
    setShowData(d);
  };

  const handleMousemove = function (e) {
    seToolTipPos({ x: e.clientX, y: e.clientY });
  };
  const HandleMouseleave = function () {
    setShowToolTip(false);
  };

  return (
    <div id="bar_chart">
      <svg viewBox={`${margin.left} ${margin.top} ${width} ${height}`}>
        <g>
          {data.map((d) => {
            return (
              <g key={d.name}>
                <rect
                  x={d.x}
                  y="0"
                  width={d.w}
                  height="20"
                  fill={d.color}
                  onMouseOver={() => {
                    handleMouseover(d);
                  }}
                  onMouseMove={handleMousemove}
                  onMouseOut={HandleMouseleave}
                />
              </g>
            );
          })}
        </g>
      </svg>
      {showToolTip && (
        <div id="tooltip" style={{ left: toolTipPos.x, top: -10 }}>
          <div>{showData?.name}</div>
          <div>{showData?.seconds && convertTime(showData?.seconds)}</div>
        </div>
      )}
    </div>
  );
};

export default StackedBarChart;
