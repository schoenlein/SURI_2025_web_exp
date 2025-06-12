CREATE TABLE data_log(
prim_subject DEC(65,10) PRIMARY KEY,
workerID MEDIUMTEXT,
subjectID DEC(65,0),
dateInfo MEDIUMTEXT,
conditionProto DEC(65,0), 
success MEDIUMTEXT,
trial_type MEDIUMTEXT,
trial_index DEC(65,0),
time_elapsed DEC(65,0),
internal_node_id MEDIUMTEXT,
rt DEC(65,2),
responses MEDIUMTEXT,
question_order MEDIUMTEXT,
stimulus MEDIUMTEXT,
button_pressed DEC(65,0),
key_press DEC(65,0),
correct MEDIUMTEXT,
correctLetter MEDIUMTEXT,
response DEC(65,0),
prompt MEDIUMTEXT,
targetSide MEDIUMTEXT, 
colorNameProbed MEDIUMTEXT,
colorCatOrder MEDIUMTEXT,
nameArray MEDIUMTEXT,
feedbackTrial DEC(65,0)
); 

CREATE TABLE condition_log(
rowID INT AUTO_INCREMENT PRIMARY KEY, 
subjectID DEC(10,0), 
assignedCondition DEC(3,0)
);

CREATE TABLE register_log(
rowID INT AUTO_INCREMENT PRIMARY KEY,
workerID MEDIUMTEXT,
completionCode MEDIUMTEXT
); 

CREATE TABLE completion_log(
rowID INT AUTO_INCREMENT PRIMARY KEY,
workerID MEDIUMTEXT
); 