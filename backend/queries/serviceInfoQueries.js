export const getServiceInfoQuery = `
    SELECT 
        service_info.id,
        service_info.service_id,
        services.name AS service_name,
        service_info.description, 
        service_info.required_documents, 
        service_info.regulatory_documents, 
        service_info.delivery_time, 
        service_info.price_id 
    FROM 
        service_info
    LEFT JOIN
        services ON service_info.service_id = services.id;
`;

export const getServiceInfoOffsetQuery = `
    SELECT 
        service_info.id,
        service_info.service_id,
        services.name AS service_name,
        service_info.description, 
        service_info.required_documents, 
        service_info.regulatory_documents, 
        service_info.delivery_time, 
        service_info.price_id 
    FROM 
        service_info
    LEFT JOIN
        services ON service_info.service_id = services.id
    LIMIT $1 OFFSET $2;
`;

export const getTotalServiceInfoCountQuery = `
    SELECT COUNT(*) AS total_count FROM service_info;
`;
