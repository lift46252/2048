import { ICON_SIZE_MEDIUM } from "@/constants/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShopItemProps {
  id: string;
  title?: string;
  description?: string;
  price: number;
  quantity?: number | string;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const ShopItem: React.FC<ShopItemProps> = ({
  id,
  title,
  description,
  price,
  quantity,
  icon,
  iconColor,
  onPress,
  disabled = false,
}) => {
  const textColor = useThemeColor({}, "lightText");

  const renderIcon = () => {
    if (!icon) return <Ionicons name="game-controller" size={ICON_SIZE_MEDIUM} color="#666" />;
    
    switch (icon) {
      case "coins":
        return <FontAwesome6 name="coins" size={ICON_SIZE_MEDIUM} color={iconColor || "#FFD700"} />;
      case "heart":
        return <Ionicons name="heart" size={ICON_SIZE_MEDIUM} color={iconColor || "#FF6B6B"} />;
      case "infinite":
        return <Ionicons name="infinite" size={ICON_SIZE_MEDIUM} color={iconColor || "#9370DB"} />;
      default:
        return <Ionicons name="game-controller" size={ICON_SIZE_MEDIUM} color="#666" />;
    }
  };

  return (
    <View style={styles.itemRow}>
      <View style={styles.itemImage}>
        {renderIcon()}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemQuantity}>
          {quantity || title || ""}
        </Text>
        {description && (
          <Text style={styles.itemDescription}>{description}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={[styles.buyButton, disabled && styles.buyButtonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buyButtonText}>BUY</Text>
        <Text style={styles.buyButtonPrice}>{price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemQuantity: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  itemDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buyButtonDisabled: {
    backgroundColor: "#CCCCCC",
    shadowOpacity: 0.1,
    elevation: 1,
  },
  buyButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  buyButtonPrice: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
