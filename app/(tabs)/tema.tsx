import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Card, Switch, Text } from "react-native-paper";

export default function Tema() {
  const [isDark, setIsDark] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={48}
            color="#2193b0"
            style={{ backgroundColor: "#fff", borderRadius: 24, padding: 8 }}
          />
          <Text style={styles.headerTitle}>Tema</Text>
        </View>
      </LinearGradient>
      <Card style={styles.card}>
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.label}>Tema {isDark ? "Gelap" : "Terang"}</Text>
            <Text style={styles.status}>
              {isDark ? "Aktif: Gelap" : "Aktif: Terang"}
            </Text>
          </View>
          <Switch value={isDark} onValueChange={setIsDark} color="#2193b0" />
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
  label: {
    fontSize: 18,
    color: "#212529",
    fontWeight: "500",
  },
  status: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
});
