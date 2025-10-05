import { CoinsBar } from "@/components/CoinsBar";
import { CoinsProvider } from "@/contexts/coins/Context";
import { useCoins } from "@/contexts/coins/hooks";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

function AppContent() {
  const colorScheme = useColorScheme();
  const { coins, isLoading } = useCoins();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        <CoinsBar coins={isLoading ? 0 : coins} />
        <Slot />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <CoinsProvider>
      <AppContent />
    </CoinsProvider>
  );
}
