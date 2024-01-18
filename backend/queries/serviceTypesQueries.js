export const getServiceTypesQuery = `
    SELECT * FROM service_types;
`;

export const getServiceTypesOffsetQuery = `
    SELECT * FROM service_types
    LIMIT $1 OFFSET $2;
`;

export const getServiceTypesByServiceIdQuery = `
    SELECT * FROM service_types WHERE service_id = $1
`;

export const getServiceTypesByServiceIdOffsetQuery = `
    SELECT * FROM service_types
    WHERE service_id = $3
    LIMIT $1 OFFSET $2;
`;

export const getTotalServiceTypesCountQuery = `
    SELECT COUNT(*) AS total_count FROM service_types;
`;

export const getTotalServiceTypesByServiceIdCountQuery = `
    SELECT COUNT(*) AS total_count FROM service_types WHERE service_id = $1;
`;