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
import { AntDesign } from "@expo/vector-icons";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+62");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        if (password.length < 8 || password.length > 12) {
            setError("Password must be 8-12 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password,
            });
            await setAccessToken(response.data.accessToken);
            router.replace("/(main)");
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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 50}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View className="flex-1 items-left justify-between w-full px-7">
                    <View className="flex">
                        <Text className="text-4xl font-bold text-gray-900 mt-[67px] font-circular-bold w-64">
                            Masukkan no. HP Kamu
                        </Text>

                        <View className="space-y-4 my-8">
                            <View className="flex flex-row justify-between items-center mb-4">
                                <TouchableOpacity
                                    onPress={{}}
                                    className="flex flex-row w-fit h-14 gap-1 items-center justify-center px-4 bg-gray-50 bg-opacity-10 rounded-xl mr-2 border-solid border-2 border-gray-200"
                                >
                                    <Text className="">{countryCode}</Text>
                                    <AntDesign
                                        name="down"
                                        size={16}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>

                                <TextInput
                                    className="flex-1 h-14 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900 border-solid border-2 border-gray-200"
                                    placeholder="e.g. 81234567890"
                                    placeholderTextColor="#9ca3af"
                                    value={phone}
                                    onChangeText={setPhone}
                                    autoCapitalize="none"
                                    editable={!loading}
                                    keyboardType="number-pad"
                                    maxLength={15}
                                />
                            </View>
                            <View className="flex flex-row gap-1">
                                <Text className="text-sm">
                                    Sudah terdaftar dengan email?
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push("/auth/register")
                                    }
                                >
                                    <Text className="text-[##009C95] text-sm font-semibold">
                                        Masuk dengan email
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

                    <View className="flex gap-6 my-8">
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
                            className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center"
                            onPress={handleSignUp}
                        >
                            <Text className="text-gray-700 font-semibold text-[16px]">
                                Lanjut
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
