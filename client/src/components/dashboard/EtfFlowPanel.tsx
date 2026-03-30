/**
 * 黄金ETF资金流向面板
 */
import { ETF_DATA, formatNumber } from "@/lib/dashboardData";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function EtfFlowPanel() {
  const { totalAum, dailyFlow, list } = ETF_DATA;
  const latestFlow = dailyFlow[dailyFlow.length - 1];

  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-[#E8D5A3]">黄金ETF资金流向</h3>
        <span className="text-[10px] text-[#6B5B3E] px-2 py-0.5 rounded bg-[#1A1A24]">散户情绪</span>
      </div>
      <p className="text-[10px] text-[#6B5B3E] mb-3">全市场14只黄金ETF · 日度净申赎</p>

      {/* 总规模 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#1A1A24] rounded-lg p-3">
          <div className="text-[10px] text-[#6B5B3E] mb-0.5">总规模</div>
          <div className="text-lg font-bold text-[#D4A853]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {formatNumber(totalAum, 0)}
          </div>
          <div className="text-[10px] text-[#8B7355]">亿元</div>
        </div>
        <div className="bg-[#1A1A24] rounded-lg p-3">
          <div className="text-[10px] text-[#6B5B3E] mb-0.5">月累计净流入</div>
          <div className="text-lg font-bold text-[#C23B22]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            +{formatNumber(latestFlow.cumulative, 1)}
          </div>
          <div className="text-[10px] text-[#8B7355]">亿元</div>
        </div>
      </div>

      {/* 日度净流入柱状图 */}
      <div className="h-28 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyFlow} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false}
              tick={{ fontSize: 9, fill: '#6B5B3E' }} />
            <Tooltip
              contentStyle={{
                background: '#1A1A24', border: '1px solid rgba(212,168,83,0.2)',
                borderRadius: '6px', fontSize: '11px', color: '#E8D5A3',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number) => [(value > 0 ? '+' : '') + value.toFixed(2) + ' 亿元', '净流入']}
            />
            <Bar dataKey="flow" radius={[2, 2, 0, 0]}>
              {dailyFlow.map((entry, index) => (
                <Cell key={index} fill={entry.flow >= 0 ? 'rgba(212,168,83,0.7)' : 'rgba(139,115,85,0.5)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ETF列表 */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-12 gap-1 text-[10px] text-[#6B5B3E] px-2 pb-1 border-b border-[rgba(212,168,83,0.06)]">
          <span className="col-span-5">基金名称</span>
          <span className="col-span-3 text-right">规模(亿)</span>
          <span className="col-span-4 text-right">周净流入(亿)</span>
        </div>
        {list.slice(0, 6).map((etf) => (
          <div key={etf.code} className="grid grid-cols-12 gap-1 text-[11px] px-2 py-1 rounded hover:bg-[#1A1A24] transition-colors">
            <span className="col-span-5 text-[#E8D5A3] truncate">{etf.name}</span>
            <span className="col-span-3 text-right text-[#8B7355]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {(etf.nav * etf.shareBillion).toFixed(0)}
            </span>
            <span className={`col-span-4 text-right flex items-center justify-end gap-0.5 ${etf.flowWeek >= 0 ? 'text-[#C23B22]' : 'text-[#2D8B56]'}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {etf.flowWeek >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {etf.flowWeek >= 0 ? '+' : ''}{etf.flowWeek.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
