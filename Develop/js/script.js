$(document).ready(function() {

    var descriptions = [];

    function storeDescriptions() {
        localStorage.setItem("descriptions", descriptions);
    }

    $(".button-save").on("click", function() {
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