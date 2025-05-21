import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../../global.css";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <StatusBar style="auto" />
                    <Stack.Screen name="(tabs)" />
                </Stack>
                <Toast />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
