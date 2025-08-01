import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <ThemedText style={styles.title} fontSize={20} fontWeight='600'>설정</ThemedText>
        
        <TouchableOpacity>
          <ThemedView style={styles.box}>
            <ThemedText fontSize={15}>개인 정보 처리 방침</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedView style={styles.box}>
            <ThemedText fontSize={15}>서비스 이용 약관</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedView style={styles.box}>
            <ThemedText fontSize={15}>EULA 최종 사용자 라이센스 계약</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <ThemedView style={styles.box}>
            <ThemedText fontSize={15}>버전 정보 - v1.0</ThemedText>
          </ThemedView>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: 'left',
    paddingHorizontal: 16,
    paddingTop: Platform.select({
      ios: 0,
      android: 32
    }),
    marginBottom: 36,
  },
  box: {
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.grayED
  }
});
