export const getAllBookingsQuery = `
    SELECT
        schedule.id AS record_id,
        schedule.date,
        schedule.time,
        schedule.booking_id,
        booking.surname,
        booking.name,
        booking.patronymic,
        booking.phone,
        categories.id AS category_id,
        categories.name AS category,
        services.id AS service_id,
        services.name AS service,
        service_types.id AS service_type_id,
        service_types.name AS service_type,
        booking_status.id AS status_id,
        regions.id AS region_id,
        cities.id AS city_id,
        offices.id AS office_id
    FROM 
        schedule
    LEFT JOIN 
        booking ON schedule.booking_id = booking.id
    LEFT JOIN 
        categories ON booking.category_id = categories.id
    LEFT JOIN 
        services ON booking.service_id = services.id
    LEFT JOIN 
        service_types ON booking.service_type_id = service_types.id
    LEFT JOIN 
        booking_status ON booking.status_id = booking_status.id
    LEFT JOIN
        offices ON schedule.office_id = offices.id
    LEFT JOIN
        cities ON offices.city_id = cities.id
    LEFT JOIN
        regions ON cities.region_id = regions.id
    WHERE
        schedule.booking_id IS NOT NULL
    ORDER BY record_id;
`;

export const getBookingsOffsetQuery = `
    SELECT
        schedule.id AS record_id,
        schedule.date,
        schedule.time,
        schedule.booking_id,
        booking.surname,
        booking.name,
        booking.patronymic,
        booking.phone,
        categories.id AS category_id,
        categories.name AS category,
        services.id AS service_id,
        services.name AS service,
        service_types.id AS service_type_id,
        service_types.name AS service_type,
        booking_status.id AS status_id,
        regions.id AS region_id,
        cities.id AS city_id,
        offices.id AS office_id
    FROM 
        schedule
    LEFT JOIN 
        booking ON schedule.booking_id = booking.id
    LEFT JOIN 
        categories ON booking.category_id = categories.id
    LEFT JOIN 
        services ON booking.service_id = services.id
    LEFT JOIN 
        service_types ON booking.service_type_id = service_types.id
    LEFT JOIN 
        booking_status ON booking.status_id = booking_status.id
    LEFT JOIN
        offices ON schedule.office_id = offices.id
    LEFT JOIN
        cities ON offices.city_id = cities.id
    LEFT JOIN
        regions ON cities.region_id = regions.id
    WHERE
        schedule.booking_id IS NOT NULL AND booking.employee_id = $3
    LIMIT $1 OFFSET $2;
`;

export const getTotalCountQuery = `
    SELECT COUNT(*) AS total_count FROM booking WHERE booking.employee_id = $1;
`;

export const getStatusCountQuery = `
    SELECT 
        COUNT(*) FILTER (WHERE booking_status.name = 'pending') AS pending_count,
        COUNT(*) FILTER (WHERE booking_status.name = 'confirmed') AS confirmed_count,
        COUNT(*) FILTER (WHERE booking_status.name = 'cancelled') AS cancelled_count,
        COUNT(*) FILTER (WHERE booking_status.name = 'completed') AS completed_count
    FROM 
        booking
    LEFT JOIN 
        booking_status ON booking.status_id = booking_status.id
    WHERE booking.employee_id = $1;
`;
