export const getTotalBookingCountQuery = `
    SELECT
        COUNT(*)::int AS total_bookings
    FROM
        booking
    JOIN 
        schedule ON booking.id = schedule.booking_id
    WHERE
        booking.employee_id = $1
        AND schedule.date = $2
        AND booking.status_id = 4
`;

export const getTotalWorkedHoursQuery = `
    SELECT
        SUM(intervals.interval)::int AS total_worked_hours
    FROM
        schedule
    JOIN
        booking ON booking.id = schedule.booking_id
    JOIN
        employee_services ON booking.employee_id = employee_services.employee_id
    JOIN
        intervals ON employee_services.interval_id = intervals.id
    WHERE
        booking.employee_id = $1
        AND schedule.date = $2
        AND booking.status_id = 4
        AND EXTRACT(ISODOW FROM schedule.date) = intervals.day_of_week_id;
`;