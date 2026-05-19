import { theme } from 'antd'
import type { ThemeConfig } from 'antd'

const sharedTokens = {
  colorPrimary: '#5145cd',
  colorInfo: '#5145cd',
  borderRadius: 10,
  fontFamily:
    'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  fontSize: 15,
  controlHeight: 44,
}

export const THEME_STORAGE_KEY = 'portfolio-theme-mode'

export const getPortfolioTheme = (isDark: boolean): ThemeConfig => ({
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    ...sharedTokens,
    ...(isDark
      ? {
          colorBgLayout: '#0f1117',
          colorBgContainer: '#1a1d27',
          colorText: '#e8eaef',
          colorTextSecondary: '#9aa3b2',
        }
      : {
          colorBgLayout: '#f4f5f8',
          colorBgContainer: '#ffffff',
        }),
  },
  components: {
    Layout: {
      headerBg: isDark ? 'rgba(26, 29, 39, 0.92)' : 'rgba(255, 255, 255, 0.92)',
      headerHeight: 72,
      bodyBg: isDark ? '#0f1117' : '#f4f5f8',
      footerBg: isDark ? '#1a1d27' : '#ffffff',
    },
    Card: {
      borderRadiusLG: 14,
    },
    Button: {
      primaryShadow: isDark
        ? '0 10px 24px rgba(81, 69, 205, 0.35)'
        : '0 10px 24px rgba(81, 69, 205, 0.24)',
    },
  },
})
