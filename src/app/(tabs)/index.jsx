import { View, TextInput, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import PropertyCard from "../../../components/PropertyCard";
import Icon from "../../../assets/icon.png";
import { getAccessToken } from "../../lib/auth";
import api from "../../lib/api";

export default function Index() {
    const [search, setSearch] = useState("");
    const [listKos, setListKos] = useState([]);
    const filteredProperties = listKos.filter(
        (item) =>
            item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

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

    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessToken();
            console.log("Token:", token);
        };

        getToken();
    }, []);

    // Membagi data menjadi baris (2 kolom per baris)
    const rows = [];
    for (let i = 0; i < filteredProperties.length; i += 2) {
        rows.push(filteredProperties.slice(i, i + 2));
    }

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e] px-2 pt-4">
            <View className="flex-row items-center justify-between px-3 mb-4">
                <View className="flex-row gap-4">
                    <Image
                        source={Icon}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View className="flex-col">
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">
                            Halo, Teman Koskita!
                        </Text>
                        <Text className="text-sm text-gray-600 dark:text-gray-300">
                            Temukan kos idamanmu di sini
                        </Text>
                    </View>
                </View>
            </View>
            {/* Search Bar */}
            <View className="flex-row items-center bg-gray-100 dark:bg-[#1e293b] rounded-full px-3 py-2 mb-4">
                <Ionicons name="search" size={20} color="#64748b" />
                <TextInput
                    className="flex-1 ml-2 text-base text-gray-800 dark:text-white h-10"
                    placeholder="Cari kos favoritmu..."
                    placeholderTextColor="#94a3b8"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}
            >
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
            <TouchableOpacity
                className="absolute bottom-4 right-4"
                onPress={() => {
                    Linking.openURL(
                        `https://wa.me/6282338303655`
                    );
                }}
            >
                <View className="w-16 h-16 bg-[#22c55e] rounded-full items-center justify-center">
                    <FontAwesome name="whatsapp" size={30} color="#fff" />
                </View>

            </TouchableOpacity>
        </View>
    );
}
