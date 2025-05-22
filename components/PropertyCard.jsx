import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import formatCurrency from '../src/helpers/helpers';
import Icon from "../assets/icon.png"

const PropertyCard = ({ property, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-1 bg-white dark:bg-[#25292e] rounded-2xl shadow-md m-2 p-0 overflow-hidden">
            {/* Gambar & badge */}
            <View className="relative">
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" }}
                    style={{ width: '100%', height: 120 }}
                    className="rounded-t-2xl"
                    resizeMode="cover"
                />
                {/* Logo pojok kiri atas */}
                <View className="absolute top-2 left-2 bg-white/80 px-2 py-0.5 rounded">
                    <View className="flex-row justify-center items-center gap-1">
                        <Image
                            source={Icon}
                            style={{ width: 10, height: 10, borderRadius: 20 }}
                        />
                        <Text className="text-xs font-bold text-gray-700">Koskita</Text>
                    </View>
                </View>
                {/* Icon love pojok kanan atas */}
                <TouchableOpacity className="absolute top-2 right-2 bg-white/80 p-1 rounded-full">
                    <Ionicons name="heart-outline" size={18} color="#666" />
                </TouchableOpacity>
                {/* Badge 360 & sisa kamar */}
                <View className="absolute bottom-2 right-2 bg-yellow-400 px-2 py-0.5 rounded">
                    <Text className="text-xs font-semibold text-gray-800">Sisa {property.availableRooms} kamar</Text>
                </View>
            </View>
            {/* Konten */}
            <View className="p-3">
                <Text className="text-base font-bold text-gray-900 dark:text-white" numberOfLines={2}>
                    {property.name}
                </Text>

                {/* Lokasi */}
                <View className="flex-row items-center gap-1 mb-1">
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text numberOfLines={1} className="text-xs text-gray-600">{property.address}</Text>
                </View>
                {/* Harga promo */}
                <View className="flex-row items-center mb-1">
                    <Text className="text-lg font-bold text-red-600">{formatCurrency(property.price)}</Text>
                    <Text className="text-xs text-gray-600 ml-1">/bulan</Text>
                </View>
                {/* Badge bawah */}
                {/* <View className="flex-col space-x-2 mt-1 gap-2">
                    <View className="bg-blue-100 px-2 py-0.5 rounded">
                        <Text className="text-xs text-blue-700">Diskon sewa 12 Bulan</Text>
                    </View>
                    <View className="bg-green-100 px-2 py-0.5 rounded flex-row items-center">
                        <FontAwesome name="ticket" size={12} color="#15803d" />
                        <Text className="text-xs text-green-700 ml-1">4 Voucher s.d. 21%</Text>
                    </View>
                </View> */}
            </View>
        </TouchableOpacity>
    );
};

export default PropertyCard;