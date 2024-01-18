import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadCategoriesData } from "../../../redux/actionCreators/categoriesCreators";
import { Category } from "../../../interfaces/category-interface";

import Button from "../../../components/Button/Button";
import Pagination from "../../../components/Pagination/Pagination";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddCategory from "./add-category/AddCategory";
import EditCategory from "./edit-category/EditCategory";

import "./style.css";

const CategoriesContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { categories, totalItems, error } = useSelector((state: RootState) => state.data.categories.data);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddCategoryOpen, setAddCategoryOpen] = useState<boolean>(false);
  const [isEditCategoryOpen, setEditCategoryOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isAdmin = user.role_id === 1;

  const handleAddCategory = (category: Category) => {
    console.log(category);
    setAddCategoryOpen(false);
    setCallback(!callback);
  };

  const handleUpdateCategory = (category: Category) => {
    console.log(category);
    setSelectedCategory(null);
    setEditCategoryOpen(false);
    setCallback(!callback);
  };

  const handleDeleteCategory = () => {
    selectedCategory && console.log("category deleted");
    setSelectedCategory(null);
    setEditCategoryOpen(false);
    setCallback(!callback);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(loadCategoriesData({ currentPage, itemsPerPage} ));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="category__container">
      <div className="category__header">
        <h1 className="category__title">Список категорій</h1>
        <button 
          className="category__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="categories-table">
        <thead>
          <tr>
            <th className="category-number">№ послуги</th>
            <th className="category-name">Назва послуги</th>
            <th className="category-actions">Дії</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id.toString().padStart(8, "0")}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedCategory(category);
                    setEditCategoryOpen(!isEditCategoryOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="categories-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddCategoryOpen(!isAddCategoryOpen)}
          disabled={!isAdmin}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      <AddCategory
        isOpen={isAddCategoryOpen}
        onAddClick={handleAddCategory}
        onCloseClick={() => setAddCategoryOpen(!isAddCategoryOpen)}
      />

      {selectedCategory && (
        <EditCategory
          isOpen={isEditCategoryOpen}
          onUpdateClick={handleUpdateCategory}
          onDeleteClick={handleDeleteCategory}
          onCloseClick={() => {
            setEditCategoryOpen(!isEditCategoryOpen);
            setSelectedCategory(null);
          }}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default CategoriesContainer;
