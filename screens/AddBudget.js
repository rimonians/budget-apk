import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import globalStyle from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Footer from "../components/Footer";
import useBudgets from "../hooks/useBudget";
import uuid from "react-native-uuid";

const AddBudget = ({ navigation }) => {
  const [budget, setBudget] = useState({
    id: uuid.v4(),
    title: "",
    amount: "",
    type: "income",
  });

  const { storeBudgets, getBudgets } = useBudgets();

  const handleChange = (val, item) => {
    setBudget({ ...budget, [item]: val });
  };

  const handleSubmit = () => {
    if (
      budget.title &&
      budget.amount &&
      budget.type &&
      !isNaN(Number(budget.amount))
    ) {
      storeBudgets(budget, () => {
        getBudgets();
        Alert.alert("Message", `New ${budget.type} added`);
        setBudget({
          id: uuid.v4(),
          title: "",
          amount: "",
          type: "income",
        });
      });
    } else {
      Alert.alert("Warning", "Please provide all valid budget info", [
        { text: "Okey" },
      ]);
    }
  };

  return (
    <>
      <ScrollView style={globalStyle.wrapper}>
        <Text style={globalStyle.subHeading}>Add on budget</Text>

        <View style={styles.formControll}>
          <Text style={styles.label}>Budget title</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Enter budget title"
              defaultValue={budget.title}
              autoCorrect={false}
              onChangeText={(val) => handleChange(val, "title")}
            />
            <MaterialIcons style={styles.icon} name="subtitles" />
          </View>
        </View>

        <View style={styles.formControll}>
          <Text style={styles.label}>Budget amount</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Enter budget amount"
              defaultValue={budget.amount}
              keyboardType="numeric"
              onChangeText={(val) => handleChange(val, "amount")}
            />
            <MaterialIcons style={styles.icon} name="money" />
          </View>
        </View>

        <View style={styles.formControll}>
          <Text style={styles.label}>Budget type</Text>
          <View style={styles.select}>
            <Picker
              selectedValue={budget.type}
              onValueChange={(itemValue) =>
                setBudget({ ...budget, type: itemValue })
              }
            >
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <Text style={globalStyle.button}>Add as {budget.type}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </>
  );
};

export default AddBudget;

const styles = StyleSheet.create({
  formControll: {
    marginVertical: 10,
  },
  label: {
    fontFamily: "concertOne",
    marginBottom: 5,
  },
  formGroup: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontFamily: "concertOne",
  },
  select: {
    borderStyle: "dashed",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    fontSize: 26,
    color: "gray",
    paddingLeft: 10,
  },
});
