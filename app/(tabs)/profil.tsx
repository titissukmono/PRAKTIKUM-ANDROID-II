import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export default function Profil() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Avatar.Icon
            size={72}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color="#2193b0"
              />
            )}
            style={{
              backgroundColor: "#fff",
              elevation: 6,
              borderWidth: 2,
              borderColor: "#2193b0",
            }}
          />
          <Text style={styles.headerTitle}>Profil</Text>
        </View>
      </LinearGradient>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Nama</Text>
          <Text style={styles.value}>Nama User</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>user@email.com</Text>
          <Button
            mode="outlined"
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="account-edit"
                size={size}
                color={color}
              />
            )}
            style={styles.editButton}
            onPress={() => {}}
          >
            Edit Profil
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
  label: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: "#212529",
    fontWeight: "500",
    marginBottom: 4,
  },
  editButton: {
    marginTop: 24,
    borderColor: "#2193b0",
  },
});
