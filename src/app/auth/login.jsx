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
import { setAccessToken, getAccessToken } from "../../lib/auth";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState("phone");

    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessToken();
            console.log("Token:", token);
        };

        getToken();
    }, []);

    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        if (!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        if (password.length < 3 || password.length > 12) {
            setError("Password must be 3-12 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/api/user/login", {
                email,
                password,
            });
            console.log("Login Response:", response.data.data.accessToken);

            await setAccessToken(response.data.data.accessToken);
            router.replace("/(tabs)");
        } catch (error) {
            setError("Sign in failed. Please try again.");
            console.error("Sign In Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        router.push("/auth/register");
    };

    const handleLoginType = () => {
        if (loginType === "phone") {
            setLoginType("email");
        } else {
            setLoginType("phone");
        }
        setEmail("");
        setPhone("");
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
                            Masukkan Identitas Kamarmu
                        </Text>

                        <View className="space-y-4 my-8">
                            <View className="flex justify-center items-start gap-2 mb-4">
                                <Text className="font-semibold">
                                    {loginType === "phone"
                                        ? "No. Handphone"
                                        : "Email"}
                                </Text>
                                <TextInput
                                    className="w-full h-16 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900 border-solid border-2 border-gray-200"
                                    placeholder={
                                        loginType === "phone"
                                            ? "e.g. 081234567890"
                                            : "Your Email"
                                    }
                                    placeholderTextColor="#9ca3af"
                                    value={loginType == "phone" ? phone : email}
                                    onChangeText={
                                        loginType === "phone"
                                            ? setPhone
                                            : setEmail
                                    }
                                    autoCapitalize="none"
                                    editable={!loading}
                                    keyboardType={
                                        loginType === "phone"
                                            ? "number-pad"
                                            : "email-address"
                                    }
                                />
                            </View>

                            <View className="flex justify-center items-start gap-2 mb-4">
                                <Text className="font-semibold">Password</Text>
                                <View className="flex flex-row items-center justify-center">
                                    <TextInput
                                        className="w-full h-16 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900 border-solid border-2 border-gray-200"
                                        placeholder="Your Password"
                                        placeholderTextColor="#9ca3af"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        editable={!loading}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 bottom-4"
                                        disabled={loading}
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
                            </View>

                            <View className="flex flex-row gap-1">
                                <Text className="text-sm">
                                    Sudah terdaftar dengan email?
                                </Text>
                                <TouchableOpacity onPress={handleLoginType}>
                                    <Text className="text-[##009C95] text-sm font-semibold">
                                        Masuk dengan{" "}
                                        {loginType === "phone"
                                            ? "email"
                                            : "no. handphone"}
                                    </Text>
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
                        <Text className="text-sm mb-4">
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
                            className="w-full h-14 bg-emerald-900 rounded-xl items-center justify-center"
                            onPress={handleSignIn}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white font-semibold text-[16px]">
                                    Sign In Now
                                </Text>
                            )}
                        </TouchableOpacity>

                        <Text className="text-center text-[14px] text-black opacity-20 my-4">
                            Or
                        </Text>

                        <TouchableOpacity
                            className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center"
                            onPress={handleSignUp}
                        >
                            <Text className="text-gray-700 font-semibold text-[16px]">
                                Sign Up Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
