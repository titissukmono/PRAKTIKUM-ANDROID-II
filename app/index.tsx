import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const checkToken = async () => {
      // await AsyncStorage.setItem("userToken", "12345");
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)/home");
      }
    };
    checkToken();
  }, []);
}
