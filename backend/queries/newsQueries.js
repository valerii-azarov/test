export const getNewsQuery = `
    SELECT * FROM news;
`;

export const getNewsOffsetQuery = `
    SELECT * FROM news
    LIMIT $1 OFFSET $2;
`;

export const getTotalNewsCountQuery = `
    SELECT COUNT(*) AS count FROM news;
`;
