import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadCitiesData, addCity, updateCity, deleteCity } from "../../redux/actionCreators/citiesCreators";
import { City } from "../../interfaces/city-interface";

import Button from "../../components/Button/Button";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import AddCity from "./add-city/AddCity";
import EditCity from "./edit-city/EditCity";

import "./style.css";

const CitiesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { cities, totalItems, error } = useSelector((state: RootState) => state.data.cities.data);

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isAddCityOpen, setAddCityOpen] = useState<boolean>(false);
  const [isEditCityOpen, setEditCityOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const statusLabels: Record<string, string> = {
    "main": "Основний",
    "region": "Регіональний",
    "tempinop": "Тимчасово не працює",
    "occupation": "Тимчасово окупованій",
  };

  const handleAddCity = (city: City) => {
    dispatch(addCity(city));
    setAddCityOpen(false);
    setCallback(!callback);
  };

  const handleUpdateCity = (city: City) => {
    dispatch(updateCity(city.id, city));
    setSelectedCity(null);
    setEditCityOpen(false);
    setCallback(!callback);
  };
  
  const handleDeleteCity = () => {
    selectedCity && dispatch(deleteCity(selectedCity.id));
    setSelectedCity(null);
    setEditCityOpen(false);
    setCallback(!callback);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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
    dispatch(loadCitiesData(itemsPerPage, currentPage));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="cities__container">
      <div className="cities__wrapper">
        <div className="cities__header">
          <h1 className="cities__title">Міста</h1>
          <button
            className="cities__refresh-button"
            onClick={() => setCallback(!callback)}
            title="Update"
          >
            <i className="fa-solid fa-rotate" />
          </button>
        </div>

        <div>
          <table className="cities-table">
            <thead>
              <tr>
                <th className="city-number">№ міста</th>
                <th className="city-name">Назва міста</th>
                <th className="city-region">Назва області</th>
                <th className="city-status">Статус міста</th>
                <th className="city-actions">Дії</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id}>
                  <td>{city.id.toString().padStart(8, "0")}</td>
                  <td>{city.name}</td>
                  <td>{city.region}</td>
                  <td className={`city-status ${city.status}`}>
                    {city.status && statusLabels[city?.status]}
                  </td>
                  <td>
                    <button
                      className="button-view"
                      onClick={() => {
                        setSelectedCity(city);
                        setEditCityOpen(!isEditCityOpen);
                      }}
                    >
                      Перегляд
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cities-actions">
            <Button
              text="Додати"
              type="button"
              onClick={() => setAddCityOpen(!isAddCityOpen)}
            />
            <div className="pagination-controls">
              <select
                className="pagination-columns-select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
              <div className="pagination-count">
                <span>{`${startItem}-${endItem} із ${totalItems}`}</span>
              </div>
              <button
                className="pagination-prev-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-angle-left" />
              </button>
              <button
                className="pagination-next-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-angle-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      <AddCity
        isOpen={isAddCityOpen}
        onAddClick={handleAddCity}
        onCloseClick={() => setAddCityOpen(!isAddCityOpen)}
      />

      {selectedCity && (
        <EditCity
          isOpen={isEditCityOpen}
          onUpdateClick={handleUpdateCity}
          onDeleteClick={handleDeleteCity}
          onCloseClick={() => {
            setEditCityOpen(!isEditCityOpen);
            setSelectedCity(null);
          }}
          city={selectedCity}
        />
      )}
    </div>
  );
};

export default CitiesPage;
