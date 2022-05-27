import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBudget from "../hooks/useBudget";
import numWithCommas from "../utils/numWithCommas";

const BudgetItem = ({ data }) => {
  const { deleteBudget, getBudgets } = useBudget();

  const handleDelete = (id) => {
    deleteBudget(id, () => {
      getBudgets();
    });
  };

  return (
    <View
      style={{
        ...styles.budgetItem,
        backgroundColor: data.type === "income" ? "purple" : "crimson",
      }}
    >
      <View style={styles.budgetItemLeft}>
        <TouchableOpacity onPress={() => handleDelete(data.id)}>
          <MaterialCommunityIcons
            style={styles.budgetItemIcon}
            name="delete-circle-outline"
          />
        </TouchableOpacity>
        <Text style={styles.budgetItemTitle}>{data.title}</Text>
      </View>
      <View style={styles.budgetItemRight}>
        <Text style={styles.budgetItemAmount}>
          {numWithCommas(data.amount)} ৳
        </Text>
      </View>
    </View>
  );
};

export default BudgetItem;

const styles = StyleSheet.create({
  budgetItem: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetItemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  budgetItemIcon: {
    fontSize: 24,
    color: "#fff",
  },
  budgetItemTitle: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#fff",
    fontFamily: "concertOne",
    lineHeight: 20,
  },
  budgetItemAmount: {
    color: "#fff",
    fontFamily: "concertOne",
  },
});
