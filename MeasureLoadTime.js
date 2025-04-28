// ==UserScript==
// @name         Measure Loading Time
// @namespace    Loading Time
// @version      2025-04-18
// @description  Measureing the loading time
// @author       Me
// @include      http://localhost:5173/*
// @grant        none
// @run-at       document-start

// ==/UserScript==

(function () {
    //let loadTimeData = []

    const iterations = 5
    let count = 0

    function beginToMeasure(){
        let startTime = performance.now()
        count = parseInt(localStorage.getItem("Counter")) || 0
        window.addEventListener("allCubesIsLoaded", function() {
            let endTime = performance.now()
            let saveData = endTime - startTime
            count++
            saveTime(saveData)
        })
    }

    function saveTime(saveData) {
        let loadTimeData = localStorage.getItem("LoadTimeData") || ""
        loadTimeData += saveData + "\n"
        localStorage.setItem("LoadTimeData", loadTimeData)
        localStorage.setItem("Counter", count)
        if (count >= iterations) {
            alert("Finished!")
            download()
            localStorage.removeItem("LoadTimeData")
            localStorage.removeItem("Counter")
            localStorage.clear()
            return;
        } else {
            setTimeout(() => {
                location.reload()
            }, 4000)
        }
    }

    function download() {
        //console.log(localStorage.getItem("LoadTimeData"))
        let anchor = document.createElement("a")
        let fileName = `LoadTime_Three_WebGL.csv`
        //let fileName = `LoadTime_Three_WebGPU.csv`
        //let fileName = `LoadTime_Babylon_WebGL.csv`
        //let fileName = `LoadTime_Babylon_WebGPU.csv`
        anchor.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURI(localStorage.getItem("LoadTimeData"))
        );
        anchor.setAttribute("download", fileName)
        document.body.appendChild(anchor)
        anchor.click()
    }

    beginToMeasure()

})();
