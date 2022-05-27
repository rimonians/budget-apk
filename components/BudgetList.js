import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import globalStyle from "../styles/globalStyles";
import useBudget from "../hooks/useBudget";
import BudgetItem from "./BudgetItem";
import { FontAwesome5 } from "@expo/vector-icons";

const BudgetList = () => {
  const { filterBy, setFilterBy, budgetsCopy } = useBudget();

  return (
    <View style={styles.budgetListWrapper}>
      <View style={styles.budgetListHeader}>
        <Text style={globalStyle.subHeading}>
          {filterBy} List ({budgetsCopy.length})
        </Text>

        <View style={styles.action}>
          <TouchableOpacity onPress={() => setFilterBy("all")}>
            <FontAwesome5
              style={[
                styles.actionIcon,
                filterBy === "all" && styles.actionIconActive,
              ]}
              name="list-alt"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterBy("income")}>
            <FontAwesome5
              style={[
                styles.actionIcon,
                filterBy === "income" && styles.actionIconActive,
              ]}
              name="money-check"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterBy("expense")}>
            <FontAwesome5
              style={[
                styles.actionIcon,
                filterBy === "expense" && styles.actionIconActive,
              ]}
              name="money-bill-alt"
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.budgetList}
        data={budgetsCopy}
        renderItem={({ item }) => <BudgetItem data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BudgetList;

const styles = StyleSheet.create({
  budgetListWrapper: {
    flex: 1,
  },
  budgetListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 15,
    marginLeft: 15,
    backgroundColor: "#ddd",
    color: "#222",
    height: 25,
    width: 35,
    borderRadius: 5,
    lineHeight: 25,
    textAlign: "center",
  },
  actionIconActive: {
    backgroundColor: "purple",
    color: "#fff",
  },
  budgetList: {
    marginTop: 10,
  },
});
