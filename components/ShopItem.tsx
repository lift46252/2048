import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
    <TouchableOpacity
      style={[
        styles.shopItem,
        { backgroundColor: textColor + "20" },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.itemTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.itemDescription, { color: textColor }]}>
        {description}
      </Text>
      <Text style={[styles.itemPrice, { color: textColor }]}>
        {price} coins
      </Text>
    </TouchableOpacity>
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
