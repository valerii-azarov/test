export const getServicesQuery = `
    SELECT * FROM services;
`;

export const getServicesOffsetQuery = `
    SELECT * FROM services
    LIMIT $1 OFFSET $2;
`;

export const getServicesByCategoryIdQuery = `
    SELECT * FROM services WHERE category_id = $1;
`;

export const getServicesByCategoryIdOffsetQuery = `
    SELECT * FROM services
    WHERE category_id = $3
    LIMIT $1 OFFSET $2;
`;

export const getTotalServicesCountQuery = `
    SELECT COUNT(*) AS total_count FROM services;
`;

export const getTotalServicesByCategoryIdCountQuery = `
    SELECT COUNT(*) AS total_count FROM services WHERE category_id = $1;
`;