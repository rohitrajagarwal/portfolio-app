const express = require('express');
const app = express();
const path = require('path');
const PORT = 3002;
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/home', (req, res) => {
    const jsonData = {
                    "homepage": [
                        {
                        "mainpage_component" : [
                            {
                            "content": "RohitAgarwalHeadshot-2025-nbg.png",
                            "type": "image",
                            "isHeader": "true"
                            },
                            {
                            "content": {"heading": "Rohit Agarwal", "para":"I am a designer<br/>\
                                                                                a developer<br/>\
                                                                                a program manager<br/>\
                                                                                a leader <br/>\
                                                                                ... with 11+ years of IT industry experience."},
                            "type": "text",
                            "isHeader": "true"
                            }
                        ]
                        },
                        {
                        "mainpage_component" : [
                            {
                            "content": "career-path.png",
                            "type": "image",
                            "isHeader": "false"
                            },
                            {
                            "content": "From SAP to VMware to Broadcom. \
                                        In 11+ years, I have amassed a wealth of knowledge in the Software development lifecycle and beyond. \
                                        I started working on SAP's middleware platform as a Java developer. \
                                        Shortly after, I started working for VMware and gradually made my way to Staff Technical Program Manager serving the R&amp;D Engineering teams and supporting programs on various scale - from add-on solutions to portfolio. \
                                        <br/> <br/>\
                                        I ended my journey at Broadcom as a Professional Services Program Manager to manage customer deployment (post sales).",
                            "type": "text",
                            "isHeader": "false"
                            }
                        ]
                        
                        },
                        {
                        "mainpage_component" : [
                            {
                            "content": "Hobbies.png",
                            "type": "image",
                            "isHeader": "false"
                            },
                            {
                            "content": "I hail from India and my family includes my parents and my 3 siblings.\
                I love driving and specifically inclined towards owning a blue car as its my niece's favorite color\
                    and it served as a catalyst in bonding with my niece.\
                My hobbies include playing amateur Pickleball and Badminton. \
                I love watching documentaries and shows based on true stories on Netflix. \
                I am an amazing cook when it comes to Indian cuisine!\
                I also love to sketch and work behind the pottery wheel. ",
                            "type": "text",
                            "isHeader": "false"
                            }
                        ]
                        }
                    ]
                    }
    res.json(jsonData);
});

app.get('/api/project', (req, res) => {

    // looks for page_number in the query string. if not found set default to 1. 
    const pageNumber = parseInt(req.query.page_number) || 1;
    const pageSize = 10; // Number of items per page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // write code to fetch data from mysql database where project table name is project
    const fs = require('fs');
    const path = require('path');
    const mariadb = require('mariadb');

    // Read config file
    const configPath = path.join(__dirname, 'sql_config', 'sql_connection.config');
    const configContent = fs.readFileSync(configPath, 'utf8');

    // Parse config file
    const config = {};
    configContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) config[key.trim()] = value.trim();
    });


    // Create MySQL connection
    const pool = mariadb.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
    });

    const query = ' SELECT \
                        project.project_id \
                        , project.short_desc\
                        , project.long_desc\
                        , images.image_name\
                        , user.user_firstname\
                        , user.user_lastname\
                        , user.user_middlename\
                        , user.user_email \
                    FROM \
                        project \
                        ,project_team \
                        ,user \
                        ,images \
                    WHERE \
                        project.project_id = project_team.project_id \
                        AND images.image_id = project.project_image_id \
                        AND project.project_id=project_team.project_id \
                    LIMIT ' + pageSize + ' OFFSET ' + startIndex;
    

    pool.getConnection()
        .then(conn => {
            return conn.query(query)
            .then(results => {
                console.log(results);
                results.forEach(row => {
                if (row.image) {
                    row.image = row.image.toString('base64');
                }
                });
                res.json(results);
                conn.end();
            })
            .catch(err => {
                // handle error
                conn.end();
            });
        })
        .catch(err => {
            console.log('ERROR:10003: Database connection error. Contact rohitrajagarwal@gmail.com with error code.')
            //conn.end();
    });
});

app.get('/api/test', (req, res) => {
    const jsonData = {
                    "homepage": [
                        {
                        "mainpage_component" : [
                            {
                            "content": "headshot.png",
                            "type": "image",
                            "isHeader": "true"
                            },
                            {
                            "content": "adfasdfasdfasdf",
                            "type": "text",
                            "isHeader": "true"
                            }
                        ]
                        },
                        {
                        "mainpage_component" : [
                            {
                            "content": "career_path.png",
                            "type": "image",
                            "isHeader": "false"
                            },
                            {
                            "content": "qwerqwerqwerqwer",
                            "type": "text",
                            "isHeader": "false"
                            }
                        ]
                        
                        },
                        {
                        "mainpage_component" : [
                            {
                            "content": "career_path.png",
                            "type": "image",
                            "isHeader": "false"
                            },
                            {
                            "content": "qwerqwerqwerqwer",
                            "type": "text",
                            "isHeader": "false"
                            }
                        ]
                        }
                    ]
                    }
    res.json(jsonData);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});