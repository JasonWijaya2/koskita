import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function About() {
    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-[#25292e]">
            <Text className="text-lg dark:text-white">
                This is the register page!
            </Text>
            <Link href="/auth/login" className="text-lg underline">
                Go to Login
            </Link>
        </View>
    );
}
