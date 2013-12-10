// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
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
                // TODO: This application has been newly launched. Initialize
                // your application here.
                //var dateDiv = document.getElementById("countDownDate").onchange = createCountDown;
            } else {
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
    var dateDiv = document.getElementById("countDownDate");
    var targetDate = new WinJS.UI.DatePicker(dateDiv).current;
    var year = targetDate.getFullYear();
    var month = targetDate.getMonth();
    var day = targetDate.getDate();
    var timeDiv = document.getElementById("countDownTime");
    var targetTime = new WinJS.UI.TimePicker(timeDiv).current;
    var hour = targetTime.getHours();
    var minute = targetTime.getMinutes();
    var second = targetTime.getSeconds();
    var millisecond = 0;

    var targetDateTime = new Date(year, month, day, hour, minute, second, millisecond)

    var currentTime = new Date();
    console.log(targetDateTime + currentTime);

    saveCountDown(name, targetDateTime);
    var countDowns = retreiveCountDowns();
    createCountDownElements(countDowns);

    //countDown(targetDateTime, currentTime);

    //ToDo: 
    //Make sure the date and time are updating with the UI
    //Iterate through each countdown and create a countdown element for each
    // Add Logic to update the UI for each countdown every second
}

function createCountDownElements(countDowns)
{
    var countDownsElement = document.getElementById("countDowns");
    for (var countdown in countDowns) {
        if (countDowns.hasOwnProperty(countdown)) {
            // do stuff
            var name = countdown.toString();
            var time = countDowns[name];
            var countDownElement = createCountDownElement(name, time);

            countDownsElement.appendChild(countDownElement);
        }
    }
    //For each item you additionally need to check if it is an object's 'key' - property.
    //countdowns.get



    
}

function createCountDownElement(name, time)
{
    var countDownElement = document.createElement('div');
    var currentTime = new Date();
    var millisecondsToEvent = currentTime.getTime() - time.getTime();
    var milliseconds = millisecondsToEvent % 1000;
    var seconds = checkTime(Math.floor(millisecondsToEvent / (1000))%60);
    var minutes = checkTime(Math.floor(millisecondsToEvent / (1000 * 60)) % 60);
    var hours = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60)) % 24);
    var days = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60 * 24)) % 30);
    var months = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60 * 24 * 30)) % 12);
    var years = checkTime(Math.floor(millisecondsToEvent / (1000 * 60 * 60 * 24 * 30 * 12)));
    


    countDownElement.innerHTML = '  <div class="CountDown" id="' + name + '">\
                                        <div class="Name">' + name + '</div>\
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
                                    </div>';
    return countDownElement;
}

/*
function countDown(target, now)
{
    //var targetTime = target.getTime();
    //var nowTime = now.getTime();

    var yearsLeft = target.getFullYear() - now.getFullYear();
    var monthsLeft = target.getMonth() - now.getMonth();
    var daysLeft = target.getDate() - now.getDate();
    var hoursLeft = target.getHours() - now.getHours();
    var minutesLeft = target.getMinutes() - now.getMinutes();
    var secondsLeft = target.getSeconds() - now.getSeconds();
    console.log(yearsLeft + " : " + monthsLeft + " : " + daysLeft + " : " + hoursLeft + " : " + minutesLeft + " : " + secondsLeft);

    var yearOne = document.getElementById("Year1");
    yearOne.innerHTML = Math.floor(yearsLeft / 10);
    var yearTwo = document.getElementById("Year2");
    yearTwo.innerHTML = yearsLeft % 10;

    var monthOne = document.getElementById("Month1");
    monthOne.innerHTML = Math.floor(monthsLeft / 10);
    var monthTwo = document.getElementById("Month2");
    monthTwo.innerHTML = monthsLeft % 10;

    var dayOne = document.getElementById("Day1");
    dayOne.innerHTML = Math.floor(daysLeft / 10);
    var dayTwo = document.getElementById("Day2");
    dayTwo.innerHTML = daysLeft % 10;

    var hourOne = document.getElementById("Hour1");
    hourOne.innerHTML = Math.floor(hoursLeft / 10);
    var hourTwo = document.getElementById("Hour2");
    hourTwo.innerHTML = hoursLeft % 10;

    var minuteOne = document.getElementById("Minute1");
    minuteOne.innerHTML = Math.floor(minutesLeft / 10);
    var minuteTwo = document.getElementById("Minute2");
    minuteTwo.innerHTML = minutesLeft % 10;

    var secondOne = document.getElementById("Second1");
    secondOne.innerHTML = Math.floor(secondsLeft / 10);
    var secondTwo = document.getElementById("Second2");
    secondTwo.innerHTML = secondsLeft % 10;
    //setTimeout(countDown(target,name) 

}
*/

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