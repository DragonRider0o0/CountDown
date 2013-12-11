/*
   Copyright 2013 Quimera Interactive(Michael Richardson)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

var targetDate = new Date;
var targetTime = new Date;

(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch)
        {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated)
            {
                setInterval(update, 1000);

                var divDatePicker = document.getElementById("countDownDate");
                var divTimePicker = document.getElementById("countDownTime");
                var datepickerControl = new WinJS.UI.DatePicker(divDatePicker);
                var timepickerControl = new WinJS.UI.TimePicker(divTimePicker);
                //resetOutput();
                datepickerControl.addEventListener("change", function () {
                    targetDate = datepickerControl.current;
                });
                // Create controls


                timepickerControl.addEventListener("change", function () {
                    targetTime = timepickerControl.current;
                });
                // TODO: This application has been newly launched. Initialize
                // your application here.
                //var dateDiv = document.getElementById("countDownDate").onchange = createCountDown;
            } else {
                setInterval(update, 1000);

                var divDatePicker = document.getElementById("countDownDate");
                var divTimePicker = document.getElementById("countDownTime");
                var datepickerControl = new WinJS.UI.DatePicker(divDatePicker);
                var timepickerControl = new WinJS.UI.TimePicker(divTimePicker);
                //resetOutput();
                datepickerControl.addEventListener("change", function () {
                    targetDate = datepickerControl.current;
                });
                // Create controls


                timepickerControl.addEventListener("change", function () {
                    targetTime = timepickerControl.current;
                });
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args)
    {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();

function createCountDown()
{
    //WinJS.UI.processAll();
    var name = document.getElementById("countDownName").value;

    var year = targetDate.getFullYear();
    var month = targetDate.getMonth();
    var day = targetDate.getDate();
    var hour = targetTime.getHours();
    var minute = targetTime.getMinutes();
    var second = targetTime.getSeconds();
    var millisecond = 0;

    var targetDateTime = new Date(year, month, day, hour, minute, second, millisecond)

    var currentTime = new Date();
    console.log(targetDateTime + currentTime);

    saveCountDown(name, targetDateTime);
    update();

    //countDown(targetDateTime, currentTime);

    //ToDo: 
    //Make sure the date and time are updating with the UI
    //Iterate through each countdown and create a countdown element for each
    // Add Logic to update the UI for each countdown every second
}

function update()
{
    var countDowns = retreiveCountDowns();
    createAndUpdateCountDownElements(countDowns);
}

function createAndUpdateCountDownElements(countDowns)
{
    var countDownsElement = document.getElementById("countDowns");
    for (var countdown in countDowns) {
        if (countDowns.hasOwnProperty(countdown)) {
            // do stuff
            var name = countdown.toString();
            var time = countDowns[name];
            createAndUpdateCountDownElement(name, time);
        }
    }
    //For each item you additionally need to check if it is an object's 'key' - property.
    //countdowns.get   
}

function createAndUpdateCountDownElement(name, time)
{
    var countDownElement;
    var countDownExists ;
    if (document.getElementById(name) != null) {
        countDownElement = document.getElementById(name)
        countDownExists = true;
    }
    else
    {
        countDownElement = document.createElement('div');
        countDownElement.id = name;
        countDownElement.className = "CountDown";
        countDownExists = false;
    }
    var currentTime = new Date();
    var milliseconds;
    var seconds;
    var minutes;
    var hours;
    var days;
    var months;
    var years;
    var millisecondsToEvent = time.getTime() - currentTime.getTime();
    if (millisecondsToEvent <= 0) {
        milliseconds = 0;
        seconds = checkTime(0);
        minutes = checkTime(0);
        hours = checkTime(0);
        days = checkTime(0);
        months = checkTime(0);
        years = checkTime(0);
    }
    else
    {
        milliseconds = millisecondsToEvent % 1000;
        seconds = checkTime(Math.floor(millisecondsToEvent / (1000)) % 60);
        minutes = checkTime(Math.floor(millisecondsToEvent / (1000 * 60)) % 60);
        hours = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60)) % 24);
        days = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60 * 24)) % 30);
        months = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60 * 24 * 30)) % 12);
        years = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60 * 24 * 30 * 12)));
    }

    countDownElement.innerHTML = '      <div class="Name">' + name + '</div>\
                                        <div class="Digit">Y</div> \
                                        <div class="Digit" id="Year1">' + years.toString().charAt(0) + '</div>\
                                        <div class="Digit" id="Year2">' + years.toString().charAt(1) + '</div>\
                                        <div class="Digit">M</div>\
                                        <div class="Digit" id="Month1">' + months.toString().charAt(0) + '</div>\
                                        <div class="Digit" id="Month2">' + months.toString().charAt(1) + '</div>\
                                        <div class="Digit">D</div>\
                                        <div class="Digit" id="Day1">' + days.toString().charAt(0) + '</div>\
                                        <div class="Digit" id="Day2">' + days.toString().charAt(1) + '</div>\
                                        <div class="Digit">H</div>\
                                        <div class="Digit" id="Hour1">' + hours.toString().charAt(0) + '</div>\
                                        <div class="Digit" id="Hour2">' + hours.toString().charAt(1) + '</div>\
                                        <div class="Digit">M</div>\
                                        <div class="Digit" id="Minute1">' + minutes.toString().charAt(0) + '</div>\
                                        <div class="Digit" id="Minute2">' + minutes.toString().charAt(1) + '</div>\
                                        <div class="Digit">S</div>\
                                        <div class="Digit" id="Second1">' + seconds.toString().charAt(0) + '</div>\
                                        <div class="Digit" id="Second2">' + seconds.toString().charAt(1) + '</div>\
                                        <input type="button" class="countDownButton" id="' + name + 'button" value="X" />';
    if (!countDownExists) {
        document.getElementById("countDowns").appendChild(countDownElement);
    }
    else
    {

    }
    countDownButton = document.getElementById(name + 'button');
    countDownButton.setAttribute("onclick", 'deleteCountDown("' + name + '");');
    //countDownButton.onclick = deleteCountDown(name);
}

function saveCountDown(countDownName, countDownTime) {
    var applicationData = Windows.Storage.ApplicationData.current;

    var localSettings = applicationData.localSettings;
    try
    {
        if (countDownName != "")
        {
            var countDowns = localSettings.values["countdowns"];
            countDowns[countDownName.valueOf()] = countDownTime;
            localSettings.values["countdowns"] = countDowns;
        }
    }
    catch (err)
    {
        var composite = new Windows.Storage.ApplicationDataCompositeValue();
        composite[countDownName.valueOf()] = countDownTime;

        localSettings.values["countdowns"] = composite;
    }
}

function retreiveCountDowns() {
    var applicationData = Windows.Storage.ApplicationData.current;

    var localSettings = applicationData.localSettings;
    var countDowns = localSettings.values["countdowns"];
    if (!countDowns) {
        // No data
        var noCountDowns;
        return noCountDowns;
    }
    else {
        // Access data in countDowns
        return countDowns;

    }
}

function checkTime(i)
{
    if (i < 10)
    {
        i = "0" + i;
    }
    return i;
}

function resetOutput() {
    this.divDatePicker.innerHTML = "";
    this.divTimePicker.innerHTML = "";
}

function deleteCountDown(name) {
    var applicationData = Windows.Storage.ApplicationData.current;
    var localSettings = applicationData.localSettings;
    var countDowns = localSettings.values["countdowns"];
    countDowns.remove(name);
    localSettings.values["countdowns"] = countDowns;
    node = document.getElementById(name);
    node.parentNode.removeChild(node);
}