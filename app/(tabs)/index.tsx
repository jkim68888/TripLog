import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
  <ThemedView style={styles.root}>
    <SafeAreaView>
      <View style={styles.header}>
          {/* 서치바 */}
          <ThemedView style={styles.searchBox}>
            <IconSymbol name="magnifyingglass" size={20} color={Colors.primary} />
            <TextInput
              style={styles.input}
              placeholder="해시태그 검색"
              placeholderTextColor={Colors.grayAD}
            />
            <TouchableOpacity>
              <IconSymbol name="xmark.circle.fill" size={20} color={Colors.grayC6} />
            </TouchableOpacity>
          </ThemedView>

          {/* 여행 추가하기 버튼 */}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>여행 추가 하기</Text>
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
    padding: 16
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.primary
  },
  input: {
    marginHorizontal: 8,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium'
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
    color: Colors.white,
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
  }
});
