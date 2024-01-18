export const getAllOfficesQuery = `
    SELECT
        offices.id,
        offices.name,
        offices.address,
        cities.name AS city,
        office_status.name AS status
    FROM
        offices
    JOIN
        cities ON offices.city_id = cities.id
    JOIN
        office_status ON offices.status_id = office_status.id
    ORDER BY
        cities.id, offices.id;
`;

export const getOfficesOffsetQuery = `
    SELECT
        offices.id,
        offices.name,
        offices.address,
        cities.name AS city,
        office_status.name AS status
    FROM
        offices
    JOIN
        cities ON offices.city_id = cities.id
    JOIN
        office_status ON offices.status_id = office_status.id
    ORDER BY id
    LIMIT $1 OFFSET $2;
`;

export const getTotalOfficesCountQuery = `
    SELECT COUNT(*) AS count FROM offices;
`;

export const getOfficesByCityIdQuery = `
    SELECT
        offices.id,
        offices.name,
        offices.address,
        cities.name AS city,
        office_status.name AS status
    FROM
        offices
    JOIN
        cities ON offices.city_id = cities.id
    JOIN
        office_status ON offices.status_id = office_status.id
    WHERE
        city_id = $1;
`;

export const getOfficeByIdQuery = `
    SELECT
        offices.id,
        offices.name,
        offices.address,
        cities.name AS city,
        office_status.name AS status
    FROM
        offices
    JOIN
        cities ON offices.city_id = cities.id
    JOIN
        office_status ON offices.status_id = office_status.id
    WHERE
        offices.id = $1;
`;

export const createOfficeQuery = `
    INSERT INTO offices (name, address, city_id, status_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;

export const updateOfficeQuery = `
    UPDATE offices
    SET name = $1, address = $2, city_id = $3, status_id = $4
    WHERE id = $5
    RETURNING *;
`;

export const deleteOfficeQuery = `
    DELETE FROM offices
    WHERE id = $1
    RETURNING id, name, address, city_id, status_id;
`;