/**
 * 银行积存金报价对比表
 */
import { BANK_PRICES, formatNumber } from "@/lib/dashboardData";
import { Building2, AlertTriangle } from "lucide-react";

const BANK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/bank-section-bg-4CpuYRJnyzfq6roX5dHhGn.webp";

export function BankPriceTable() {
  // 找到最低买入价和最低价差
  const minBuy = Math.min(...BANK_PRICES.map(b => b.buyPrice));
  const minSpread = Math.min(...BANK_PRICES.map(b => b.spread));

  return (
    <div className="gold-border rounded-lg bg-[#111118] overflow-hidden h-full gold-border-hover transition-all duration-300">
      {/* 顶部装饰 */}
      <div className="relative h-14 overflow-hidden">
        <img src={BANK_BG} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111118]" />
        <div className="absolute inset-0 flex items-center px-5">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-[#D4A853]" />
            <div>
              <h3 className="text-sm font-semibold text-[#E8D5A3]">银行积存金报价对比</h3>
              <p className="text-[10px] text-[#6B5B3E]">8家主要商业银行 · 实时报价</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-3">
        {/* 表头 */}
        <div className="grid grid-cols-12 gap-2 text-[10px] text-[#6B5B3E] px-3 pb-2 border-b border-[rgba(212,168,83,0.1)]">
          <span className="col-span-2">银行</span>
          <span className="col-span-2">产品名称</span>
          <span className="col-span-2 text-right">买入价</span>
          <span className="col-span-2 text-right">卖出价</span>
          <span className="col-span-1 text-right">价差</span>
          <span className="col-span-1 text-right">起购</span>
          <span className="col-span-2 text-center">状态</span>
        </div>

        {/* 数据行 */}
        <div className="divide-y divide-[rgba(212,168,83,0.05)]">
          {BANK_PRICES.map((bank) => (
            <div key={bank.bank} className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 hover:bg-[#1A1A24]/50 transition-colors">
              <span className="col-span-2 text-[12px] text-[#E8D5A3] font-medium">{bank.bank}</span>
              <span className="col-span-2 text-[11px] text-[#8B7355]">{bank.product}</span>
              <span className={`col-span-2 text-right text-[12px] ${bank.buyPrice === minBuy ? 'text-[#2D8B56] font-semibold' : 'text-[#E8D5A3]'}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatNumber(bank.buyPrice)}
                {bank.buyPrice === minBuy && <span className="text-[8px] ml-1">最低</span>}
              </span>
              <span className="col-span-2 text-right text-[12px] text-[#E8D5A3]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatNumber(bank.sellPrice)}
              </span>
              <span className={`col-span-1 text-right text-[11px] ${bank.spread === minSpread ? 'text-[#2D8B56]' : 'text-[#8B7355]'}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {bank.spread.toFixed(2)}
              </span>
              <span className="col-span-1 text-right text-[11px] text-[#8B7355]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {bank.minAmount}
              </span>
              <div className="col-span-2 flex justify-center">
                {bank.status === "正常" ? (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#2D8B56]/15 text-[#2D8B56]">正常</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#C23B22]/15 text-[#C23B22] flex items-center gap-0.5">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    {bank.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-3 pt-3 border-t border-[rgba(212,168,83,0.08)]">
          <p className="text-[10px] text-[#6B5B3E] leading-relaxed">
            价差 = 买入价 - 卖出价，反映银行的交易成本。价差越小对用户越有利。起购金额单位为元。
            <span className="text-[#D4A853]"> 绿色标注</span>表示当前最优选项。
          </p>
        </div>
      </div>
    </div>
  );
}
