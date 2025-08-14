import express from "express";
import { Category } from "../models/categoryModel.js";




const router = express.Router();

// Route for Save a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = {
      label: req.body.label,
      value: req.body.value,
    };

    const category = await Category.create(newCategory);
    return res.status(201).send(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get category by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).send({ message: "Category edited", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for delete category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).send({ message: "Category deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
