export const hasEmployeeSalariesQuery = `
    SELECT COUNT(*) FROM employee_salaries
    WHERE
        employee_id = $1
        AND start_period <= $2
        AND end_period >= $2
`;

export const getIsPaidStatusForDateQuery = `
    SELECT 
        is_paid
    FROM 
        employee_salaries
    WHERE
        employee_id = $1
        AND start_period <= $2
        AND end_period >= $2
`;

export const createEmployeeSalariesQuery = `
    INSERT INTO employee_salaries (employee_id, start_period, end_period, worked_hours, amount, is_paid)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

export const updateEmployeeSalariesQuery = `
    UPDATE employee_salaries
    SET
        worked_hours = $4,
        amount = $5
    WHERE
        employee_id = $1
        AND start_period <= $2
        AND end_period >= $3
    RETURNING *;
`;

export const updateIsPaidStatusByEmployeeIdQuery = `
    UPDATE employee_salaries
    SET is_paid = $1
    WHERE employee_id = $2
    RETURNING *;
`;

export const getEmployeeSalariesQuery = `
    SELECT 
        employee_salaries.id,
        employee_salaries.employee_id,
        employees.surname,
        employees.name,
        employees.patronymic,
        employee_salaries.start_period,
        employee_salaries.end_period,
        employee_salaries.worked_hours,
        employee_salaries.amount,
        employee_salaries.is_paid
    FROM 
        employee_salaries
    LEFT JOIN
	    employees ON employee_salaries.employee_id = employees.id;
`;

export const getEmployeeSalariesOffsetQuery = `
    SELECT 
        employee_salaries.id,
        employee_salaries.employee_id,
        employees.surname,
        employees.name,
        employees.patronymic,
        employee_salaries.start_period,
        employee_salaries.end_period,
        employee_salaries.worked_hours,
        employee_salaries.amount,
        employee_salaries.is_paid
    FROM 
        employee_salaries
    LEFT JOIN
        employees ON employee_salaries.employee_id = employees.id
    LIMIT $1 OFFSET $2;
`;

export const getTotalEmployeeSalariesCountQuery = `
    SELECT COUNT(*) AS count FROM employee_salaries;
`;