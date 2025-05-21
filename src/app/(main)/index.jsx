import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-3">
      {/* Main Page */}
      <Text className="text-2xl font-bold justify-center">Dashboard</Text>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <View className="bg-red-600">
          <Text className="text-2xl font-bold justify-center">Go To Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
