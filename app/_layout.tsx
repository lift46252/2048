import { ShopModal } from "@/components/ShopModal";
import { StatusBar as GameStatusBar } from "@/components/StatusBar";
import { CoinsProvider } from "@/contexts/coins/Context";
import { useCoins } from "@/contexts/coins/hooks";
import { LivesProvider } from "@/contexts/lives/Context";
import { ShopProvider, useShop } from "@/contexts/shop/Context";
import { ToastProvider } from "@/contexts/toast/Context";
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
  const { isOpen, closeShop } = useShop();
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
        <GameStatusBar coins={isLoading ? 0 : coins} />
        <Slot />
      </View>
      <ShopModal visible={isOpen} onClose={closeShop} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <CoinsProvider>
      <LivesProvider>
        <ShopProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ShopProvider>
      </LivesProvider>
    </CoinsProvider>
  );
}
