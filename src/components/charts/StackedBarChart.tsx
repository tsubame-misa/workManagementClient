import * as d3 from "d3";
import { useEffect, useState } from "react";
import { convertTime, sum } from "../../worker/worker";

type Props = {
  projects: project[];
  totalTime: number;
};

const StackedBarChart = ({ projects, totalTime }: Props) => {
  console.log("totalTime", totalTime);
  const [data, setData] = useState<bar[]>([]);

  const margin = { top: 10, right: 30, bottom: 20, left: 50 };
  const width = 460 - margin.left - margin.right;
  const height = 100 - margin.top - margin.bottom;

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
      color: "#333333",
      label: convertTime(otherTime),
    });

    setData(remainData);
  }, [projects]);

  return (
    <div id="">
      <svg viewBox={`${margin.left} ${margin.top} ${width} ${height}`}>
        <g>
          {data.map((d) => {
            return (
              <g key={d.name}>
                <rect x={d.x} y="0" width={d.w} height="20" fill={d.color} />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default StackedBarChart;
