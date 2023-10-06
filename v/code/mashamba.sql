-- select 
--     folder.name as folder,
--     document.id as document,
--     json_arrayagg(json_object('num', image.page, 'url', image.url, 'name', image.name)) as pages,
--     title.id as title_no,
--     category.name as category,
--     document.area as  area,
--     document.person as owner,
--     document.regno as regno
-- from image
--     inner join document on image.document = document.document
--     inner join folder on document.folder = folder.folder
--     left join title on document.document = title.document
--     left join category on document.category = category.category
-- WHERE title.id
--     is NOT null
-- group by
--     document.document;
SELECT
    folder.name AS folder,
    document.id AS document,
    json_arrayagg(json_object('num', image.page, 'url', image.url, 'name', image.name)) AS pages,
    title.id AS title_no,
    category.name AS category,
    document.area AS area,
    document.person AS owner,
    document.regno AS regno
FROM (
    SELECT
        image.*,
        ROW_NUMBER() OVER (PARTITION BY image.document ORDER BY image.page) AS row_num
    FROM image
) AS image
INNER JOIN document ON image.document = document.document
INNER JOIN folder ON document.folder = folder.folder
LEFT JOIN title ON document.document = title.document
LEFT JOIN category ON document.category = category.category
WHERE title.id IS NOT NULL AND image.row_num = 1
GROUP BY document.document;



