import { Link } from "@/components/Link";
import { Space } from "@/components/Space";
import { useCoins } from "@/contexts/coins/hooks";
import { calculateCoinsFromScore } from "@/contexts/coins/utils";
import { useLives } from "@/contexts/lives/hooks";
import { canPlay } from "@/contexts/lives/utils";
import { useShop } from "@/contexts/shop/Context";
import { useToast } from "@/contexts/toast/Context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GameOver() {
  const { score, levelId } = useLocalSearchParams<{
    score: string;
    levelId: string;
  }>();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const scoreValue = parseInt(score || "0", 10);
  const { addCoins } = useCoins();
  const { spendLife, currentLives, infiniteUntil } = useLives();
  const { openShop } = useShop();
  const { showToast } = useToast();
  const coinsEarned = calculateCoinsFromScore(scoreValue);

  useEffect(() => {
    if (coinsEarned > 0) {
      addCoins(coinsEarned);
    }
  }, [coinsEarned, addCoins]);

  useEffect(() => {
    spendLife();
  }, [spendLife]);

  const handleRetry = () => {
    if (!canPlay(currentLives, infiniteUntil)) {
      showToast("You don't have enough lives.", "error");
      openShop("lives"); // Open shop to lives tab
      return;
    }
    router.push(`/levels/${levelId || 1}`);
  };

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

      <Pressable style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </Pressable>

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
  retryButton: {
    backgroundColor: "#8f7a66",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
  },
  retryButtonText: {
    color: "#f9f6f2",
    fontSize: 20,
    fontWeight: "bold",
  },
});
