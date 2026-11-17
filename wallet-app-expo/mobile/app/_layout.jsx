
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
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// iPhone 16 logical screen dimensions
const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;

const FRAME_BORDER = 7;
const FRAME_WIDTH = PHONE_WIDTH + FRAME_BORDER * 2;
const FRAME_HEIGHT = PHONE_HEIGHT + FRAME_BORDER * 2;

function AppContainer() {
  const { width, height } = useWindowDimensions();

  // Keep the phone at full size whenever possible.
  // Only shrink it when the available space requires it.
  const availableWidth = Math.max(width - 24, 1);
  const availableHeight = Math.max(height - 24, 1);

  const scale = Math.min(
    availableWidth / FRAME_WIDTH,
    availableHeight / FRAME_HEIGHT,
    1
  );

  const frameWidth = FRAME_WIDTH * scale;
  const frameHeight = FRAME_HEIGHT * scale;

  return (
    <View style={styles.outer}>
      {/* Scaled frame container */}
      <View
        style={{
          width: frameWidth,
          height: frameHeight,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Actual phone */}
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
          {/* Dynamic Island */}
          <View style={styles.dynamicIsland}>
            <View style={styles.camera} />
          </View>

          {/* App display */}
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
    backgroundColor: "#202124",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  phone: {
    position: "absolute",
    backgroundColor: "#050505",
    borderColor: "#111111",
    borderRadius: 54,
    overflow: "hidden",
    boxShadow: "0px 15px 40px rgba(0,0,0,0.45)",
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderRadius: 46,
  },

  dynamicIsland: {
    position: "absolute",
    top: 12,
    alignSelf: "center",
    zIndex: 100,
    width: 110,
    height: 32,
    backgroundColor: "#000000",
    borderRadius: 20,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 13,
  },

  camera: {
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: "#202A40",
  },
});
