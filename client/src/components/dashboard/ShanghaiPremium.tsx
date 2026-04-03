/**
 * 上海金溢价面板
 */
import { SHANGHAI_PREMIUM, formatNumber } from "@/lib/dashboardData";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { TrendingUp } from "lucide-react";

export function ShanghaiPremium() {
  const { premium } = SHANGHAI_PREMIUM.current;
  const data = SHANGHAI_PREMIUM.history;

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-[#E8D5A3]">上海金溢价</h3>
        <span className="text-[10px] text-[#6B5B3E] px-2 py-0.5 rounded bg-[#1A1A24]">核心因子</span>
      </div>
      <p className="text-[10px] text-[#6B5B3E] mb-3">上海金 vs LBMA金价 · 反映国内实物需求强弱</p>

      {/* 当前溢价 */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: premium > 0 ? '#C23B22' : '#2D8B56' }}>
          {premium > 0 ? '+' : ''}{premium.toFixed(2)}
        </span>
        <span className="text-xs text-[#8B7355]">美元/盎司</span>
        {premium > 0 ? (
          <TrendingUp className="w-3.5 h-3.5 text-[#C23B22] ml-1" />
        ) : (
          <TrendingUp className="w-3.5 h-3.5 text-[#2D8B56] ml-1 rotate-180" />
        )}
      </div>

      {/* 溢价柱状图 */}
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false}
              tick={{ fontSize: 9, fill: '#6B5B3E' }} interval={4} />
            <ReferenceLine y={0} stroke="rgba(212,168,83,0.15)" />
            <Tooltip
              contentStyle={{
                background: '#1A1A24', border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: '6px', fontSize: '11px', color: '#E8D5A3',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number) => [(value > 0 ? '+' : '') + value.toFixed(2) + ' $/oz', '溢价']}
            />
            <Bar dataKey="premium" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.premium >= 0 ? 'rgba(194,59,34,0.7)' : 'rgba(45,139,86,0.7)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 解读 */}
      <div className="mt-3 pt-3 border-t border-[rgba(212,168,83,0.08)]">
        <div className="flex items-start gap-2">
          <div className={`w-1 h-8 rounded-full ${premium > 0 ? 'bg-[#C23B22]' : 'bg-[#2D8B56]'} shrink-0 mt-0.5`} />
          <p className="text-[11px] text-[#8B7355] leading-relaxed">
            {premium > 0 
              ? '当前溢价为正，表明国内实物黄金需求旺盛，“大妈”买盘力量较强，对金价形成托底支撑。'
              : '当前转为折价，表明3月下旬金价暴跌引发国内投资者恐慌性抛售，实物托底力量暂时减弱。关注溢价何时回正。'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
