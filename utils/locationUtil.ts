import * as Location from 'expo-location';
import { Platform } from 'react-native';

// 위치 정보를 텍스트로 변환
export const getLocationText = async (latitude: number, longitude: number) => {
  try {
    // 위치 권한 요청
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('위치 권한이 거부되었습니다.');
      return null;
    }

    const result = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (result.length > 0) {
      const address = result[0];

      if (Platform.OS === 'android') {
        return address.formattedAddress
      } else {
        return `${address.city || ''} ${address.district || ''} ${address.street || ''}`.trim();
      }
    }
  } catch (error) {
    console.log('위치 변환 오류:', error);
    return null;
  }
  return null;
};