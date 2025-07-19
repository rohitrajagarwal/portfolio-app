const express = require('express');
const app = express();
const path = require('path');
const PORT = 3002;
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/api/home', (req, res) => {
    console.log(path.join(__dirname, 'public', 'html', 'home.html'));
    // Paths to your HTML snippets
    const topPath = path.join(__dirname, 'public', 'html', 'page-commons-top.html');
    const homePath = path.join(__dirname, 'public', 'html', 'home.html');
    const bottomPath = path.join(__dirname, 'public', 'html', 'page-commons-bottom.html');
    // Check if the files exist
    if (!fs.existsSync(topPath) || !fs.existsSync(homePath) || !fs.existsSync(bottomPath)) {
        return res.status(404).send('Internal Server Error: Contact rohitrajagarwal@gmail.com with Error Code: 10001');
    // Read and combine the files
    }
    // Error Code: 10001 - Internal Server Error will be reported if anything goes wrong with this module. 
    try {
        const topHtml = fs.readFileSync(topPath, 'utf8');
        const homeHtml = fs.readFileSync(homePath, 'utf8');
        const bottomHtml = fs.readFileSync(bottomPath, 'utf8');
        const fullHtml = topHtml + homeHtml + bottomHtml;
        
        res.send(fullHtml);
    } catch (err) {
        res.status(500).send('Error loading page');
    }

});

*/

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
    // 
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