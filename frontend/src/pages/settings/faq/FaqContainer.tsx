import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadFaqData } from "../../../redux/actionCreators/faqCreators";
import { Faq } from "../../../interfaces/faq-interface";

import Button from "../../../components/Button/Button";
import Pagination from "../../../components/Pagination/Pagination";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddFaq from "./add-faq/AddFaq";
import EditFaq from "./edit-faq/EditFaq";

import "./style.css";

const FaqContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { faq, totalItems, error } = useSelector((state: RootState) => state.data.faq.data);

  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [isAddFaqOpen, setAddFaqOpen] = useState<boolean>(false);
  const [isEditFaqOpen, setEditFaqOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isAdmin = user.role_id === 1;

  const handleAddFaq = (faq: Faq) => {
    console.log(faq);
    setAddFaqOpen(false);
    setCallback(!callback);
  };

  const handleUpdateFaq = (faq: Faq) => {
    console.log(faq);
    setSelectedFaq(null);
    setEditFaqOpen(false);
    setCallback(!callback);
  };

  const handleDeleteFaq = () => {
    selectedFaq && console.log("faq deleted");
    setSelectedFaq(null);
    setEditFaqOpen(false);
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
    dispatch(loadFaqData({ currentPage, itemsPerPage} ));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="faq__container">
      <div className="faq__header">
        <h1 className="faq__title">Список питань та відповідей</h1>
        <button 
          className="faq__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="faq-table">
        <thead>
          <tr>
            <th className="faq-number">№ питання</th>
            <th className="faq-question">Питання</th>
            <th className="faq-action">Дії</th>
          </tr>
        </thead>
        <tbody>
          {faq.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.id.toString().padStart(8, "0")}</td>
              <td>{faq.question}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedFaq(faq);
                    setEditFaqOpen(!isEditFaqOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="faq-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddFaqOpen(!isAddFaqOpen)}
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

      <AddFaq
        isOpen={isAddFaqOpen}
        onAddClick={handleAddFaq}
        onCloseClick={() => setAddFaqOpen(!isAddFaqOpen)}
      />

      {selectedFaq && (
        <EditFaq
          isOpen={isEditFaqOpen}
          onUpdateClick={handleUpdateFaq}
          onDeleteClick={handleDeleteFaq}
          onCloseClick={() => {
            setEditFaqOpen(!isEditFaqOpen);
            setSelectedFaq(null);
          }}
          faq={selectedFaq}
        />
      )}
    </div>
  );
};

export default FaqContainer;
