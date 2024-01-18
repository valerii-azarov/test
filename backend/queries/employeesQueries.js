export const getEmployeeByUsernameQuery = `
    SELECT
        employees.id,
        employees.password,
        employees.role_id,
        employees.status_id
    FROM
        employees
    WHERE
        username = $1;
`;

export const getEmployeeByActivationCodeQuery = `
    SELECT * FROM employees 
    WHERE id IN (SELECT employee_id FROM activation_codes WHERE activation_code = $1);
`;

export const getEmployeeByPhoneQuery = `
    SELECT * FROM employees WHERE phone = $1;
`;

export const getEmployeeByEmailQuery = `
    SELECT * FROM employees WHERE email = $1;
`;

export const insertEmployeeForRegistrationQuery = `
    INSERT INTO employees (surname, name, patronymic, phone, email, status_id) 
    VALUES ($1, $2, $3, $4, $5, $6);
`;

export const insertActivationCodeQuery = `
    INSERT INTO activation_codes (employee_id, activation_code) 
    VALUES ($1, $2);
`;

export const updateEmployeeStatusQuery = `
    UPDATE 
        employees 
    SET 
        status_id = $1
    WHERE 
        id = $2;
`;

export const updateEmployeeDetailsQuery = `
    UPDATE 
        employees 
    SET 
        username = $1, 
        password = $2, 
        position_id = $3, 
        role_id = $4, 
        office_id = $5
    WHERE id = $6;
`;

export const getEmployeesOffsetQuery = `
    SELECT 
        employees.id,
        employees.surname,
        employees.name,
        employees.patronymic,
        employees.phone,
        employees.email,
        employees.username,
        employees.role_id,
        employees.position_id,
        employees.status_id,
        regions.id AS region_id,
        cities.id AS city_id,
        offices.id AS office_id
    FROM 
        employees
    LEFT JOIN
        offices ON employees.office_id = offices.id
    LEFT JOIN
        cities ON offices.city_id = cities.id
    LEFT JOIN
        regions ON cities.region_id = regions.id
    ORDER BY id
    LIMIT $1 OFFSET $2;
`;

export const getTotalEmployeesCountQuery = `
    SELECT COUNT(*) AS count FROM employees;
`;

export const getEmployeeByIdQuery = `
    SELECT 
        employees.id,
        employees.surname,
        employees.name,
        employees.patronymic,
        employees.role_id,
        employees.status_id,
        offices.city_id
    FROM
        employees
    LEFT JOIN 
        offices ON employees.office_id = offices.id
    WHERE 
        employees.id = $1;
`;

export const getEmployeeDetailsByIdQuery = `
    SELECT 
        employees.id,
        employees.surname,
        employees.name,
        employees.patronymic,
        employees.phone,
        employees.email,
        employees.role_id,
        employees.position_id,
        employees.status_id,
        regions.name AS region,
        cities.name AS city,
        offices.name AS office
    FROM 
        employees
    LEFT JOIN
        offices ON employees.office_id = offices.id
    LEFT JOIN
        cities ON offices.city_id = cities.id
    LEFT JOIN
        regions ON cities.region_id = regions.id
    WHERE
        employees.id = $1;
`;

export const createEmployeeQuery = `
    INSERT INTO employees (surname, name, patronymic, phone, email, username, password, position_id, role_id, status_id, office_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
`;

export const updateEmployeeQuery = `
    UPDATE 
        employees
    SET 
        surname = $1,
        name = $2, 
        patronymic = $3, 
        phone = $4, 
        email = $5, 
        username = $6, 
        password = $7, 
        position_id = $8, 
        role_id = $9, 
        status_id = $10, 
        office_id = $11
    WHERE 
        id = $12
    RETURNING *;
`;

export const deleteEmployeeQuery = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
`;
