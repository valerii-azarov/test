export const getAllRegionsQuery = `
    SELECT * FROM regions
    ORDER BY id;
`;

export const getRegionsOffsetQuery = `
    SELECT * FROM regions
    ORDER BY id
    LIMIT $1 OFFSET $2;
`;

export const getTotalRegionsCountQuery = `
    SELECT COUNT(*) AS count FROM regions;
`;

export const getRegionByIdQuery = `
    SELECT * FROM regions
    WHERE id = $1;
`;

export const createRegionQuery = `
    INSERT INTO regions (name)
    VALUES ($1)
    RETURNING *;
`;

export const updateRegionQuery = `
    UPDATE regions
    SET name = $1
    WHERE id = $2
    RETURNING *;
`;

export const deleteRegionQuery = `
    DELETE FROM regions
    WHERE id = $1
    RETURNING *;
`;
