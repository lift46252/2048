import {
  BUTTON_HEIGHT_SMALL,
  ICON_SIZE_MEDIUM,
  PADDING_LARGE,
  PADDING_MEDIUM,
} from "@/constants/ui";
import { useLives } from "@/contexts/lives/hooks";
import { useShop } from "@/contexts/shop/Context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LivesDisplay } from "./LivesDisplay";

interface StatusBarProps {
  coins: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ coins }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const buttonColor = useThemeColor({}, "button");
  const { openShop } = useShop();
  const { infiniteUntil } = useLives();

  const handleShopPress = (tab: "coins" | "lives") => {
    console.log("handleShopPress", tab);

    openShop(tab);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.group}>
        <LivesDisplay infiniteUntil={infiniteUntil} />
        <TouchableOpacity
          style={[styles.plusButton, { backgroundColor: buttonColor }]}
          onPress={() => handleShopPress("lives")}
        >
          <Ionicons name="add" size={ICON_SIZE_MEDIUM} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.group}>
        <View style={styles.coinSection}>
          <FontAwesome6 name="coins" size={ICON_SIZE_MEDIUM} color="#FFD700" />
          <Text style={[styles.coinText, { color: textColor }]}>{coins}</Text>
        </View>
        <TouchableOpacity
          style={[styles.plusButton, { backgroundColor: buttonColor }]}
          onPress={() => handleShopPress("coins")}
        >
          <Ionicons name="add" size={ICON_SIZE_MEDIUM} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_MEDIUM,
    paddingVertical: PADDING_LARGE,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    zIndex: 9999,
    elevation: 9999,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  coinSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plusButton: {
    width: BUTTON_HEIGHT_SMALL,
    height: BUTTON_HEIGHT_SMALL,
    borderRadius: BUTTON_HEIGHT_SMALL / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
