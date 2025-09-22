import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface LinkProps {
  path: string;
  params?: Record<string, string | number>;
  children: string | number;
}

export const Link = ({ path, params, children }: LinkProps) => {
  const handlePress = React.useCallback(() => {
    if (params) {
      router.push({ pathname: path as any, params });
    } else {
      router.push(path as any);
    }
  }, [path, params]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  button: {
    backgroundColor: "#8f7a66",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
  },
  text: {
    color: "#f9f6f2",
    fontSize: 20,
    fontWeight: "bold",
  },
});
