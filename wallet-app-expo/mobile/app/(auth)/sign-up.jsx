
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Create a new account
  const onSignUpPress = async () => {
    if (!emailAddress.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: signUpError } = await signUp.password({
        emailAddress: emailAddress.trim(),
        password,
      });

      if (signUpError) {
        console.error("Sign-up error:", signUpError);
        setError(
          signUpError.message || "Unable to create account. Please try again."
        );
        return;
      }

      // Send email verification code
      const { error: verificationError } =
        await signUp.verifications.sendEmailCode();

      if (verificationError) {
        console.error("Email verification error:", verificationError);
        setError(
          verificationError.message || "Could not send verification code."
        );
        return;
      }

      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-up exception:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify email address
  const onVerifyPress = async () => {
    if (!code.trim()) {
      setError("Please enter your verification code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: verifyError } =
        await signUp.verifications.verifyEmailCode({
          code: code.trim(),
        });

      if (verifyError) {
        console.error("Verification error:", verifyError);
        setError(
          verifyError.message || "Invalid verification code. Please try again."
        );
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize();
        router.replace("/");
      } else {
        console.log("Sign-up status:", signUp.status);
        setError(
          "Your account needs additional information before completion."
        );
      }
    } catch (err) {
      console.error("Verification exception:", err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>
          Verify your email
        </Text>

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
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          keyboardType="number-pad"
          onChangeText={setCode}
        />

        <TouchableOpacity
          onPress={onVerifyPress}
          style={[styles.button, loading && { opacity: 0.7 }]}
          disabled={loading || fetchStatus === "fetching"}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
        />

        <Text style={styles.title}>Create Account</Text>

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
          placeholderTextColor="#9A8478"
          placeholder="Enter email"
          onChangeText={setEmailAddress}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={onSignUpPress}
          disabled={loading || fetchStatus === "fetching"}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Already have an account?
          </Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
