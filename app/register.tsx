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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        router.replace("/(tabs)/home");
      }
    };
    checkToken();
  }, []);

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.gradientBg}>
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
              icon="account-plus"
              style={{ backgroundColor: "#fff" }}
              color="#185a9d"
            />
            <Text style={styles.title}>Daftar Akun</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={200}>
            <Card style={styles.card}>
              <Card.Content>
                <PaperTextInput
                  style={styles.input}
                  label={"Nama"}
                  mode="outlined"
                  value={name}
                  onChangeText={setName}
                  left={<PaperTextInput.Icon icon="account" />}
                />
                <PaperTextInput
                  style={styles.input}
                  label={"Email"}
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  left={<PaperTextInput.Icon icon="email" />}
                />
                <PaperTextInput
                  style={styles.input}
                  label={"Password"}
                  mode="outlined"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  left={<PaperTextInput.Icon icon="lock" />}
                />
                <PaperTextInput
                  style={styles.input}
                  label={"Konfirmasi Password"}
                  mode="outlined"
                  value={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
                  secureTextEntry={true}
                  left={<PaperTextInput.Icon icon="lock-check" />}
                />
                <Button
                  mode="contained"
                  onPress={() => {}}
                  style={styles.button}
                  icon="account-plus"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                >
                  Register
                </Button>
                <View style={styles.loginRow}>
                  <Text>Sudah punya akun?</Text>
                  <Button
                    mode="text"
                    onPress={() => router.replace({ pathname: "/login" })}
                    labelStyle={styles.link}
                    compact
                  >
                    Login
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
    color: "#185a9d",
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
    backgroundColor: "#185a9d",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  link: {
    color: "#185a9d",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
