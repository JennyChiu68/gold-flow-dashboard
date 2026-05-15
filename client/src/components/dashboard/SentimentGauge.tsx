/**
 * 情绪指数仪表盘 - 核心指标（突出核心地位版）
 * 金色渐变底色区分 + 品牌标签 + 因子来源说明
 */
import { SENTIMENT, getSentimentColor, getSentimentLabel } from "@/lib/dashboardData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const GAUGE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/sentiment-gauge-bg-GfRnteu9mY2dRa282D8vyM.webp";

export function SentimentGauge() {
  const { score, level } = SENTIMENT.current;
  const color = getSentimentColor(score);

  const radius = 80;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div
      className="rounded-lg p-5 h-full relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1A1408 0%, #16120A 40%, #111008 100%)",
        border: "1px solid #D4A85350",
        boxShadow: "0 0 40px #D4A85312, inset 0 1px 0 #D4A85320",
      }}
    >
      {/* 背景光晕，强化"核心"感 */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #D4A85308 0%, transparent 70%)",
        }}
      />

      {/* 顶部标签行 */}
      <div className="relative flex items-center justify-between mb-1">
        {/* 左：品牌标签 */}
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-widest uppercase"
            style={{
              background: "linear-gradient(90deg, #8B6914, #D4A853)",
              color: "#0A0A0F",
            }}
          >
            独家编制
          </span>

        </div>
        {/* 右：综合指标 */}
        <span className="text-[10px] text-[#8B7355] px-2 py-0.5 rounded bg-[#D4A85310] border border-[#D4A85320]">综合指标</span>
      </div>

      {/* 标题 + 说明 */}
      <div className="relative mb-3">
        <h3 className="text-base font-semibold text-[#E8D5A3] leading-tight">积存金情绪指数</h3>
        <p className="text-[10px] text-[#8B7355] mt-0.5 leading-relaxed">
          综合下方4项市场数据加权计算，反映当前积存金市场整体热度
        </p>
      </div>

      {/* 仪表盘 */}
      <div className="relative flex justify-center items-center mb-3">
        <div className="relative w-52 h-32">
          <img src={GAUGE_BG} alt="" className="absolute inset-0 w-full h-full object-contain opacity-10" />
          <svg viewBox="0 0 200 115" className="w-full h-full">
            <defs>
              <linearGradient id="gaugeGradCore" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#C23B22" />
                <stop offset="35%"  stopColor="#D4742A" />
                <stop offset="60%"  stopColor="#D4A853" />
                <stop offset="100%" stopColor="#4CAF50" />
              </linearGradient>
            </defs>
            {/* 背景弧 */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none"
              stroke="url(#gaugeGradCore)" strokeWidth="10" strokeLinecap="round" opacity="0.15" />
            {/* 进度弧 */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none"
              stroke={color} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              style={{ filter: `drop-shadow(0 0 10px ${color}70)` }} />
            {/* 刻度 */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = Math.PI - (tick / 100) * Math.PI;
              const x1 = 100 + 86 * Math.cos(angle);
              const y1 = 100 - 86 * Math.sin(angle);
              const x2 = 100 + 94 * Math.cos(angle);
              const y2 = 100 - 94 * Math.sin(angle);
              return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212,168,83,0.35)" strokeWidth="1.5" />;
            })}
            {/* 区间文字 */}
            <text x="14" y="114" fontSize="11" fontWeight="bold" fill="#E05C3F" textAnchor="middle" style={{ letterSpacing: '0.5px' }}>恐慌</text>
            <text x="100" y="26" fontSize="11" fontWeight="bold" fill="#D4A853" textAnchor="middle" style={{ letterSpacing: '0.5px' }}>中性</text>
            <text x="186" y="114" fontSize="11" fontWeight="bold" fill="#5DC96A" textAnchor="middle" style={{ letterSpacing: '0.5px' }}>贪婪</text>
          </svg>
          {/* 中心数值 */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="text-4xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color }}>
              {score.toFixed(1)}
            </span>
            <span
              className="text-[10px] font-semibold mt-0.5 px-2 py-0.5 rounded-full"
              style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}
            >
              {level}
            </span>
          </div>
        </div>
      </div>

      {/* 因子分解：带权重 + "数据来源"说明 */}
      <div className="relative space-y-2 mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#8B7355]">构成因子（以下各板块数据来源）</span>

        </div>
        {SENTIMENT.factors.map((f) => (
          <div key={f.name} className="flex items-center gap-2">
            <span className="text-[11px] text-[#A89060] w-24 shrink-0">{f.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#D4A85310] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${f.score}%`,
                  background: `linear-gradient(90deg, ${getSentimentColor(f.score)}50, ${getSentimentColor(f.score)})`,
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

      {/* 趋势图 */}
      <div className="relative h-12 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SENTIMENT.history}>
            <defs>
              <linearGradient id="sentimentGradCore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A853" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="score" stroke="#D4A853" strokeWidth={1.5}
              fill="url(#sentimentGradCore)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="relative flex justify-between text-[10px] text-[#6B5B3E] -mt-1">
        <span>03-03</span>
        <span>近一月趋势（3月下旬急跌）</span>
        <span>04-02</span>
      </div>

      {/* 底部合规声明 */}
      <div className="relative mt-2 pt-2 border-t border-[#D4A85320]">
        <p className="text-[9px] text-[#6B5B3E] leading-relaxed">
          数据来源：上金所 · 上期所 · 沪深ETF · 央行公告 &nbsp;|&nbsp; 本指数仅供参考，不构成投资建议
        </p>
      </div>
    </div>
  );
}
