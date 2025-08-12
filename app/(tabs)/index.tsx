import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { usePostStore } from '@/stores/postStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

export default function HomeScreen() {
  const router = useRouter()
  const inputColor = useThemeColor('text')
  const { posts } = usePostStore()
  const [currentRegion, setCurrentRegion] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const getCurrentLocation = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('권한 필요', '위치 권한이 필요합니다.');
        return;
      }
      
      // 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      
      // 지도 영역 업데이트
      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // 더 확대된 뷰로 변경
        longitudeDelta: 0.01,
      });

      console.log("현재 위치 가져오기 완료")
    } catch (error) {
      console.error('위치를 가져오는데 실패했습니다:', error);
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다');
    }
  };

  const moveToCurrentLocation = () => {
    getCurrentLocation();
  };

  const moveToAddPostScreen = () => {
    router.push('/addPost')
  };

  return (
  <ThemedView style={styles.root}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* 서치바 */}
        <ThemedView style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color={Colors.primary} />
          <TextInput
            style={[styles.input, { color: inputColor }]}
            placeholder="해시태그 검색"
            placeholderTextColor={Colors.grayAD}
          />
          <TouchableOpacity>
            <MaterialCommunityIcons name="close-circle" size={20} color={Colors.grayC6} />
          </TouchableOpacity>
        </ThemedView>

        {/* 여행 추가하기 버튼 */}
        <TouchableOpacity style={styles.addButton} onPress={moveToAddPostScreen}>
          <Text style={styles.addButtonText}>여행 추가하기</Text>
        </TouchableOpacity>
      </View>

      {/* 지도 */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={currentRegion}
          onRegionChangeComplete={setCurrentRegion}
        >
          {posts && posts.map((post) => (
            post.images.map((image) => (
              image.location && (
                <Marker
                  key={image.uri}
                  coordinate={{
                    latitude: image.location.latitude,
                    longitude: image.location.longitude,
                  }}
                >
                  <View style={styles.photoMarker}>
                    <Image source={{ uri: image.uri }} style={styles.photoMarkerImage} />
                  </View>
                </Marker>
              )
            ))
          ))}
        </MapView>
      </View>

      {/* 북마크 버튼 */}
      <TouchableOpacity>
        <ThemedView style={styles.bookmarkButton}>
          <MaterialCommunityIcons name="bookmark-outline" size={22} color={Colors.grayAD} />
        </ThemedView>
      </TouchableOpacity>

      {/* 현위치 버튼 */}
      {/* {Platform.OS === 'ios' &&
        <TouchableOpacity onPress={moveToCurrentLocation}>
          <ThemedView style={styles.currentLocationButton}>
            <MaterialCommunityIcons name="crosshairs-gps" size={22} color={Colors.grayAD} />
          </ThemedView>
        </TouchableOpacity>
      } */}
      <TouchableOpacity onPress={moveToCurrentLocation}>
        <ThemedView style={styles.currentLocationButton}>
          <MaterialCommunityIcons name="crosshairs-gps" size={22} color={Colors.grayAD} />
        </ThemedView>
      </TouchableOpacity>
    </SafeAreaView>
  </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.select({
      ios: 0,
      android: 32
    }),
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    height: 40,
    borderColor: Colors.primary
  },
  input: {
    marginHorizontal: 8,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  addButton: {
    width: 108,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    // Android용 그림자
    elevation: 2,
  },
  addButtonText: {
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: Colors.white
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bookmarkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 66 : 16,
    right: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 22,
    // Android용 그림자
    elevation: 4,
  },
  currentLocationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 124 : 70,
    right: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 22,
    // Android용 그림자
    elevation: 4,
  },
  photoMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  photoMarkerImage: {
    width: '100%',
    height: '100%',
  },
});
