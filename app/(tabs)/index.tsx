import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
  <ThemedView style={styles.root}>
    <SafeAreaView>
      <ThemedView style={styles.header}>
        <ThemedText fontSize={16}>해시태그 검색</ThemedText>
        <ThemedText fontSize={15}>여행 추가 하기</ThemedText>
      </ThemedView>
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
  }
});
