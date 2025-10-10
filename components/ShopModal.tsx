import { Popup } from "@/components/Popup";
import { ShopItem } from "@/components/ShopItem";
import shopItemsData from "@/constants/shopItems.json";
import {
  COINS_BAR_HEIGHT,
  MODAL_BORDER_RADIUS,
  PADDING_LARGE,
} from "@/constants/ui";
import { useCoins } from "@/contexts/coins/hooks";
import { useLives } from "@/contexts/lives/hooks";
import { useShop } from "@/contexts/shop/Context";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const buttonColor = useThemeColor({}, "button");
  const { activeTab, openShop } = useShop();
  const { activateInfiniteLives } = useLives();
  const { coins, spendCoins } = useCoins();

  const handlePurchase = (item: any) => {
    if (coins >= item.price) {
      spendCoins(item.price);

      if (item.id === "infinite-lives-10min") {
        activateInfiniteLives(10);
      }

      // Close shop after purchase
      onClose();
    }
  };

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      position="bottom"
      animationType="slide"
    >
      <View style={styles.topArea} accessibilityRole="none" />
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>Shop</Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: buttonColor }]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => openShop("coins")}>
            <Text
              style={[
                styles.tab,
                activeTab === "coins" ? styles.tabActive : undefined,
                { color: textColor },
              ]}
            >
              Coins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openShop("lives")}>
            <Text
              style={[
                styles.tab,
                activeTab === "lives" ? styles.tabActive : undefined,
                { color: textColor },
              ]}
            >
              Lives
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={[styles.subtitle, { color: textColor }]}>
            Coming soon! More items will be available here.
          </Text>

          <View style={styles.shopItems}>
            {shopItemsData
              .filter((i) => i.category === activeTab)
              .map((item) => (
                <ShopItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  disabled={!item.available || coins < item.price}
                  onPress={() => handlePurchase(item)}
                />
              ))}
          </View>
        </View>
      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  topArea: {
    height: COINS_BAR_HEIGHT,
    backgroundColor: "transparent",
  },
  container: {
    height: "80%",
    borderTopLeftRadius: MODAL_BORDER_RADIUS,
    borderTopRightRadius: MODAL_BORDER_RADIUS,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_LARGE,
    paddingTop: PADDING_LARGE,
    paddingBottom: PADDING_LARGE,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: PADDING_LARGE,
    paddingTop: 8,
  },
  tab: {
    fontSize: 16,
    opacity: 0.7,
  },
  tabActive: {
    opacity: 1,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    height: "100%",
    padding: PADDING_LARGE,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    opacity: 0.7,
  },
  shopItems: {
    width: "100%",
    gap: 16,
    flex: 1,
    justifyContent: "flex-start",
  },
});
