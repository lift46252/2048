import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

export const StarRating = ({ rating, maxStars = 3 }: StarRatingProps) => {
  const renderStars = () => {
    return Array.from({ length: maxStars }, (_, index) => (
      <Text
        key={index}
        style={[
          styles.star,
          {
            color: index < rating ? "#FFD700" : "#CCCCCC",
          },
        ]}
      >
        ★
      </Text>
    ));
  };

  return <View style={styles.starsContainer}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  star: {
    fontSize: 32,
  },
});
