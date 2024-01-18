import bookingModel from "../models/bookingModel.js";

async function getBookingHandler(req, res) {
  try {
    const employeeId = req.params.id;
    const { limit, page, isAdmin } = req.query;
    
    let result, total, count;
    
    if (JSON.parse(isAdmin.toLowerCase())) {
      result = await bookingModel.getAllBookings();
    } else if (page && limit) {
      result = await bookingModel.getBookingsOffset(page, limit, employeeId);
    }

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про заявки відсутні.",
      });
    }

    total = JSON.parse(isAdmin.toLowerCase()) ? result.length : await bookingModel.getTotalCount(employeeId);
    count = JSON.parse(isAdmin.toLowerCase()) ? {} : await bookingModel.getStatusCount(employeeId);

    return res.status(200).json({
      counts: {
        totalItems: total,
        pending: count.pending_count,
        confirmed: count.confirmed_count,
        cancelled: count.cancelled_count,
        completed: count.completed_count,
      },
      bookings: result,
    });
  } catch (error) {
    // logger.error("Помилка при отриманні заявок: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні заявок.",
    });
  }
}

export { 
  getBookingHandler,
};
