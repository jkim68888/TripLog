import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function GalleryScreen() {
  // 예시 이미지 데이터
  const imageData = [
    { id: 1, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 2, uri: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400' },
    { id: 3, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
    { id: 4, uri: 'https://images.unsplash.com/photo-1494790108755-2616c27ca3bb?w=400' },
    { id: 5, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 6, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 7, uri: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400' },
    { id: 8, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
    { id: 9, uri: 'https://images.unsplash.com/photo-1494790108755-2616c27ca3bb?w=400' },
    { id: 10, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 11, uri: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400' },
    { id: 12, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
    { id: 13, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 14, uri: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400' },
    { id: 15, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
    { id: 16, uri: 'https://images.unsplash.com/photo-1494790108755-2616c27ca3bb?w=400' },
    { id: 17, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 18, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 19, uri: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400' },
    { id: 20, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
    { id: 21, uri: 'https://images.unsplash.com/photo-1494790108755-2616c27ca3bb?w=400' },
    { id: 22, uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
    { id: 23, uri: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400' },
    { id: 24, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
  ];

  const inputColor = useThemeColor('text')
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - 4) / 3; // 3열, 간격 2px씩

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedItems.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[styles.imageContainer, { width: itemSize, height: itemSize }]}
        onPress={() => toggleSelection(item.id)}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        
        {/* 선택 버튼 */}
        <View style={styles.selectionButton}>
          <View style={[
            styles.checkbox, 
            isSelected && styles.checkboxSelected
          ]}>
            {isSelected && (
              <MaterialCommunityIcons 
                name="check" 
                size={16} 
                color={Colors.white} 
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
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

          {/* 북마크 */}
          <TouchableOpacity style={styles.bookmarkButton}>
            <MaterialCommunityIcons name="bookmark-outline" size={30} color={Colors.grayAD} />
          </TouchableOpacity>
        </View>

        {/* 리스트 뷰 */}
        <FlatList
          data={imageData}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.select({
      ios: 0,
      android: 24
    }),
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    width: 252,
    height: 40,
    borderColor: Colors.primary
  },
  input: {
    width: 200,
    marginHorizontal: 8,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  bookmarkButton: {
    width: 30,
    height: 30,
  },
  listContainer: {
    padding: 1,
    paddingBottom: Platform.select({
      ios: 108,
      android: 84,
    }),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: Colors.grayF9,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectionButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});

