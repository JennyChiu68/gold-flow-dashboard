/**
 * 央行黄金储备面板
 */
import { PBOC_RESERVE } from "@/lib/dashboardData";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Landmark } from "lucide-react";

export function PbocReserve() {
  const { reserve, change, month } = PBOC_RESERVE.current;
  const data = PBOC_RESERVE.history;

  // 计算每月变化
  const changeData = data.map((d, i) => ({
    month: d.month.slice(5),
    reserve: d.reserve,
    change: i > 0 ? d.reserve - data[i - 1].reserve : 0
  })).slice(1);

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-[#E8D5A3]">央行黄金储备</h3>
        <span className="text-[10px] text-[#6B5B3E] px-2 py-0.5 rounded bg-[#1A1A24]">官方托底</span>
      </div>
      <p className="text-[10px] text-[#6B5B3E] mb-3">中国人民银行 · 月度公布</p>

      {/* 核心数据 */}
      <div className="mb-4">
        <div className="text-[10px] text-[#6B5B3E] mb-0.5">当前储备（{month}）</div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#E8D5A3]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {reserve.toLocaleString()}
          </span>
          <span className="text-xs text-[#8B7355]">万盎司</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-[#C23B22]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            +{change} 万盎司
          </span>
          <span className="text-[10px] text-[#6B5B3E]">环比</span>
          <span className="text-[10px] text-[#C23B22] ml-2">连续增持</span>
        </div>
      </div>

      {/* 月度变化柱状图 */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={changeData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false}
              tick={{ fontSize: 9, fill: '#6B5B3E' }} interval={2} />
            <Tooltip
              contentStyle={{
                background: '#1A1A24', border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: '6px', fontSize: '11px', color: '#E8D5A3',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number) => [(value > 0 ? '+' : '') + value + ' 万盎司', '月度变化']}
            />
            <Bar dataKey="change" radius={[2, 2, 0, 0]}>
              {changeData.map((entry, index) => (
                <Cell key={index} fill={entry.change >= 0 ? 'rgba(212,168,83,0.7)' : 'rgba(139,115,85,0.5)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 解读 */}
      <div className="mt-3 pt-3 border-t border-[rgba(212,168,83,0.08)]">
        <div className="flex items-start gap-2">
          <Landmark className="w-3.5 h-3.5 text-[#D4A853] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#8B7355] leading-relaxed">
            央行连续增持黄金储备，释放去美元化和储备多元化信号，为金价提供长期支撑。
          </p>
        </div>
      </div>
    </div>
  );
}
