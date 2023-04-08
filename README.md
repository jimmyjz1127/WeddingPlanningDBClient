# CS3101 Deliverable 2 : Wedding Planning Database 
## Author : 190015412 

## Usage 
    Note : this application uses Express.JS server and React.JS frontend.

    To launch application:
        1. In both "server" and "client" directories run     :  npm install 
        2. To start application, in "server" directory run   :  npm run dev 
        3. To view webpage, open browser and visit           :  http://localhost:3000

    Alternative Way to Launch Application:
        1. In "server" directory run                         : npm run server
        2. In "client" directory run                         : npm start 
        3. To view webpage, open browser and visit           : http://localhost:3000

    Configuration:
        To change what port the server runs on:
            1. In server/src/Config.js change variable "server_port" to desired port number 
            2. In client/src/Config.js change variable "port" to new server port number 
        
        To change what port the client runs on:
            1. In server/src/routes/Config.js change variable "client_port" to desired port number 
            2. In client/package.json change the line 
                    "start": "react-scripts start"  to  "start" : "PORT=<port number> react-scripts start"
    

## Files & Directories 
    Server Directories:
        1. CSV_Data         : contains CSV files containing data for each table (converted from the provided osd file)
        2. src/routes       : contains route handling files 

    Client Directories:
        1. node_modules     : contains dependencies (libraries)
        2. src/Assets       : contains media assets (images and icons)
        3. src/Components   : Contains ReactJS components 

    Server Src Files:
        1. app.js           : Runs the servers and configures the routes 
        2. queries.js       : Setsup and establishes connection with database 
        3. database.js      : contains all database query functions (prepared statement functions)
        4. databaseinit.txt : contains all DDL for setting up all tables, functions, procedures, and triggers
        5. routes/index.js  : contain all route handler functions 

## Database Data Population
### These are the statements I ran to load the given data into each database table

    1. Invitation Data
        LOAD DATA LOCAL INFILE './server/Invitation_Data.csv' INTO TABLE invitation FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (code, address, date_sent);

    2. Dinner Table Data
        LOAD DATA LOCAL INFILE './server/DinnerTable_Data.csv' INTO TABLE dinner_table FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (table_no, capacity);

    3. Person Data
        LOAD DATA LOCAL INFILE './server/Person_Data.csv' INTO TABLE person FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (full_name, response, notes, invitation_code, table_no);

    4. Dietary Requirement Data
        LOAD DATA LOCAL INFILE './server/DietaryRequirement_Data.csv' INTO TABLE dietary_requirement FIELDS TERMINATED BY '|' ENCLOSED BY '"' LINES TERMINATED BY '\n' (short_name, description);

    5. Guest Diet Data
        LOAD DATA LOCAL INFILE './server/GuestDiet_Data.csv' INTO TABLE guest_diet FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (person_id, dietary_requirement_name);

## For Remote Development (for myself not for grader)
    1. Run the following in terminal (setup SOCKS proxy)
        ssh -D 8123 -f -C -q -N jz75@jz75.host.cs.st-andrews.ac.uk

    2. Then run the following in terminal (connect to DB)
        ssh jz75.host.cs.st-andrews.ac.uk -L 3306:localhost:3306 -N
