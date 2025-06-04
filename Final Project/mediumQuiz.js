const quizData = [
    {
        question: "A series of instructions designed to accomplish a specialized task",
        options: ["Algorithm", "Operation", "Procedural Programming", "Data Structures"],
        answer: "Algorithm"
    },
    {
        question: "What is the primary piece of hardware in a computer?",
        options: ["RAM", "Processor", "CPU", "DNS"],
        answer: "CPU"
    },
    {
        question: "Which of the following best describes Object Oriented Programming?",
        options: ["Instance of a class containing data and methods", "A debugging tool", "A compiled program",
            "A line of code"
        ],
        answer: "Instance of a class containing data and methods"
    },
    {
        question: "MySQL, Oracle, PostgreSQL, MariaDB are all examples of what?",
        options: ["Procedural Programming", "Data Structures", "Libraries", "Databases"],
        answer: "Databases"
    },
    {
        question: "A method for organizing stored data so it can be accessed at a later time is called what?",
        options: ["Data Structures", "Algoritm", "Binary Search", "Data monitoring"],
        answer: "Data Structures"
    }
    
];




const questionID = document.getElementById("question");
const optionsID = document.getElementById("options");

//Records the user's name
let userName = prompt("Please enter your first name:");

//Keeps track of the player's score
let score = 0;

//Keeps track of the question being answered.
let currentQuestion = 0;

//Presents the questions onto the screen
function loadQuiz(){
    //Variable that  tracks the current question number
    const question = quizData[currentQuestion];

    //Sets the content of questionID to the actual question text from quizData
    questionID.innerText = question.question;

    //Clears out pre-existing content in optionsID
    optionsID.innerHTML = "";

    //Loops through each option from quizData's option array
    question.options.forEach(option => {
        const opButton = document.createElement("button"); //creates new button for option
        opButton.innerText = option; //options text displayed in the button
        opButton.addEventListener("click", () => chooseAnswer(opButton.innerText)); //calls chooseAnswer() function
        optionsID.appendChild(opButton); //adds button to optionsID so it shows up on the page
    });
}

function chooseAnswer(userChoice){
    //Checks to see if student's choice matches the correct answer
    if(userChoice === quizData[currentQuestion].answer){
        score++;

    }
    //Moves onto the next question
    currentQuestion++;

    //Brings up next question if there are more left
    if(currentQuestion < quizData.length){
        loadQuiz();
    }
    else{
        totalScore();
    }
}

//Prints out the student's final score
/**This function will eventually need some more added to it in order
 * to work with the API Gateway
 */
function totalScore(){
    //Will eventually be used to store player information
    const result = {
        name: userName,
        score: score,
        total: quizData.length
    }

    //API Implementation down below
    const apiURL = "https://h0itr8knm8.execute-api.us-east-1.amazonaws.com/test"

    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(result)
    })

    .then(response => response.json())
    .then(data => {
        console.log("Response coming from POST:", data);

        document.querySelector(".quizContainer").innerHTML = `
            <h1>Quiz Completed.</h1>
            <p>Final Score: ${score}/${quizData.length}</p>
            <p>Your score was submitted successfully!</p>
        `;

    })

    .catch(error => {
        console.error("Response coming from POST:", error);

        document.querySelector(".quizContainer").innerHTML = `
            <h1>Quiz Completed.</h1>
            <p>Final Score: ${score}/${quizData.length}</p>
            <p>There was a problem submitting your results. Please try again later.</p>
        `;
    });
} 

loadQuiz();