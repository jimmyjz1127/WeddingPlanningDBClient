// Invitation Data 
LOAD DATA LOCAL INFILE './server/Invitation_Data.csv' INTO TABLE invitation FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (code, address, date_sent);

// Dinner Table Data 
LOAD DATA LOCAL INFILE './server/DinnerTable_Data.csv' INTO TABLE dinner_table FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (table_no, capacity);

// Person Data 
LOAD DATA LOCAL INFILE './server/Person_Data.csv' INTO TABLE person FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (full_name, response, notes, invitation_code, table_no);

// Dietary Requirement Data 
LOAD DATA LOCAL INFILE './server/DietaryRequirement_Data.csv' INTO TABLE dietary_requirement FIELDS TERMINATED BY '|' ENCLOSED BY '"' LINES TERMINATED BY '\n' (short_name, description);

// Guest Diet Data 
LOAD DATA LOCAL INFILE './server/GuestDiet_Data.csv' INTO TABLE guest_diet FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' (person_id, dietary_requirement_name);