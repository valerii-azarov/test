export const getEmployeeServicesByEmployeeIdQueries = `
    SELECT
        employee_services.id,
        employee_services.service_id,
        services.name AS service_name,
        intervals.start_time,
        intervals.end_time,
        intervals.interval,
        intervals.day_of_week_id,
        intervals.office_id
    FROM
        employee_services
    LEFT JOIN
        intervals ON employee_services.interval_id = intervals.id
    LEFT JOIN
        services ON employee_services.service_id = services.id
    WHERE 
        employee_services.employee_id = $1;
`;

export const getEmployeeServicesByEmployeeIdOffsetQuery = `
    SELECT
        employee_services.id,
        employee_services.service_id,
        services.name AS service_name,
        intervals.start_time,
        intervals.end_time,
        intervals.interval,
        intervals.day_of_week_id,
        intervals.office_id
    FROM
        employee_services
    LEFT JOIN
        intervals ON employee_services.interval_id = intervals.id
    LEFT JOIN
        services ON employee_services.service_id = services.id
    WHERE 
        employee_services.employee_id = $3
    LIMIT $1 OFFSET $2;
`;

export const getTotalServicesByEmployeeIdCountQuery = `
    SELECT COUNT(*) AS total_count FROM employee_services
    WHERE employee_services.employee_id = $1;
`;
