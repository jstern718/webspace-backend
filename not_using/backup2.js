async function seed(){
    await db.run(`INSERT INTO customers (customerName,
                                customer_company,
                                customer_identity,
                                address_num,
                                address_street,
                                address_suite,
                                address_city,
                                address_state,
                                address_zip,
                                phone,
                                password,
                                email)
                        VALUES ("Adam Apple",
                                "acorp",
                                "president",
                                1,
                                "Main St.",
                                100,
                                "Baltimore",
                                "MD",
                                "21201",
                                "4108675309",
                                "password1",
                                "adam@acorp.com"),
                                ("Bob Baker",
                                "bcorp",
                                "president",
                                2,
                                "Main St.",
                                200,
                                "Baltimore",
                                "MD",
                                "21201",
                                "4108675309",
                                "password2",
                                "bob@bcorp.com"),
                                ("Carl Cake",
                                "ccorp",
                                "president",
                                3,
                                "Main St.",
                                300,
                                "Baltimore",
                                "MD",
                                "21201",
                                "4108675309",
                                "password3",
                                "carl@ccorp.com")`);

    await db.run(`INSERT INTO servers (server_type_name, customer_name)
                    VALUES ("Apache Tomcat", "Adam Apple"),
                            ("IIS", "Bob Baker"),
                            ("Nginx", "Carl Cake")`);

    await db.run(`INSERT INTO server_types (server_type_name)
                    VALUES ("Apache Tomcat",
                        "IIS",
                        "Nginx",
                        "LiteSpeed")`);

    await db.run(`INSERT INTO resource_types (resource_name)
                    VALUES ("Number of Servers", "Memory Usage",
                            "Storage Usage", "vCPUs", "Clustered Servers")`);

    await db.run(`INSERT INTO code_languages (language_name)
                    VALUES ("Java", "React.js", "Python", "Node.js", "C++",
                            "C#")`);

    await db.run(`INSERT INTO software_technologies (technology_name)
                    VALUES ("Docker", "Elasticsearch", "Apache Kafka",
                            "Redis", "AI")`);

    await db.run(`INSERT INTO applications (application_name, version_num,
                                            application_url,
                                            application_port,
                                            customer_name)
                    VALUES ("appa", "1", "https://appa.com", "3000",
                            "Adam Apple"),
                            ("appb", "2", "https://appb.com", "3000", "Bob Baker"),
                            ("appc", "3", "https://appc.com", "3000", "Carl Cake")`);

    await db.run(`INSERT INTO resources_used (server_id, resource_name,
                                                resource_amount, resource_unit)
                    VALUES (1, "Number of Servers", 1, "servers"),
                    (1, "Memory Usage", 100, "gb"),
                    (1, "Storage Usage", 100, "gb"),
                    (1, "vCPUs", 1, "vCPUs"),
                    (1, "Clustered Servers", false, null),
                    (2, "Number of Servers", 2, "servers"),
                    (2, "Memory Usage", 200, "gb"),
                    (2, "Storage Usage", 200, "gb"),
                    (2, "vCPUs", 2, "vCPUs"),
                    (2, "Clustered Servers", true, null),
                    (3, "Number of Servers", 3, "servers"),
                    (3, "Memory Usage", 300, "gb"),
                    (3, "Storage Usage", 300, "gb"),
                    (3, "vCPUs", 3, null),
                    (3, "Clustered Servers", true, null)`);

    await db.run(`INSERT INTO technologies_used (server_id, technology_name)
                    VALUES (1, "Docker"),
                            (1, "Elasticsearch"),
                            (2, "Apache Kafka"),
                            (2, "Redis"),
                            (3, "AI")`);

    await db.run(`INSERT INTO languages_used (application_name,
                                                language_name)
                    VALUES ("appa", "Node.js"),
                            ("appa", "React.js"),
                            ("appb", "Python"),
                            ("appb", "Java"),
                            ("appc", "C++"),
                            ("appc", "C#")`);

    await db.run(`INSERT INTO technology_prices (technology_name,
                                                    technology_price)
                    VALUES ("Docker", 1000),
                            ("Elasticsearch", 2000),
                            ("Apache Kafka", 3000),
                            ("Redis", 4000),
                            ("AI", 5000)`);

    await db.run(`INSERT INTO server_prices (server_type_name, server_price)
                    VALUES ("Apache Tomcat", 10000),
                            ("IIS", 11000),
                            ("Nginx", 12000),
                            ("LiteSpeed", 13000)`);

    await db.run(`INSERT INTO resource_prices (resource_name,
                                                resource_price)
                    VALUES ("Number of Servers", 1000),
                            ("Memory Usage", 10),
                            ("Storage Usage", 10),
                            ("vCPUs", "vCPUs", 1000),
                            ("Clustered Servers", 1000)`);
};

module.exports = seed;