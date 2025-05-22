import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { removeAccessToken } from "../../lib/auth";
import * as Linking from "expo-linking";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const response = await api.get("/api/user/profile");
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setLoading(false);
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        await removeAccessToken();
        router.replace("/auth/login");
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#F6F1E7] pb-8 rounded-br-[64px] px-6">
                <View className="flex-row justify-between items-center py-8">
                    <Text className="text-[22px] font-bold text-[#009C95]">
                        Profile
                    </Text>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color="#F4B948"
                    />
                </View>
                <View className="flex flex-row gap-4 justify-start items-top py-2">
                    <View className="w-20 h-20 rounded-full bg-[#E0E0E0] justify-center items-center">
                        <Feather name="user" size={48} color="#BDBDBD" />
                    </View>
                    <View className="flex gap-1">
                        {/* Skeleton for name */}
                        {loading ? (
                            <View className="w-32 h-6 rounded bg-gray-200" />
                        ) : (
                            <Text className="text-[20px] font-bold mt-3 text-gray-900]">
                                {user?.name || "Kevin Via"}
                            </Text>
                        )}
                        {/* Skeleton for email & phone */}
                        {loading ? (
                            <View className="w-48 h-4 rounded bg-gray-200 mt-2" />
                        ) : (
                            <Text className="text-gray-500 mt-2">
                                {user?.email} | {user?.phonenumber}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
            {/* Layanan Lainnya */}
            <View className="mt-8 px-6">
                <Text className="font-bold text-[16px] mb-4 text-[#222]">
                    Layanan lainnya
                </Text>
                <TouchableOpacity className="flex-row items-center py-3">
                    <MaterialIcons name="assignment" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Daftarkan properti saya
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="gift" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Ajak teman, dapat reward!
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Pengaturan */}
            <View className="mt-8 px-6">
                <Text className="font-bold text-[16px] mb-4 text-[#222]">
                    Pengaturan
                </Text>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="user" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Ubah profil
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="file-text" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Data pribadi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="lock" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Ubah kata sandi
                    </Text>
                </TouchableOpacity>
            </View>
            {/* FAQ, Kebijakan Privasi, Syarat & Ketentuan, Hubungi Rukita */}
            <View className="mt-8 px-6">
                <Text className="font-bold text-[16px] mb-4 text-[#222]">
                    Bantuan
                </Text>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="help-circle" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="file-text" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Kebijakan Privasi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center py-3">
                    <Feather name="file-text" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Syarat & Ketentuan
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row items-center py-3"
                    onPress={() => {
                        Linking.openURL(`https://wa.me/6282338303655`);
                    }}
                >
                    <Feather name="phone" size={22} color="#222" />
                    <Text className="ml-4 text-[15px] text-[#222]">
                        Hubungi Rukita
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="mt-8 mb-8 px-6">
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-red-500 py-3 rounded-xl"
                    onPress={handleLogout}
                >
                    <Feather name="log-out" size={20} color="#fff" />
                    <Text className="ml-2 text-white font-bold text-[16px]">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
