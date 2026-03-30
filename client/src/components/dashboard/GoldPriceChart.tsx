/**
 * Au99.99金价走势图
 */
import { GOLD_PRICE, formatNumber } from "@/lib/dashboardData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function GoldPriceChart() {
  const data = GOLD_PRICE.history;

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#E8D5A3]">Au99.99 走势</h3>
          <p className="text-[10px] text-[#6B5B3E] mt-0.5">上海黄金交易所 · 近30个交易日</p>
        </div>
        <div className="flex gap-1">
          {["1W", "1M", "3M"].map((t, i) => (
            <button key={t} className={`px-2.5 py-1 rounded text-[10px] transition-colors ${i === 1 ? 'bg-[#D4A853]/20 text-[#D4A853]' : 'text-[#6B5B3E] hover:text-[#8B7355]'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="goldPriceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A853" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,83,0.06)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: '#6B5B3E' }} interval="preserveStartEnd" />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: '#6B5B3E' }} width={50}
              tickFormatter={(v: number) => v.toFixed(0)} />
            <Tooltip
              contentStyle={{
                background: '#1A1A24', border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: '6px', fontSize: '11px', color: '#E8D5A3',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number) => [formatNumber(value) + ' 元/克', 'Au99.99']}
              labelStyle={{ color: '#8B7355' }}
            />
            <Area type="monotone" dataKey="close" stroke="#D4A853" strokeWidth={2}
              fill="url(#goldPriceGrad)" dot={false}
              activeDot={{ r: 4, fill: '#D4A853', stroke: '#0A0A0F', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 底部统计 */}
      <div className="grid grid-cols-4 gap-3 mt-3 pt-3 border-t border-[rgba(212,168,83,0.08)]">
        {[
          { label: "最高", value: Math.max(...data.map(d => d.high)), color: "#C23B22" },
          { label: "最低", value: Math.min(...data.map(d => d.low)), color: "#2D8B56" },
          { label: "均价", value: data.reduce((s, d) => s + d.close, 0) / data.length, color: "#D4A853" },
          { label: "振幅", value: ((Math.max(...data.map(d => d.high)) - Math.min(...data.map(d => d.low))) / Math.min(...data.map(d => d.low)) * 100), color: "#8B7355", suffix: "%" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-[10px] text-[#6B5B3E] mb-0.5">{s.label}</div>
            <div className="text-xs font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: s.color }}>
              {s.suffix ? s.value.toFixed(2) + s.suffix : formatNumber(s.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
