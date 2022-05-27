import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import globalStyle from "../styles/globalStyles";
import useBudget from "../hooks/useBudget";
import { useNavigation } from "@react-navigation/native";
import numWithCommas from "../utils/numWithCommas";

const BudgetBoard = () => {
  const { budgets } = useBudget();
  const navigation = useNavigation();

  const income = budgets.reduce((acc, cur) => {
    if (cur.type === "income") {
      return acc + Number(cur.amount);
    }
    return acc;
  }, 0);

  const expense = budgets.reduce((acc, cur) => {
    if (cur.type === "expense") {
      return acc + Number(cur.amount);
    }
    return acc;
  }, 0);

  return (
    <View style={styles.budgetBoard}>
      <View style={styles.budgetHeader}>
        <Text style={globalStyle.subHeading}>Budget statistics</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddBudget")}>
          <FontAwesome5 style={styles.budgetHeaderIcon} name="plus-square" />
        </TouchableOpacity>
      </View>
      <View style={styles.budgetStat}>
        <View style={styles.item}>
          <FontAwesome5 style={styles.itemIcon} name="money-check" />
          <Text style={styles.itemAmount}>{numWithCommas(income)}</Text>
          <Text style={styles.itemTitle}>Income</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome5 style={styles.itemIcon} name="money-bill-alt" />
          <Text style={styles.itemAmount}>{numWithCommas(expense)}</Text>
          <Text style={styles.itemTitle}>Expense</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome5 style={styles.itemIcon} name="money-check-alt" />
          <Text style={styles.itemAmount}>
            {numWithCommas(income - expense)}
          </Text>
          <Text style={styles.itemTitle}>
            {income > expense ? "Saving" : "Overdue"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BudgetBoard;

const styles = StyleSheet.create({
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetHeaderIcon: {
    color: "#222",
    fontSize: 20,
  },
  budgetStat: {
    backgroundColor: "purple",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  itemIcon: {
    color: "#fff",
    fontSize: 25,
  },
  itemAmount: {
    color: "#fff",
    fontFamily: "concertOne",
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  itemTitle: {
    color: "#fff",
    fontFamily: "concertOne",
  },
});
