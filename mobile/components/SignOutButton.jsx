
import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("Logout button pressed");

    try {
      console.log("Signing out...");

      await signOut();

      console.log("Clerk sign out successful");

      router.replace("/sign-in");
    } catch (error) {
      console.error("SIGN OUT FAILED:", error);

      Alert.alert(
        "Logout Error",
        error?.message || "Something went wrong while logging out."
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleSignOut}
    >
      <Ionicons
        name="log-out-outline"
        size={22}
        color={COLORS.text}
      />
    </TouchableOpacity>
  );
};
