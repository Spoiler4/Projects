
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
    <View style={[
      styles.outer,
      isDesktop && styles.desktop
    ]}>
      <View
        style={[
          styles.phone,
          isDesktop
            ? {
                width: 390,
                height: Math.min(height - 80, 844),
                borderRadius: 40,
                borderWidth: 6,
                borderColor: "#111111",
              }
            : styles.fullscreen,
        ]}
      >
        <SafeScreen>
          <Slot />
        </SafeScreen>

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
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  fullscreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
    borderWidth: 0,
  },
});
