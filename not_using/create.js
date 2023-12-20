CREATE TABLE server_types (
    server_type_name TEXT PRIMARY KEY
)


CREATE TABLE IF NOT EXISTS applications (
    application_name TEXT PRIMARY KEY,
    version_num TEXT,
    application_url TEXT,
    application_port TEXT,
    customer_name TEXT
);



CREATE TABLE IF NOT EXISTS resource_types (
    resource_name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS code_languages (
    language_name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS software_technologies (
    technology_name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS resources_used (
    id SERIAL PRIMARY KEY,
    server_id TEXT REFERENCES servers,
    resource_name TEXT REFERENCES resource_types,
    resource_amount TEXT,
    resource_unit TEXT
);

CREATE TABLE IF NOT EXISTS technologies_used (
    id SERIAL PRIMARY KEY,
    server_id TEXT,
    technology_name TEXT
);

CREATE TABLE IF NOT EXISTS languages_used (
    id SERIAL PRIMARY KEY,
    application_name TEXT REFERENCES applications,
    language_name TEXT REFERENCES code_languages
);

CREATE TABLE IF NOT EXISTS technology_prices (
    id SERIAL PRIMARY KEY,
    technology_name TEXT,
    technology_price DECIMAL(20, 2)
);

CREATE TABLE IF NOT EXISTS server_prices (
    id SERIAL PRIMARY KEY,
    server_type_name TEXT,
    server_price DECIMAL(20, 2)
);

CREATE TABLE IF NOT EXISTS resource_prices (
    id SERIAL PRIMARY KEY,
    resource_name TEXT,
    resource_price DECIMAL(20, 2)
)
`;