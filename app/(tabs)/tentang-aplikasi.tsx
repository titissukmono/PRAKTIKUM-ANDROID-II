import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function TentangAplikasi() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="information-outline"
            size={48}
            color="#2193b0"
            style={{ backgroundColor: "#fff", borderRadius: 24, padding: 8 }}
          />
          <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
        </View>
      </LinearGradient>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.appName}>App Ntis</Text>
          <Text style={styles.version}>Versi 1.0.0</Text>
          <Text style={styles.desc}>
            Aplikasi pencatatan jurnal kegiatan, pengingat, dan statistik
            aktivitas harian berbasis mobile.
          </Text>
          <View style={styles.devInfo}>
            <MaterialCommunityIcons name="account" size={20} color="#2193b0" />
            <Text style={styles.devText}> Developer: Nama Developer</Text>
          </View>
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
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2193b0",
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: "#212529",
    marginBottom: 16,
  },
  devInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  devText: {
    fontSize: 16,
    color: "#212529",
    marginLeft: 6,
  },
});
