
import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function Page() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (loading || fetchStatus === "fetching") return;

    if (!emailAddress.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await signIn.password({
        emailAddress: emailAddress.trim(),
        password,
      });

      if (signInError) {
        console.error("Clerk sign-in error:", signInError);

        setError(
          signInError.message || "Unable to sign in. Please try again."
        );
        return;
      }

      console.log("Clerk sign-in status:", signIn.status);

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize();

        if (finalizeError) {
          console.error("Finalize error:", finalizeError);

          setError(
            finalizeError.message || "Could not complete your sign in."
          );
          return;
        }

        router.replace("/");
        return;
      }

      if (signIn.status === "needs_client_trust") {
        setError(
          "Device verification is required. Check your Clerk Device Trust settings."
        );
        return;
      }

      if (signIn.status === "needs_second_factor") {
        setError(
          "Two-factor authentication is required. Check your Clerk MFA settings."
        );
        return;
      }

      if (signIn.status === "needs_first_factor") {
        setError(
          "Additional authentication is required by Clerk."
        );
        return;
      }

      if (signIn.status === "needs_new_password") {
        setError(
          "You need to update your password before signing in."
        );
        return;
      }

      console.error("Incomplete sign-in:", signIn);

      setError(
        "Sign-in incomplete. Status: " + signIn.status
      );

    } catch (err) {
      console.error("Sign-in exception:", err);

      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        width: "100%",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.container,
          {
            flex: 1,
            width: "100%",
          },
        ]}
      >
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome Back</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons
              name="alert-circle"
              size={20}
              color={COLORS.expense}
            />

            <Text style={styles.errorText}>{error}</Text>

            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons
                name="close"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={setEmailAddress}
          editable={!loading}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={onSignInPress}
          disabled={loading || fetchStatus === "fetching"}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>

          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
