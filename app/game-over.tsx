import { Link } from "@/components/Link";
import { Space } from "@/components/Space";
import { useCoins } from "@/contexts/coins/hooks";
import { calculateCoinsFromScore } from "@/contexts/coins/utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GameOver() {
  const { score, levelId } = useLocalSearchParams<{
    score: string;
    levelId: string;
  }>();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const scoreValue = parseInt(score || "0", 10);
  const { addCoins } = useCoins();
  const coinsEarned = calculateCoinsFromScore(scoreValue);

  useEffect(() => {
    if (coinsEarned > 0) {
      addCoins(coinsEarned);
    }
  }, [coinsEarned, addCoins]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Game Over!</Text>
      <Text style={[styles.score, { color: textColor }]}>
        Your Score: {score || 0}
      </Text>

      {coinsEarned > 0 && (
        <Text style={[styles.coinsEarned, { color: textColor }]}>
          +{coinsEarned} coins earned!
        </Text>
      )}

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
    marginBottom: 20,
  },
  coinsEarned: {
    fontSize: 18,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#FFD700",
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
