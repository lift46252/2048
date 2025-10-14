import { Popup } from "@/components/Popup";
import { ShopItem } from "@/components/ShopItem";
import { ShopTabs } from "@/components/ShopTabs";
import shopItemsData from "@/constants/shopItems.json";
import { useCoins } from "@/contexts/coins/hooks";
import { useLives } from "@/contexts/lives/hooks";
import { useShop } from "@/contexts/shop/Context";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ visible, onClose }) => {
  const { activeTab, openShop } = useShop();
  const { activateInfiniteLives, addLife } = useLives();
  const { coins, spendCoins } = useCoins();

  const handlePurchase = (item: any) => {
    if (coins >= item.price) {
      spendCoins(item.price);

      if (item.id === "infinite-lives-10min") {
        activateInfiniteLives(10);
      } else if (item.id === "life-pack-small") {
        addLife();
      } else if (item.id === "life-pack-big") {
        // Add 5 lives by calling addLife 5 times
        for (let i = 0; i < 5; i++) {
          addLife();
        }
      }

      // Close shop after purchase
      onClose();
    }
  };

  const coinPackages = [
    { id: "coins-300", quantity: 300, price: 20, icon: "coins", iconColor: "#FFD700" },
    { id: "coins-800", quantity: 800, price: 50, icon: "coins", iconColor: "#FFD700" },
    { id: "coins-2000", quantity: 2000, price: 100, icon: "coins", iconColor: "#FFD700" },
    { id: "coins-5000", quantity: 5000, price: 150, icon: "coins", iconColor: "#FFD700" },
  ];

  const lifePackages = [
    { id: "life-pack-small", quantity: 1, price: 30, icon: "heart", iconColor: "#FF6B6B" },
    { id: "life-pack-big", quantity: 5, price: 120, icon: "heart", iconColor: "#FF6B6B" },
    { id: "infinite-lives-10min", quantity: "∞", price: 200, icon: "infinite", iconColor: "#9370DB" },
  ];

  const getCurrentItems = () => {
    switch (activeTab) {
      case "upgrades":
        return shopItemsData.filter((i) => i.category === "coins");
      case "coins":
        return coinPackages;
      case "lives":
        return lifePackages;
      default:
        return [];
    }
  };

  const currentItems = getCurrentItems();

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      position="center"
      animationType="fade"
    >
      <View style={styles.container}>
        {/* Decorative top border */}
        <View style={styles.decorativeBorder} />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SHOP</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

          {/* Tab Navigation */}
          <ShopTabs activeTab={activeTab} onTabPress={(tabId) => openShop(tabId as any)} />

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {currentItems.map((item) => (
              <ShopItem
                key={item.id}
                id={item.id}
                title={"title" in item ? item.title : undefined}
                description={"description" in item ? item.description : undefined}
                price={item.price}
                quantity={"quantity" in item ? item.quantity : undefined}
                icon={"icon" in item ? item.icon : undefined}
                iconColor={"iconColor" in item ? item.iconColor : undefined}
                onPress={() => handlePurchase(item)}
                disabled={coins < item.price}
              />
            ))}
          </ScrollView>

        {/* Restore Button */}
        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>RESTORE</Text>
        </TouchableOpacity>
      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5DC", // Beige background
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignSelf: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  decorativeBorder: {
    height: 20,
    backgroundColor: "#FF6B35", // Orange-red border
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 0,
    marginBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 15,
    position: "relative",
    marginTop: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF6B35", // Orange color
    textAlign: "center",
    flex: 1,
    textShadowColor: "#FF4500",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#8B0000", // Dark red
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    flex: 1,
    maxHeight: 400, // Limit height to prevent overflow
  },
  restoreButton: {
    backgroundColor: "#FF6B35",
    margin: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  restoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
