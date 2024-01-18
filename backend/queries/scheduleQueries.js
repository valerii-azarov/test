export const getScheduleByOfficeIdAndServiceIdQuery = `
    SELECT 
        id,
        date, 
        time, 
        availability
    FROM 
        schedule 
    WHERE 
        office_id = $1 AND service_id = $2
    AND 
        date BETWEEN date_trunc('week', NOW()) AND (date_trunc('week', NOW()) + INTERVAL '6 days')
    ORDER BY 
        date, time;
`;

export const getScheduleByOfficeIdAndServiceIdOffsetQuery = `
    SELECT 
        id,
        date, 
        time, 
        availability
    FROM 
        schedule 
    WHERE 
        office_id = $3 AND service_id = $4
    AND 
        date BETWEEN date_trunc('week', NOW()) AND (date_trunc('week', NOW()) + INTERVAL '6 days')
    ORDER BY date, time
    LIMIT $1 OFFSET $2;
`;

export const getTotalScheduleCountQuery = `
    SELECT COUNT(*) AS total_count FROM schedule WHERE office_id = $1 AND service_id = $2;
`;
