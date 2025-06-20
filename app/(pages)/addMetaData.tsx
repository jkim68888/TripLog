import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddMetaDataScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const inputColor = useThemeColor('text');

  // 예시 이미지 데이터 (최대 5개)
  const images = [
    { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', id: 1 },
    { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', id: 2 },
    { uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', id: 3 },
    { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', id: 4 },
    { uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', id: 5 },
  ];

  const moveToMainScreen = () => {
    router.push('/(tabs)')
  }

  const moveToLocationScreen = () => {
    // TODO: Implement location screen navigation
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 업로드된 이미지들 */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageRow}
          >
          {images.map((img) => (
            <View key={img.id} style={styles.imageBox}>
              <Image source={{ uri: img.uri }} style={styles.image} />
            </View>
          ))}
        </ScrollView>

        {/* 장소 */}
        <View style={styles.titleContainer}>
          <ThemedText fontSize={18} fontWeight='600'>사진의 장소</ThemedText>
          <TouchableOpacity style={styles.changeButton}>
            <MaterialCommunityIcons name='refresh' size={22} color={Colors.primary} />
            <ThemedText fontSize={16} fontWeight='500'>변경</ThemedText>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.inputBox, {color: inputColor}]}
          placeholder="갤러리에서 가져온 장소 기본값"
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
          value={formatDateTime(selectedDate)}
          placeholderTextColor={Colors.grayAD}
          editable={false}
        />

      </ScrollView>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.confirmBtn} onPress={moveToMainScreen}>
        <Text style={styles.confirmBtnText}>등록</Text>
      </TouchableOpacity>

      {/* 날짜와 시간 피커 */}
      <DateTimePickerModal
        isVisible={showDateTimePicker}
        mode="datetime"
        display='inline'
        onConfirm={(date) => {
          setShowDateTimePicker(false);
          setSelectedDate(date);
        }}
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
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  imageBox: {
    width: 324,
    height: 324,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
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
  confirmBtnText: {
    color: Colors.gray9,
    fontSize: 16,
    fontFamily: 'Pretendard-Semibold'
  },
})
