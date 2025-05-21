import { View, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PropertyCard from "../../components/PropertyCard";
import properties from "../../db/kosan.json";

export default function Index() {
    const [search, setSearch] = useState("");
    const filteredProperties = properties.filter(
        item => item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    // Membagi data menjadi baris (2 kolom per baris)
    const rows = [];
    for (let i = 0; i < filteredProperties.length; i += 2) {
        rows.push(filteredProperties.slice(i, i + 2));
    }

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e] px-2 pt-4">
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
                {rows.map((row, idx) => (
                    <View key={idx} className="flex-row gap-2 mb-2">
                        {row.map(item => (
                            <View key={item.id} className="flex-1">
                                <PropertyCard property={item} />
                            </View>
                        ))}
                        {/* Jika item di baris ini kurang dari 2, tambahkan View kosong agar grid tetap rapi */}
                        {row.length < 2 && <View className="flex-1" />}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}