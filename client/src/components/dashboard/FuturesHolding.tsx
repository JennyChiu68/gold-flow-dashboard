/**
 * SHFE黄金期货持仓量面板
 */
import { SHFE_FUTURES, formatNumber } from "@/lib/dashboardData";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

export function FuturesHolding() {
  const { hold, holdChange, volume } = SHFE_FUTURES.current;
  const data = SHFE_FUTURES.history;

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-[#E8D5A3]">SHFE期货持仓</h3>
        <span className="text-[10px] text-[#6B5B3E] px-2 py-0.5 rounded bg-[#1A1A24]">投机情绪</span>
      </div>
      <p className="text-[10px] text-[#6B5B3E] mb-3">上海期货交易所 · 黄金主力合约</p>

      {/* 核心数据 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-[10px] text-[#6B5B3E] mb-0.5">持仓量（手）</div>
          <div className="text-2xl font-bold text-[#E8D5A3]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {hold.toLocaleString()}
          </div>
          <div className={`text-xs mt-0.5 ${holdChange > 0 ? 'text-[#C23B22]' : 'text-[#2D8B56]'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {holdChange > 0 ? '+' : ''}{holdChange.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#6B5B3E] mb-0.5">成交量（手）</div>
          <div className="text-2xl font-bold text-[#D4A853]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {(volume / 10000).toFixed(1)}
          </div>
          <div className="text-[10px] text-[#6B5B3E]">万手</div>
        </div>
      </div>

      {/* 持仓量趋势 */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="holdGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A853" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" axisLine={false} tickLine={false}
              tick={{ fontSize: 9, fill: '#6B5B3E' }} interval={4} />
            <Tooltip
              contentStyle={{
                background: '#1A1A24', border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: '6px', fontSize: '11px', color: '#E8D5A3',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number, name: string) => [value.toLocaleString() + ' 手', name === 'hold' ? '持仓量' : '成交量']}
            />
            <Area type="monotone" dataKey="hold" stroke="#D4A853" strokeWidth={1.5}
              fill="url(#holdGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 解读 */}
      <div className="mt-3 pt-3 border-t border-[rgba(212,168,83,0.08)]">
        <div className="flex items-start gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-[#D4A853] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#8B7355] leading-relaxed">
            {holdChange < 0 
              ? `持仓量单日减少${Math.abs(holdChange).toLocaleString()}手，3月下旬暴跌引发多头大规模平仓，持仓从18.5万手高点回落。`
              : `持仓量回升，多头力量正在重新聚集。`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
