
import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { StatusBar } from "expo-status-bar";

import {
  View,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Add your Clerk Publishable Key to the .env file"
  );
}

// Android-style device dimensions
const PHONE_WIDTH = 412;
const PHONE_HEIGHT = 915;

const FRAME_BORDER = 8;

const FRAME_WIDTH =
  PHONE_WIDTH + FRAME_BORDER * 2;

const FRAME_HEIGHT =
  PHONE_HEIGHT + FRAME_BORDER * 2;

function AppContainer() {
  const { width, height } = useWindowDimensions();

  // Available browser space
  const availableWidth = Math.max(width - 32, 1);
  const availableHeight = Math.max(height - 32, 1);

  // Automatically scale the device to fit
  // Allow enlargement as well as shrinking
  const scale = Math.min(
    availableWidth / FRAME_WIDTH,
    availableHeight / FRAME_HEIGHT
  );

  const frameWidth = FRAME_WIDTH * scale;
  const frameHeight = FRAME_HEIGHT * scale;

  return (
    <View style={styles.outer}>
      {/* Device frame container */}
      <View
        style={{
          width: frameWidth,
          height: frameHeight,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Android Device */}
        <View
          style={[
            styles.phone,
            {
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              borderWidth: FRAME_BORDER,
              transform: [{ scale }],
            },
          ]}
        >
          {/* Android Punch Hole Camera */}
          <View style={styles.cameraContainer}>
            <View style={styles.camera} />
          </View>

          {/* Device Screen */}
          <View style={styles.screen}>
            <SafeScreen>
              <Slot />
            </SafeScreen>
          </View>
        </View>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <AppContainer />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#202124",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  phone: {
    position: "absolute",
    backgroundColor: "#050505",
    borderColor: "#111111",
    borderRadius: 48,
    overflow: "hidden",
    boxShadow: "0px 15px 40px rgba(0,0,0,0.45)",
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderRadius: 39,
  },

  cameraContainer: {
    position: "absolute",
    top: 14,
    alignSelf: "center",
    zIndex: 100,
    width: 38,
    height: 38,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  camera: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "#26364D",
    borderWidth: 2,
    borderColor: "#111827",
  },
});
