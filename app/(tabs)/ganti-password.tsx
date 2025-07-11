import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function GantiPassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="lock-reset"
            size={48}
            color="#2193b0"
            style={{ backgroundColor: "#fff", borderRadius: 24, padding: 8 }}
          />
          <Text style={styles.headerTitle}>Ganti Password</Text>
        </View>
      </LinearGradient>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Password Lama"
            value={oldPass}
            onChangeText={setOldPass}
            secureTextEntry={!visible}
            left={
              <TextInput.Icon
                icon={({ size, color }) => (
                  <MaterialCommunityIcons
                    name="lock"
                    size={size}
                    color={color}
                  />
                )}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Password Baru"
            value={newPass}
            onChangeText={setNewPass}
            secureTextEntry={!visible}
            left={
              <TextInput.Icon
                icon={({ size, color }) => (
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={size}
                    color={color}
                  />
                )}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Konfirmasi Password Baru"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry={!visible}
            left={
              <TextInput.Icon
                icon={({ size, color }) => (
                  <MaterialCommunityIcons
                    name="lock-check"
                    size={size}
                    color={color}
                  />
                )}
              />
            }
            style={styles.input}
            right={
              <TextInput.Icon
                icon={visible ? "eye-off" : "eye"}
                onPress={() => setVisible((v) => !v)}
              />
            }
          />
          <Button
            mode="contained"
            style={styles.saveButton}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="content-save"
                size={size}
                color="#fff"
              />
            )}
          >
            Simpan
          </Button>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 10,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2193b0",
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: 1,
  },
  card: {
    margin: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 4,
    paddingVertical: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#2193b0",
    borderRadius: 8,
    marginTop: 16,
  },
});
