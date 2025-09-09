import express from "express";
import { Category } from "../models/categoryModel.js";

const router = express.Router();

// Create a new category
router.post("/", async (req, res) => {
  try {
    const { label, value } = req.body;

    if (!label || !value) {
      return res.status(400).json({ message: "Label and value are required" });
    }

    const category = await Category.create({ label, value });
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get("/", async (_req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get category by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
