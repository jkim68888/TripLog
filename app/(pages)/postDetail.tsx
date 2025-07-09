import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { usePostStore } from '@/stores/postStore';
import { formatDateTime } from '@/utils/dateTimeUtil';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams();
  const { posts } = usePostStore();
  const post = posts.find(p => p.id === postId);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  if (!post) {
    return <ThemedText fontSize={16}>포스트를 찾을 수 없습니다.</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {/* 오버레이 정보 */}
          <View style={styles.overlayInfo}>
            <View style={styles.overlayRow}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={20} 
                color={Colors.white} 
                style={styles.overlayIcon}
              />
              <ThemedText style={{color: Colors.white}} fontSize={14} fontWeight='600'>
                {post.images[currentIndex]?.creationTime || '날짜 정보 없음'}
              </ThemedText>
            </View>
            <View style={styles.overlayRow}>
              <MaterialCommunityIcons 
                name="map-marker-outline" 
                size={20} 
                color={Colors.white} 
                style={styles.overlayIcon}
              />
              <ThemedText style={{color: Colors.white}} fontSize={14} fontWeight='600'>
                {post.images[currentIndex]?.location?.text || '위치 정보 없음'}
              </ThemedText>
            </View>
          </View>

          <FlatList
            keyExtractor={(item, index) => `image-${index}`}
            data={post.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            renderItem={({ item, index }) => (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.uri }} style={styles.image} />
              </View>
            )}
          />
          
          {/* 페이지 인디케이터 */}
          {post.images.length > 1 && (
            <View style={styles.pageIndicator}>
              {post.images.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    index === currentIndex && styles.activeDot
                  ]} 
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.dateRow}>
            <ThemedText fontSize={14}>
              {formatDateTime(post.creationDate)}
            </ThemedText>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <MaterialCommunityIcons name="bookmark-outline" size={24} color={Colors.grayAD} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color={Colors.grayAD} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.hashtagContainer}>
            {post.hashtags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.hashtagButton}>
                <ThemedText style={{color: Colors.primary}} fontSize={14} fontWeight='500'>{tag}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <ThemedText fontSize={16}>{post.content}</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: Dimensions.get('window').width,
    backgroundColor: Colors.grayF9,
  },
  imageWrapper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayInfo: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  overlayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  overlayIcon: {
    marginRight: 8,
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeDot: {
    backgroundColor: Colors.white,
  },
  contentContainer: {
    padding: 20,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  hashtagButton: {
    backgroundColor: Colors.primary18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
