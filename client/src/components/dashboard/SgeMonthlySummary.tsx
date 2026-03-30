/**
 * SGE月度数据面板 - 出库量、交割量、代理占比
 */
import { SGE_MONTHLY } from "@/lib/dashboardData";
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Warehouse } from "lucide-react";

const FLOW_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/gold-flow-pattern-nBoyB9j22g76DjWd4fKqCC.webp";

export function SgeMonthlySummary() {
  const data = SGE_MONTHLY.map(d => ({
    ...d,
    period: d.period.slice(2), // "24-07" format
  }));
  const latest = SGE_MONTHLY[SGE_MONTHLY.length - 1];
  const prev = SGE_MONTHLY[SGE_MONTHLY.length - 2];
  const withdrawalChange = ((latest.withdrawal - prev.withdrawal) / prev.withdrawal * 100).toFixed(1);

  return (
    <div className="gold-border rounded-lg bg-[#111118] overflow-hidden h-full gold-border-hover transition-all duration-300">
      {/* 顶部装饰 */}
      <div className="relative h-16 overflow-hidden">
        <img src={FLOW_BG} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111118]" />
        <div className="absolute inset-0 flex items-center px-5">
          <div className="flex items-center gap-3">
            <Warehouse className="w-5 h-5 text-[#D4A853]" />
            <div>
              <h3 className="text-sm font-semibold text-[#E8D5A3]">SGE黄金出库量与交割量</h3>
              <p className="text-[10px] text-[#6B5B3E]">上海黄金交易所月报 · 实物需求核心指标</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-2">
        {/* 关键指标卡片 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#1A1A24] rounded-lg p-3 text-center">
            <div className="text-[10px] text-[#6B5B3E] mb-1">本月出库量</div>
            <div className="text-xl font-bold text-[#D4A853]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {latest.withdrawal.toFixed(1)}
            </div>
            <div className="text-[10px] text-[#8B7355]">吨</div>
            <div className={`text-[10px] mt-0.5 ${Number(withdrawalChange) > 0 ? 'text-[#C23B22]' : 'text-[#2D8B56]'}`}>
              {Number(withdrawalChange) > 0 ? '+' : ''}{withdrawalChange}%
            </div>
          </div>
          <div className="bg-[#1A1A24] rounded-lg p-3 text-center">
            <div className="text-[10px] text-[#6B5B3E] mb-1">本月交割量</div>
            <div className="text-xl font-bold text-[#E8D5A3]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {latest.delivery.toFixed(0)}
            </div>
            <div className="text-[10px] text-[#8B7355]">吨</div>
          </div>
          <div className="bg-[#1A1A24] rounded-lg p-3 text-center">
            <div className="text-[10px] text-[#6B5B3E] mb-1">代理占比</div>
            <div className="text-xl font-bold text-[#F0C27F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {latest.agencyPct.toFixed(1)}
            </div>
            <div className="text-[10px] text-[#8B7355]">%</div>
          </div>
        </div>

        {/* 组合图表 */}
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,83,0.06)" />
              <XAxis dataKey="period" axisLine={false} tickLine={false}
                tick={{ fontSize: 9, fill: '#6B5B3E' }} interval={3} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false}
                tick={{ fontSize: 9, fill: '#6B5B3E' }} width={35} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                tick={{ fontSize: 9, fill: '#6B5B3E' }} width={35}
                tickFormatter={(v: number) => v + '%'} />
              <Tooltip
                contentStyle={{
                  background: '#1A1A24', border: '1px solid rgba(212,168,83,0.2)',
                  borderRadius: '6px', fontSize: '11px', color: '#E8D5A3',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '10px', color: '#8B7355' }} />
              <Bar yAxisId="left" dataKey="withdrawal" name="出库量(吨)" fill="rgba(212,168,83,0.6)" radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="agencyPct" name="代理占比(%)"
                stroke="#F0C27F" strokeWidth={2} dot={{ r: 2, fill: '#F0C27F' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 解读 */}
        <div className="mt-3 pt-3 border-t border-[rgba(212,168,83,0.08)]">
          <p className="text-[11px] text-[#8B7355] leading-relaxed">
            <span className="text-[#D4A853] font-medium">出库量</span>是衡量国内实物黄金需求的最核心指标——黄金从交易所仓库被提走，意味着真实的实物买盘。
            <span className="text-[#D4A853] font-medium">代理占比</span>反映散户/机构通过银行等渠道参与的活跃度。
          </p>
        </div>
      </div>
    </div>
  );
}
