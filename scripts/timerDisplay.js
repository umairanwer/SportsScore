// TIMER
let timerDisplay = document.querySelector(".timer-element");
timerDisplay.addEventListener("click", pausePlayTimer);
let timeout = null; // To store timeout object

//Initiate timer to 0
let minValue = 0;
let secValue = 0;
// localStorage.setItem("startTime", startTime); // Store it if I want to restart the timer on the next page
function startTimeCounter(startTime) {
    var now = Math.floor(Date.now() / 1000); // get the time now
    var diff = now - startTime; // diff in seconds between now and start
    minValue = Math.floor(diff / 60); // get minutes value (quotient of diff)
    secValue = Math.floor(diff % 60); // get seconds value (remainder of diff)


    // add a leading zero if it's single digit
    minDisplay = ("" + minValue).length < 2 ? "0" + minValue : minValue;
    secDisplay = ("" + secValue).length < 2 ? "0" + secValue : secValue;
    document.getElementById("timer-min").textContent = minDisplay; // update the element where the timer will appear
    document.getElementById("timer-sec").textContent = secDisplay; // update the element where the timer will appear
}
// Optional arguments to set a specific time
function pausePlayTimer(e, incMin = 0, setMinValue = minValue, setSecValue = secValue) {
    var startTime = Math.floor(Date.now() / 1000 - 0); //Get the starting time (right now) in seconds

    console.log(startTime);
    // If timer was previously running then offset time by that amout
    startTime = startTime - ((setMinValue + incMin) * 60 + setSecValue);

    startTimeCounter(startTime);
    if (timeout == null && e.target.parentNode.id !== "id-time-controller") {
        timeout = setInterval(startTimeCounter, 500, startTime); // set a timeout to update the timer
        timerDisplay.classList.remove("inactive");
    }
    else {
        clearInterval(timeout);
        timeout = null;
        timerDisplay.classList.add("inactive");
    }
}
document.querySelectorAll(".time-controller button").forEach(btn => btn.addEventListener("click", changeTime));
function changeTime(e) {
    //Stop Timer
    if (timeout != null) {
        clearInterval(timeout);
        timeout = null;
    }
    switch (e.target.id) {
        case "time-reset-btn":
            pausePlayTimer(e, 0, 0, 0);
            break;
        case "time-plus-1m-btn":
            pausePlayTimer(e, 1);
            break;
        case "time-1m-btn":
            pausePlayTimer(e, 0, 1, 0);
            break;
        case "time-2m-btn":
            pausePlayTimer(e, 0, 2, 0);
            break;
        case "time-5m-btn":
            pausePlayTimer(e, 0, 5, 0);
            break;
        default:
            break;
    }
}
