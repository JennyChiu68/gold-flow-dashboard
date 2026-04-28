/**
 * VIP 介绍页 - 移动端优先设计
 * 设计哲学：暗金奢华风（Dark Gold Luxury）
 * 核心色：#0a0a0a 背景 + #C9A84C 金色 + #E8C96A 亮金
 * 布局：单列垂直滚动，最大宽度 430px，居中展示
 * 字体：Noto Serif SC（标题）+ 系统无衬线（正文）
 */

import { useState } from "react";
import { Link } from "wouter";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/vip-hero-bg-ZcGdYzFxgv9DcUACSuGmeQ.webp";
const MOCKUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/vip-feature-mockup-RF37aZN4arWQqcPJLvhMjJ.webp";
const VIP_BADGE = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/vip-badge-ZuTarUBSGso5VPF42adpr3.webp";

const features = [
  {
    icon: "📊",
    title: "黄金ETF资金流向",
    desc: "实时追踪全市场14只黄金ETF的申购赎回动态，日频更新规模与净流入数据，掌握机构资金动向。",
    tag: "核心功能",
  },
  {
    icon: "📈",
    title: "Au99.99 实时报价",
    desc: "对接上海黄金交易所实时行情，展示当日开盘价、最高最低价及分时走势，1分钟级更新。",
    tag: "实时数据",
  },
  {
    icon: "🏦",
    title: "银行规则变更追踪",
    desc: "监控招行、工行、建行等主流银行积存金产品的门槛调整、价差变动、暂停开户等规则变化，第一时间收到提醒。",
    tag: "独家监控",
  },
  {
    icon: "😤",
    title: "散户情绪指数",
    desc: "基于搜索热度、社交讨论量、ETF申购溢价等多维度数据，量化散户恐慌/贪婪程度，辅助逆向判断。",
    tag: "情绪分析",
  },
  {
    icon: "🔔",
    title: "规则变更即时推送",
    desc: "银行公告一经发布，系统自动解析关键信息并推送通知，无需每天手动查看各银行官网。",
    tag: "智能推送",
  },
  {
    icon: "📋",
    title: "历史数据回溯",
    desc: "查看近3个月每日资金流向历史，对比不同时期的市场行为，发现规律性的资金进出节奏。",
    tag: "历史数据",
  },
];

const plans = [
  {
    name: "月度会员",
    price: "29",
    unit: "元/月",
    desc: "按月订阅，随时取消",
    highlight: false,
  },
  {
    name: "年度会员",
    price: "199",
    unit: "元/年",
    desc: "相当于 16.6元/月，节省43%",
    highlight: true,
    badge: "最划算",
  },
];

const faqs = [
  {
    q: "数据更新频率是多少？",
    a: "ETF规模与净流入数据每个交易日收盘后更新；Au99.99报价在交易时段内每分钟更新；银行规则变更公告在官网发布后1小时内推送。",
  },
  {
    q: "数据来源是否可靠？",
    a: "ETF数据来源于东方财富行情接口（市场代码118），黄金报价来源于上金所官网，银行公告直接抓取各行官网公告专栏，均为一手来源。",
  },
  {
    q: "开通后立即生效吗？",
    a: "支付完成后立即开通，所有功能即时解锁，无需等待审核。",
  },
  {
    q: "可以退款吗？",
    a: "开通后7天内如对功能不满意，可联系客服申请全额退款。",
  },
];

export default function VipIntro() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(1);

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#e8e0d0",
        fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* 最大宽度容器 */}
      <div style={{ maxWidth: 430, margin: "0 auto", position: "relative" }}>

        {/* ── Hero 区域 ── */}
        <div
          style={{
            position: "relative",
            height: 520,
            overflow: "hidden",
          }}
        >
          {/* 背景图 */}
          <img
            src={HERO_BG}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          {/* 渐变遮罩 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.9) 80%, #0a0a0a 100%)",
            }}
          />

          {/* 顶部导航 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
            }}
          >
            <Link href="/">
              <span style={{ color: "#C9A84C", fontSize: 13, cursor: "pointer" }}>← 返回看板</span>
            </Link>
            <span
              style={{
                fontSize: 11,
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.4)",
                borderRadius: 20,
                padding: "3px 10px",
                letterSpacing: 1,
              }}
            >
              VIP 专属
            </span>
          </div>

          {/* Hero 文字 */}
          <div
            style={{
              position: "absolute",
              bottom: 48,
              left: 0,
              right: 0,
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <img src={VIP_BADGE} alt="VIP" style={{ width: 28, height: 28 }} />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  color: "#C9A84C",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                积存金看板 · 专业版
              </span>
            </div>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.3,
                margin: "0 0 12px",
                color: "#fff",
                fontFamily: "'Noto Serif SC', 'SimSun', serif",
              }}
            >
              看懂资金流向
              <br />
              <span style={{ color: "#E8C96A" }}>比别人早一步</span>
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "rgba(232,224,208,0.7)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              全市场黄金ETF实时监控 · 银行规则变更预警
              <br />
              Au99.99 实时报价 · 散户情绪量化分析
            </p>
          </div>
        </div>

        {/* ── 数据展示 Mockup ── */}
        <div style={{ padding: "0 20px 32px" }}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 0 40px rgba(201,168,76,0.08)",
            }}
          >
            <img
              src={MOCKUP_IMG}
              alt="看板预览"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(201,168,76,0.5)",
              marginTop: 10,
              letterSpacing: 1,
            }}
          >
            · 实际界面预览 ·
          </p>
        </div>

        {/* ── 核心数据指标 ── */}
        <div style={{ padding: "0 20px 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            {[
              { num: "14只", label: "黄金ETF\n全覆盖" },
              { num: "1分钟", label: "报价\n更新频率" },
              { num: "13家", label: "银行\n实时监控" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: 12,
                  padding: "16px 8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#E8C96A",
                    fontFamily: "'Noto Serif SC', serif",
                    lineHeight: 1.2,
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(232,224,208,0.5)",
                    marginTop: 4,
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 功能介绍 ── */}
        <div style={{ padding: "0 20px 40px" }}>
          {/* 标题 */}
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: "linear-gradient(to right, transparent, #C9A84C)",
                marginRight: 12,
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: 1,
              }}
            >
              VIP 专属功能
            </span>
            <div
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: "linear-gradient(to left, transparent, #C9A84C)",
                marginLeft: 12,
                verticalAlign: "middle",
              }}
            />
          </div>

          {/* 功能卡片列表 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: 14,
                  padding: "18px 16px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#e8e0d0",
                      }}
                    >
                      {f.title}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#C9A84C",
                        border: "1px solid rgba(201,168,76,0.35)",
                        borderRadius: 4,
                        padding: "1px 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(232,224,208,0.55)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 使用场景 ── */}
        <div
          style={{
            margin: "0 20px 40px",
            background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 16,
            padding: "24px 20px",
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#E8C96A",
              margin: "0 0 16px",
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            适合哪些人使用？
          </h3>
          {[
            { emoji: "🏅", text: "长期持有黄金积存金，想了解市场整体资金动向的投资者" },
            { emoji: "📱", text: "在多家银行持有积存金账户，需要统一监控规则变化的用户" },
            { emoji: "🔍", text: "关注黄金ETF与实物黄金价差，寻找套利机会的进阶玩家" },
            { emoji: "📰", text: "从事黄金相关内容创作，需要实时数据支撑的研究者" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                marginBottom: i < 3 ? 14 : 0,
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.emoji}</span>
              <span style={{ fontSize: 13, color: "rgba(232,224,208,0.65)", lineHeight: 1.6 }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* ── 定价方案 ── */}
        <div style={{ padding: "0 20px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: "linear-gradient(to right, transparent, #C9A84C)",
                marginRight: 12,
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: 1,
              }}
            >
              选择方案
            </span>
            <div
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: "linear-gradient(to left, transparent, #C9A84C)",
                marginLeft: 12,
                verticalAlign: "middle",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {plans.map((plan, i) => (
              <div
                key={i}
                onClick={() => setSelectedPlan(i)}
                style={{
                  flex: 1,
                  borderRadius: 16,
                  padding: "20px 16px",
                  border: selectedPlan === i
                    ? "2px solid #C9A84C"
                    : "1px solid rgba(201,168,76,0.15)",
                  background: selectedPlan === i
                    ? "rgba(201,168,76,0.08)"
                    : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #C9A84C, #E8C96A)",
                      color: "#0a0a0a",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 10px",
                      borderRadius: 10,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(232,224,208,0.6)",
                    marginBottom: 8,
                  }}
                >
                  {plan.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#E8C96A",
                      marginBottom: 2,
                    }}
                  >
                    ¥
                  </span>
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#E8C96A",
                      fontFamily: "'Noto Serif SC', serif",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(232,224,208,0.4)",
                    marginTop: 4,
                  }}
                >
                  {plan.unit}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: plan.highlight ? "#C9A84C" : "rgba(232,224,208,0.4)",
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {plan.desc}
                </div>
              </div>
            ))}
          </div>

          {/* 开通按钮 */}
          <button
            style={{
              width: "100%",
              marginTop: 20,
              padding: "16px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
              color: "#0a0a0a",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow: "0 4px 24px rgba(201,168,76,0.3)",
              fontFamily: "'PingFang SC', sans-serif",
            }}
            onClick={() => alert("支付功能即将上线，敬请期待！")}
          >
            立即开通 {selectedPlan === 0 ? "月度" : "年度"}会员
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(232,224,208,0.3)",
              marginTop: 12,
            }}
          >
            开通后7天内不满意可全额退款 · 支持微信/支付宝
          </p>
        </div>

        {/* ── 常见问题 ── */}
        <div style={{ padding: "0 20px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: 1,
              }}
            >
              常见问题
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "transparent",
                    border: "none",
                    color: "#e8e0d0",
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "'PingFang SC', sans-serif",
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      color: "#C9A84C",
                      fontSize: 18,
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 16px 16px",
                      fontSize: 13,
                      color: "rgba(232,224,208,0.55)",
                      lineHeight: 1.7,
                      borderTop: "1px solid rgba(201,168,76,0.08)",
                      paddingTop: 12,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 底部 CTA ── */}
        <div
          style={{
            margin: "0 20px 40px",
            padding: "28px 20px",
            background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 20,
            textAlign: "center",
          }}
        >
          <img src={VIP_BADGE} alt="VIP" style={{ width: 56, height: 56, marginBottom: 12 }} />
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 8px",
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            现在开通，立享全部权益
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "rgba(232,224,208,0.5)",
              margin: "0 0 20px",
              lineHeight: 1.6,
            }}
          >
            加入已有 2,800+ 位黄金投资者的专业社群
          </p>
          <button
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
              color: "#0a0a0a",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow: "0 4px 24px rgba(201,168,76,0.25)",
              fontFamily: "'PingFang SC', sans-serif",
            }}
            onClick={() => alert("支付功能即将上线，敬请期待！")}
          >
            立即开通 VIP
          </button>
        </div>

        {/* ── 页脚 ── */}
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            borderTop: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "rgba(232,224,208,0.2)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            本平台提供的数据仅供参考，不构成投资建议。
            <br />
            黄金投资存在市场风险，请谨慎决策。
          </p>
        </div>

      </div>
    </div>
  );
}
