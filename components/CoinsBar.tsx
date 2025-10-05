import {
  BUTTON_HEIGHT_SMALL,
  ICON_SIZE_MEDIUM,
  PADDING_LARGE,
  PADDING_MEDIUM,
} from "@/constants/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShopModal } from "./ShopModal";

interface CoinsBarProps {
  coins: number;
}

export const CoinsBar: React.FC<CoinsBarProps> = ({ coins }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const buttonColor = useThemeColor({}, "button");
  const [isShopVisible, setIsShopVisible] = useState(false);

  const handleShopPress = () => {
    setIsShopVisible(true);
  };

  const handleCloseShop = () => {
    setIsShopVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.coinSection}>
        <FontAwesome6 name="coins" size={ICON_SIZE_MEDIUM} color="#FFD700" />
        <Text style={[styles.coinText, { color: textColor }]}>{coins}</Text>
      </View>

      <TouchableOpacity
        style={[styles.plusButton, { backgroundColor: buttonColor }]}
        onPress={handleShopPress}
      >
        <Ionicons name="add" size={ICON_SIZE_MEDIUM} color="white" />
      </TouchableOpacity>

      <ShopModal visible={isShopVisible} onClose={handleCloseShop} />
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
