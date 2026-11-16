
import { sql } from "../config/db.js";

// GET TRANSACTIONS
export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const transactions = await sql`
      SELECT *
      FROM transactions
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    return res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
}

// CREATE TRANSACTION
export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !user_id || !category || amount === undefined || amount === null) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount === 0) {
      return res.status(400).json({
        message: "Amount must be a valid non-zero number",
      });
    }

    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${numericAmount}, ${category})
      RETURNING *
    `;

    return res.status(201).json(transaction[0]);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({
      message: "Failed to create transaction",
    });
  }
}

// DELETE TRANSACTION
export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "Invalid transaction ID",
      });
    }

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const result = await sql`
      DELETE FROM transactions
      WHERE id = ${Number(id)}
      AND user_id = ${userId}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({
      message: "Failed to delete transaction",
    });
  }
}

// GET SUMMARY
export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const result = await sql`
      SELECT
        COALESCE(SUM(amount), 0) AS balance,
        COALESCE(SUM(amount) FILTER (WHERE amount > 0), 0) AS income,
        COALESCE(SUM(ABS(amount)) FILTER (WHERE amount < 0), 0) AS expenses
      FROM transactions
      WHERE user_id = ${userId}
    `;

    return res.status(200).json({
      balance: result[0].balance,
      income: result[0].income,
      expenses: result[0].expenses,
    });
  } catch (error) {
    console.error("Error getting summary:", error);
    return res.status(500).json({
      message: "Failed to fetch summary",
    });
  }
}
