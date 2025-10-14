import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShopTab {
  id: string;
  label: string;
  color: string;
}

interface ShopTabsProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const tabs: ShopTab[] = [
  {
    id: "upgrades",
    label: "UPGRADES",
    color: "#FF6B35", // Orange-red
  },
  {
    id: "coins",
    label: "COINS",
    color: "#FFA500", // Yellow-orange
  },
  {
    id: "lives",
    label: "LIVES",
    color: "#9370DB", // Purple
  },
];

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            { backgroundColor: tab.color },
            activeTab === tab.id && styles.tabActive,
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={styles.tabText}>{tab.label}</Text>
          {activeTab === tab.id && (
            <Text style={styles.tabChevron}>▼</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabActive: {
    shadowOpacity: 0.4,
    elevation: 6,
  },
  tabText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  tabChevron: {
    color: "white",
    fontSize: 10,
    marginTop: 2,
  },
});
