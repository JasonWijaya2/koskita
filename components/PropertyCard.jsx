import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const PropertyCard = ({ property }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <View className="flex-1 bg-white dark:bg-[#25292e] rounded-2xl shadow-md m-2 p-0 overflow-hidden">
            {/* Gambar & badge */}
            <View className="relative">
                <Image
                    source={{ uri: property.image }}
                    style={{ width: '100%', height: 120 }}
                    className="rounded-t-2xl"
                    resizeMode="cover"
                />
                {/* Logo pojok kiri atas */}
                <View className="absolute top-2 left-2 bg-white/80 px-2 py-0.5 rounded">
                    <Text className="text-xs font-bold text-gray-700">Koskita</Text>
                </View>
                {/* Icon love pojok kanan atas */}
                <TouchableOpacity className="absolute top-2 right-2 bg-white/80 p-1 rounded-full">
                    <Ionicons name="heart-outline" size={18} color="#666" />
                </TouchableOpacity>
                {/* Badge 360 & sisa kamar */}
                <View className="absolute bottom-2 left-2 flex-row items-center space-x-1">
                    <View className="bg-black/60 px-2 py-0.5 rounded flex-row items-center">
                        <Ionicons name="camera" size={12} color="#fff" />
                        <Text className="text-xs text-white ml-1">360</Text>
                    </View>
                </View>
                <View className="absolute bottom-2 right-2 bg-yellow-400 px-2 py-0.5 rounded">
                    <Text className="text-xs font-semibold text-gray-800">Sisa {property.stock_kamar} kamar</Text>
                </View>
            </View>
            {/* Konten */}
            <View className="p-3">
                <Text className="text-xs text-gray-500 mb-1">Coliving</Text>
                <Text className="text-base font-bold text-gray-900 dark:text-white" numberOfLines={2}>
                    {property.name}
                </Text>

                {/* Lokasi */}
                <View className="flex-row items-center mb-1">
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text className="text-xs text-gray-600">{property.address}</Text>
                </View>
                {/* Harga coret */}
                <View className="flex-row items-center">
                    <Text className="text-xs text-gray-400 line-through mr-1">{formatCurrency(property.price * 107 / 100)}</Text>
                </View>
                {/* Harga promo */}
                <View className="flex-row items-center mb-1">
                    <View className="bg-red-100 px-1 rounded mr-1">
                        <Text className="text-xs text-red-600 font-bold">-7%</Text>
                    </View>
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
        </View>
    );
};

export default PropertyCard;