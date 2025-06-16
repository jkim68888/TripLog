/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColor = '#8FC8F1';
const blackColor = '#000';
const whiteColor = '#fff';

export const Colors = {
  light: {
    text: blackColor,
    background: whiteColor,
    tint: tintColor,
    tabIconDefault: '#ADADAD',
    tabIconSelected: tintColor,
  },
  dark: {
    text: whiteColor,
    background: blackColor,
    tint: tintColor,
    tabIconDefault: '#ADADAD',
    tabIconSelected: tintColor,
  },
  primary: tintColor,
  black: blackColor,
  white: whiteColor,
  yellow: '#FFF018',
  gray3: '#333',
  gray9: '#999',
  grayAD: '#ADADAD',
  gray6: '#666',
  grayC6: '#C6C6C6',
  grayD9: '#D9D9D9',
  grayED: '#EDEDED',
  grayF9: '#F9F9F9',
  blueGray: '#232C36',
  primary18: '#EBF5FC',
  primary30: '#DDEEFA'
};
