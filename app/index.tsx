import { Link } from "@/components/Link";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StartScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const scoreValueColor = useThemeColor({}, "lightText");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: scoreValueColor }]}>2048</Text>
        <Text style={[styles.subtitle, { color: scoreValueColor }]}>
          Join the numbers and get to the 2048 tile!
        </Text>
      </View>

      <Link
        path="/level"
        params={{
          moves: 20,
          missions: JSON.stringify([
            {
              type: "reach_tile" as const,
              title: "Reach 2048",
              goal: 2048,
            },
            {
              type: "score_target" as const,
              title: "Score 1000+",
              goal: 1000,
            },
          ]),
        }}
      >
        New Level
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    maxWidth: 300,
  },
  buttonContainer: {
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
  buttonText: {
    color: "#f9f6f2",
    fontSize: 20,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#8f7a66",
  },
  secondaryButtonText: {
    color: "#8f7a66",
  },
  footer: {
    marginTop: 20,
  },
});
