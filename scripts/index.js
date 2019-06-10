let trackTitleInput = document.querySelector("input[name=trackTitle]");
let artistInput = document.querySelector("input[name=artist]");
let bpmInput = document.querySelector("input[name=bpm]");
let keyInput = document.querySelector("input[name=key]");
let tableDiv = document.querySelector(".tableDiv");
let showListBtn = document.querySelector(".showList");
let trackListTable = document.querySelector(".trackListTable");
let trackListForm = document.querySelector(".trackInfoInput");
let trackAddedSpan = document.querySelector(".trackAddedSpan");

let tracksArr = [];

let propsSortable = {
    draggable: ".sort",
    handle: ".sort",
    group: "sorting",
    sort: true,
    ghostClass: "sortable-ghost"
};


if (localStorage.length > 0) {
    var tracksItems = localStorage.getItem("tracks");
    var tracksItemsArr = JSON.parse(tracksItems);
    tracksArr = tracksItemsArr;
}

let generateList = track => {
    let tableRow = document.createElement("tr");
    let tableCellTitle = document.createElement("td");
    let tableCellArtist = document.createElement("td");
    let tableCellBPM = document.createElement("td");
    let tableCellKey = document.createElement("td");
    let deleteIcon = document.createElement("td");

    tableCellTitle.innerText = track.trackTitle;
    tableCellArtist.innerText = track.artist;
    tableCellBPM.innerText = track.bpm;
    tableCellKey.innerText = track.key;
    deleteIcon.innerHTML = "<i class=\"fas fa-trash-alt\"></i>";

    tableRow.classList.add("sort");

    new Sortable(trackListTable, propsSortable);
    trackListTable.appendChild(tableRow);
    tableRow.appendChild(tableCellTitle);
    tableRow.appendChild(tableCellArtist);
    tableRow.appendChild(tableCellBPM);
    tableRow.appendChild(tableCellKey);
    tableRow.appendChild(deleteIcon);

    deleteIcon.addEventListener("click", (event) => {
        tableRow.style.opacity = "0";
        setTimeout(() => {
            trackListTable.removeChild(tableRow);
            tracksArr.splice(tracksArr.indexOf(track), 1);
            localStorage.setItem('tracks', JSON.stringify(tracksArr));
        }, 700);
        event.stopPropagation();
    });
}


trackListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let trackInfo = {
        trackTitle: trackTitleInput.value,
        artist: artistInput.value,
        bpm: bpmInput.value,
        key: keyInput.value
    }
    tracksArr.push(trackInfo);
    localStorage.setItem('tracks', JSON.stringify(tracksArr));

    trackAddedSpan.style.opacity = "1";

    setTimeout(() => {
        trackAddedSpan.style.opacity = "0";
    }, 2000);

    if (tableDiv.classList.contains("showTable")) {
        generateList(tracksArr[tracksArr.length - 1]);
    }
});

showListBtn.addEventListener("click", () => {
    tableDiv.classList.toggle("showTable");

    if (tableDiv.classList.contains("showTable")) {
        showListBtn.innerText = "hide list";
        tracksArr.forEach(track => {
            generateList(track);
        });
    }
    else {
        showListBtn.innerText = "show list";
        while (trackListTable.childElementCount > 1) {
            trackListTable.removeChild(trackListTable.lastElementChild);
        }
    }
});
