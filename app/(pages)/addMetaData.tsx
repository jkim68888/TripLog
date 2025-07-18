import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { usePostStore } from '@/stores/postStore';
import { formatDateTime } from '@/utils/dateTimeUtil';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddMetaDataScreen() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [locationText, setLocationText] = useState('');
  const [creationTime, setCreationTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const inputColor = useThemeColor('text');
  const flatListRef = useRef<FlatList>(null);
  const windowWidth = Dimensions.get('window').width;

  const { 
    selectedImages,
    currentPost, 
    setSelectedImages,
    addPost, 
    resetCurrentPost 
  } = usePostStore();

  // 페이지 변경 시 호출
  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index
      setCurrentImageIndex(index)

      const currentImage = selectedImages[index]
      console.log('현재 페이지: ', index, ', 이미지 데이터:', currentImage)

      // 초기화
      setCreationTime('');
      setLocationText('');

      if (currentImage) {
        // 날짜 업데이트
        currentImage.creationTime?.text && setCreationTime(currentImage.creationTime.text);
        // 위치 업데이트
        currentImage.location?.text && setLocationText(currentImage.location.text);
      }
    }
  };

  const handleChangeDate = (date: Date) => {
    console.log(currentImageIndex)

    setShowDateTimePicker(false);
    setSelectedDate(date);
    setCreationTime(formatDateTime(date))
    setSelectedImages(selectedImages.map((img, idx) =>
      idx === currentImageIndex
        ? {
          ...img,
          creationTime: {
            date: date,
            text: formatDateTime(date)
          }
        }
        : img
    ))
  }

  const moveToLocationScreen = () => {
    router.push('/changeLocation')
  }

  const handleSubmit = () => {
    const finalPost = {
      ...currentPost,
      images: selectedImages, 
      creationDate: new Date()
    };
    addPost(finalPost);
    resetCurrentPost(); // 초기화
    router.push('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 업로드된 이미지들  */}
        <View style={styles.imageContainer}>
          <FlatList
            keyExtractor={(item, index) => `image-${index}`}
            ref={flatListRef}
            data={selectedImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            contentContainerStyle={{ gap: 4 }}
            renderItem={({ item, index }) => (
              <View style={[
                styles.imageBox, 
                { width: windowWidth - 40 },
                { height: windowWidth - 40 },
              ]}>
                <Image source={{ uri: item.uri }} style={styles.image} />
              </View>
            )}
          />
            
          {/* 페이지 인디케이터 */}
          <View style={styles.pageIndicator}>
            <Text style={styles.indicatorText}>
              {currentImageIndex + 1} / {selectedImages.length}
            </Text>
          </View>
        </View>

        {/* 장소 */}
        <View style={styles.titleContainer}>
          <ThemedText fontSize={18} fontWeight='600'>사진의 장소</ThemedText>
          <TouchableOpacity style={styles.changeButton} onPress={moveToLocationScreen}>
            <MaterialCommunityIcons name='refresh' size={22} color={Colors.primary} />
            <ThemedText fontSize={16} fontWeight='500'>변경</ThemedText>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.inputBox, {color: inputColor}]}
          value={locationText}
          placeholder="위치 정보가 없습니다."
          placeholderTextColor={Colors.grayAD}
        />

        {/* 날짜와 시간 */}
        <View style={styles.titleContainer}>
          <ThemedText fontSize={18} fontWeight='600'>사진의 날짜와 시간</ThemedText>
          <TouchableOpacity style={styles.changeButton} onPress={() => setShowDateTimePicker(true)}>
            <MaterialCommunityIcons name='refresh' size={22} color={Colors.primary} />
            <ThemedText fontSize={16} fontWeight='500'>변경</ThemedText>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.inputBox, {color: inputColor}]}
          value={creationTime}
          placeholder="날짜와 시간 정보가 없습니다."
          placeholderTextColor={Colors.grayAD}
          editable={false}
        />

      </ScrollView>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
        <Text style={styles.confirmBtnText}>등록</Text>
      </TouchableOpacity>

      {/* 날짜와 시간 피커 */}
      <DateTimePickerModal
        isVisible={showDateTimePicker}
        mode="datetime"
        display='inline'
        onConfirm={(date) => {handleChangeDate(date)}}
        onCancel={() => setShowDateTimePicker(false)}
        locale="ko"
        date={selectedDate}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  imageBox: {
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    marginRight: 8,
  },
  indicatorText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 12,
  },
  changeButton: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  inputBox: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grayED,
    paddingHorizontal: 20,
    height: 52,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    marginHorizontal: 16,
    marginBottom: 48,
    marginTop: 20,
  },
  confirmBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold'
  },
  imageContainer: {
    position: 'relative',
    marginTop: 20,
  },
  pagerView: {
    width: '100%',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
