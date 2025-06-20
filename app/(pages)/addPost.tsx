import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddPostScreen() {
  const router = useRouter();
  const inputColor = useThemeColor('text');

  // 예시 이미지 데이터 (최대 5개)
  const images = [
    { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', id: 1 },
    { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', id: 2 },
    { uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', id: 3 },
    { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', id: 4 },
    { uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', id: 5 },
  ];

  const moveToMetaDataScreen = () => {
    router.push('/addMetaData')
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* 사진 */}
        <ThemedText style={styles.label} fontSize={18} fontWeight='600'>사진</ThemedText>
        <TouchableOpacity style={styles.addImageBox}>
          <MaterialCommunityIcons name='plus-circle' size={24} color={Colors.primary} />
        </TouchableOpacity>

        {/* 업로드된 이미지들 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageRow}
        >
          {images.map((img) => (
            <View key={img.id} style={styles.imageBox}>
              <Image source={{ uri: img.uri }} style={styles.image} />
              <TouchableOpacity style={styles.removeBtn}>
                <MaterialCommunityIcons name='close-circle' color={Colors.grayC6} size={24} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* 텍스트 입력 */}
        <ThemedText style={styles.label} fontSize={18} fontWeight='600'>텍스트 입력</ThemedText>
        <TextInput
          style={[styles.textArea, {color: inputColor}]}
          placeholder="내용을 입력해주세요"
          placeholderTextColor={Colors.grayAD}
          multiline
          textAlignVertical="top"
        />

        {/* 해시태그 */}
        <ThemedText style={styles.label} fontSize={18} fontWeight='600'>해시태그 #</ThemedText>

        <View style={styles.hashtagInputRow}>
          <Text style={styles.hashtag}>#</Text>
          <TextInput
            style={[styles.hashtagInput, {color: inputColor}]}
            placeholder="띄어쓰기 없이 입력해주세요."
            placeholderTextColor={Colors.grayAD}
          />
          <TouchableOpacity>
            <Text style={styles.hashtag}>추가</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hashtagRow}>
          <Text style={styles.hashtagItem}>#여행</Text>
          <Text style={styles.hashtagItem}>#카페</Text>
          <Text style={styles.hashtagItem}>#날씨</Text>
        </View>

      </ScrollView>

      {/* 다음 버튼 */}
      <TouchableOpacity style={styles.nextBtn} onPress={moveToMetaDataScreen}>
        <Text style={styles.nextBtnText}>다음</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  label: {
    marginTop: 24,
    marginBottom: 12,
  },
  addImageBox: {
    width: 88,
    height: 88,
    borderRadius: 4,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grayED,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  imageBox: {
    width: 152,
    height: 152,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.white,
    borderRadius: 24,
  },
  textArea: {
    minHeight: 160,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grayED,
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: Colors.blueGray,
  },
  hashtagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grayED,
    paddingHorizontal: 8,
    height: 40,
  },
  hashtagInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.blueGray,
    fontFamily: 'Pretendard-Regular',
    backgroundColor: 'transparent',
  },
  hashtag: {
    color: Colors.primary,
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    marginHorizontal: 8,
  },
  hashtagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8
  },
  hashtagItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary30,
    color: Colors.primary,
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: Colors.grayC6,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    marginHorizontal: 16,
    marginBottom: 48,
    marginTop: 20,
  },
  nextBtnText: {
    color: Colors.gray9,
    fontSize: 16,
    fontFamily: 'Pretendard-Semibold'
  },
});
