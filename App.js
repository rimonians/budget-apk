import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetProvider from "./contexts/BudgetContext";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./routes/HomeStack";

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    prepare();
  }, []);

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        concertOne: require("./assets/fonts/ConcertOne.ttf"),
        adorRegular: require("./assets/fonts/Ador-Regular.ttf"),
        adorSemiBold: require("./assets/fonts/Ador-SemiBold.ttf"),
        adorBold: require("./assets/fonts/Ador-Bold.ttf"),
      });
    } catch (err) {
      console.warn(err);
    } finally {
      setAppIsReady(true);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <BudgetProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="purple" style="auto" />
          <HomeStack />
        </NavigationContainer>
      </BudgetProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
