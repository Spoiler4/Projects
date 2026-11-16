
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch transactions
  const fetchTransactions = useCallback(async () => {
    if (!userId) {
      setTransactions([]);
      return;
    }

    const response = await fetch(
      `${API_URL}/transactions/${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid transactions response");
    }

    setTransactions(data);
  }, [userId]);

  // Fetch wallet summary
  const fetchSummary = useCallback(async () => {
    if (!userId) {
      setSummary({
        balance: 0,
        income: 0,
        expenses: 0,
      });
      return;
    }

    const response = await fetch(
      `${API_URL}/transactions/summary/${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch summary: ${response.status}`);
    }

    const data = await response.json();

    setSummary({
      balance: Number(data.balance) || 0,
      income: Number(data.income) || 0,
      expenses: Number(data.expenses) || 0,
    });
  }, [userId]);

  // Load transactions and summary
  const loadData = useCallback(async () => {
    if (!userId) {
      setTransactions([]);
      setSummary({
        balance: 0,
        income: 0,
        expenses: 0,
      });
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);

    try {
      const results = await Promise.allSettled([
        fetchTransactions(),
        fetchSummary(),
      ]);

      const hasErrors = results.some(
        (result) => result.status === "rejected"
      );

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(
            index === 0
              ? "Error fetching transactions:"
              : "Error fetching summary:",
            result.reason
          );
        }
      });

      return !hasErrors;
    } catch (error) {
      console.error("Error loading wallet data:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchTransactions, fetchSummary]);

  // Delete transaction
  const deleteTransaction = useCallback(
    async (id) => {
      if (!userId) {
        Alert.alert("Error", "Please sign in first.");
        return false;
      }

      if (!id) {
        Alert.alert("Error", "Invalid transaction ID.");
        return false;
      }

      try {
        const response = await fetch(
          `${API_URL}/transactions/${encodeURIComponent(id)}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to delete transaction"
          );
        }

        // Immediately remove deleted item from the screen
        setTransactions((previousTransactions) =>
          previousTransactions.filter(
            (transaction) => String(transaction.id) !== String(id)
          )
        );

        // Refresh wallet balance and transaction data
        const refreshed = await loadData();

        if (!refreshed) {
          console.warn("Transaction deleted, but refresh was incomplete.");
        }

        Alert.alert(
          "Success",
          "Transaction deleted successfully."
        );

        return true;
      } catch (error) {
        console.error("Delete transaction error:", error);

        Alert.alert(
          "Delete Failed",
          error.message || "Could not delete transaction."
        );

        return false;
      }
    },
    [userId, loadData]
  );

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
