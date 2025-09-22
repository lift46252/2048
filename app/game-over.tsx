import { Link } from "@/components/Link";
import { Space } from "@/components/Space";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function GameOver() {
  const { score, levelId } = useLocalSearchParams<{
    score: string;
    levelId: string;
  }>();
  const textColor = useThemeColor({}, "lightText");

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Game Over!</Text>
      <Text style={[styles.score, { color: textColor }]}>
        Your Score: {score || 0}
      </Text>

      <Link path={`/levels/${levelId || 1}`}>Retry</Link>

      <Space spacing={16} />

      <Link path="/">Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
