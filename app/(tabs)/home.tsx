import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Avatar,
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import ApiManager from "../api/Apimanager";

type ReminderType = {
  id: number;
  pengguna_id: number;
  pesan: string;
  waktu: string | null;
  status: string;
};

export default function Home() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    router.replace("/login");
  };

  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pesan, setPesan] = useState("");
  const [waktu, setWaktu] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // Helper to format date and time to 'YYYY-MM-DD HH:mm:ss'
  const formatDateTime = (date: Date, time: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const h = pad(time.getHours());
    const min = pad(time.getMinutes());
    const s = pad(time.getSeconds());
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  };

  // Saat memilih tanggal
  const onDateChange = (event: any, date?: Date) => {
    setDatePickerVisible(false);
    if (date) {
      setSelectedDate(date);
      // Jika sudah ada waktu, update waktu
      if (selectedTime) {
        setWaktu(formatDateTime(date, selectedTime));
      }
    }
  };
  // Saat memilih waktu
  const onTimeChange = (event: any, time?: Date) => {
    setTimePickerVisible(false);
    if (time) {
      setSelectedTime(time);
      // Jika sudah ada tanggal, update waktu
      if (selectedDate) {
        setWaktu(formatDateTime(selectedDate, time));
      }
    }
  };

  const fetchReminders = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");
      const response = await ApiManager.get(
        `/reminder/reminders.php?user_id=${userId}`
      );
      setReminders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleAddReminder = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");
      const response = await ApiManager.post("/reminder/create.php", {
        pengguna_id: userId,
        pesan,
        waktu,
        status: "aktif",
      });
      if (response.data && response.data.success) {
        setModalVisible(false);
        setPesan("");
        setWaktu("");
        fetchReminders();
      } else {
        alert("Gagal menambah pengingat");
      }
    } catch (error) {
      alert("Gagal menambah pengingat");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]}
        style={styles.headerGradient}
      >
        <Animatable.View
          animation="bounceIn"
          delay={100}
          style={styles.headerContent}
        >
          <Avatar.Icon
            size={56}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="account-circle"
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
          <Text style={styles.welcomeText}>Selamat Datang!</Text>
          <Text style={styles.subtitleText}>
            Apa yang ingin Anda lakukan hari ini?
          </Text>
        </Animatable.View>
      </LinearGradient>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View
          animation="fadeInUp"
          delay={100}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Aksi Cepat</Text>
          <View style={styles.actionGrid}>
            <Animatable.View
              animation="bounceIn"
              delay={200}
              style={{ width: "48%" }}
            >
              <Card
                style={styles.actionCard}
                onPress={() => router.replace("/")}
              >
                <Card.Content style={styles.actionCardContent}>
                  <Avatar.Icon
                    size={32}
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons
                        name="home"
                        size={size}
                        color="#2193b0"
                      />
                    )}
                    style={{
                      backgroundColor: "#e3f2fd",
                      elevation: 3,
                      borderWidth: 1,
                      borderColor: "#2193b0",
                    }}
                  />
                  <Text style={styles.actionText}>Beranda</Text>
                </Card.Content>
              </Card>
            </Animatable.View>
            <Animatable.View
              animation="bounceIn"
              delay={300}
              style={{ width: "48%" }}
            >
              <Card
                style={styles.actionCard}
                onPress={() => router.push("/jurnal")}
              >
                <Card.Content style={styles.actionCardContent}>
                  <Avatar.Icon
                    size={32}
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons
                        name="book-open-variant"
                        size={size}
                        color="#2193b0"
                      />
                    )}
                    style={{
                      backgroundColor: "#e3f2fd",
                      elevation: 3,
                      borderWidth: 1,
                      borderColor: "#2193b0",
                    }}
                  />
                  <Text style={styles.actionText}>Jurnal</Text>
                </Card.Content>
              </Card>
            </Animatable.View>
            <Animatable.View
              animation="bounceIn"
              delay={400}
              style={{ width: "48%" }}
            >
              <Card
                style={styles.actionCard}
                onPress={() => router.push("/pengaturan")}
              >
                <Card.Content style={styles.actionCardContent}>
                  <Avatar.Icon
                    size={32}
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons
                        name="cog"
                        size={size}
                        color="#2193b0"
                      />
                    )}
                    style={{
                      backgroundColor: "#e3f2fd",
                      elevation: 3,
                      borderWidth: 1,
                      borderColor: "#2193b0",
                    }}
                  />
                  <Text style={styles.actionText}>Pengaturan</Text>
                </Card.Content>
              </Card>
            </Animatable.View>
            <Animatable.View
              animation="bounceIn"
              delay={500}
              style={{ width: "48%" }}
            >
              <Card style={styles.actionCard}>
                <Card.Content style={styles.actionCardContent}>
                  <Avatar.Icon
                    size={32}
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons
                        name="chart-bar"
                        size={size}
                        color="#2193b0"
                      />
                    )}
                    style={{
                      backgroundColor: "#e3f2fd",
                      elevation: 3,
                      borderWidth: 1,
                      borderColor: "#2193b0",
                    }}
                  />
                  <Text style={styles.actionText}>Statistik</Text>
                </Card.Content>
              </Card>
            </Animatable.View>
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={200}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>
          <Card style={styles.activityCard}>
            <Card.Content>
              <Text style={styles.activityText}>
                Belum ada aktivitas terbaru
              </Text>
              <Text style={styles.activitySubtext}>
                Mulai menggunakan aplikasi untuk melihat aktivitas Anda
              </Text>
            </Card.Content>
          </Card>
        </Animatable.View>
        {/* Tambah Pengingat Section */}
        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Daftar Pengingat</Text>
          <Button
            mode="contained"
            onPress={() => setModalVisible(true)}
            style={{ marginBottom: 12, backgroundColor: "#2193b0" }}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="bell-plus"
                size={size}
                color="#fff"
              />
            )}
          >
            Tambah Pengingat
          </Button>
          <Card style={styles.activityCard}>
            <Card.Content>
              {reminders && reminders.length > 0 ? (
                <ScrollView style={{ maxHeight: 220 }}>
                  {reminders.map((rem, idx) => (
                    <View
                      key={rem.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 10,
                        borderBottomWidth: idx === reminders.length - 1 ? 0 : 1,
                        borderBottomColor: "#e0e0e0",
                        backgroundColor:
                          rem.status === "aktif" ? "#e3f2fd" : "#e8f5e9",
                        borderRadius: 8,
                        marginBottom: 6,
                        paddingHorizontal: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={
                          rem.status === "aktif" ? "bell-ring" : "check-circle"
                        }
                        size={24}
                        color={rem.status === "aktif" ? "#2193b0" : "#43a047"}
                        style={{ marginRight: 10 }}
                      />
                      <Text
                        style={{
                          flex: 2,
                          fontWeight: "bold",
                          color: "#212529",
                        }}
                      >
                        {rem.pesan}
                      </Text>
                      <Text style={{ flex: 2, color: "#6c757d", fontSize: 13 }}>
                        {rem.waktu || "-"}
                      </Text>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color:
                              rem.status === "aktif" ? "#2193b0" : "#43a047",
                            fontSize: 13,
                            backgroundColor:
                              rem.status === "aktif" ? "#e3f2fd" : "#e8f5e9",
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 12,
                          }}
                        >
                          {rem.status === "aktif" ? "Aktif" : "Selesai"}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#6c757d",
                    paddingVertical: 16,
                  }}
                >
                  Tidak ada pengingat.
                </Text>
              )}
            </Card.Content>
          </Card>
        </Animatable.View>
        {/* Modal Tambah Pengingat */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <Card style={{ margin: 24, padding: 16 }}>
              <Card.Title title="Tambah Pengingat" />
              <Card.Content>
                <TextInput
                  label="Pesan"
                  value={pesan}
                  onChangeText={setPesan}
                  style={{ marginBottom: 12 }}
                />
                {Platform.OS === "web" ? (
                  <>
                    <input
                      type="date"
                      value={
                        selectedDate
                          ? selectedDate.toISOString().slice(0, 10)
                          : ""
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setSelectedDate(date);
                        if (selectedTime) {
                          setWaktu(formatDateTime(date, selectedTime));
                        }
                      }}
                      style={{
                        marginBottom: 8,
                        padding: 8,
                        borderRadius: 6,
                        borderColor: "#ccc",
                      }}
                    />
                    <input
                      type="time"
                      value={
                        selectedTime
                          ? selectedTime.toTimeString().slice(0, 5)
                          : ""
                      }
                      onChange={(e) => {
                        const [h, m] = e.target.value.split(":");
                        const time = new Date();
                        time.setHours(Number(h));
                        time.setMinutes(Number(m));
                        setSelectedTime(time);
                        if (selectedDate) {
                          setWaktu(formatDateTime(selectedDate, time));
                        }
                      }}
                      style={{
                        marginBottom: 12,
                        padding: 8,
                        borderRadius: 6,
                        borderColor: "#ccc",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      mode="outlined"
                      onPress={() => setDatePickerVisible(true)}
                      style={{ marginBottom: 8 }}
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons
                          name="calendar"
                          size={size}
                          color={color}
                        />
                      )}
                    >
                      {selectedDate
                        ? `${selectedDate.getFullYear()}-${(
                            selectedDate.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${selectedDate
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`
                        : "Pilih Tanggal"}
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() => setTimePickerVisible(true)}
                      style={{ marginBottom: 12 }}
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={size}
                          color={color}
                        />
                      )}
                    >
                      {selectedTime
                        ? `${selectedTime
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${selectedTime
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}`
                        : "Pilih Waktu"}
                    </Button>
                  </>
                )}
                {/* Date Picker */}
                {datePickerVisible && (
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}
                {/* Time Picker */}
                {timePickerVisible && (
                  <DateTimePicker
                    value={selectedTime || new Date()}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                  />
                )}
                <Button mode="contained" onPress={handleAddReminder}>
                  Simpan
                </Button>
              </Card.Content>
            </Card>
          </Modal>
        </Portal>
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
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2193b0",
    marginTop: 12,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
    backgroundColor: "#fff",
  },
  actionCardContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#212529",
    textAlign: "center",
    marginTop: 8,
  },
  activityCard: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  activityText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212529",
    marginBottom: 8,
  },
  activitySubtext: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#2193b0",
    borderRadius: 8,
    marginTop: 8,
    width: 140,
    alignSelf: "center",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
