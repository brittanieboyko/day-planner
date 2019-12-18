$(document).ready(function() {

    var timeBlocks = [];

    storeHours();
    renderDescriptions();
    
    function renderDescriptions() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var descriptionText = localStorage.getItem(key);
            $(".container").find("#"+key+" textarea").val(descriptionText);
        };
    }

    function storeHours() {
        $("#currentDay").text(moment().format("dddd, MMMM Do"));
        $('.time-block').each(function(i,element) {
            timeBlocks.push($(element).attr('id'));
        });
        determinePresentHour();
    }

    function determinePresentHour() {
        timeBlocks.forEach(function(hour) {
            var timeSlotHour = moment().hour(hour);
            if ((moment().isAfter(timeSlotHour))) {
                $(".time-block").find("#("+hour+")").addClass('past');
            } else if ((moment().isBefore(timeSlotHour))) {
                $(".container").find("#"+hour).addClass('future');
            } else {
                $(".container").find("#"+hour).addClass('present');
            }
        });
    }

    $(".button-save").on("click", function(event) {
        event.preventDefault();
        var description = $(this).siblings(".description").val().trim();
        var hour = $(this).parent().attr("id");
        localStorage.setItem(hour, description);


        if (description === "") {
            return
        }
        renderDescriptions();
    });

});