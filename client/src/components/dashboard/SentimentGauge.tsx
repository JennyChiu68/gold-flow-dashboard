/**
 * 情绪指数仪表盘 - 视觉升级版
 * 深金色底 + 指针 + 光晕 + 升级进度条 + 精细布局
 */
import { SENTIMENT, getSentimentColor, getSentimentLabel } from "@/lib/dashboardData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const GAUGE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/sentiment-gauge-bg-GfRnteu9mY2dRa282D8vyM.webp";

export function SentimentGauge() {
  const { score, level } = SENTIMENT.current;
  const color = getSentimentColor(score);

  // 仪表盘参数
  const cx = 110, cy = 112, r = 88;
  const circumference = Math.PI * r;
  const progress = (score / 100) * circumference;

  // 指针角度：0分=左端(180°)，100分=右端(0°)
  const needleAngle = 180 - (score / 100) * 180;
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleLen = 72;
  const needleX = cx + needleLen * Math.cos(needleRad);
  const needleY = cy - needleLen * Math.sin(needleRad);

  return (
    <div
      className="rounded-xl p-5 h-full relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #1C1508 0%, #151008 50%, #0F0C06 100%)",
        border: "1px solid #D4A85340",
        boxShadow: "0 0 60px #D4A85308, inset 0 1px 0 #D4A85318",
      }}
    >
      {/* 背景网格纹理 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#D4A853 1px, transparent 1px), linear-gradient(90deg, #D4A853 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* 顶部光晕 */}
      <div
        className="absolute top-0 left-0 w-full h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% -10%, #D4A85310 0%, transparent 70%)" }}
      />

      {/* ── 顶部标签行 ── */}
      <div className="relative flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-widest uppercase"
            style={{ background: "linear-gradient(90deg, #8B6914, #D4A853)", color: "#0A0A0F" }}
          >
            独家编制
          </span>
        </div>
        <span className="text-[10px] text-[#8B7355] px-2 py-0.5 rounded bg-[#D4A85310] border border-[#D4A85320]">综合指标</span>
      </div>

      {/* ── 标题 ── */}
      <div className="relative mb-3">
        <h3 className="text-base font-semibold text-[#E8D5A3] leading-tight">积存金情绪指数</h3>
        <p className="text-[10px] text-[#6B5B3E] mt-0.5">综合下方4项市场数据加权计算，反映当前积存金市场整体热度</p>
      </div>

      {/* ── 仪表盘 SVG ── */}
      <div className="relative flex justify-center items-end mb-1" style={{ height: 160 }}>
        <img src={GAUGE_BG} alt="" className="absolute inset-0 w-full h-full object-contain opacity-[0.07]" />
        <svg viewBox="0 0 220 130" className="w-full" style={{ maxHeight: 160 }}>
          <defs>
            {/* 弧形渐变：左绿→金→右红 */}
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2D8B56" />
              <stop offset="30%"  stopColor="#4CAF50" />
              <stop offset="58%"  stopColor="#D4A853" />
              <stop offset="100%" stopColor="#C23B22" />
            </linearGradient>
            {/* 进度弧发光滤镜 */}
            <filter id="glowArc" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* 指针发光 */}
            <filter id="glowNeedle">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* 中心光晕 */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 背景弧（全渐变，低透明度） */}
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none" stroke="url(#gaugeGrad)" strokeWidth="8" strokeLinecap="round" opacity="0.15" />

          {/* 进度弧 */}
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
            filter="url(#glowArc)"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />

          {/* 刻度线 */}
          {[0, 20, 40, 60, 80, 100].map((tick) => {
            const a = Math.PI - (tick / 100) * Math.PI;
            const x1 = cx + (r + 4) * Math.cos(a);
            const y1 = cy - (r + 4) * Math.sin(a);
            const x2 = cx + (r + 11) * Math.cos(a);
            const y2 = cy - (r + 11) * Math.sin(a);
            return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4A85350" strokeWidth="1.5" />;
          })}

          {/* 区间文字 */}
          <text x={cx - r - 6} y={cy + 14} fontSize="9" fontWeight="700" fill="#4CAF50" textAnchor="middle" opacity="0.95">恐慌</text>
          <text x={cx}          y="14"      fontSize="9" fontWeight="700" fill="#D4A853" textAnchor="middle" opacity="0.95">中性</text>
          <text x={cx + r + 6}  y={cy + 14} fontSize="9" fontWeight="700" fill="#C23B22" textAnchor="middle" opacity="0.95">贪婪</text>

          {/* 中心光晕圆 */}
          <circle cx={cx} cy={cy} r="32" fill="url(#centerGlow)" />

          {/* 指针 */}
          <line
            x1={cx} y1={cy}
            x2={needleX} y2={needleY}
            stroke={color} strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glowNeedle)"
          />
          {/* 指针底部圆点 */}
          <circle cx={cx} cy={cy} r="5" fill={color} opacity="0.9" filter="url(#glowNeedle)" />
          <circle cx={cx} cy={cy} r="2.5" fill="#1C1508" />
        </svg>

        {/* 中心数值浮层 */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-1">
          <span
            className="text-5xl font-bold leading-none tabular-nums"
            style={{ fontFamily: "'JetBrains Mono', monospace", color, textShadow: `0 0 24px ${color}50` }}
          >
            {score.toFixed(1)}
          </span>
          <span className="text-sm font-bold mt-1 tracking-[0.2em]" style={{ color }}>
            {level}
          </span>
        </div>
      </div>

      {/* ── 分隔线 ── */}
      <div className="relative my-3 flex items-center gap-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A85330] to-transparent" />
        <span className="text-[9px] text-[#6B5B3E] shrink-0 tracking-wider">构成因子（以下各板块数据来源）</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A85330] to-transparent" />
      </div>

      {/* ── 因子列表 ── */}
      <div className="relative space-y-2.5 mb-3">
        {SENTIMENT.factors.map((f) => {
          const fc = getSentimentColor(f.score);
          return (
            <div key={f.name} className="flex items-center gap-2.5">
              <span className="text-[11px] text-[#A89060] w-[88px] shrink-0 leading-none">{f.name}</span>
              {/* 进度条 */}
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(212,168,83,0.08)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${f.score}%`,
                    background: `linear-gradient(90deg, ${fc}60, ${fc})`,
                    boxShadow: `0 0 6px ${fc}50`,
                    transition: "width 0.7s ease",
                  }}
                />
              </div>
              {/* 分值 */}
              <span
                className="text-[12px] font-semibold w-7 text-right tabular-nums"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: fc }}
              >
                {f.score.toFixed(0)}
              </span>
              {/* 趋势 */}
              <div className="w-4 flex justify-center">
                {(f.trend as string) === 'up'   && <TrendingUp   className="w-3.5 h-3.5 text-[#C23B22]" />}
                {(f.trend as string) === 'down' && <TrendingDown className="w-3.5 h-3.5 text-[#4CAF50]" />}
                {(f.trend as string) === 'flat' && <Minus        className="w-3.5 h-3.5 text-[#8B7355]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 趋势图 ── */}
      <div className="relative mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-[#6B5B3E]">03-03</span>
          <span className="text-[9px] text-[#6B5B3E]">近一月趋势（3月下旬急跌）</span>
          <span className="text-[9px] text-[#6B5B3E]">04-02</span>
        </div>
        <div className="h-12 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SENTIMENT.history}>
              <defs>
                <linearGradient id="sentimentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A853" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="score" stroke="#D4A853" strokeWidth={1.5}
                fill="url(#sentimentGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── 底部合规声明 ── */}
      <div className="relative mt-2 pt-2 border-t border-[#D4A85318]">
        <p className="text-[9px] text-[#4A3D2A] leading-relaxed">
          数据来源：上金所 · 上期所 · 沪深ETF · 央行公告 &nbsp;|&nbsp; 本指数仅供参考，不构成投资建议
        </p>
      </div>
    </div>
  );
}
