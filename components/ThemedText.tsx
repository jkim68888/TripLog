import { useThemeColor } from '@/hooks/useThemeColor';
import { Text, type TextProps } from 'react-native';

type FontWeight = '400' | '500' | '600' | '700' | '800' | '900';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  fontSize: number;
  fontWeight?: FontWeight;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  fontSize,
  fontWeight = '400',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        {
          fontFamily: 'Pretendard',
          color,
          fontSize,
          fontWeight,
        },
        style,
      ]}
      {...rest}
    />
  );
}
