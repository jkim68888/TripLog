import { ConfigContext, ExpoConfig } from '@expo/config';
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "트립로그",
  slug: "TripLog",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "triplog",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.jihyunkim.triplog",
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "현재 위치 정보를 표시하기 위해 위치 권한이 필요합니다.",
      NSPhotoLibraryUsageDescription: "사진을 가져오기 위해 갤러리 접근 권한이 필요합니다.",
      config: {
        googleMapsApiKey: process.env.iOS_GOOGLE_MAPS_API_KEY
      }
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#8FC8F1"
    },
    edgeToEdgeEnabled: true,
    package: "com.jihyunkim.triplog",
    permissions: [
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION",
      "READ_EXTERNAL_STORAGE",
      "READ_MEDIA_IMAGES",
      "ACCESS_MEDIA_LOCATION"
    ],
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
      }
    }
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon@3x.png",
        imageWidth: 83,
        resizeMode: "contain",
        backgroundColor: "#8FC8F1"
      }
    ],
    "expo-web-browser"
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {},
    eas: {
      projectId: "8516e699-c9db-4d5d-bcaa-433170233e9e"
    }
  }
});
