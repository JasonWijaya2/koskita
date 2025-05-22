import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import api from "../../lib/api";
import { useRouter } from "expo-router";
import formatCurrency from "../../helpers/helpers";

export default function MyKos() {
    const [tab, setTab] = useState("aktif");
    const [rent, setRent] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getRent = async () => {
            try {
                const response = await api.get("/api/rent/self");
                setRent(response.data.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        getRent();
    }, []);

    const handleGoToExplore = () => {
        router.push("/");
    };

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e]">
            {/* Header */}
            <View className="bg-[#F6F1E7] rounded-br-[48px] px-6">
                <View className="flex-row justify-between items-center py-8">
                    <Text className="text-[22px] font-bold text-[#009C95]">
                        My Kos
                    </Text>
                </View>
                <View className="flex flex-row pt-2">
                    <TouchableOpacity
                        className={`flex-1 items-center pb-5 pt-3 ${tab === "aktif" ? "border-b-2 border-[#222]" : ""
                            }`}
                        onPress={() => setTab("aktif")}
                    >
                        <Text
                            className={`font-semibold text-base ${tab === "aktif"
                                ? "text-[#222]"
                                : "text-gray-400"
                                }`}
                        >
                            Kos Sekarang
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`flex-1 items-center pb-5 pt-3 ${tab === "riwayat"
                            ? "border-b-2 border-[#222] rounded-br-[28px]"
                            : ""
                            }`}
                        onPress={() => setTab("riwayat")}
                    >
                        <Text
                            className={`font-semibold text-base ${tab === "riwayat"
                                ? "text-[#222]"
                                : "text-gray-400"
                                }`}
                        >
                            Riwayat Kos
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className="flex-1 px-6 py-6">
                {rent.length === 0 && !loading ? (
                    <View>
                        {/* Belum punya hunian */}
                        <View className="my-6">
                            <Text className="text-2xl text-gray-900 font-bold mb-8 dark:text-gray-200">
                                Kamu belum memiliki Hunian
                            </Text>
                            <TouchableOpacity
                                onPress={handleGoToExplore}
                                className="bg-[#222222] rounded-lg py-5 px-6 items-center"
                            >
                                <Text className="text-white font-semibold">
                                    Cari Hunian Sekarang
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Rekomendasi Kos */}
                        <Text className="text-lg font-semibold text-[#222] mt-10 mb-3 dark:text-white">
                            Kost Coliving yang mungkin kamu suka
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {rows.map((row, idx) => (
                                <View key={idx} className="flex-row gap-2 mb-2">
                                    {row.map((item) => (
                                        <View key={item.id} className="flex-1">
                                            <PropertyCard
                                                property={item}
                                                onPress={() =>
                                                    router.push(`/detail/${item.id}`)
                                                }
                                            />
                                        </View>
                                    ))}
                                    {row.length < 2 && <View className="flex-1" />}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <View className="flex px-3 pt-4">
                        <View className="flex gap-1 justify-start items-top px-3 py-5">
                            {loading ? (
                                <View className="w-48 h-4 rounded bg-gray-200 mt-2" />
                            ) : (
                                <Text className="text-lg text-gray-600 dark:text-gray-300">
                                    Kos kamu sekarang
                                </Text>
                            )}
                        </View>

                        {loading ? (
                            <View className="flex px-3 pt-5 pb-3">
                                <View className="w-48 h-6 rounded bg-gray-200" />
                            </View>
                        ) : (
                            <>
                                <View className="flex flex-row gap-2 items-center px-3 pt-5 pb-3">
                                    <Ionicons
                                        name="home"
                                        color="#009C95"
                                        size={16}
                                    />
                                    <Text className="font-bold text-sm text-[#009C95]">
                                        Coliving
                                    </Text>
                                </View>
                                {/* List kos yang sudah di-booking */}
                                {rent.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        className="bg-white rounded-xl shadow-md mb-4 overflow-hidden"
                                        style={{ width: "100%" }}
                                        onPress={() => router.push(`/detail/${item.kosanId || item.id}`)}
                                    >
                                        {/* Gambar */}
                                        <Image
                                            source={{ uri: item.kosan?.image || item.image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" }}
                                            style={{ width: "100%", height: 120 }}
                                            resizeMode="cover"
                                        />
                                        {/* Badge */}
                                        <View className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded flex-row items-center">
                                            <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                                            <Text className="text-xs font-semibold text-green-700">Tersedia</Text>
                                        </View>
                                        {/* Konten bawah */}
                                        <View className="p-3">
                                            <Text className="font-bold text-base text-gray-900">
                                                {item.kosan?.name || item.name}
                                            </Text>
                                            <View className="flex-row items-center mb-2">
                                                <Text className="text-xl font-bold text-red-600">{formatCurrency(item.kosan?.price)}</Text>
                                                <Text className="text-sm text-gray-600 ml-1">/bulan</Text>
                                            </View>
                                            <View className="flex-row items-center mb-2">
                                                <Text className="text-sm text-gray-700 mr-2">
                                                    Masuk: {item.startDate ? new Date(item.startDate).toLocaleDateString() : "-"}
                                                </Text>
                                                <Text className="text-sm text-gray-700">
                                                    Keluar: {item.endDate ? new Date(item.endDate).toLocaleDateString() : "-"}
                                                </Text>
                                            </View>
                                            <View className="flex-row gap-2">
                                                <View className="bg-gray-100 px-2 py-1 rounded">
                                                    <Text className="text-sm text-gray-700">
                                                        Kamar {item.noKamar || "K1"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}
                    </View>
                )}

            </ScrollView>
        </View>
    );
}
