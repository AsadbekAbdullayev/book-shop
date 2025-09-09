import express from "express";
import { Transaction } from "../models/transactionModel.js";

const router = express.Router();

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      bookId,
      transactionDate,
      returnDate,
      comment,
      category,
      type,
      amount,
      date,
    } = req.body;

    if (!userId || !bookId || !type || !amount) {
      return res.status(400).json({
        message: "userId, bookId, type, and amount are required",
      });
    }

    const transaction = await Transaction.create({
      userId,
      bookId,
      transactionDate,
      returnDate,
      comment,
      category,
      type,
      amount,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions
router.get("/", async (_req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update transaction
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated",
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
