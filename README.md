The main purpose of this project was to create a study tool that can be used by computer science students. There are a set of flashcards and three quizzes that students can use to study.
In order to save the user data from the quizzes, a few AWS services were used. The S3 bucket was used to store the files for the front-end of the application (HTML, CSS, JS). After that,
the JavaScript files will send a request to the REST API Gateway, which will then use POST methods in order to form a connection between front-end and back-end services of the application.
Once that is complete, the API request gets sent to the Node.js Lambda function which will then process the player's first name, score, and the total number of questions answered.
This information gets sent to an RDS instance where it is securely stored.
