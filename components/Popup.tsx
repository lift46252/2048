import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "bottom" | "top" | "center";
  animationType?: "slide" | "fade" | "scale";
}

const { height } = Dimensions.get("window");

export const Popup: React.FC<PopupProps> = ({
  visible,
  onClose,
  children,
  position = "bottom",
  animationType = "slide",
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      // Reset animations
      slideAnim.setValue(0);
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (shouldRender) {
      // Start close animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, shouldRender]);

  const getSlideTransform = () => {
    if (position === "bottom") {
      return {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      };
    } else if (position === "top") {
      return {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-height, 0],
        }),
      };
    } else if (position === "center") {
      return {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      };
    }
    return undefined;
  };

  const getScaleTransform = () => {
    if (animationType === "scale") {
      return {
        scale: scaleAnim,
      };
    }
    return undefined;
  };

  if (!shouldRender) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.popup,
          position === "bottom" && styles.popupBottom,
          position === "top" && styles.popupTop,
          position === "center" && styles.popupCenter,
          {
            opacity: fadeAnim,
            transform: [getSlideTransform(), getScaleTransform()].filter(
              (transform): transform is NonNullable<typeof transform> =>
                transform !== undefined,
            ),
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  backdropPressable: {
    flex: 1,
  },
  popup: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1002,
    elevation: 1002,
  },
  popupBottom: {
    bottom: 0,
  },
  popupTop: {
    top: 0,
  },
  popupCenter: {
    top: "50%",
    marginTop: -200, // Half of typical popup height
  },
});
