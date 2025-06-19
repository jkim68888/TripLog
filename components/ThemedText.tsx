import { useThemeColor } from '@/hooks/useThemeColor';
import { Text, type TextProps } from 'react-native';

type FontWeight = '400' | '500' | '600' | '700';

export type ThemedTextProps = TextProps & {
  fontSize: number;
  fontWeight?: FontWeight;
};

export function ThemedText({
  style,
  fontSize,
  fontWeight = '400',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor('text');

  // fontWeight에 따라 fontFamily를 매핑
  const fontFamilyMap = {
    '400': 'Pretendard-Regular',
    '500': 'Pretendard-Medium',
    '600': 'Pretendard-SemiBold',
    '700': 'Pretendard-Bold'
  };

  return (
    <Text
      style={[
        {
          fontFamily: fontFamilyMap[fontWeight],
          color,
          fontSize
        },
        style
      ]}
      {...rest}
    />
  );
}
