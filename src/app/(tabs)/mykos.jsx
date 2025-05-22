import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import api from "../../lib/api";
import PropertyCard from "../../../components/PropertyCard";
import { useRouter } from "expo-router";

export default function MyKos() {
    const [tab, setTab] = useState("aktif");
    const [listKos, setListKos] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getKos = async () => {
            try {
                const response = await api.get("/api/kos");
                setListKos(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getKos();
    }, []);

    // Membagi data menjadi baris (2 kolom per baris)
    const rows = [];
    for (let i = 0; i < listKos.length; i += 2) {
        rows.push(listKos.slice(i, i + 2));
    }

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
            </ScrollView>
        </View>
    );
}
