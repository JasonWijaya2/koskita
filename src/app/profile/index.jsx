import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Profile() {
  const route = useRouter();

  return (
    <View className="flex-1 bg-white px-3">
      {/* Main Page */}
      <Text className="text-2xl font-bold justify-center">Profile</Text>
    </View>
  )
}
