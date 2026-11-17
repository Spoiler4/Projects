
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

function AppContainer() {
  const { width, height } = useWindowDimensions();

  const isDesktop = Platform.OS === "web" && width > 600;

  return (
    <View
      style={[
        styles.outer,
        isDesktop && styles.desktop,
      ]}
    >
      <View
        style={[
          styles.phone,
          isDesktop
            ? {
                width: 390,
                height: Math.min(height - 60, 844),
                borderRadius: 42,
                borderWidth: 7,
                borderColor: "#151515",
                boxShadow: "0px 20px 60px rgba(0,0,0,0.55)",
              }
            : styles.fullscreen,
        ]}
      >
        {isDesktop && (
          <View style={styles.dynamicIsland}>
            <View style={styles.camera} />
          </View>
        )}

        <View style={styles.screen}>
          <SafeScreen>
            <Slot />
          </SafeScreen>
        </View>

        <StatusBar style="dark" />
      </View>
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
    backgroundColor: "#FFFFFF",
  },
  desktop: {
    backgroundColor: "#202124",
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    backgroundColor: "#050505",
    overflow: "hidden",
    position: "relative",
  },
  fullscreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
    borderWidth: 0,
  },
  dynamicIsland: {
    position: "absolute",
    top: 9,
    alignSelf: "center",
    zIndex: 100,
    width: 105,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 12,
  },
  camera: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#252B38",
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
});
