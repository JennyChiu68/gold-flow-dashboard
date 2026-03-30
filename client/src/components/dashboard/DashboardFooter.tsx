/**
 * 看板页脚
 */
import { DASHBOARD_META } from "@/lib/dashboardData";
import { Crown, Shield, ExternalLink } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="mt-8 border-t border-[rgba(212,168,83,0.08)]">
      <div className="container py-8">
        {/* Art Deco装饰 */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="art-deco-line flex-1 max-w-32" />
          <Crown className="w-4 h-4 text-[#D4A853]" />
          <div className="art-deco-line flex-1 max-w-32" />
        </div>

        {/* 数据说明 */}
        <div className="max-w-2xl mx-auto text-center mb-6">
          <h4 className="text-xs text-[#D4A853] font-semibold mb-2">数据说明与免责声明</h4>
          <p className="text-[11px] text-[#6B5B3E] leading-relaxed">
            本看板数据来源于上海黄金交易所月报、中国人民银行公开数据、各商业银行官网报价、基金公司公告等公开渠道。
            "实物托底情绪指数"为基于公开数据的估算模型，仅供参考，不构成投资建议。
            积存金申赎净额为模型估算值，非银行直接披露数据。
          </p>
        </div>

        {/* 数据源 */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {DASHBOARD_META.dataSources.map((src) => (
            <div key={src} className="flex items-center gap-1.5 text-[11px] text-[#8B7355]">
              <Shield className="w-3 h-3 text-[#6B5B3E]" />
              {src}
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="flex items-center justify-between text-[10px] text-[#6B5B3E]">
          <div className="flex items-center gap-2">
            <span>金十数据 · VIP独家内容</span>
            <a href="https://svip.jin10.com/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-0.5 text-[#D4A853] hover:text-[#F0C27F] transition-colors">
              了解VIP <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <span>更新于 {DASHBOARD_META.updateTime}</span>
        </div>
      </div>
    </footer>
  );
}
