/**
 * 情绪指数仪表盘 - 核心指标
 * 弧形仪表盘 + 因子分解 + 历史趋势
 */
import { SENTIMENT, getSentimentColor, getSentimentLabel } from "@/lib/dashboardData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const GAUGE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/sentiment-gauge-bg-GfRnteu9mY2dRa282D8vyM.webp";

export function SentimentGauge() {
  const { score, level } = SENTIMENT.current;
  const color = getSentimentColor(score);
  // SVG gauge arc
  const radius = 80;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#E8D5A3]">实物托底情绪指数</h3>
        <span className="text-[10px] text-[#8B7355] px-2 py-0.5 rounded bg-[#1A1A24]">综合指标</span>
      </div>

      {/* 仪表盘 */}
      <div className="relative flex justify-center items-center mb-4">
        <div className="relative w-48 h-28">
          {/* 背景装饰 */}
          <img src={GAUGE_BG} alt="" className="absolute inset-0 w-full h-full object-contain opacity-10" />

          <svg viewBox="0 0 200 110" className="w-full h-full">
            {/* 背景弧 */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(212,168,83,0.1)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* 进度弧 */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
            />
            {/* 刻度标记 */}
            {[0, 20, 40, 60, 80, 100].map((tick) => {
              const angle = Math.PI - (tick / 100) * Math.PI;
              const x1 = 100 + 88 * Math.cos(angle);
              const y1 = 100 - 88 * Math.sin(angle);
              const x2 = 100 + 94 * Math.cos(angle);
              const y2 = 100 - 94 * Math.sin(angle);
              return (
                <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(212,168,83,0.3)" strokeWidth="1.5" />
              );
            })}
          </svg>

          {/* 中心数值 */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className="text-4xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color }}>
              {score.toFixed(1)}
            </span>
            <span className="text-xs mt-0.5" style={{ color }}>{level}</span>
          </div>
        </div>
      </div>

      {/* 因子分解 */}
      <div className="space-y-2.5 mb-4">
        {SENTIMENT.factors.map((f) => (
          <div key={f.name} className="flex items-center gap-2">
            <span className="text-[11px] text-[#8B7355] w-24 shrink-0">{f.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#1A1A24] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${f.score}%`,
                  background: `linear-gradient(90deg, ${getSentimentColor(f.score)}80, ${getSentimentColor(f.score)})`,
                }}
              />
            </div>
            <span className="text-[11px] w-8 text-right" style={{ fontFamily: "'JetBrains Mono', monospace", color: getSentimentColor(f.score) }}>
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
        <span>03-01</span>
        <span>近一月趋势</span>
        <span>03-28</span>
      </div>
    </div>
  );
}
