import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadNewsData } from "../../../redux/actionCreators/newsCreators";
import { News } from "../../../interfaces/news-interface";

import Button from "../../../components/Button/Button";
import Pagination from "../../../components/Pagination/Pagination";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddNews from "./add-news/AddNews";
import EditNews from "./edit-news/EditNews";

import "./style.css";

const NewsContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { news, totalItems, error } = useSelector((state: RootState) => state.data.news.data);

  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isAddNewsOpen, setAddNewsOpen] = useState<boolean>(false);
  const [isEditNewsOpen, setEditNewsOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isAdmin = user.role_id === 1;

  const handleAddNews = (news: News) => {
    console.log(news);
    setAddNewsOpen(false);
    setCallback(!callback);
  };

  const handleUpdateNews = (news: News) => {
    console.log(news);
    setSelectedNews(null);
    setEditNewsOpen(false);
    setCallback(!callback);
  };

  const handleDeleteNews = () => {
    selectedNews && console.log("news deleted");
    setSelectedNews(null);
    setEditNewsOpen(false);
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
    dispatch(loadNewsData({ currentPage, itemsPerPage} ));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="news__container">
      <div className="news__header">
        <h1 className="news__title">Список новин</h1>
        <button 
          className="news__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="news-table">
        <thead>
          <tr>
            <th className="news-number">№ новини</th>
            <th className="news-title">Заголовок новини</th>
            <th className="news-action">Дії</th>
          </tr>
        </thead>
        <tbody>
          {news.map((news) => (
            <tr key={news.id}>
              <td>{news.id.toString().padStart(8, "0")}</td>
              <td>{news.title}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedNews(news);
                    setEditNewsOpen(!isEditNewsOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="news-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddNewsOpen(!isAddNewsOpen)}
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

      <AddNews
        isOpen={isAddNewsOpen}
        onAddClick={handleAddNews}
        onCloseClick={() => setAddNewsOpen(!isAddNewsOpen)}
      />

      {selectedNews && (
        <EditNews
          isOpen={isEditNewsOpen}
          onUpdateClick={handleUpdateNews}
          onDeleteClick={handleDeleteNews}
          onCloseClick={() => {
            setEditNewsOpen(!isEditNewsOpen);
            setSelectedNews(null);
          }}
          news={selectedNews}
        />
      )}
    </div>
  );
};

export default NewsContainer;
