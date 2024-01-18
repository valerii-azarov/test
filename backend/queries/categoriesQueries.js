export const getCategoriesQuery = `
    SELECT * FROM categories;
`;

export const getCategoriesOffsetQuery = `
    SELECT * FROM categories
    LIMIT $1 OFFSET $2;
`;

export const getTotalCategoriesCountQuery = `
    SELECT COUNT(*) AS total_count FROM categories;
`;