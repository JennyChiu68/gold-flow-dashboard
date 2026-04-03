/**
 * 银行规则变更事件时间线
 */
import { BANK_EVENTS } from "@/lib/dashboardData";
import { AlertCircle, ArrowUpCircle, PauseCircle } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  "门槛上调": <ArrowUpCircle className="w-3.5 h-3.5 text-[#C23B22]" />,
  "价差调整": <AlertCircle className="w-3.5 h-3.5 text-[#D4A853]" />,
  "暂停开户": <PauseCircle className="w-3.5 h-3.5 text-[#C23B22]" />,
};

export function BankEventsTimeline() {
  return (
    <div className="gold-border rounded-lg bg-[#111118] p-5 h-full gold-border-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-[#E8D5A3]">规则变更追踪</h3>
        <span className="text-[10px] text-[#6B5B3E] px-2 py-0.5 rounded bg-[#1A1A24]">信号监测</span>
      </div>
      <p className="text-[10px] text-[#6B5B3E] mb-4">银行积存金产品门槛/规则调整</p>

      {/* 时间线 */}
      <div className="space-y-0">
        {BANK_EVENTS.map((event, i) => (
          <div key={i} className="relative flex gap-3 pb-5 last:pb-0">
            {/* 时间线竖线 */}
            {i < BANK_EVENTS.length - 1 && (
              <div className="absolute left-[7px] top-5 bottom-0 w-px bg-[rgba(212,168,83,0.1)]" />
            )}

            {/* 图标 */}
            <div className="shrink-0 mt-0.5">
              {typeIcons[event.type] || <AlertCircle className="w-3.5 h-3.5 text-[#8B7355]" />}
            </div>

            {/* 内容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] text-[#6B5B3E]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {event.date}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                  event.impact === 'negative' ? 'bg-[#C23B22]/10 text-[#C23B22]' :
                  event.impact === 'warning' ? 'bg-[#D4A853]/10 text-[#D4A853]' :
                  'bg-[#2D8B56]/10 text-[#2D8B56]'
                }`}>
                  {event.type}
                </span>
              </div>
              <div className="text-[11px] text-[#E8D5A3] font-medium mb-0.5">{event.bank}</div>
              <p className="text-[11px] text-[#8B7355] leading-relaxed">{event.event}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 底部解读 */}
      <div className="mt-4 pt-3 border-t border-[rgba(212,168,83,0.08)]">
        <p className="text-[11px] text-[#8B7355] leading-relaxed">
          2026年Q1银行集体收紧积存金业务：工行6次上调门槛至1300元，建行调至1500元，招行点差从3元涨至5元，
          <span className="text-[#D4A853] font-medium">邮储/民生等银行要求客户解约销户</span>
          。这是自2018年《黄金积存业务管理暂行办法》以来最大规模的风控升级潮。
        </p>
      </div>
    </div>
  );
}
