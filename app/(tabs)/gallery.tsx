import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { usePostStore } from '@/stores/postStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function GalleryScreen() {
  const inputColor = useThemeColor('text');
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - 16) / 3; // 3열, 간격 8px씩
  const { posts } = usePostStore();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity 
        style={[styles.imageContainer, { width: itemSize, height: itemSize }]}
        onPress={() => {}}
      >
        <Image source={{ uri: item.images[0].uri }} style={styles.image} />
        
        {/* 여러장 아이콘 */}
        {item.images.length > 1 &&
          <View style={styles.manyIcon}>
            <MaterialCommunityIcons 
              name="arrange-bring-forward" 
              size={20} 
              color={Colors.white} 
            />
          </View>
        }
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
          data={posts}
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
  manyIcon: {
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

