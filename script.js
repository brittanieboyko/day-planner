$(document).ready(function() {

    var timeBlocks = [];

    init();

    function init() {
        $("#currentDay").text(moment().format("dddd, MMMM Do"));

        storeHours();
        renderDescriptions();
    }

    function determineHourState() {
        timeBlocks.forEach(function(hour) {
            var timeSlotHour = moment().hour(hour);
            var timeSlotContainer = $(".container");
            if ((moment().isAfter(timeSlotHour))) {
                timeSlotContainer.find("#" + hour).addClass("past");
            } else if ((moment().isBefore(timeSlotHour))) {
                timeSlotContainer.find("#" + hour).addClass("future");
            } else {
                timeSlotContainer.find("#" + hour).addClass("present");
            }
        });
    }

    function storeHours() {
        $(".time-block").each(function(i, element) {
            timeBlocks.push($(element).attr("id"));
        });
        determineHourState();
    }

    function renderDescriptions() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var descriptionText = localStorage.getItem(key);
            $(".container").find("#"+key+" textarea").val(descriptionText);
        };
    }

    $(".button-save").on("click", function(event) {
        event.preventDefault();
        var description = $(this).siblings(".description").val().trim();
        var hour = $(this).parent().attr("id");

        if (description == "") {
            return
        }

        localStorage.setItem(hour, description);
        renderDescriptions();
    });

});