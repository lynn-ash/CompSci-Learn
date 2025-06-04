//Array that contains the quiz questions, options, and answers
const quizData = [
    {
        question: "Test scores, weather recordings, and customer purchases are all examples of what?",
        options: ["Data", "API", "Machine Learning", "Variable"],
        answer: "Data"
    },
    {
        question: "When a certain block of code is executed until a certain condition is met, what is that called?",
        options: ["Function", "Database", "Loop", "Variable"],
        answer: "Loop"
    },
    {
        question: "When running a piece of code and it does not exectute properly, you have encountered a...",
        options: ["Semiconductor", "Loop", "Variable", "Bug"],
        answer: "Bug"

    },
    {
        question: "Java, Python, C++, and SQL are examples of what?",
        options: ["Databases", "Programming Languages", "Procedural Programming", "Data Structures"],
        answer: "Programming Languages"
    },
    {
        question: "A storage location in memory for a specific value is called what?",
        options: ["Variable", "Pointer", "Bit", "Byte"],
        answer: "Variable"
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