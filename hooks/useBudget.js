import React, { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";

const useBudget = () => {
  return useContext(BudgetContext);
};

export default useBudget;
