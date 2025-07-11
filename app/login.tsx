import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Avatar,
  Button,
  Card,
  TextInput as PaperTextInput,
  Text,
} from "react-native-paper";
import ApiManager from "./api/Apimanager";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        router.replace("/(tabs)/home");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Email dan Password Harus diisi");
    }

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await ApiManager.post("/pengguna/login.php", loginData);
      if (response.data && response.data.success) {
        await AsyncStorage.setItem("userToken", response.data.data);
        await AsyncStorage.setItem("userId", response.data.user_id.toString());
        router.replace("/(tabs)/home");
      } else {
        return alert("Gagal login");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      return alert("Gagal login error");
    }
  };

  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={styles.gradientBg}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animatable.View
            animation="fadeInDown"
            delay={100}
            style={styles.logoContainer}
          >
            <Avatar.Icon
              size={72}
              icon={({ size, color }) => (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={size}
                  color="#2193b0"
                />
              )}
              style={{ backgroundColor: "#fff" }}
            />
            <Text style={styles.title}>App Ntis</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={200}>
            <Card style={styles.card}>
              <Card.Content>
                <PaperTextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  autoCapitalize="none"
                  left={
                    <PaperTextInput.Icon
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={size}
                          color={color}
                        />
                      )}
                    />
                  }
                />
                <PaperTextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={!passwordVisible}
                  left={
                    <PaperTextInput.Icon
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons
                          name="lock-outline"
                          size={size}
                          color={color}
                        />
                      )}
                    />
                  }
                  right={
                    <PaperTextInput.Icon
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons
                          name={
                            passwordVisible ? "eye-off-outline" : "eye-outline"
                          }
                          size={size}
                          color={color}
                        />
                      )}
                      onPress={() => setPasswordVisible((v) => !v)}
                    />
                  }
                />
                <Button
                  mode="contained"
                  onPress={handleLogin}
                  style={styles.button}
                  icon={({ size, color }) => (
                    <MaterialCommunityIcons
                      name="login"
                      size={size}
                      color="#fff"
                    />
                  )}
                  contentStyle={{ flexDirection: "row-reverse" }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                >
                  Login
                </Button>
                <View style={styles.registerRow}>
                  <Text>Belum punya akun?</Text>
                  <Button
                    mode="text"
                    onPress={() => router.replace({ pathname: "/register" })}
                    labelStyle={styles.link}
                    compact
                  >
                    Daftar
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2193b0",
    marginTop: 8,
    letterSpacing: 1,
  },
  card: {
    width: 340,
    borderRadius: 18,
    paddingVertical: 24,
    backgroundColor: "#fff",
    elevation: 6,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#2193b0",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  link: {
    color: "#2193b0",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
