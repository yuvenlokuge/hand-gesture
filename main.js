//https://teachablemachine.withgoogle.com/models/QGPmTHaeq/model.json

prediction_1=""
prediction_2=""
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:99

});
camera=document.getElementById('camera')
Webcam.attach('#camera')
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('result').innerHTML = "<img id='capture_image' src='" + data_uri + "'>";
    })
}
console.log(ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QGPmTHaeq/model.json", modelLoaded)
function modelLoaded() {
    console.log("modelLoaded")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is " + prediction_1;
    speak_data2 = "and the second prediction is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis)
}

function check() {
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult)
}
function gotResult(error, result) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(result)
        document.getElementById("result1").innerHTML = result[0].label
        document.getElementById("result2").innerHTML = result[1].label
        prediction_1 = result[0].label
        prediction_2 = result[1].label
        speak()
        if (result[0].label == "amazing") {
            document.getElementById("emoji1").innerHTML = "&#128076;"
        }
        if (result[0].label == "best") {
            document.getElementById("emoji1").innerHTML = "&#128077;"
        }
        if (result[0].label == "victory") {
            document.getElementById("emoji1").innerHTML = "&#9996;"
        } if (result[1].label == "amazing") {
            document.getElementById("emoji2").innerHTML = "&#128076;"
        }
        if (result[1].label == "best") {
            document.getElementById("emoji2").innerHTML = "&#128077;"
        }
        if (result[1].label == "victory") {
            document.getElementById("emoji2").innerHTML = "&#9996;"
        }
    }

}