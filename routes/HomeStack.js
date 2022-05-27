import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import AddBudget from "../screens/AddBudget";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: "purple",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontFamily: "concertOne",
  },
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Budget Apk" }}
      />
      <Stack.Screen
        name="AddBudget"
        component={AddBudget}
        options={{ title: "Add Budget" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
