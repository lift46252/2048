import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ShopItemProps {
  title: string;
  description: string;
  price: number;
  onPress?: () => void;
  disabled?: boolean;
}

export const ShopItem: React.FC<ShopItemProps> = ({
  title,
  description,
  price,
  onPress,
  disabled = false,
}) => {
  const textColor = useThemeColor({}, "lightText");

  return (
    <View
      style={[
        styles.shopItem,
        { backgroundColor: textColor + "20" },
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.itemTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.itemDescription, { color: textColor }]}>
        {description}
      </Text>
      <Text style={[styles.itemPrice, { color: textColor }]}>
        {price} coins
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shopItem: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
});
