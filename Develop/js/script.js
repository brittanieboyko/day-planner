$(document).ready(function() {

    var descriptions = [];
    var timeBlocks = [];

    storeHours();
    
    function storeDescriptions() {
        localStorage.setItem("descriptions", descriptions);
    }

    function storeHours() {
        $('.time-block').each(function(i,element) {
            timeBlocks.push($(element).attr('id'));
        });
        determineHour();
    }

    function determineHour() {
        timeBlocks.forEach(function(hour) {
            var timeSlot = moment().hour(hour);
            if ((moment().isAfter(timeSlot))) {
                $(".time-block").find("#("+hour+")").addClass('past');
            } else if ((moment().isBefore(timeSlot))) {
                $(".container").find("#"+hour).addClass('future');
            } else {
                $(".container").find("#"+hour).addClass('present');
            }
        })
    }

    $(".button-save").on("click", function(event) {
        event.preventDefault();
        var description = $(this).siblings(".description").val().trim();
        var index = $(this).parent().data("index");

        if (description === "") {
            return
        }
        descriptions.push({description: description, index : index});

        storeDescriptions();
    });

    $("#currentDay").text(moment().format("dddd, MMMM Do"));
});