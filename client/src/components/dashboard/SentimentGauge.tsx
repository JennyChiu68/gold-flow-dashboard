/**
 * 情绪指数仪表盘 - 核心指标（视觉升级版）
 * 独家编制标签 + 权重可视化 + 金色渐变仪表盘 + 区间说明
 */
import { SENTIMENT, getSentimentColor, getSentimentLabel } from "@/lib/dashboardData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const GAUGE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/sentiment-gauge-bg-GfRnteu9mY2dRa282D8vyM.webp";

// 区间定义
const ZONES = [
  { min: 0,  max: 30,  label: "极度恐慌", color: "#C23B22" },
  { min: 30, max: 50,  label: "恐慌",     color: "#D4742A" },
  { min: 50, max: 70,  label: "中性",     color: "#D4A853" },
  { min: 70, max: 85,  label: "贪婪",     color: "#8BC34A" },
  { min: 85, max: 100, label: "极度贪婪", color: "#4CAF50" },
];

function getCurrentZone(score: number) {
  return ZONES.find(z => score >= z.min && score < z.max) || ZONES[ZONES.length - 1];
}

export function SentimentGauge() {
  const { score, level } = SENTIMENT.current;
  const color = getSentimentColor(score);
  const zone = getCurrentZone(score);

  // SVG gauge arc
  const radius = 80;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">

      {/* 标题行：独家编制标签 */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#E8D5A3]">实物托底情绪指数</h3>
            {/* 独家编制标签 */}
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wide"
              style={{
                background: "linear-gradient(90deg, #8B6914, #D4A853, #8B6914)",
                color: "#0A0A0F",
                border: "1px solid #D4A85360",
                letterSpacing: "0.08em",
              }}
            >
              独家编制
            </span>
          </div>
          <p className="text-[10px] text-[#6B5B3E] mt-0.5">综合4项市场因子加权计算</p>
        </div>
        <span className="text-[10px] text-[#8B7355] px-2 py-0.5 rounded bg-[#1A1A24] shrink-0">综合指标</span>
      </div>

      {/* 仪表盘 */}
      <div className="relative flex justify-center items-center mb-3">
        <div className="relative w-52 h-32">
          {/* 背景装饰 */}
          <img src={GAUGE_BG} alt="" className="absolute inset-0 w-full h-full object-contain opacity-10" />

          <svg viewBox="0 0 200 115" className="w-full h-full">
            <defs>
              {/* 渐变弧：红→橙→金→绿 */}
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#C23B22" />
                <stop offset="30%"  stopColor="#D4742A" />
                <stop offset="55%"  stopColor="#D4A853" />
                <stop offset="80%"  stopColor="#8BC34A" />
                <stop offset="100%" stopColor="#4CAF50" />
              </linearGradient>
              <linearGradient id="gaugeProgress" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#C23B22" />
                <stop offset="30%"  stopColor="#D4742A" />
                <stop offset="55%"  stopColor="#D4A853" />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>

            {/* 背景弧（渐变底色） */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.18"
            />
            {/* 进度弧 */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeProgress)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              style={{ filter: `drop-shadow(0 0 10px ${color}60)` }}
            />
            {/* 刻度标记 */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = Math.PI - (tick / 100) * Math.PI;
              const x1 = 100 + 86 * Math.cos(angle);
              const y1 = 100 - 86 * Math.sin(angle);
              const x2 = 100 + 94 * Math.cos(angle);
              const y2 = 100 - 94 * Math.sin(angle);
              return (
                <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(212,168,83,0.4)" strokeWidth="1.5" />
              );
            })}
            {/* 区间标签：恐慌 / 中性 / 贪婪 */}
            <text x="14" y="112" fontSize="7" fill="#C23B2280" textAnchor="middle">恐慌</text>
            <text x="100" y="30" fontSize="7" fill="#D4A85380" textAnchor="middle">中性</text>
            <text x="186" y="112" fontSize="7" fill="#4CAF5080" textAnchor="middle">贪婪</text>
          </svg>

          {/* 中心数值 */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="text-4xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color }}>
              {score.toFixed(1)}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: zone.color,
                  background: `${zone.color}18`,
                  border: `1px solid ${zone.color}40`,
                }}
              >
                {level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 因子分解：带权重 */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-[#6B5B3E]">构成因子</span>
          <span className="text-[10px] text-[#6B5B3E]">权重　分值</span>
        </div>
        {SENTIMENT.factors.map((f) => (
          <div key={f.name} className="flex items-center gap-2">
            <span className="text-[11px] text-[#8B7355] w-24 shrink-0">{f.name}</span>
            {/* 权重标签 */}
            <span
              className="text-[9px] shrink-0 px-1 py-0.5 rounded"
              style={{ color: "#D4A85390", background: "#D4A85312", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {f.weight}%
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-[#1A1A24] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${f.score}%`,
                  background: `linear-gradient(90deg, ${getSentimentColor(f.score)}60, ${getSentimentColor(f.score)})`,
                  boxShadow: `0 0 4px ${getSentimentColor(f.score)}40`,
                }}
              />
            </div>
            <span className="text-[11px] w-7 text-right" style={{ fontFamily: "'JetBrains Mono', monospace", color: getSentimentColor(f.score) }}>
              {f.score.toFixed(0)}
            </span>
            <div className="w-3.5">
              {(f.trend as string) === 'up' && <TrendingUp className="w-3 h-3 text-[#C23B22]" />}
              {(f.trend as string) === 'down' && <TrendingDown className="w-3 h-3 text-[#2D8B56]" />}
              {(f.trend as string) === 'flat' && <Minus className="w-3 h-3 text-[#8B7355]" />}
            </div>
          </div>
        ))}
      </div>

      {/* 迷你趋势图 */}
      <div className="h-12 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SENTIMENT.history}>
            <defs>
              <linearGradient id="sentimentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A853" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="score" stroke="#D4A853" strokeWidth={1.5}
              fill="url(#sentimentGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-[10px] text-[#6B5B3E] -mt-1">
        <span>03-03</span>
        <span>近一月趋势（3月下旬急跌）</span>
        <span>04-02</span>
      </div>

      {/* 底部数据来源说明 */}
      <div className="mt-2 pt-2 border-t border-[#D4A85318]">
        <p className="text-[9px] text-[#6B5B3E] leading-relaxed">
          数据来源：上金所 · 上期所 · 沪深ETF · 央行公告　本指数仅供参考，不构成投资建议
        </p>
      </div>
    </div>
  );
}
