let teamOneScore = 0;
let teamTwoScore = 0;

document.querySelector("#team1-dec").addEventListener("click", changeTeamOneScore);
document.querySelector("#team1-inc").addEventListener("click", changeTeamOneScore);
document.querySelector("#t1-score").addEventListener("click", changeTeamOneScore);

document.querySelector("#team2-dec").addEventListener("click", changeTeamTwoScore);
document.querySelector("#team2-inc").addEventListener("click", changeTeamTwoScore);
document.querySelector("#t2-score").addEventListener("click", changeTeamTwoScore);



function changeTeamOneScore(e){
    if(e.target.id === "team1-dec" && teamOneScore > 0)
        teamOneScore--;
    else if (e.target.id !== "team1-dec")
        teamOneScore++;
    updateScoreValues();
}
function changeTeamTwoScore(e){
    if(e.target.id === "team2-dec" && teamTwoScore > 0)
        teamTwoScore--;
    else if (e.target.id !== "team2-dec")
        teamTwoScore++;
    updateScoreValues();
}

//Only show winning set btn after a threshold score
let winThreshhold = 9;
function updateScoreValues(){
    document.querySelector("#t1-score").textContent = teamOneScore;
    document.querySelector("#t2-score").textContent = teamTwoScore;

    //Display Winning Button after a certain score, and only on the player
    //with more score
    if(teamOneScore > winThreshhold && teamOneScore > teamTwoScore){
        document.querySelector("#t1-set-won").classList.remove("hidden-btn");
        document.querySelector("#t2-set-won").classList.add("hidden-btn");
    }
    else if(teamTwoScore > winThreshhold && teamOneScore < teamTwoScore){
        document.querySelector("#t2-set-won").classList.remove("hidden-btn");
        document.querySelector("#t1-set-won").classList.add("hidden-btn");
    }
    else{
        document.querySelector("#t1-set-won").classList.add("hidden-btn");
        document.querySelector("#t2-set-won").classList.add("hidden-btn");
    }
}

function resetScores(){
    teamOneScore = 0;
    teamTwoScore = 0;
    updateScoreValues();
}

// SET CHANGING

let teamOneSets = 0;
let teamTwoSets = 0;
let currentHalf = 1;

document.querySelector("#team1-set-dec").addEventListener("click", changeTeamOneSets);
document.querySelector("#team1-set-inc").addEventListener("click", changeTeamOneSets);
document.querySelector("#t1-sets").addEventListener("click", changeTeamOneSets);

document.querySelector("#team2-set-dec").addEventListener("click", changeTeamTwoSets);
document.querySelector("#team2-set-inc").addEventListener("click", changeTeamTwoSets);
document.querySelector("#t2-sets").addEventListener("click", changeTeamTwoSets);


function changeTeamOneSets(e){
    if(e.target.id === "team1-set-dec" && teamOneSets > 0)
        teamOneSets--;
    else if (e.target.id !== "team1-set-dec")
        teamOneSets++;
    updateSetValues();
}
function changeTeamTwoSets(e){
    if(e.target.id === "team2-set-dec" && teamTwoSets > 0)
        teamTwoSets--;
    else if (e.target.id !== "team2-set-dec")
        teamTwoSets++;
    updateSetValues();
}

function updateSetValues(){
    document.querySelector("#t1-sets").textContent = teamOneSets;
    document.querySelector("#t2-sets").textContent = teamTwoSets;

    currentHalf = teamOneSets + teamTwoSets+1;
    document.querySelector("#half-number").textContent = currentHalf;
}

//SET WINNING
let t1SetWonBtn = document.querySelector("#t1-set-won");
let t2SetWonBtn = document.querySelector("#t2-set-won");

t1SetWonBtn.addEventListener("click", (e) =>{
    teamOneSets++;
    updatePrevSetResult();
    resetScores();
    updateSetValues();
});

t2SetWonBtn.addEventListener("click", (e) =>{
    teamTwoSets++;
    updatePrevSetResult();
    resetScores();
    updateSetValues();
});

let outerContainerPrevSets = document.querySelector(".prev-sets-outer-container");
let prevSetTemplate = document.querySelector(".prev-set-container");
function updatePrevSetResult(){
    let t1SetEndScore = teamOneScore;
    let t2SetEndScore = teamTwoScore;

    let setResultContainer = prevSetTemplate.cloneNode(true);
    let t1ScorePElm = setResultContainer.querySelector("#t1-prev-score");
    let t2ScorePElm = setResultContainer.querySelector("#t2-prev-score");

    t1ScorePElm.textContent = t1SetEndScore;
    t2ScorePElm.textContent = t2SetEndScore;

    if(t1SetEndScore > t2SetEndScore){
        t1ScorePElm.classList.remove("loser-score");
    }
    else if(t2SetEndScore > t1SetEndScore){
        t2ScorePElm.classList.remove("loser-score");
    }

    setResultContainer.classList.remove("template");
    setResultContainer.querySelector(".del-prev-set-btn").addEventListener("click", delSetResult);

    outerContainerPrevSets.appendChild(setResultContainer);
}

//Delete a set result

function delSetResult(e){
    e.target.parentNode.remove();
}