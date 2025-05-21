import { View } from "react-native";
import { Stack, Link } from "expo-router";

export default function NotFound() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops! Not Found" }} />
            <View className="flex-1 justify-center items-center">
                <Link href="/" className="text-xl underline">
                    Go back to Home
                </Link>
            </View>
        </>
    );
}
