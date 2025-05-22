import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import api from "../../lib/api";
import PropertyCard from "../../../components/PropertyCard";

const dummyKos = [
    {
        id: 1,
        name: "Kost Coliving Tebet",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        label: "Coliving",
        flash: true,
    },
    {
        id: 2,
        name: "Kost Coliving Kuningan",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        label: "Coliving",
        flash: true,
    },
];

export default function MyKos() {
    const [tab, setTab] = useState("aktif");
    const [listKos, setListKos] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e]">
            {/* Header */}
            <View className="bg-[#F6F1E7] rounded-b-[32px]">
                {/* Header Title + Icon */}
                <View className="flex-row justify-between items-center px-6 pt-6 pb-4">
                    <Text className="text-[22px] font-bold text-[#222]">My Kos</Text>
                    <Ionicons name="notifications-outline" size={24} color="#222" />
                </View>

                {/* Tabs */}
                <View className="flex-row">
                    <TouchableOpacity
                        className="flex-1 items-center pb-3 pt-2"
                        onPress={() => setTab("aktif")}
                    >
                        <Text
                            className={`font-semibold text-base ${tab === "aktif" ? "text-[#F4B948]" : "text-gray-400"
                                }`}
                        >
                            Kos Sekarang
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 items-center pb-3 pt-2"
                        onPress={() => setTab("riwayat")}
                    >
                        <Text
                            className={`font-semibold text-base ${tab === "riwayat" ? "text-[#F4B948]" : "text-gray-400"
                                }`}
                        >
                            Riwayat Kos
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>

                {/* Belum punya hunian */}
                <View className="mb-6">
                    <Text className="text-base text-gray-700 dark:text-gray-200 mb-3">
                        Kamu belum memiliki Hunian
                    </Text>
                    <TouchableOpacity className="bg-green-700 rounded-lg py-3 px-6 items-center">
                        <Text className="text-white font-semibold">Cari Hunian Sekarang</Text>
                    </TouchableOpacity>
                </View>

                {/* Rekomendasi Kos */}
                <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
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