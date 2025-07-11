import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router, type Route } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, List, Text } from "react-native-paper";

export default function Pengaturan() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Avatar.Icon
            size={56}
            icon={({ size, color }) => (
              <MaterialCommunityIcons name="cog" size={size} color="#2193b0" />
            )}
            style={{
              backgroundColor: "#fff",
              elevation: 6,
              borderWidth: 2,
              borderColor: "#2193b0",
            }}
          />
          <Text style={styles.headerTitle}>Pengaturan</Text>
        </View>
      </LinearGradient>
      <ScrollView style={styles.content}>
        <List.Section>
          <List.Item
            title="Profil"
            left={(props) => (
              <MaterialCommunityIcons
                name="account"
                size={28}
                color="#2193b0"
                style={styles.iconLeft}
              />
            )}
            onPress={() => router.push("/(tabs)/profil" as Route)}
          />
          <Divider />
          <List.Item
            title="Ganti Password"
            left={(props) => (
              <MaterialCommunityIcons
                name="lock-reset"
                size={28}
                color="#2193b0"
                style={styles.iconLeft}
              />
            )}
            onPress={() => router.push("/(tabs)/ganti-password" as Route)}
          />
          <Divider />
          <List.Item
            title="Tema"
            left={(props) => (
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={28}
                color="#2193b0"
                style={styles.iconLeft}
              />
            )}
            onPress={() => router.push("/(tabs)/tema" as Route)}
          />
          <Divider />
          <List.Item
            title="Tentang Aplikasi"
            left={(props) => (
              <MaterialCommunityIcons
                name="information-outline"
                size={28}
                color="#2193b0"
                style={styles.iconLeft}
              />
            )}
            onPress={() => router.push("/(tabs)/tentang-aplikasi" as Route)}
          />
        </List.Section>
        <Button
          mode="contained"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="logout" size={size} color="#fff" />
          )}
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={{ flexDirection: "row-reverse" }}
          labelStyle={{ color: "#fff", fontWeight: "bold" }}
        >
          Keluar
        </Button>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconLeft: {
    alignSelf: "center",
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: "#2193b0",
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 24,
    width: 140,
    alignSelf: "center",
  },
});
