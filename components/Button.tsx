import React from "react";
import { Link } from "expo-router";
import { Href } from "expo-router/build/types";
import { StyleSheet, View, Text, Pressable } from "react-native";

export interface Props {
  href: Href;
  children: string | number;
}

export const Button = ({ href, children }: Props) => {
  return (
    <View style={styles.container}>
      <Link href={href} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </Pressable>
      </Link>
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
