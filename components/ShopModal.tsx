import { ShopItem } from "@/components/ShopItem";
import shopItemsData from "@/constants/shopItems.json";
import {
  COINS_BAR_HEIGHT,
  MODAL_BORDER_RADIUS,
  PADDING_LARGE,
} from "@/constants/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const buttonColor = useThemeColor({}, "button");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.modalOverlay}>
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

          <View style={styles.content}>
            <Text style={[styles.subtitle, { color: textColor }]}>
              Coming soon! More items will be available here.
            </Text>

            <View style={styles.shopItems}>
              {shopItemsData.map((item) => (
                <ShopItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  disabled={!item.available}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    marginTop: COINS_BAR_HEIGHT,
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
    flex: 1,
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
  },
});
