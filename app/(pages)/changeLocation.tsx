import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangeLocationScreen() {
  const router = useRouter();
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const availableHeight = windowHeight - insets.top - insets.bottom

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerText}>
          <MaterialCommunityIcons name="information-outline" size={20} color={Colors.primary} />
          <ThemedText fontSize={15}>지도에서 장소를 pin 해주세요.</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* map */}
      <View style={[
        styles.mapContainer,
        {
          height: Platform.OS === 'ios' 
            ? availableHeight - 160 
            : availableHeight - 120
        }
      ]}>
        
      </View>

      {/* 완료 버튼 */}
      <TouchableOpacity style={styles.confirmBtn} onPress={() => {router.back()}}>
        <Text style={styles.confirmBtnText}>변경</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  header:  {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerText:  {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  mapContainer: {
    backgroundColor: 'lightblue',
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
});
