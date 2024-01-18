import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadRegionsData, addRegion, updateRegion, deleteRegion } from "../../redux/actionCreators/regionsCreators";
import { Region } from "../../interfaces/region-interface";

import Button from "../../components/Button/Button";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import AddRegion from "./add-region/AddRegion";
import EditRegion from "./edit-region/EditRegion";

import "./style.css";

const RegionsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { regions, totalItems, error } = useSelector((state: RootState) => state.data.regions.data);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isAddRegionOpen, setAddRegionOpen] = useState<boolean>(false);
  const [isEditRegionOpen, setEditRegionOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleAddRegion = (region: Region) => {
    dispatch(addRegion(region));
    setAddRegionOpen(false);
    setCallback(!callback);
  };

  const handleUpdateRegion = (region: Region) => {
    dispatch(updateRegion(region.id, region));
    setSelectedRegion(null);
    setEditRegionOpen(false);
    setCallback(!callback);
  };
  
  const handleDeleteRegion = () => {
    selectedRegion && dispatch(deleteRegion(selectedRegion.id));
    setSelectedRegion(null);
    setEditRegionOpen(false);
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
    dispatch(loadRegionsData(itemsPerPage, currentPage));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="regions__container">
      <div className="regions__wrapper">
        <div className="regions__header">
          <h1 className="regions__title">Регіони</h1>
          <button
            className="regions__refresh-button"
            onClick={() => setCallback(!callback)}
            title="Update"
          >
            <i className="fa-solid fa-rotate" />
          </button>
        </div>

        <div>
          <table className="regions-table">
            <thead>
              <tr>
                <th className="region-number">№ регіону</th>
                <th className="region-name">Назва регіону</th>
                <th className="region-actions">Дії</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region) => (
                <tr key={region.id}>
                  <td>{region.id.toString().padStart(8, "0")}</td>
                  <td>{region.name}</td>
                  <td>
                    <button
                      className="button-view"
                      onClick={() => {
                        setSelectedRegion(region);
                        setEditRegionOpen(!isEditRegionOpen);
                      }}
                    >
                      Перегляд
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="regions-actions">
            <Button
              text="Додати"
              type="button"
              onClick={() => setAddRegionOpen(!isAddRegionOpen)}
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

      <AddRegion
        isOpen={isAddRegionOpen}
        onAddClick={handleAddRegion}
        onCloseClick={() => setAddRegionOpen(!isAddRegionOpen)}
      />

      {selectedRegion && (
        <EditRegion
          isOpen={isEditRegionOpen}
          onUpdateClick={handleUpdateRegion}
          onDeleteClick={handleDeleteRegion}
          onCloseClick={() => {
            setEditRegionOpen(!isEditRegionOpen);
            setSelectedRegion(null);
          }}
          region={selectedRegion}
        />
      )}
    </div>
  );
};

export default RegionsPage;
