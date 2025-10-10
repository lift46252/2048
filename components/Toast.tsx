import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "lightText");
  const slideAnim = React.useRef(new Animated.Value(-100)).current;
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  const handleClose = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      // Reset progress bar to 0
      progressAnim.setValue(0);

      // Slide in animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start();

      // Auto close after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, progressAnim, slideAnim, handleClose]);

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "checkmark-circle" as const,
          iconColor: "#4CAF50",
          borderColor: "#4CAF50",
        };
      case "error":
        return {
          icon: "close-circle" as const,
          iconColor: "#F44336",
          borderColor: "#F44336",
        };
      case "warning":
        return {
          icon: "warning" as const,
          iconColor: "#FF9800",
          borderColor: "#FF9800",
        };
      default:
        return {
          icon: "information-circle" as const,
          iconColor: "#2196F3",
          borderColor: "#2196F3",
        };
    }
  };

  const config = getToastConfig();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor: config.borderColor,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Ionicons name={config.icon} size={24} color={config.iconColor} />
        </View>

        <View style={styles.middleSection}>
          <Text style={[styles.message, { color: textColor }]}>{message}</Text>
        </View>

        <Pressable style={styles.rightSection} onPress={handleClose}>
          <Ionicons name="close" size={20} color="#9E9E9E" />
        </Pressable>
      </View>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              backgroundColor: config.iconColor,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 99999,
    zIndex: 99999,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  leftSection: {
    marginRight: 12,
  },
  middleSection: {
    flex: 1,
  },
  rightSection: {
    marginLeft: 12,
    padding: 4,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    height: 3,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
