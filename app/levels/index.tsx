import { LevelCard } from "@/components/LevelCard";
import { useLevels } from "@/hooks/useLevels";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LevelsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { levels, loading, hasMore, loadMore } = useLevels(6);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMore();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Select Level</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View style={styles.levelsGrid}>
          {levels.map((level) => (
            <LevelCard
              key={level.number}
              levelNumber={level.number}
              stars={level.stars}
              isLocked={level.isLocked}
            />
          ))}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={textColor} />
          </View>
        )}

        {!hasMore && levels.length > 0 && (
          <View style={styles.endContainer}>
            <Text style={[styles.endText, { color: textColor }]}>
              No more levels
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  levelsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "4%",
    paddingHorizontal: "5%",
    maxWidth: 800,
    alignSelf: "center",
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  endContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  endText: {
    fontSize: 16,
    opacity: 0.7,
  },
});
