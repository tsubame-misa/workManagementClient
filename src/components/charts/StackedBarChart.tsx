import * as d3 from "d3";
import { useEffect, useState } from "react";
import { convertTime, sum } from "../../worker/worker";
import { useNavigate } from "react-router-dom";
import "./StackedBarChart.css";

type Props = {
  user: user;
  projects: project[];
};

const StackedBarChart = ({ user, projects }: Props) => {
  const navigate = useNavigate();
  const [data, setData] = useState<bar[]>([]);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [showData, setShowData] = useState<bar>();
  const [toolTipPos, seToolTipPos] = useState({ x: 0, y: 0 });

  const width = 500;
  const height = 20;

  const totalTime = sum(projects.map((p) => p.total_seconds));

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
        id: p.id,
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
      id: null,
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
    //TODO:位置調整
    seToolTipPos({ x: e.clientX - 100, y: e.clientY });
  };
  const HandleMouseleave = function () {
    setShowToolTip(false);
  };

  return (
    <div id="bar_chart" className="is-align-items-center">
      <svg viewBox={`${0} ${0} ${width} ${height}`}>
        {data.map((d) => {
          return (
            <g key={d.name}>
              <rect
                style={{ cursor: "pointer" }}
                x={d.x}
                y="0"
                width={d.w}
                height="20"
                fill={d.color}
                onClick={() =>
                  d.id
                    ? navigate(`/project/${d.id}`)
                    : navigate(`/user/${user.user_id}`)
                }
                onMouseOver={() => {
                  handleMouseover(d);
                }}
                onMouseMove={handleMousemove}
                onMouseOut={HandleMouseleave}
              />
            </g>
          );
        })}
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
