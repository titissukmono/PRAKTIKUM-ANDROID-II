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
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import ApiManager from "../api/Apimanager";

type JurnalRow = {
  tanggal: string;
  kegiatan: string;
  satuan: string;
  kuantitas: number;
  keterangan: string;
  nama_user: string;
};

type Reminder = {
  id: number;
  pengguna_id: number;
  pesan: string;
  waktu: string;
  status: "aktif" | "selesai";
};

type LogAktivitas = {
  id: number;
  pengguna_id: number;
  aktivitas: string;
  waktu: string;
};

const API_URL = "http://192.168.43.137/Jurnal_API/api/reminder"; // Ganti sesuai alamat backend Anda

export default function Jurnal() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    router.replace("/login");
  };
  const [data, setData] = useState<JurnalRow[]>([]);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [kegiatan, setKegiatan] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [satuan, setSatuan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return alert("User tidak ditemukan");
        const response = await ApiManager.get(
          `/kegiatan/read.php?user_id=${userId}`
        );
        if (response.data && response.data.success) {
          setData(response.data.data);
        } else {
          return alert("GAGAL AMBIL DATA");
        }
      } catch (error) {
        console.log(error);
        alert("GAGAL AMBIL DATA");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");
        const response = await ApiManager.get(
          `/reminder/reminders.php?user_id=${userId}`
        );
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
        alert(
          "Gagal mengambil pengingat. Pastikan koneksi internet dan server backend berjalan."
        );
      }
    };
    fetchReminders();
  }, []);

  // Handler edit dan hapus (dummy)
  const handleEdit = (item: JurnalRow) => {
    alert(`Edit data: ${item.kegiatan}`);
  };
  const handleDelete = (item: JurnalRow) => {
    alert(`Hapus data: ${item.kegiatan}`);
  };

  const handleAddJurnal = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");
      console.log({
        pengguna_id: userId,
        tanggal,
        kegiatan,
        kuantitas,
        satuan,
        keterangan,
      });
      const response = await ApiManager.post("/jurnal/jurnal_add.php", {
        pengguna_id: userId,
        tanggal,
        kegiatan,
        kuantitas,
        satuan,
        keterangan,
      });
      console.log("Add jurnal response:", response.data);
      if (response.data && response.data.success) {
        setModalVisible(false);
        setTanggal("");
        setKegiatan("");
        setKuantitas("");
        setSatuan("");
        setKeterangan("");
        // Fetch ulang data jurnal
        const getData = async () => {
          try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) return alert("User tidak ditemukan");
            const response = await ApiManager.get(
              `/kegiatan/read.php?user_id=${userId}`
            );
            if (response.data && response.data.success) {
              setData(response.data.data);
            } else {
              return alert("GAGAL AMBIL DATA");
            }
          } catch (error) {
            console.log(error);
            alert("GAGAL AMBIL DATA");
          }
        };
        getData();
      } else {
        alert("Gagal menambah jurnal");
      }
    } catch (error) {
      alert("Gagal menambah jurnal");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#43cea2", "#185a9d"]}
        style={styles.headerGradient}
      >
        <Animatable.View
          animation="bounceIn"
          delay={100}
          style={styles.headerContent}
        >
          <View style={styles.avatarIconWrap}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={56}
              color="#185a9d"
              style={styles.avatarIcon}
            />
          </View>
          <Text style={styles.headerTitle}>Jurnal</Text>
        </Animatable.View>
      </LinearGradient>
      <Animatable.View animation="fadeInUp" delay={200} style={styles.content}>
        <Card style={styles.jurnalCard}>
          <Card.Content>
            <Text style={styles.tableTitle}>Daftar Kegiatan Jurnal</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>
                No
              </Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>
                Nama
              </Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>
                Tanggal
              </Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>
                Kegiatan
              </Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>
                Qty
              </Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>
                Satuan
              </Text>

              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>
                Keterangan
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={[styles.tableCell, styles.headerCell]}>Aksi</Text>
              </View>
            </View>
            <ScrollView style={{ maxHeight: 320 }}>
              {data && data.length > 0 ? (
                data.map((item, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.tableRow,
                      idx % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    ]}
                  >
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {idx + 1}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.nama_user}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.tanggal}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.kegiatan}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {item.kuantitas}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {item.satuan}
                    </Text>

                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.keterangan}
                    </Text>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{ marginLeft: 6 }}
                      >
                        <MaterialCommunityIcons
                          name="plus-box"
                          size={22}
                          color="#185a9d"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleEdit(item)}
                        style={{ marginHorizontal: 4 }}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={20}
                          color="#185a9d"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(item)}
                        style={{ marginHorizontal: 4 }}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={20}
                          color="#e74c3c"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.jurnalText}>Belum ada entri jurnal.</Text>
              )}
            </ScrollView>
            <Text style={styles.totalText}>Total entri: {data.length}</Text>
          </Card.Content>
        </Card>
      </Animatable.View>
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Card style={styles.modalCard}>
            <Card.Content>
              <Text style={styles.modalTitle}>Tambah Jurnal</Text>
              {/* Tanggal Picker */}
              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={
                    selectedDate ? selectedDate.toISOString().slice(0, 10) : ""
                  }
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setSelectedDate(date);
                    setTanggal(date.toISOString().slice(0, 10));
                  }}
                  style={{
                    marginBottom: 8,
                    padding: 8,
                    borderRadius: 6,
                    borderColor: "#ccc",
                  }}
                />
              ) : (
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
              )}
              {datePickerVisible && Platform.OS !== "web" && (
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setDatePickerVisible(false);
                    setSelectedDate(date ?? null);
                    setTanggal(date ? date.toISOString().split("T")[0] : "");
                  }}
                />
              )}
              <TextInput
                label="Kegiatan"
                value={kegiatan}
                onChangeText={setKegiatan}
                mode="outlined"
                style={styles.modalInput}
              />
              <TextInput
                label="Kuantitas"
                value={kuantitas}
                onChangeText={setKuantitas}
                mode="outlined"
                keyboardType="numeric"
                style={styles.modalInput}
              />
              <TextInput
                label="Satuan"
                value={satuan}
                onChangeText={setSatuan}
                mode="outlined"
                style={styles.modalInput}
              />
              <TextInput
                label="Keterangan"
                value={keterangan}
                onChangeText={setKeterangan}
                mode="outlined"
                style={styles.modalInput}
              />
              <Button
                mode="contained"
                onPress={handleAddJurnal}
                style={styles.modalButton}
              >
                Simpan Jurnal
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
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
  avatarIconWrap: {
    backgroundColor: "#fff",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#185a9d",
    elevation: 6,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarIcon: {
    alignSelf: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#185a9d",
    marginTop: 12,
    marginBottom: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  jurnalCard: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    elevation: 3,
    marginBottom: 20,
    paddingBottom: 8,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 12,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e3f2fd",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowEven: {
    backgroundColor: "#f9f9f9",
  },
  rowOdd: {
    backgroundColor: "#fff",
  },
  rowHighlight: {
    backgroundColor: "#d1eaff",
  },
  tableCell: {
    fontSize: 15,
    color: "#222",
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#185a9d",
  },
  jurnalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212529",
    marginBottom: 16,
    textAlign: "center",
  },
  addButton: {
    borderColor: "#185a9d",
    marginTop: 16,
    marginBottom: 4,
  },
  totalText: {
    marginTop: 8,
    fontSize: 14,
    color: "#185a9d",
    textAlign: "right",
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#185a9d",
    borderRadius: 8,
    marginTop: 8,
    width: 140,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  logoutLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  modalCard: {
    borderRadius: 12,
    padding: 20,
    margin: 20,
    backgroundColor: "#fff",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#185a9d",
    borderRadius: 8,
    marginTop: 10,
  },
});
