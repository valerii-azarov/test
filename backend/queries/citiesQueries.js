export const getAllCitiesQuery = `
    SELECT
        cities.id,
        cities.name,
        regions.name AS region,
        city_status.name AS status
    FROM
        cities
    JOIN
        regions ON cities.region_id = regions.id
    JOIN
        city_status ON cities.status_id = city_status.id
    ORDER BY
        regions.id, cities.id;
`;

export const getCitiesOffsetQuery = `
    SELECT
        cities.id,
        cities.name,
        regions.name AS region,
        city_status.name AS status
    FROM
        cities
    JOIN
        regions ON cities.region_id = regions.id
    JOIN
        city_status ON cities.status_id = city_status.id
    ORDER BY id
    LIMIT $1 OFFSET $2;
`;

export const getTotalCitiesCountQuery = `
    SELECT COUNT(*) AS count FROM cities;
`;

export const getCitiesByRegionIdQuery = `
    SELECT
        cities.id,
        cities.name,
        regions.name AS region,
        city_status.name AS status
    FROM
        cities
    JOIN
        regions ON cities.region_id = regions.id
    JOIN
        city_status ON cities.status_id = city_status.id
    WHERE
        region_id = $1;
`;

export const getCityByIdQuery = `
    SELECT
        cities.id,
        cities.name,
        region.name AS region,
        city_status.name AS status
    FROM
        cities
    JOIN
        region ON cities.region_id = region.id
    JOIN
        city_status ON cities.status_id = city_status.id
    WHERE
        cities.id = $1;
`;

export const createCityQuery = `
    INSERT INTO cities (name, region_id, status_id)
    VALUES ($1, $2, $3)
    RETURNING *;
`;

export const updateCityQuery = `
    UPDATE cities
    SET name = $1, region_id = $2, status_id = $3
    WHERE id = $4
    RETURNING *;
`;

export const deleteCityQuery = `
    DELETE FROM cities
    WHERE id = $1
    RETURNING *;
`;