let teamOneScore = 0;
let teamTwoScore = 0;
let currentHalf = 1;

document.querySelector("#team1-dec").addEventListener("click", changeTeamOneScore);
document.querySelector("#team1-inc").addEventListener("click", changeTeamOneScore);
document.querySelector("#t1-score").addEventListener("click", changeTeamOneScore);

document.querySelector("#team2-dec").addEventListener("click", changeTeamTwoScore);
document.querySelector("#team2-inc").addEventListener("click", changeTeamTwoScore);
document.querySelector("#t2-score").addEventListener("click", changeTeamTwoScore);

let halfDecBtn = document.querySelector("#half-dec");
let halfIncBtn = document.querySelector("#half-inc");
let halfNumDisplay = document.querySelector("#half-number");

if (halfDecBtn != null || halfIncBtn != null) {
    halfDecBtn.addEventListener("click", changeHalf);
    halfIncBtn.addEventListener("click", changeHalf);
    halfNumDisplay.addEventListener("click", changeHalf);
}

function changeTeamOneScore(e) {
    if (e.target.id === "team1-dec" && teamOneScore > 0)
        teamOneScore--;
    else if (e.target.id !== "team1-dec")
        teamOneScore++;
    updateScoreValues();
}
function changeTeamTwoScore(e) {
    if (e.target.id === "team2-dec" && teamTwoScore > 0)
        teamTwoScore--;
    else if (e.target.id !== "team2-dec")
        teamTwoScore++;
    updateScoreValues();
}

function changeHalf(e) {
    if (e.target.id === "half-dec" && currentHalf > 1)
        currentHalf--;
    else if (e.target.id !== "half-dec")
        currentHalf++;
    updateScoreValues();
}

function updateScoreValues() {
    document.querySelector("#t1-score").textContent = teamOneScore;
    document.querySelector("#t2-score").textContent = teamTwoScore;

    if (halfDecBtn != null || halfIncBtn != null)
        document.querySelector("#half-number").textContent = currentHalf;
}

function resetScores() {
    teamOneScore = 0;
    teamTwoScore = 0;
    updateScoreValues();
}

//PLAYER LISTS

const teamOnePlayersArr = [];
const teamTwoPlayersArr = [];
let teamOneSer = 0;
let teamTwoSer = 0;


function addTeamPlayer(playerName, teamChoice, isPlaying = false) {
    var newPlayer;
    if (teamChoice == 1) {
        var playerID = teamOneSer++;
    }
    if (teamChoice == 2) {
        var playerID = teamTwoSer++;
    }
    newPlayer = {
        "playerName": playerName,
        "isPlaying": isPlaying,
        "seqIndex": -1,
        "id": "item-t" + teamChoice + "-" + playerID,
        "idNum": playerID,
        "team": teamChoice
    }
    if (teamChoice == 1) {
        teamOnePlayersArr.push(newPlayer);
        teamOneDOM = document.querySelector("#team-1-container");
        updateArraySeq(teamOnePlayersArr);
        updateTeamsDisplay(teamOneDOM, teamOnePlayersArr);
    }
    else if (teamChoice == 2) {
        teamTwoPlayersArr.push(newPlayer);
        teamTwoDOM = document.querySelector("#team-2-container");
        updateArraySeq(teamTwoPlayersArr);
        updateTeamsDisplay(teamTwoDOM, teamTwoPlayersArr);
    }
}

function updateArraySeq(teamArr) {
    for (var i in teamArr) {
        teamArr[i]["seqIndex"] = i;
    }
    //console.log(teamArr);
}

const playerItemTemplate = document.querySelector(".player-item");

function updateTeamsDisplay(teamDOM, teamArr) {
    let playingContainer = teamDOM.querySelector(".playing-container");
    let benchContainer = teamDOM.querySelector(".bench-container");

    //clearing the player list from DOM
    while (playingContainer.children.length > 0) {
        playingContainer.lastChild.remove();
    }
    while (benchContainer.children.length > 0) {
        benchContainer.lastChild.remove();
    }

    for (player of teamArr) {
        //Deep clone the template node and remove '.template' to display it
        var newItem = playerItemTemplate.cloneNode(true);
        newItem.classList.remove('template');

        newItem.querySelector('.player-name').value = player.playerName;
        newItem.id = player.id;
        newItem.dataset.idnum = player.idNum;
        newItem.dataset.team = player.team;

        if (player.isPlaying) {
            newItem.classList.add('is-playing');
            playingContainer.appendChild(newItem);
        }
        else {
            newItem.classList.remove('is-playing');
            benchContainer.appendChild(newItem);
        }
    }

    //Update playing and benched number of players
    document.querySelector("#team1-playing")
        .textContent = teamOnePlayersArr.filter(player => player.isPlaying).length;
    document.querySelector("#team1-benched")
        .textContent = teamOnePlayersArr.filter(player => !player.isPlaying).length;
    document.querySelector("#team2-playing")
        .textContent = teamTwoPlayersArr.filter(player => player.isPlaying).length;
    document.querySelector("#team2-benched")
        .textContent = teamTwoPlayersArr.filter(player => !player.isPlaying).length;

    updateEventListeners();
}

//Input Player Names
let pageContainsPlayerList = true;
const team1InputField = document.querySelector("#team-1-player-input");
if (team1InputField !== null) {
    team1InputField.addEventListener("keypress",
        (e) => {
            if (e.keyCode == 13 && team1InputField.value != "") {
                addTeamPlayer(team1InputField.value, 1, true);
                team1InputField.value = "";
            }
        });
}
else
    pageContainsPlayerList = false;

const team2InputField = document.querySelector("#team-2-player-input");
if (team2InputField !== null) {
    team2InputField.addEventListener("keypress",
        (e) => {
            if (e.keyCode == 13 && team2InputField.value != "") {
                addTeamPlayer(team2InputField.value, 2, true);
                team2InputField.value = "";
            }
        });
}
// Sub Players

function updateEventListeners() {
    const subInBtns = document.querySelectorAll("#sub-in-btn");
    const subOutBtns = document.querySelectorAll("#sub-out-btn");
    const delBtns = document.querySelectorAll("#del-btn");
    const playerNames = document.querySelectorAll(".player-name");

    subInBtns.forEach(btn => btn.addEventListener("click", substitute));
    subOutBtns.forEach(btn => btn.addEventListener("click", substitute));
    delBtns.forEach(btn => btn.addEventListener("click", deletePlayer));
    playerNames.forEach(player => player.addEventListener("input", updateName));
}
updateEventListeners();

function substitute(e) {
    const clickedPlayer = e.target.closest(".player-item");
    const playerIdNum = parseInt(clickedPlayer.dataset.idnum);
    const playerTeam = clickedPlayer.dataset.team;
    let setIsPlaying = false;
    if (e.target.id === "sub-in-btn")
        setIsPlaying = true;
    else if (e.target.id === "sub-out-btn")
        setIsPlaying = false;

    if (playerTeam === '1') {
        for (let key in teamOnePlayersArr) {
            if (teamOnePlayersArr[key]['idNum'] === playerIdNum) {
                teamOnePlayersArr[key].isPlaying = setIsPlaying;
                updateTeamsDisplay(teamOneDOM, teamOnePlayersArr);
                break;
            }
        }
    }
    else if (playerTeam === '2') {
        for (let key in teamTwoPlayersArr) {
            if (teamTwoPlayersArr[key]['idNum'] === playerIdNum) {
                teamTwoPlayersArr[key].isPlaying = setIsPlaying;
                updateTeamsDisplay(teamTwoDOM, teamTwoPlayersArr);
                break;
            }
        }
    }
}

//Deletes player from array and DOM

function deletePlayer(e) {
    const clickedPlayer = e.target.closest(".player-item");
    const playerIdNum = parseInt(clickedPlayer.dataset.idnum);
    const playerTeam = clickedPlayer.dataset.team;

    if (playerTeam === '1') {
        for (let key in teamOnePlayersArr) {
            if (teamOnePlayersArr[key]['idNum'] === playerIdNum) {
                teamOnePlayersArr.splice(key, 1);
                updateTeamsDisplay(teamOneDOM, teamOnePlayersArr);
                break;
            }
        }
    }
    else if (playerTeam === '2') {
        for (let key in teamTwoPlayersArr) {
            if (teamTwoPlayersArr[key]['idNum'] === playerIdNum) {
                teamTwoPlayersArr.splice(key, 1);
                updateTeamsDisplay(teamTwoDOM, teamTwoPlayersArr);
                break;
            }
        }
    }
}

// Save any edited name in respective array
function updateName(e) {
    const clickedPlayer = e.target.closest(".player-item");
    const playerIdNum = parseInt(clickedPlayer.dataset.idnum);
    const playerTeam = clickedPlayer.dataset.team;

    if (playerTeam === '1') {
        for (let key in teamOnePlayersArr) {
            if (teamOnePlayersArr[key]['idNum'] === playerIdNum) {
                teamOnePlayersArr[key].playerName = clickedPlayer.querySelector(".player-name").value;
                break;
            }
        }
    }
    else if (playerTeam === '2') {
        for (let key in teamTwoPlayersArr) {
            if (teamTwoPlayersArr[key]['idNum'] === playerIdNum) {
                teamTwoPlayersArr[key].playerName = clickedPlayer.querySelector(".player-name").value;
                break;
            }
        }
    }
}

if (pageContainsPlayerList) {
    addTeamPlayer("Ronaldo (edit)", 1, true);
    addTeamPlayer("Bale (edit)", 1, false);
    addTeamPlayer("Messi (edit)", 2, true);
    addTeamPlayer("Salah (edit)", 2, false);
}



//FIXTURE DISPLAY

let fixturesArr = [];
let fixtureOuterContainer = document.querySelector(".fixtures-outer-container");
let fixtureTemplate = document.querySelector(".fixture-element");
let fixtureSerSeq = 0;

//Check and load, if fixtures were stored previously
if (localStorage.getItem("fixturesArr") != null) {
    fixturesArr = JSON.parse(localStorage.getItem("fixturesArr"));
    console.log(fixturesArr);
    fixtureSerSeq = fixturesArr.length;

    fixturesArr.forEach(fixtureObj => createFixtureDOMElm(fixtureObj));
}
else{
    createNewFixtureObj();
}

document.querySelector("#add-fixture-btn-id").addEventListener("click", createNewFixtureObj);

function createNewFixtureObj(e) {
    fixtureSerSeq++;
    let newFixtureObj = {
        fixtureDate: 1,
        fixtureMonth: 1,
        team1: "",
        team1Score: "",
        team2: "",
        team2Score: "",
        id: `fixture-item-${fixtureSerSeq}`
    };
    //To be used to reverse search from DOM
    newFixtureObj[`fixture-item-${fixtureSerSeq}`] = fixtureSerSeq;

    fixturesArr.push(newFixtureObj);
    createFixtureDOMElm(newFixtureObj);
}

function createFixtureDOMElm(fixtureObj) {
    let newFixtureElm = fixtureTemplate.cloneNode(true);
    newFixtureElm.classList.remove("template");
    newFixtureElm.id = fixtureObj['id'];

    newFixtureElm.querySelector(
        "#fixture-elm-date-id").value = fixtureObj.fixtureDate;
    newFixtureElm.querySelector(
        "#fixture-elm-month-id").value = fixtureObj.fixtureMonth;

    newFixtureElm.querySelector(
        "#fixture-elm-team1-name").value = fixtureObj.team1;
    newFixtureElm.querySelector(
        "#fixture-elm-team1-score").value = fixtureObj.team1Score;

    newFixtureElm.querySelector(
        "#fixture-elm-team2-name").value = fixtureObj.team2;
    newFixtureElm.querySelector(
        "#fixture-elm-team2-score").value = fixtureObj.team2Score;


    //Add event listeners
    newFixtureElm.querySelectorAll("input")
        .forEach((input) =>
            input.addEventListener("change", updateArrObj));
    newFixtureElm.querySelector("select").addEventListener("change", updateArrObj);
        newFixtureElm.querySelector(".del-fixture-btn").addEventListener("click", deleteFixture);

    fixtureOuterContainer.appendChild(newFixtureElm);
}

// Update object in array based on user changes in DOM
function updateArrObj(e) {
    let fixtureElmContainer = e.target.closest(".fixture-element");
    let idContainer = fixtureElmContainer.id;

    let objectToUpdate = null;

    //Search all objects for the one which is edited by user
    fixturesArr.forEach(fixtureObj => {
        if (Object.keys(fixtureObj).includes(idContainer))
            objectToUpdate = fixtureObj;
    });


    if (objectToUpdate != null) {
        objectToUpdate.fixtureDate = fixtureElmContainer.querySelector(
            "#fixture-elm-date-id").value;
        objectToUpdate.fixtureMonth = fixtureElmContainer.querySelector(
            "#fixture-elm-month-id").value;
        objectToUpdate.team1 = fixtureElmContainer.querySelector(
            "#fixture-elm-team1-name").value;
        objectToUpdate.team1Score = fixtureElmContainer.querySelector(
            "#fixture-elm-team1-score").value;
        objectToUpdate.team2 = fixtureElmContainer.querySelector(
            "#fixture-elm-team2-name").value;
        objectToUpdate.team2Score = fixtureElmContainer.querySelector(
            "#fixture-elm-team2-score").value;
    }
    updateLocalStorage();
}

function deleteFixture(e) {
    let fixtureElmContainer = e.target.closest(".fixture-element");
    let idContainer = fixtureElmContainer.id;

    let objectToDelete = null;

    let idToRemove = "";
    //Search all objects for the one which is edited by user
    fixturesArr.forEach(fixtureObj => {
        if (Object.keys(fixtureObj).includes(idContainer))
            objectToDelete = fixtureObj;
    });
    if(objectToDelete != null){
        idToRemove = objectToDelete.id;
        for(let i=0; i<fixturesArr.length; i++){
            if(fixturesArr[i] === objectToDelete){
                fixturesArr.splice(i,1);
                fixtureOuterContainer.removeChild(document.querySelector(`#${idToRemove}`))
                break;
            }
        }
    }
    localStorage.setItem("fixturesArr", JSON.stringify(fixturesArr));
}

function updateLocalStorage() {
    localStorage.setItem("fixturesArr", JSON.stringify(fixturesArr));

}
