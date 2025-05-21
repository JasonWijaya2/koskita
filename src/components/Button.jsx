import { View, Pressable, Text, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress = () => {} }) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const iconColor = isDark ? "#25292e" : "#fff";

    if (theme === "primary") {
        return (
            <View className="w-[320px] h-[68px] mx-[20px] items-center justify-center p-2 border-2 border-[#ffd33d] rounded-[18px]">
                <Pressable
                    className="w-full h-full flex flex-row items-center justify-center rounded-[10px] bg-[#25292e] dark:bg-white"
                    onPress={onPress}
                >
                    <FontAwesome
                        name="picture-o"
                        size={18}
                        color={iconColor}
                        className="pr-[8px]"
                    ></FontAwesome>
                    <Text className="text-white dark:text-[#25292e]">
                        {label}
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View className="w-[320px] h-[68px] mx-[20px] items-center justify-center p-3">
            <Pressable
                className="w-full h-full flex items-center justify-center rounded-[10px]"
                onPress={() => alert("You pressed a button.")}
            >
                <Text className="text-base dark:text-white"> {label} </Text>
            </Pressable>
        </View>
    );
}
