export const getAppearanceByCityIdQuery = `
    SELECT  
        background,
        text,
        welcome,
        image 
    FROM 
        settings 
    WHERE 
        city_id = $1;
`;
