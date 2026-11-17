
import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Add your Clerk Publishable Key to the .env file"
  );
}

function AppContainer() {
  return (
    <View style={styles.container}>
      <SafeScreen>
        <Slot />
      </SafeScreen>

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
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    minHeight: "100%",
    backgroundColor: "#FFFFFF",
  },
});
