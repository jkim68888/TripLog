import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter()
  const inputColor = useThemeColor('text')

  const moveToAddPostScreen = () => {
    router.push('/addPost')
  }

  return (
  <ThemedView style={styles.root}>
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

        {/* 여행 추가하기 버튼 */}
        <TouchableOpacity style={styles.addButton} onPress={moveToAddPostScreen}>
          <Text style={styles.addButtonText}>여행 추가하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'lightblue'
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
    // iOS용 그림자
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
  }
});
