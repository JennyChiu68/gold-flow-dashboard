/**
 * Hero区域 - 暗金数据殿堂顶部
 * 包含看板标题、实时金价、VIP标识、更新时间
 */
import { motion } from "framer-motion";
import { DASHBOARD_META, GOLD_PRICE, formatNumber } from "@/lib/dashboardData";
import { Crown, Clock, TrendingUp, TrendingDown, Zap } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/hero-bg-URA2fR6VrQwYTR5k85HPed.webp";

export function HeroSection() {
  const { price, change, changePct } = GOLD_PRICE.current;
  const isUp = change >= 0;

  return (
    <header className="relative overflow-hidden">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-[#0A0A0F]/80 to-[#0A0A0F]" />
      </div>

      <div className="container relative z-10 pt-6 pb-8">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#F0C27F] to-[#D4A853] flex items-center justify-center">
              <Crown className="w-4 h-4 text-[#0A0A0F]" />
            </div>
            <span className="text-[#D4A853] font-semibold text-sm tracking-wider">金十数据 · VIP独家</span>
          </div>
          <div className="flex items-center gap-2 text-[#8B7355] text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>更新于 {DASHBOARD_META.updateTime}</span>
            <span className="inline-flex items-center gap-1 ml-3 px-2 py-0.5 rounded-full bg-[#2D8B56]/20 text-[#2D8B56] text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D8B56] pulse-gold" />
              LIVE
            </span>
          </div>
        </div>

        {/* 主标题区 */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="art-deco-line w-12" />
                <span className="text-[#8B7355] text-xs tracking-[0.3em] uppercase">{DASHBOARD_META.version}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold gold-gradient-text" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {DASHBOARD_META.title}
              </h1>
              <p className="text-[#8B7355] mt-2 text-sm">{DASHBOARD_META.subtitle} · 多维度独家另类数据</p>
            </motion.div>
          </div>

          {/* 实时金价卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gold-border rounded-lg px-6 py-4 bg-[#111118]/80 backdrop-blur-sm gold-glow"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3.5 h-3.5 text-[#D4A853]" />
              <span className="text-[#8B7355] text-xs">Au99.99 实时</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-[#E8D5A3]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatNumber(price)}
              </span>
              <span className="text-xs text-[#8B7355]">元/克</span>
              <div className={`flex items-center gap-1 text-sm ${isUp ? 'text-[#C23B22]' : 'text-[#2D8B56]'}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {isUp ? '+' : ''}{formatNumber(change)} ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 数据源标签 */}
        <div className="flex flex-wrap gap-2 mt-6">
          {DASHBOARD_META.dataSources.map((src) => (
            <span key={src} className="px-2.5 py-1 rounded text-[10px] text-[#8B7355] bg-[#1A1A24] border border-[rgba(212,168,83,0.08)]">
              {src}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
