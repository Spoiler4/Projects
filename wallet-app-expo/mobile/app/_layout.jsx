
import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Platform,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;
const FRAME_BORDER = 7;

function AppContainer() {
  const { width, height } = useWindowDimensions();

  // Always show the phone frame.
  // Scale it down to fit smaller screens.
  const availableWidth = width - 24;
  const availableHeight = height - 24;

  const scale = Math.min(
    availableWidth / (PHONE_WIDTH + FRAME_BORDER * 2),
    availableHeight / (PHONE_HEIGHT + FRAME_BORDER * 2),
    1
  );

  const frameWidth = (PHONE_WIDTH + FRAME_BORDER * 2) * scale;
  const frameHeight = (PHONE_HEIGHT + FRAME_BORDER * 2) * scale;

  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.outer}>
      <View
        style={[
          styles.framePosition,
          {
            width: frameWidth,
            height: frameHeight,
          },
        ]}
      >
        <View
          style={[
            styles.phone,
            {
              width: PHONE_WIDTH,
              height: PHONE_HEIGHT,
              borderWidth: FRAME_BORDER,
              transform: [{ scale }],
            },
          ]}
        >
          {/* Dynamic Island */}
          <View style={styles.dynamicIsland}>
            <View style={styles.camera} />
          </View>

          {/* App screen */}
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

  framePosition: {
    alignItems: "center",
    justifyContent: "center",
  },

  phone: {
    position: "absolute",
    backgroundColor: "#050505",
    borderColor: "#111111",
    borderRadius: 54,
    overflow: "hidden",
    boxShadow: "0px 18px 50px rgba(0,0,0,0.5)",
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
