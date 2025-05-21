import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import {
    ActivityIndicator,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { router } from "expo-router";
import api from "../../lib/api";
import Toast from "react-native-toast-message";

export default function Login() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if (!fullname || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/api/auth/register", {
                name: fullname,
                email,
                password,
            });
            console.log("Sign Up Response:", response);
            router.back();

            Toast.show({
                type: "success",
                text1: `Hi, ${fullname}`,
                text2: "Yout account is successfully created",
            });
        } catch (error) {
            setError("Sign Up failed. Please try again.");
            console.error("Sign Up Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToLogin = async () => {
        router.replace("/auth/login");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={50}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View className="flex-1 items-left justify-between w-full px-7 bg-white">
                    <View className="flex w-full">
                        <Text className="text-4xl font-bold text-gray-900 mt-[67px]">
                            Mari beristirahat dengan nyaman di Koskita!
                        </Text>

                        <View className="space-y-4 my-8">
                            <TextInput
                                className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
                                placeholder="Full Name"
                                placeholderTextColor="#9ca3af"
                                value={fullname}
                                onChangeText={setFullname}
                            />
                            <TextInput
                                className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
                                placeholder="Phone Number"
                                placeholderTextColor="#9ca3af"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
                                placeholder="Your Email"
                                placeholderTextColor="#9ca3af"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <View className="flew-row items-center">
                                <TextInput
                                    className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
                                    placeholder="Your Password"
                                    placeholderTextColor="#9ca3af"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 bottom-1/2"
                                >
                                    {showPassword ? (
                                        <Ionicons
                                            name="eye-off"
                                            size={24}
                                            color="#9ca3af"
                                        />
                                    ) : (
                                        <Ionicons
                                            name="eye"
                                            size={24}
                                            color="#9ca3af"
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>

                            {error ? (
                                <Text className="text-red-500 text-center mb-2">
                                    {error}
                                </Text>
                            ) : null}
                        </View>
                    </View>

                    <View className="flex my-8">
                        <Text className="text-sm">
                            Dengan melanjutkan, saya menyetujui{" "}
                            <Text className="underline">
                                Syarat & Ketentuan
                            </Text>{" "}
                            dan{" "}
                            <Text className="underline">
                                Kebijakan Privasi Koskita
                            </Text>
                        </Text>

                        <TouchableOpacity
                            className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center mb-4 mt-20"
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text className="text-gray-700 font-semibold text-[16px]">
                                {loading ? "Registering..." : "Sign Up Now"}
                            </Text>
                        </TouchableOpacity>

                        <Text className="text-center text-gray-800 mt-2">
                            Already resgistered?{" "}
                            <Text
                                className="text-amber-400 font-semibold"
                                onPress={handleGoToLogin}
                            >
                                Sign In
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
