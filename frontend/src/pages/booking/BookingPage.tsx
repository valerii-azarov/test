import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadBookingData } from "../../redux/actionCreators/boookingCreators";
import { Booking } from "../../interfaces/booking-interface";

import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import AddBooking from "./add-booking/AddBooking";
import EditBooking from "./edit-booking/EditBooking";

import "./style.css";

const statusLabels: Record<number, { status: string; text: string }> = {
  1: { 
    status: "pending",
    text: "Нова",
  },
  2: { 
    status: "confirmed",
    text: "В обробці", 
  },
  3: { 
    status: "cancelled", 
    text: "Відхилено",
  },
  4: { 
    status: "completed", 
    text: "Вирішено",
  },
};

const BookingPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, counts: { totalItems, pending, confirmed, cancelled, completed }, error } = useSelector((state: RootState) => state.data.booking.data);
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAddBookingOpen, setAddBookingOpen] = useState<boolean>(false);
  const [isEditBookingOpen, setEditBookingOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isAdmin = user.role_id === 1;
  const isManager = user.role_id === 2;
  const isEmployee = user.role_id === 3;

  const handleAddBooking = (booking: Booking) => {
    console.log(booking);
    setAddBookingOpen(false);
    setCallback(!callback);
  };

  const handleUpdateBooking = (booking: Booking) => {
    console.log(booking.booking_id, booking.status_id);
    setSelectedBooking(null);
    setEditBookingOpen(false);
    setCallback(!callback);
  };

  const handleDeleteBooking = () => {
    selectedBooking && console.log("booking deleted");
    setSelectedBooking(null);
    setEditBookingOpen(false);
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
    user.id && dispatch(loadBookingData(itemsPerPage, currentPage, user.id, (isAdmin || isManager)));
  }, [currentPage, itemsPerPage, user.id, isAdmin, isManager, callback, dispatch]);

  return (
    <div className="booking__container">
      <div className="booking__wrapper">
        {isEmployee && (
          <div className="booking__top">
            <div className="booking__header">
              <h1 className="booking__title">Заявки</h1>
            </div>
            <div className="booking__cards">
              {pending > 0 && (
                <div className="booking__card">
                  <div className="booking__card-inner pending">
                    <p>Нові</p>
                    <span>{pending}</span>
                  </div>
                </div>
              )}
              
              {confirmed > 0 && (
                <div className="booking__card">
                  <div className="booking__card-inner confirmed">
                    <p>В обробці</p>
                    <span>{confirmed}</span>
                  </div>
                </div>
              )}

              {completed > 0 && (
                <div className="booking__card">
                  <div className="booking__card-inner completed">
                    <p>Вирішено</p>
                    <span>{completed}</span>
                  </div>
                </div>
              )}

              {cancelled > 0 && (
                <div className="booking__card">
                  <div className="booking__card-inner cancelled">
                    <p>Відхилено</p>
                    <span>{cancelled}</span>
                  </div>
                </div>
                )}
            </div>
          </div>
        )}
        
        <div className="booking__bottom">
          <div className="booking__header">
            <h1 className="booking__title">Список заявок</h1>
            <button
              className="booking__refresh-button"
              onClick={() => setCallback(!callback)}
              title="Update"
            >
              <i className="fa-solid fa-rotate" />
            </button>
          </div>

          <table className="booking-table">
            <thead>
              <tr>
                <th className="booking-number">№ заявки</th>
                <th className="booking-name">ПІБ</th>                
                <th className="booking-date">Дата</th>
                <th className="booking-time">Час</th>
                <th className="booking-service">Послуга</th>
                <th className="booking-status">Статус заявки</th>
                <th className="booking-actions">Дії</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td>{booking.booking_id.toString().padStart(8, "0")}</td>
                  <td>{`${booking.surname} ${booking.name.charAt(0)}.${booking.patronymic.charAt(0)}.`}</td>
                  <td>{moment(booking.date).format("YYYY/MM/DD")}</td>
                  <td>{moment(booking.time, "HH:mm:ss").format("HH:mm")}</td>
                  <td>{booking.service}</td>
                  <td className={`booking-status ${statusLabels[booking.status_id as number].status}`}>
                    {statusLabels[booking.status_id as number].text}
                  </td>                
                  <td>
                    <button
                      className="button-view"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setEditBookingOpen(!isEditBookingOpen);
                      }}
                    >
                      Перегляд
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bookings-actions">
            <Button
              text="Додати"
              type="button"
              onClick={() => setAddBookingOpen(!isAddBookingOpen)}
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
        </div>
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      <AddBooking
        isOpen={isAddBookingOpen}
        onAddClick={handleAddBooking}
        onCloseClick={() => setAddBookingOpen(!isAddBookingOpen)}
      />

      {selectedBooking && (
        <EditBooking
          isOpen={isEditBookingOpen}
          onUpdateClick={handleUpdateBooking}
          onDeleteClick={handleDeleteBooking}
          onCloseClick={() => {
            setEditBookingOpen(!isEditBookingOpen);
            setSelectedBooking(null);
          }}
          booking={selectedBooking}
        />
      )}
    </div>
  );
};

export default BookingPage;
