import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

// 위치 정보를 텍스트로 변환
export const getLocationText = async (latitude: number, longitude: number) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('미디어 권한이 거부되었습니다.');
      return undefined;
    }

    const result = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (result.length > 0) {
      const address = result[0];
      return `${address.city || ''} ${address.district || ''} ${address.street || ''}`.trim();
    }
  } catch (error) {
    console.log('위치 변환 오류:', error);
  }
  return undefined;
};