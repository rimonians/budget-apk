import React from "react";
import { View } from "react-native";
import globalStyle from "../styles/globalStyles";
import useBudgets from "../hooks/useBudget";
import BudgetBoard from "../components/BudgetBoard";
import BudgetList from "../components/BudgetList";
import Footer from "../components/Footer";

const Home = ({ navigation }) => {
  const { loading } = useBudgets();

  return (
    <>
      <View style={globalStyle.wrapper}>
        {!loading && (
          <>
            <BudgetBoard />
            <BudgetList />
          </>
        )}
      </View>
      <Footer />
    </>
  );
};

export default Home;
