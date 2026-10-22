import { useId } from "react";

// Illustrated "model" images drawn in SVG – one figure per garment type.
// type: saree | kurti | ethnic | coord | other   |  wide: horizontal banner scene
const BG = [["#f3e6d0", "#d9bf96"], ["#f1e0d3", "#cfa68a"], ["#e9e2cf", "#bdb38e"], ["#f0ddd2", "#d4a592"]];
const SKINS = ["#e8b896", "#d9a37f", "#c98f6b"];
const GOLD = "#d4af6a";

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
};

const Sleeves = ({ y, fill }) => {
  const m = (118 + y) / 2;
  return (
    <>
      <path d={`M111 118 Q93 ${m} 96 ${y} L113 ${y + 2} Q111 ${m} 126 124Z`} fill={fill} />
      <path d={`M189 118 Q207 ${m} 204 ${y} L187 ${y + 2} Q189 ${m} 174 124Z`} fill={fill} />
    </>
  );
};

const Garment = ({ type, color, skin }) => {
  const dark = shade(color, -45);
  const light = shade(color, 45);
  if (type === "kurti")
    return (
      <>
        <path d="M112 300 L103 396 L148 396 L150 300Z M150 300 L152 396 L197 396 L188 300Z" fill="#efe3cf" />
        <path d="M113 116 Q150 128 187 116 L200 175 L206 305 Q150 318 94 305 L100 175Z" fill={color} />
        <path d="M135 117 L150 162 L165 117" fill="none" stroke={GOLD} strokeWidth="3" />
        <path d="M150 162 V305" stroke={dark} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={141 + (i % 2) * 18} cy={178 + i * 14} r="2" fill={GOLD} />)}
        <path d="M96 292 Q150 305 204 292 L206 305 Q150 318 94 305Z" fill={GOLD} />
        <Sleeves y={195} fill={color} />
      </>
    );
  if (type === "ethnic")
    return (
      <>
        <path d="M70 396 Q96 250 124 190 L176 190 Q204 250 230 396Z" fill={color} />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${130 + i * 10} 195 Q${110 + i * 20} 300 ${96 + i * 27} 390`} stroke={light} strokeOpacity=".3" fill="none" />)}
        <path d="M113 116 Q150 128 187 116 L182 195 L118 195Z" fill={dark} />
        <path d="M118 195 H182" stroke={GOLD} strokeWidth="4" />
        <path d="M70 380 Q150 392 230 380 L230 396 L70 396Z" fill={GOLD} />
        <path d="M118 114 Q70 180 88 300 Q92 340 80 380 L104 380 Q112 320 104 270 Q108 200 140 130Z" fill={GOLD} opacity=".7" />
        <path d="M182 118 Q232 190 214 300 L196 300 Q205 200 168 130Z" fill={GOLD} opacity=".55" />
        <Sleeves y={185} fill={dark} />
      </>
    );
  if (type === "coord")
    return (
      <>
        <path d="M114 186 L186 186 L226 396 L74 396Z" fill={color} />
        <path d="M150 190 V396" stroke={dark} strokeWidth="1.5" />
        {[[120, 230], [172, 250], [138, 290], [180, 320], [104, 340], [150, 360], [196, 372], [128, 215]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={GOLD} opacity=".8" />)}
        <path d="M118 150 L182 150 L184 190 L116 190Z" fill={skin} />
        <path d="M113 116 Q150 128 187 116 L184 158 Q150 168 116 158Z" fill={light} />
        <path d="M116 158 Q150 168 184 158" stroke={GOLD} strokeWidth="3" fill="none" />
        <rect x="114" y="184" width="72" height="7" fill={GOLD} />
        <Sleeves y={150} fill={light} />
      </>
    );
  if (type === "other")
    return (
      <>
        <path d="M96 205 L204 205 L236 396 L64 396Z" fill={color} />
        {[250, 300, 350].map((y) => <path key={y} d={`M${96 - (y - 205) / 5.5} ${y} H${204 + (y - 205) / 5.5}`} stroke={GOLD} strokeWidth="5" />)}
        <path d="M118 150 L182 150 L184 205 L116 205Z" fill={skin} />
        <path d="M113 116 Q150 128 187 116 L184 170 Q150 180 116 170Z" fill={shade(color, 60)} />
        <path d="M120 114 Q150 140 186 118 L200 130 Q205 250 196 330 L176 330 Q184 240 160 150 Q140 140 118 126Z" fill={GOLD} opacity=".7" />
        <Sleeves y={150} fill={shade(color, 60)} />
      </>
    );
  // saree
  return (
    <>
      <path d="M110 222 L186 222 L214 396 L86 396Z" fill={color} />
      {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${118 + i * 10} 226 L${100 + i * 16} 392`} stroke="#fff" strokeOpacity=".25" fill="none" />)}
      <path d="M86 382 L214 382 L214 396 L86 396Z" fill={GOLD} />
      <path d="M112 175 L188 175 L186 224 L114 224Z" fill={skin} />
      <path d="M113 116 Q150 128 187 116 L190 175 Q150 188 110 175Z" fill={dark} />
      <path d="M118 112 L138 116 L192 226 Q205 300 214 380 L186 384 Q184 300 170 240 L118 160Z" fill={color} />
      <path d="M138 116 L192 226 Q205 300 214 380" stroke={GOLD} strokeWidth="4" fill="none" />
      <path d="M118 160 L170 240" stroke={GOLD} strokeWidth="2" opacity=".6" />
      <Sleeves y={160} fill={dark} />
    </>
  );
};

const Figure = ({ type, color, seed }) => {
  const skin = SKINS[seed % SKINS.length];
  const hair = "#241510";
  return (
    <g>
      <circle cx="150" cy="26" r="13" fill={hair} />
      <path d="M112 120 Q88 185 98 245 L111 247 Q106 190 126 128Z" fill={skin} />
      <path d="M188 120 Q212 185 202 245 L189 247 Q194 190 174 128Z" fill={skin} />
      <circle cx="104" cy="250" r="7" fill={skin} />
      <circle cx="196" cy="250" r="7" fill={skin} />
      <Garment type={type} color={color} skin={skin} />
      <rect x="143" y="92" width="14" height="26" rx="6" fill={skin} />
      <ellipse cx="150" cy="72" rx="22" ry="27" fill={skin} />
      <path d="M127 66 Q122 34 150 30 Q178 34 173 66 Q166 46 150 46 Q134 46 127 66Z" fill={hair} />
      <path d="M138 70 q5 -4 10 0 M152 70 q5 -4 10 0" stroke="#3a2418" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="150" cy="60" r="1.8" fill="#b3202f" />
      <path d="M144 84 Q150 90 156 84 Q150 86 144 84Z" fill="#b33a4a" />
      <circle cx="128" cy="84" r="3.5" fill={GOLD} />
      <circle cx="172" cy="84" r="3.5" fill={GOLD} />
      <path d="M135 114 Q150 134 165 114" stroke={GOLD} strokeWidth="2" fill="none" />
    </g>
  );
};

const Arch = ({ x = 0, op = 0.22 }) => (
  <g transform={`translate(${x} 0)`}>
    <path d="M55 400 V140 Q55 60 150 60 Q245 60 245 140 V400Z" fill="#fff" opacity={op} />
    <path d="M75 400 V145 Q75 82 150 82 Q225 82 225 145 V400Z" fill="#fff" opacity={op * 0.7} />
  </g>
);
const Vase = ({ x }) => (
  <path transform={`translate(${x} 0)`} d="M22 400 Q8 350 28 330 Q18 300 34 290 Q50 300 40 330 Q60 350 46 400Z" fill="#b8934f" opacity=".45" />
);

export default function FashionArt({ type = "saree", color = "#7a1f2b", seed = 0, wide = false, className = "" }) {
  const id = useId().replace(/:/g, "");
  const [c1, c2] = BG[seed % BG.length];
  return (
    <svg
      viewBox={wide ? "0 0 1200 420" : "0 0 300 400"}
      preserveAspectRatio={wide ? "xMaxYMid slice" : "xMidYMid slice"}
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label={`Woman wearing ${type === "other" ? "festive" : type} outfit`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${id}g`} cx=".5" cy=".3" r=".6">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={wide ? 1200 : 300} height={wide ? 420 : 400} fill={`url(#${id})`} />
      {wide ? (
        <>
          {[0, 300, 600, 900].map((x) => <Arch key={x} x={x - 20} />)}
          <Vase x={470} /><Vase x={1130} />
          <circle cx="900" cy="140" r="280" fill={`url(#${id}g)`} />
          <ellipse cx="930" cy="410" rx="150" ry="10" fill="#000" opacity=".15" />
          <g transform="translate(780 0)"><Figure type={type} color={color} seed={seed} /></g>
        </>
      ) : (
        <>
          <Arch /><Vase x={-8} />
          <circle cx="150" cy="120" r="170" fill={`url(#${id}g)`} />
          <ellipse cx="150" cy="396" rx="105" ry="8" fill="#000" opacity=".15" />
          <Figure type={type} color={color} seed={seed} />
        </>
      )}
    </svg>
  );
}
