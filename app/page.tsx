// app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import "./dashboard.css";

// Import Chart.js types
declare global {
  interface Window {
    Chart: any;
  }
}

export default function Home() {
  const trendChartRef = useRef<HTMLCanvasElement>(null);
  const adSpendChartRef = useRef<HTMLCanvasElement>(null);
  let trendChartInstance: any = null;
  let adSpendChartInstance: any = null;

  useEffect(() => {
    // Initialize charts when Chart.js is loaded
    if (typeof window !== "undefined" && window.Chart) {
      initializeCharts();
    }
  }, []);

  const initializeCharts = () => {
    // Trend Chart (Impressions + Clicks over time)
    if (trendChartRef.current) {
      if (trendChartInstance) {
        trendChartInstance.destroy();
      }

      trendChartInstance = new window.Chart(trendChartRef.current, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Impressions (K)",
              data: [65, 72, 68, 79],
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Clicks",
              data: [2800, 3100, 2950, 3450],
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.05)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }

    // Ad Spend vs Revenue Chart
    if (adSpendChartRef.current) {
      if (adSpendChartInstance) {
        adSpendChartInstance.destroy();
      }

      adSpendChartInstance = new window.Chart(adSpendChartRef.current, {
        type: "bar",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Ad Spend ($)",
              data: [1240, 1580, 1420, 1890],
              backgroundColor: "#f97316",
              borderRadius: 8,
            },
            {
              label: "Revenue ($)",
              data: [3840, 5210, 4670, 6320],
              backgroundColor: "#22c55e",
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  };

  return (
    <>
      {/* Load external scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
        strategy="afterInteractive"
        onLoad={() => initializeCharts()}
      />

      <div className="dashboard-container">
        {/* Header with Agency Branding (White-labeled) */}
        <div className="dashboard-header">
          <div className="agency-brand">
            <div className="logo-area">
              <div className="logo-placeholder">
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <div className="agency-name">GrowthAgency</div>
                <div style={{ fontSize: "13px", color: "#5b6e8c" }}>
                  Client Performance Dashboard
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div className="white-label-badge">
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: "12px" }}
                ></i>
                White-labeled for your brand
              </div>
              <div className="date-range">
                <i className="far fa-calendar-alt"></i> Last 30 days
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">
              <i className="fas fa-chart-simple"></i> Total Impressions
            </div>
            <div className="stat-value">284,392</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i> +12.4% vs prev period
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">
              <i className="fas fa-mouse-pointer"></i> Clicks
            </div>
            <div className="stat-value">12,847</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i> +8.2% vs prev period
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">
              <i className="fas fa-percent"></i> CTR
            </div>
            <div className="stat-value">4.52%</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i> +0.3 pp
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">
              <i className="fas fa-dollar-sign"></i> Conversions
            </div>
            <div className="stat-value">438</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i> +15.3% vs prev period
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          <div className="chart-card">
            <div className="chart-title">
              <span>
                <i className="fas fa-chart-line"></i> Performance Trend
              </span>
              <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                Google Analytics 4
              </span>
            </div>
            <div className="chart-container">
              <canvas id="trendChart" ref={trendChartRef}></canvas>
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">
              <span>
                <i className="fab fa-meta"></i> Ad Spend vs Revenue
              </span>
              <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                Meta Ads
              </span>
            </div>
            <div className="chart-container">
              <canvas id="adSpendChart" ref={adSpendChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Connected Data Sources */}
        <div className="sources-card">
          <div className="sources-header">
            <div className="source-badges">
              <div className="source-badge">
                <i className="fab fa-google" style={{ color: "#ea4335" }}></i>{" "}
                Google Analytics 4
                <i
                  className="fas fa-check-circle"
                  style={{ color: "#16a34a", fontSize: "12px" }}
                ></i>
              </div>
              <div className="source-badge">
                <i className="fab fa-meta" style={{ color: "#1877f2" }}></i>{" "}
                Meta Ads
                <i
                  className="fas fa-check-circle"
                  style={{ color: "#16a34a", fontSize: "12px" }}
                ></i>
              </div>
              <div className="source-badge">
                <i className="fab fa-google" style={{ color: "#34a853" }}></i>{" "}
                Google Ads
                <i
                  className="fas fa-check-circle"
                  style={{ color: "#16a34a", fontSize: "12px" }}
                ></i>
              </div>
            </div>
            <div className="refresh-indicator">
              <i className="fas fa-sync-alt"></i> Auto-refreshes every 6 hours
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="activity-card">
          <div className="chart-title" style={{ marginBottom: "16px" }}>
            <span>
              <i className="fas fa-clock"></i> Recent Activity
            </span>
            <span style={{ fontSize: "12px", fontWeight: "normal" }}>
              Last 7 days
            </span>
          </div>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Campaign</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Conversions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mar 27, 2026</td>
                <td>Spring Sale - Search</td>
                <td>12,432</td>
                <td>584</td>
                <td>23</td>
              </tr>
              <tr>
                <td>Mar 26, 2026</td>
                <td>Spring Sale - Display</td>
                <td>18,923</td>
                <td>412</td>
                <td>18</td>
              </tr>
              <tr>
                <td>Mar 25, 2026</td>
                <td>Retargeting - Social</td>
                <td>8,234</td>
                <td>389</td>
                <td>31</td>
              </tr>
              <tr>
                <td>Mar 24, 2026</td>
                <td>Brand Awareness</td>
                <td>24,123</td>
                <td>567</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Mar 23, 2026</td>
                <td>Retargeting - Search</td>
                <td>5,432</td>
                <td>298</td>
                <td>27</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Embed Notice */}
        <div className="embed-notice">
          <i className="fas fa-code"></i> This dashboard is embedded directly
          into your agency website. Your clients see YOUR logo, YOUR branding.{" "}
          <strong>No additional logins required for them.</strong>
        </div>
      </div>
    </>
  );
}
