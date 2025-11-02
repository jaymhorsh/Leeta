/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        matter: ['Matter-Regular', 'sans-serif'],
        matterBold: ['Matter-Bold', 'matter'],
        matterSemiBold: ['Matter-SemiBold', 'matter'],
        matterMedium: ['Matter-Medium', 'matter'],
        matterLight: ['Matter-Light', 'matter'],
        matterHeavy: ['Matter-Heavy', 'matter'],
        matterBoldItalic: ['Matter-BoldItalic', 'matter'],
        matterHeavyItalic: ['Matter-HeavyItalic', 'matter'],
        matterMediumItalic: ['Matter-MediumItalic', 'matter'],
        matterSemiBoldItalic: ['Matter-SemiBoldItalic', 'matter'],
        matterRegularItalic: ['Matter-RegularItalic', 'matter'],
        matterLightItalic: ['Matter-LightItalic', 'matter'],
      },
      colors: {
        brand: {
          primary: '#00B388',
          accent: '#FD691E',
          text: '#213517',
        },
        surface: {
          base: '#FFFFFF',
          gray: '#F2F2F2',
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F8F8F8',
        },
        text: {
          primary: '#213517',
          secondary: '#848484',
          contrast: '#FFFFFF',
          error: '#FF2F2F',
        },
        button: {
          primary: '#FD691E',
          secondary: '#213517',
          tertiary: '#D9D9D9',
        },
        border: '#E6E6E6',
        status: {
          success: '#1DB954',
          warning: '#FFD43B',
          error: '#FF2F2F',
        },
      },
    },
  },
  plugins: [],
};
