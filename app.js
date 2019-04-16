var config = {
    apiKey: "AIzaSyCngW-_PDOSzmvTqN-sPPC3AbNoN_vFbzU",
    authDomain: "trainhomework-a2b45.firebaseapp.com",
    databaseURL: "https://trainhomework-a2b45.firebaseio.com",
    projectId: "trainhomework-a2b45",
    storageBucket: "trainhomework-a2b45.appspot.com",
    messagingSenderId: "758201931609"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#first-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();


    var newTrain = {
        name: trainName,
        location: destination,
        start: firstTime,
        rate: frequency,
        // minsAway: tMinutesTillTrain,
        // next: nextTrain
    };

    database.ref().push(newTrain);
    alert("Sucessfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    // var frequency = $("#frequency-input").val().trim();
    var frequency = childSnapshot.val().rate;
    var firstTimeConverted = moment(firstTime).subtract(1, "years");
    console.log(firstTimeConverted);
    
    // var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    var tRemainder = diffTime % frequency;
    console.log(frequency);
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LLL");
    // var minsAway = moment().diff(moment(nextTrain), "minutes");
    var minsAway = moment(nextTrain).diff(moment(),"minutes");


    var trainName = childSnapshot.val().name;
    var trainLoction = childSnapshot.val().location;
    
    // var time = childSnapshot.val().minsAway;
    // var nextTrain = childSnapshot.val().next;
    var firstTime = childSnapshot.val().start;

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainLoction),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minsAway)

    );
    $("#train-table").append(newRow);
});
