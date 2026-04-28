/**
 * VIP 介绍页 - 移动端优先，参考金十数据 VIP 介绍页设计逻辑
 * 核心逻辑：先展示功能截图（让用户看到真实价值），再引导开通
 * 设计风格：暗金 · 深色背景 · 金色强调
 * 布局：单列垂直滚动，最大宽度 430px，底部固定开通按钮
 */

import { Link } from "wouter";

// 功能演示截图（AI 生成的高质量 mockup）
const IMG_ETF = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/feature-etf-flow-4Mgq6Yb6DWkYeWab8R2MZ8.webp";
const IMG_PRICE = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/feature-gold-price-euSXv3n7AwqsPVhLcbgjgN.webp";
const IMG_BANK = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/feature-bank-rules-Y9d2qwvPsTgBZ5TcYb2no4.webp";
const IMG_SENTIMENT = "https://d2xsxph8kpxj0f.cloudfront.net/309938607060186295/GPMpJ7dfYusDvN4R7dgdRA/feature-sentiment-NowFXnQrqPZy8Z4EukM82n.webp";

const features = [
  {
    num: "01",
    title: "黄金ETF资金流向",
    subtitle: "机构在买还是在卖，一眼看清",
    desc: "实时追踪全市场14只黄金ETF的申购赎回动态。总规模、日净流入、周净流入，每个交易日收盘后更新。不用再一只只去查，汇总在一张表里。",
    highlights: [
      { label: "覆盖ETF", value: "14只" },
      { label: "数据更新", value: "每交易日" },
      { label: "历史回溯", value: "近3个月" },
    ],
    img: IMG_ETF,
  },
  {
    num: "02",
    title: "Au99.99 实时报价",
    subtitle: "上金所现货价，不用再去找",
    desc: "对接上海黄金交易所 Au99.99 实时行情，展示当日开盘价、最高最低价及近30个交易日走势图。交易时段内每分钟更新，随时掌握积存金的买卖参考价。",
    highlights: [
      { label: "数据来源", value: "上金所官方" },
      { label: "更新频率", value: "1分钟级" },
      { label: "历史走势", value: "1W / 1M / 3M" },
    ],
    img: IMG_PRICE,
  },
  {
    num: "03",
    title: "银行规则变更追踪",
    subtitle: "13家银行公告，自动监控不遗漏",
    desc: "招行、工行、建行、邮储等13家主流银行的积存金公告专栏，系统每日自动抓取。门槛上调、价差调整、暂停开户——第一时间推送，不用每天手动查官网。",
    highlights: [
      { label: "监控银行", value: "13家" },
      { label: "公告类型", value: "门槛/价差/暂停" },
      { label: "推送延迟", value: "<1小时" },
    ],
    img: IMG_BANK,
  },
  {
    num: "04",
    title: "散户情绪指数",
    subtitle: "量化市场恐慌与贪婪，辅助逆向判断",
    desc: "综合上海金溢价、SHFE持仓变化、ETF资金净流入、SGE出库量趋势四个维度，计算出0-100的散户情绪得分。历史数据显示，指数低于30时往往是较好的买入时机。",
    highlights: [
      { label: "指标维度", value: "4项" },
      { label: "数据频率", value: "每交易日" },
      { label: "历史对照", value: "可回溯验证" },
    ],
    img: IMG_SENTIMENT,
  },
];

const S = {
  page: {
    background: "#0a0a0a",
    minHeight: "100vh",
    color: "#e8e0d0",
    fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    overflowX: "hidden" as const,
    paddingBottom: 80,
  },
  wrap: {
    maxWidth: 430,
    margin: "0 auto",
    position: "relative" as const,
  },
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldBg: "rgba(201,168,76,0.08)",
  goldBorder: "rgba(201,168,76,0.18)",
};

export default function VipIntro() {
  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* ── 顶部导航 ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
        }}>
          <Link href="/">
            <span style={{ color: S.gold, fontSize: 13, cursor: "pointer" }}>← 返回看板</span>
          </Link>
          <span style={{
            fontSize: 11,
            color: S.gold,
            border: `1px solid ${S.goldBorder}`,
            borderRadius: 20,
            padding: "3px 12px",
            letterSpacing: 1,
          }}>
            VIP 专属
          </span>
        </div>

        {/* ── Hero：标题 + 价值主张 ── */}
        <div style={{ padding: "36px 24px 28px", textAlign: "center" }}>
          {/* 小标签 */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: S.goldBg,
            border: `1px solid ${S.goldBorder}`,
            borderRadius: 20,
            padding: "4px 14px",
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 14 }}>👑</span>
            <span style={{ fontSize: 11, color: S.gold, letterSpacing: 2, fontWeight: 600 }}>积存金看板 · VIP专属功能</span>
          </div>

          {/* 主标题 */}
          <h1 style={{
            fontSize: 26,
            fontWeight: 800,
            lineHeight: 1.35,
            margin: "0 0 14px",
            color: "#fff",
            letterSpacing: 0.5,
          }}>
            把黄金市场的资金动向
            <br />
            <span style={{
              background: `linear-gradient(90deg, ${S.gold}, ${S.goldLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              变成你手边的实时情报
            </span>
          </h1>

          {/* 副标题 */}
          <p style={{
            fontSize: 14,
            color: "rgba(232,224,208,0.55)",
            lineHeight: 1.7,
            margin: 0,
          }}>
            ETF资金流向 · Au99.99实时报价
            <br />
            银行规则预警 · 散户情绪量化
          </p>
        </div>

        {/* ── 分割线 ── */}
        <div style={{
          margin: "0 24px 36px",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)",
        }} />

        {/* ── 功能演示区域（核心内容）── */}
        <div style={{ padding: "0 0 8px" }}>
          {features.map((f, i) => (
            <div key={i} style={{ marginBottom: 56 }}>

              {/* 功能编号 + 标题 */}
              <div style={{ padding: "0 24px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "rgba(201,168,76,0.25)",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1,
                  }}>{f.num}</span>
                  <h2 style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.2,
                  }}>{f.title}</h2>
                </div>
                <p style={{
                  fontSize: 13,
                  color: S.gold,
                  margin: "0 0 10px",
                  fontWeight: 500,
                }}>{f.subtitle}</p>
                <p style={{
                  fontSize: 13,
                  color: "rgba(232,224,208,0.55)",
                  lineHeight: 1.75,
                  margin: 0,
                }}>{f.desc}</p>
              </div>

              {/* 功能截图 */}
              <div style={{
                margin: "0 16px",
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${S.goldBorder}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.05)",
              }}>
                <img
                  src={f.img}
                  alt={f.title}
                  style={{ width: "100%", display: "block" }}
                  loading="lazy"
                />
              </div>

              {/* 关键数据亮点 */}
              <div style={{
                margin: "12px 16px 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}>
                {f.highlights.map((h, j) => (
                  <div key={j} style={{
                    background: S.goldBg,
                    border: `1px solid ${S.goldBorder}`,
                    borderRadius: 10,
                    padding: "10px 8px",
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: S.goldLight,
                      lineHeight: 1.2,
                      marginBottom: 3,
                    }}>{h.value}</div>
                    <div style={{
                      fontSize: 10,
                      color: "rgba(232,224,208,0.4)",
                      lineHeight: 1.3,
                    }}>{h.label}</div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* ── 开通引导区 ── */}
        <div style={{
          margin: "0 16px 16px",
          padding: "28px 20px",
          background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)",
          border: `1px solid ${S.goldBorder}`,
          borderRadius: 20,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>👑</div>
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px",
          }}>开通VIP，解锁全部功能</h3>
          <p style={{
            fontSize: 13,
            color: "rgba(232,224,208,0.45)",
            margin: "0 0 20px",
            lineHeight: 1.6,
          }}>
            月度 ¥29 · 年度 ¥199（相当于¥16.6/月）
            <br />
            开通后7天内不满意可全额退款
          </p>
          <button
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: 14,
              border: "none",
              background: `linear-gradient(135deg, ${S.gold} 0%, ${S.goldLight} 50%, ${S.gold} 100%)`,
              color: "#0a0a0a",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow: "0 4px 24px rgba(201,168,76,0.3)",
            }}
            onClick={() => alert("支付功能即将上线，敬请期待！")}
          >
            立即开通 VIP
          </button>
        </div>

        {/* ── 免责声明 ── */}
        <div style={{ padding: "16px 24px 8px", textAlign: "center" }}>
          <p style={{
            fontSize: 11,
            color: "rgba(232,224,208,0.2)",
            lineHeight: 1.8,
            margin: 0,
          }}>
            本平台提供的数据仅供参考，不构成投资建议。
            <br />
            黄金投资存在市场风险，请谨慎决策。
          </p>
        </div>

      </div>

      {/* ── 底部固定开通按钮（参考金十）── */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(to top, rgba(10,10,10,0.98) 70%, transparent)",
        padding: "16px 20px 24px",
        zIndex: 100,
        maxWidth: 430,
        margin: "0 auto",
      }}>
        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: 14,
            border: "none",
            background: `linear-gradient(135deg, ${S.gold} 0%, ${S.goldLight} 50%, ${S.gold} 100%)`,
            color: "#0a0a0a",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: 1,
            boxShadow: "0 4px 24px rgba(201,168,76,0.4)",
          }}
          onClick={() => alert("支付功能即将上线，敬请期待！")}
        >
          开通VIP，解锁全部功能
        </button>
      </div>

    </div>
  );
}
