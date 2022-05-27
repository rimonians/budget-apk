import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [budgetsCopy, setBudgetsCopy] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    getBudgets();
  }, []);

  useEffect(() => {
    if (filterBy === "all") {
      setBudgetsCopy([...budgets]);
      return;
    }
    if (filterBy === "income") {
      const incomes = budgets.filter((budget) => budget.type === "income");
      setBudgetsCopy(incomes);
      return;
    }
    if (filterBy === "expense") {
      const expenses = budgets.filter((budget) => budget.type === "expense");
      setBudgetsCopy(expenses);
      return;
    }
  }, [budgets, filterBy]);

  const storeBudgets = async (budget, cb) => {
    try {
      const budgets = await AsyncStorage.getItem("budgets");
      const parsedBudgets = budgets !== null ? JSON.parse(budgets) : [];
      const updatedBudgets = [budget, ...parsedBudgets];
      await AsyncStorage.setItem("budgets", JSON.stringify(updatedBudgets));
      cb();
    } catch (e) {
      console.log(e);
    }
  };

  const getBudgets = async () => {
    try {
      const budgets = await AsyncStorage.getItem("budgets");
      const parsedBudgets = budgets !== null ? JSON.parse(budgets) : [];
      setLoading(false);
      setBudgets(parsedBudgets);
      setError(null);
    } catch (e) {
      setLoading(false);
      setBudgets([]);
      setError(e);
    }
  };

  const deleteBudget = async (id, cb) => {
    try {
      const budgets = await AsyncStorage.getItem("budgets");
      const parsedBudgets = budgets !== null ? JSON.parse(budgets) : [];
      const updatedBudgets = parsedBudgets.filter((budget) => budget.id !== id);
      await AsyncStorage.setItem("budgets", JSON.stringify(updatedBudgets));
      cb();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        loading,
        budgets,
        budgetsCopy,
        filterBy,
        error,
        setFilterBy,
        storeBudgets,
        getBudgets,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetProvider;
