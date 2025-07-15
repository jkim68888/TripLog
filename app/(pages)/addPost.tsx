import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { usePostStore } from '@/stores/postStore';
import { combineGPSDateTime, formatDateTime } from '@/utils/dateTimeUtil';
import { getLocationText } from '@/utils/locationUtil';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddPostScreen() {
  const router = useRouter();
  const inputColor = useThemeColor('text');
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const isNavigatingForward = useRef(false);

  const { 
    selectedImages, 
    setSelectedImages, 
    resetCurrentPost, 
    setPostContent, 
    setPostHashtags 
  } = usePostStore();

  // 화면이 focus를 잃을 때 초기화
  useFocusEffect(
    useCallback(() => {
      // 화면이 다시 포커스될 때 (뒤로 돌아왔을 때)
      return () => {
        // 화면을 떠날 때
        if (!isNavigatingForward.current) {
          resetCurrentPost();
        }
        isNavigatingForward.current = false;
      };
    }, [])
  );

  const moveToMetaDataScreen = () => {
    setPostHashtags(hashtags)
    router.push('/addMetaData')
    isNavigatingForward.current = true
  };

  const openGallery = async () => {
    try {
      // 권한 요청
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
      if (permissionResult.granted === false) {
        alert('갤러리 접근 권한이 필요합니다.');
        return;
      }

      // ImagePicker로 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: true,
        quality: 0.8,
        exif: true,
      });

      if (!result.canceled && result.assets) {
        const newImages = await Promise.all(
          result.assets.map(async (asset) => {
            // 이미지 메타데이터 가져오기
            if (asset.exif) {
              const lat = asset.exif.GPSLatitude
              const lng = asset.exif.GPSLongitude
              const date = combineGPSDateTime(
                asset.exif.GPSDateStamp,
                asset.exif.GPSTimeStamp,
              )

              return {
                uri: asset.uri,
                location: lat && lng ? {
                  latitude: lat,
                  longitude: lng,
                  text: await getLocationText(lat, lng)
                } : null,
                creationTime: asset.exif?.GPSDateStamp && asset.exif?.GPSTimeStamp ? {
                  date: date,
                  text: date && formatDateTime(date)
                } : null,
                filename: asset.fileName,
              }
            } else {
              return {
                uri: asset.uri,
                filename: asset.fileName,
              }
            }
          })
        );

        setSelectedImages([...selectedImages, ...newImages])
      }
    } catch (error) {
      console.error('갤러리 열기 에러:', error);
    }
  }

  const handleRemoveBtn = (indexToRemove: number) => {
    setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
  }

  const addHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(`#${hashtagInput.trim()}`)) {
      setHashtags(prev => [...prev, `#${hashtagInput.trim()}`]);
      setHashtagInput(''); // 입력 필드 초기화
    }
  };

  const removeHashtag = (hashtagToRemove: string) => {
    setHashtags(prev => prev.filter(tag => tag !== hashtagToRemove));
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior='height'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 50}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" 
        >
          {/* 사진 */}
          <ThemedText style={styles.label} fontSize={18} fontWeight='600'>사진</ThemedText>
          <TouchableOpacity style={styles.addImageBox} onPress={openGallery}>
            <MaterialCommunityIcons name='plus-circle' size={24} color={Colors.primary} />
          </TouchableOpacity>

          {/* 업로드된 이미지들 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageRow}
          >
            {selectedImages.map((img, index) => (
              <View key={index} style={styles.imageBox}>
                <Image source={{ uri: img.uri }} style={styles.image} />
                <TouchableOpacity 
                  style={styles.removeBtn} 
                  onPress={() => handleRemoveBtn(index)}
                >
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
            onChangeText={(text) => setPostContent(text)}
          />

          {/* 해시태그 */}
          <ThemedText style={styles.label} fontSize={18} fontWeight='600'>해시태그 #</ThemedText>

          <View style={styles.hashtagInputRow}>
            <Text style={styles.hashtag}>#</Text>
            <TextInput
              style={[styles.hashtagInput, {color: inputColor}]}
              placeholder="띄어쓰기 없이 입력해주세요."
              placeholderTextColor={Colors.grayAD}
              value={hashtagInput}
              onChangeText={setHashtagInput}
              onSubmitEditing={addHashtag}
            />
            <TouchableOpacity onPress={addHashtag}>
              <Text style={styles.hashtag}>추가</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.hashtagRow}>
            {hashtags.map((tag, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.hashtagItemContainer}
                onPress={() => removeHashtag(tag)}
              >
                <Text style={styles.hashtagItem}>{tag}</Text>
                <MaterialCommunityIcons name="close" size={16} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity 
        style={[
          styles.nextBtn,
          {backgroundColor: selectedImages.length > 0 ? Colors.primary : Colors.grayC6}
        ]} 
        disabled={selectedImages.length <= 0}
        onPress={moveToMetaDataScreen}
      >
        <Text 
          style={[
            styles.nextBtnText,
            {color: selectedImages.length > 0 ? Colors.white : Colors.gray6}
          ]}
        >
          다음
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    paddingBottom: 20,
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
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  hashtagItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary30,
    borderRadius: 8,
    gap: 4,
  },
  hashtagItem: {
    color: Colors.primary,
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    borderRadius: 10,
  },
  nextBtn: {
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
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold'
  },
});

