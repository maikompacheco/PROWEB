module.exports = {
    content: [
        './index.html',
        './src/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // Design System B2B Professional
                'neutral': {
                    '50': '#FAFAFA',   // bg-neutral-50
                    '100': '#F5F5F5',
                    '200': '#E7E7E7',
                    '300': '#D1D1D1',
                    '400': '#A1A1A1',
                    '500': '#737373',
                    '600': '#525252',
                    '700': '#404040',
                    '800': '#262626',
                    '900': '#171717',  // bg-neutral-900
                    '950': '#0A0A0A',  // bg-neutral-950
                },
                'primary': {
                    '50': '#EEF2FF',
                    '100': '#E0E7FF',
                    '200': '#C7D2FE',
                    '300': '#A5B4FC',
                    '400': '#818CF8',
                    '500': '#6366F1',  // primary-500 - ação principal
                    '600': '#4F46E5',
                    '700': '#4338CA',
                    '800': '#3730A3',
                    '900': '#312E81',
                    '950': '#1E1B4B',
                },
                'success': {
                    '50': '#F0FDF4',
                    '500': '#22C55E',  // verde vibrante
                    '600': '#16A34A',
                    '700': '#15803D',
                    '900': '#15803D',
                },
                'warning': {
                    '50': '#FFFBEB',
                    '500': '#F59E0B',  // âmbar
                    '600': '#D97706',
                    '700': '#B45309',
                    '900': '#78350F',
                },
                'error': {
                    '50': '#FEF2F2',
                    '500': '#EF4444',  // vermelho
                    '600': '#DC2626',
                    '700': '#B91C1C',
                    '900': '#7F1D1D',
                },
                'accent': {
                    '50': '#F5F3FF',
                    '500': '#7C3AED',  // roxo - destaque sutil
                    '600': '#6D28D9',
                    '700': '#5B21B6',
                    '900': '#2E1065',
                }
            },
            spacing: {
                'safe-top': 'max(1rem, env(safe-area-inset-top))',
                'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
                'safe-left': 'max(1rem, env(safe-area-inset-left))',
                'safe-right': 'max(1rem, env(safe-area-inset-right))',
            },
            animation: {
                'in': 'fadeIn 0.3s ease-in-out',
                'in-sm': 'fadeIn 0.2s ease-in-out',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-in': 'slideIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(4px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-8px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
}