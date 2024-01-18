export const getFaqQuery = `
    SELECT * FROM faq;
`;

export const getFaqOffsetQuery = `
    SELECT * FROM faq
    LIMIT $1 OFFSET $2;
`;

export const getTotalFaqCountQuery = `
    SELECT COUNT(*) AS count FROM faq;
`;
