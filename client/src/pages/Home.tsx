/**
 * 积存金资金流向看板 - 暗金数据殿堂设计
 * 设计风格：深色背景 + 金色点缀，Bloomberg Terminal专业数据密度感 + Art Deco装饰主义
 */
import { motion, type Variants } from "framer-motion";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { SentimentGauge } from "@/components/dashboard/SentimentGauge";
import { GoldPriceChart } from "@/components/dashboard/GoldPriceChart";
import { ShanghaiPremium } from "@/components/dashboard/ShanghaiPremium";
import { SgeMonthlySummary } from "@/components/dashboard/SgeMonthlySummary";
import { EtfFlowPanel } from "@/components/dashboard/EtfFlowPanel";
import { FuturesHolding } from "@/components/dashboard/FuturesHolding";
import { PbocReserve } from "@/components/dashboard/PbocReserve";
import { BankPriceTable } from "@/components/dashboard/BankPriceTable";
import { BankEventsTimeline } from "@/components/dashboard/BankEventsTimeline";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Hero区域 */}
      <HeroSection />

      {/* 核心情绪指数 + 金价 */}
      <section className="container py-6" style={{ position: 'relative' }}>
        {/* 核心区域背景强调 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #D4A85306 0%, transparent 100%)',
          borderRadius: '12px',
          pointerEvents: 'none',
        }} />
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* 情绪仪表盘 */}
          <motion.div custom={0} variants={fadeUp} className="lg:col-span-4">
            <SentimentGauge />
          </motion.div>

          {/* 金价走势 */}
          <motion.div custom={1} variants={fadeUp} className="lg:col-span-8">
            <GoldPriceChart />
          </motion.div>
        </motion.div>
      </section>

      {/* Art Deco分隔线 */}
      <div className="container"><div className="art-deco-line opacity-40" /></div>

      {/* 核心指标面板 */}
      <section className="container py-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* 上海金溢价 */}
          <motion.div custom={0} variants={fadeUp} className="lg:col-span-4">
            <ShanghaiPremium />
          </motion.div>

          {/* SHFE期货持仓 */}
          <motion.div custom={1} variants={fadeUp} className="lg:col-span-4">
            <FuturesHolding />
          </motion.div>

          {/* 央行黄金储备 */}
          <motion.div custom={2} variants={fadeUp} className="lg:col-span-4">
            <PbocReserve />
          </motion.div>
        </motion.div>
      </section>

      {/* Art Deco分隔线 */}
      <div className="container"><div className="art-deco-line opacity-40" /></div>

      {/* SGE月度 + ETF资金流 */}
      <section className="container py-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div custom={0} variants={fadeUp} className="lg:col-span-7">
            <SgeMonthlySummary />
          </motion.div>
          <motion.div custom={1} variants={fadeUp} className="lg:col-span-5">
            <EtfFlowPanel />
          </motion.div>
        </motion.div>
      </section>

      {/* Art Deco分隔线 */}
      <div className="container"><div className="art-deco-line opacity-40" /></div>

      {/* 银行积存金对比 + 事件时间线 */}
      <section className="container py-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div custom={0} variants={fadeUp} className="lg:col-span-8">
            <BankPriceTable />
          </motion.div>
          <motion.div custom={1} variants={fadeUp} className="lg:col-span-4">
            <BankEventsTimeline />
          </motion.div>
        </motion.div>
      </section>

      {/* 页脚 */}
      <DashboardFooter />
    </div>
  );
}
