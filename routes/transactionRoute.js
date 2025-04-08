import express from "express";
import { Transaction } from "../models/transactionModel.js";

const router = express.Router();

// Route for Save a new transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = {
      userId: req.body.userId,
      bookId: req.body.bookId,
      transactionDate: req.body.transactionDate,
      returnDate: req.body.returnDate,
      comment: req.body.comment,
      category: req.body.category,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
    };

    const transaction = await Transaction.create(newTransaction);
    return res.status(201).send(transaction);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find({});

    return res.status(200).json({
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get transaction by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update transaction
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .send({ message: "Transaction edited", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for delete transaction
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).send({ message: "Transaction deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
