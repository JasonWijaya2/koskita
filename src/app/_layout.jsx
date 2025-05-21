import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { useColorScheme } from "nativewind";
import "../../global.css";

export default function RootLayout() {
  // Jika pakai dark mode nativewind, bisa gunakan useColorScheme
  // const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      />
    </SafeAreaView>
  );
}
