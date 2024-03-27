import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
// import {
//   createCategory,
//   getAllCategories,
// } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const SelectItem = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddCategory = () => {
    // Here you can add the logic to handle adding the new category
    setNewCategory(""); // Clear the new category input
    setOpenDialog(false); // Close the dialog
  };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const categoryList = await getAllCategories();
  //     categoryList && setCategories(categoryList as ICategory[]);
  //   };
  //   getCategories();
  // }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={value}
          onChange={(e) =>
            onChangeHandler && onChangeHandler(e.target.value as string)
          }
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
          <MenuItem onClick={() => setOpenDialog(true)}>Add Category</MenuItem>
        </Select>
      </FormControl>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCategory}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SelectItem;
