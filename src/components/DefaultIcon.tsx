type Props = {
  userName: string;
};

const DefaultIcon = ({ userName }: Props) => {
  return (
    <div>
      <svg viewBox={`${0} ${0} ${50} ${50}`}>
        <circle cx="25" cy="25" r="25" fill="#AAAAAA" />
        <text
          x="25"
          y="25"
          fontFamily="Verdana"
          fontSize="10"
          stroke="white"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {userName.slice(0, 8)}
        </text>
      </svg>
    </div>
  );
};

export default DefaultIcon;
