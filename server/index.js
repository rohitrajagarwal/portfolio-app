const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const fs = require('fs');

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

const mariadb = require('mariadb');

// Input validation middleware
const validateContactForm = (req, res, next) => {
    const { name, email, message } = req.body;
    
    // Check if all fields are present
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Validate name (only letters and spaces, 2-50 characters)
    const namePattern = /^[A-Za-z\s]{2,50}$/;
    if (!namePattern.test(name.trim())) {
        return res.status(400).json({ error: 'Name must contain only letters and spaces (2-50 characters)' });
    }
    
    // Validate email
    const emailPattern = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.trim())) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
    // Validate message (300 characters max, allow letters, numbers, spaces, and common punctuation)
    const messagePattern = /^[A-Za-z0-9\s.,!?@#\$%&*()\-_'";:]{1,300}$/;
    if (!messagePattern.test(message.trim())) {
        return res.status(400).json({ error: 'Message contains invalid characters or exceeds 300 characters' });
    }
    
    // Sanitize inputs by trimming whitespace
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.message = message.trim();
    
    next();
};

// Rate limiting middleware (simple implementation)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max 5 contact form submissions per 15 minutes

const rateLimitContactForm = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requestCounts.has(clientIp)) {
        requestCounts.set(clientIp, []);
    }
    
    const requests = requestCounts.get(clientIp);
    // Filter out old requests
    const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    
    recentRequests.push(now);
    requestCounts.set(clientIp, recentRequests);
    
    next();
};

// Pagination validation middleware
const validatePagination = (req, res, next) => {
    const pageNumber = parseInt(req.query.page_number);
    
    if (req.query.page_number && (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 1000)) {
        return res.status(400).json({ error: 'Invalid page number. Must be between 1 and 1000.' });
    }
    
    next();
};

// Read config file
const configPath = path.join(__dirname, 'sql_config', 'sql_connection.config');

const configContent = fs.readFileSync(configPath, 'utf8');
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
    database: config.DB_NAME,
    connectionLimit: parseInt(config.CONN_LIMIT) || 10,
    acquireTimeout: parseInt(config.ACQ_TIMEOUT) || 60000,
    timeout: parseInt(config.TIMEOUT) || 60000,
    allowPublicKeyRetrieval: config.ALLOW_PK_RETRIEVAL === 'true',
    ssl: config.SSL === 'true'
});

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
                            "content": {"heading": "Rohit Agarwal", "para":"I am a designer...<br/>\
                                                                                ...a developer<br/>\
                                                                                ...a program manager<br/>\
                                                                                ...a leader <br/>\
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

// Helper function to format dates
const formatDate = (dateString, isEndDate = false) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    
    // If it's an end date and the date is in the future, return "Present"
    if (isEndDate && date > now) {
        return "Present";
    }
    
    // Format as "Month, Year"
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
};

app.get('/api/education', (req, res) => {


    /*
    from the table definitions below: 
    CREATE TABLE education_history(
	edu_id INT AUTO_INCREMENT,
	edu_institution VARCHAR(100),
	edu_start DATE NOT NULL,
	edu_end DATE NOT NULL,
	edu_degree VARCHAR(100),
	edu_location VARCHAR(50),
	PRIMARY KEY (edu_id)
);

CREATE TABLE courses (
	course_id VARCHAR(10) NOT NULL, 
	edu_id INT NOT NULL,
	course_title VARCHAR(60) NOT NULL,
	course_desc VARCHAR(1000) NOT NULL,
	scores FLOAT NOT NULL,
	units INT NOT NULL,
	PRIMARY KEY (course_id, edu_id),
	FOREIGN KEY (edu_id) REFERENCES education_history(edu_id) ON DELETE CASCADE
);

    write the code to fetch education history along with a list of courses and convert it to JSON object format same as jsonData below:
    */

    pool.getConnection() 
    .then(conn => {
        const query = `            SELECT 
                eh.edu_id, eh.edu_institution, eh.edu_start, eh.edu_end, eh.edu_degree, eh.edu_location,
                c.course_id, c.course_title, c.course_desc, c.scores, c.units, c.show_in_ui,
                CASE 
                    WHEN c.units < 10 THEN c.scores 
                    ELSE NULL 
                END as gpa,
                CASE 
                    WHEN c.units >= 10 THEN c.scores 
                    ELSE NULL 
                END as percentage
            FROM education_history eh
            LEFT JOIN courses c ON eh.edu_id = c.edu_id
            ORDER BY eh.edu_id, c.course_id;`;  
        return conn.query(query).then(results => {
            conn.end(); // Close connection after query
            return results;
        });
    })
    .then(results => {
        const educationData = [];
        let currentEdu = null;  
        results.forEach(row => {
            if (!currentEdu || currentEdu.edu_id !== row.edu_id) {
                if (currentEdu) {
                    educationData.push(currentEdu);
                }
                currentEdu = {
                    edu_id: row.edu_id,
                    edu_institution: row.edu_institution,
                    edu_start: row.edu_start,
                    edu_end: row.edu_end,
                    edu_degree: row.edu_degree,
                    edu_location: row.edu_location,
                    courses: []
                };
            }
            if (row.course_id) {
                currentEdu.courses.push({
                    course_id: row.course_id,
                    course_title: row.course_title,
                    course_desc: row.course_desc,
                    scores: row.scores,
                    units: row.units,
                    show_in_ui: row.show_in_ui
                });
            }
        });
        if (currentEdu) {
            educationData.push(currentEdu);
        }   
        // Convert to JSON format
        const jsonData = {
            "education": educationData.map(edu => {
                // Calculate weighted GPA (for courses with units < 10 and scores > 0)
                const gpaCourses = edu.courses.filter(course => course.units < 10 && course.scores > 0);
                const avgGPA = gpaCourses.length > 0 
                    ? gpaCourses.reduce((sum, course) => sum + (course.scores * course.units), 0) / 
                      gpaCourses.reduce((sum, course) => sum + course.units, 0)
                    : null;
                
                // Calculate weighted average percentage (for courses with units >= 10 and scores > 0)
                const percentageCourses = edu.courses.filter(course => course.units >= 10 && course.scores > 0);
                const avgPercentage = percentageCourses.length > 0 
                    ? (percentageCourses.reduce((sum, course) => sum + course.scores, 0) / 
                       percentageCourses.reduce((sum, course) => sum + course.units, 0)) * 100
                    : null;
                
                return {
                    "degree": edu.edu_degree,
                    "institution": edu.edu_institution,
                    "location": edu.edu_location,
                    "start": formatDate(edu.edu_start),
                    "end": formatDate(edu.edu_end, true),
                    "gpa": avgGPA,
                    "percentage": avgPercentage,
                    "courses": edu.courses
                        .filter(course => course.show_in_ui === true || course.show_in_ui === 1)
                        .map(course => ({
                            "course_id": course.course_id,
                            "course_title": course.course_title.replace(/\s+Theory\s*$/i, '').trim(),
                            "course_desc": course.course_desc,
                            "scores": course.scores,
                            "units": course.units
                        }))
                };
            })
        };
        
        res.json(educationData.length > 0 ? jsonData : { education: [] });
    })
    .catch(err => {
        console.error('Error fetching education data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});


app.get('/api/project', validatePagination, async (req, res) => {

    // looks for page_number in the query string. if not found set default to 1. 
    const pageNumber = parseInt(req.query.page_number) || 1;
    const pageSize = 10; // Number of items per page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
   
    // Optimized query: fetch all projects and their team members in one go
    const optimizedQuery = `
        SELECT 
            p.project_id as id,
            p.short_desc as short_desc,
            p.long_desc as long_desc,
            i.image_name as image_name,
            u.user_firstname,
            u.user_middlename,
            u.user_lastname
        FROM project p
        JOIN images i ON p.project_image_id = i.image_id
        LEFT JOIN project_team pt ON p.project_id = pt.project_id
        LEFT JOIN user u ON pt.team_member_id = u.user_id
        ORDER BY p.project_id DESC
        LIMIT ${pageSize} OFFSET ${startIndex} 
    `;

    let conn;
    try {
        conn = await pool.getConnection();
        const results = await conn.query(optimizedQuery);

        // Group results by project
        const projectMap = {};
        results.forEach(row => {
            if (!projectMap[row.id]) {
                projectMap[row.id] = {
                    id: row.id,
                    short_desc: row.short_desc,
                    long_desc: row.long_desc,
                    image_name: row.image_name,
                    team_members: []
                };
            }
            // Only add team member if there is a user
            if (row.user_firstname || row.user_middlename || row.user_lastname) {
                const name = [row.user_firstname, row.user_middlename, row.user_lastname].filter(Boolean).join(' ');
                projectMap[row.id].team_members.push(name);
            }
        });
        
        // Convert map to array
        const projectList = Object.values(projectMap).map(project => {
            return {
                ...project,
                team_members: project.team_members.join(', ')
            };
        });
        res.json({ project_list: projectList });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database query error' });
    } finally {
        if (conn) conn.end();
        //pool.end(); // Close the pool when done
    }
});

app.post('/api/submit-contact', rateLimitContactForm, validateContactForm, async (req, res) => {
    
    // Handle contact form submission logic here based on the form defined in ContactForm.js
    // save the contact details to the database

    // debug log
    //console.log("Contact form submission received:", req.body);
    const { name, email, message } = req.body; // Data is already validated and sanitized by middleware
    
    // add logic to save name, email and message to the database, make sure to sanitize the data before saving
    // use a prepared statement to prevent SQL injection
    const insertQuery = `INSERT INTO contact_form (contact_name, contact_email, contact_message) VALUES (?, ?, ?)`;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(insertQuery, [name, email, message]);
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        console.error('Error inserting contact form:', err);
        res.status(500).json({ error: 'Error submitting contact form' });
    } finally {
        if (conn) conn.end();
    }
});

// Catch-all handler: send back React's index.html file for client-side routing
// Only for non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});