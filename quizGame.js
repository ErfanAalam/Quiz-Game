const ques = document.querySelector("#question")
const options = document.querySelectorAll("p")
const timer = document.querySelector("#timer")
const wrapper = document.querySelector("#wrapper")
const btn = document.querySelector("button")
const tracker = document.querySelectorAll("h3")


const questions = [
    {
        que: "Which planet is known as the Red Planet?",
        a: "Mars",
        opt: ["Venus", "Mars", "Saturn", "Mercury"]
    },
    {
        que: "what is the Capital of India",
        a: "Delhi",
        opt: ["Delhi", "Goa", "Chandigarh", "Haryana"]
    },
    {
        que: "Which color is not there in the rainbow?",
        a: "Brown",
        opt: ["Indigo", "Red", "Brown", "Yellow"]
    },
    {
        que: "How many rings appear on the Olympic flag?",
        a: "5",
        opt: [8, 5, 6, 4]
    },
    {
        que: "In which country is the Taj Mahal situated?",
        a: "India",
        opt: ["India", "Japan", "Pakistan", "France"]
    },
    {
        que: "Which planet is the 3rd closest to the sun?",
        a: "Earth",
        opt: ["Mercury", "Venus", "Earth", "Mars"]
    },
    {
        que: "What is the smallest country in the world by land area?",
        a: "Vatican City",
        opt: ["Vatican City", "Nauru","Monaco", "Pakistan"]
    },
    {
        que: "How many colours are there in a rainbow?",
        a: "Seven",
        opt: ["Seven", "Eight", "Six", "Nine"]
    },
]

// function of displaying questions

let queNo = 0
const displayque = () => {
    ques.innerHTML = questions[queNo].que

    tracker.forEach((t, index) => {
        if (index === queNo) {
            t.classList.add("current")
        } else {
            t.classList.remove("current")
        }
    })

    displayopt(questions[queNo].opt)
    queNo++
}

// function of displaying options
const displayopt = (arr) => {
    options.forEach((option, index) => {
        option.innerHTML = arr[index]
        option.addEventListener("click", handleOptionClick);
    })
}


// function for the timer
const counter = () => {
    let count = 5
    timer.innerHTML = count
    let timerInterval = setInterval(() => {
        count--
        timer.innerHTML = count
        if (count == 1) {
            clearInterval(timerInterval)
            count = 5
        }
    }, 1000);
}

let ans = 0
let result = 0
// options.forEach((option) => {
//     option.addEventListener("click", (e) => {
//         console.log(ans);
//         if (e.target.innerHTML == questions[ans].a) {
//             ans++
//             option.classList.add("correct")
//             result++
//         } else {
//             ans++
//             option.classList.add("incorrect")
//         }
//     })
// })


// function for checking answer and updating result and also disable other options after clicking one opton

const handleOptionClick = (e) => {
    const clickedOption = e.target;
    const selectedAnswer = clickedOption.innerHTML;

    if (selectedAnswer === questions[ans].a) {
        clickedOption.classList.add("correct");
        result++;
    } else {
        clickedOption.classList.add("incorrect");
    }

    options.forEach((option) => {
        option.removeEventListener("click", handleOptionClick);
    });
}


btn.addEventListener("click", startGame)

// main logic
displayque()
function startGame() {
    counter()
    let queInterval = setInterval(() => {
        ans++
        if (queNo > questions.length - 1) {
            clearInterval(queInterval)
            localStorage.setItem("result", result)
            finalresult = localStorage.getItem("result")
            wrapper.style.cssText = "background:linear-gradient(to left,#7b1576d3,hsl(175.74deg 84.08% 39.41%)); padding: 20px;"
            wrapper.innerHTML = `Your final result out of ${questions.length} is : ${finalresult}`
        } else {
            displayque()
            options.forEach((x) => {
                x.classList.remove("correct", "incorrect")
            })
            counter()
        }

    }, 5000);
}

