//37d0b771a00505f0c256d41794d1092d
//console.log('Hello');

$(document).ready(function() {
    //GIVEN a weather dashboard with form inputs
    //THEN I am presented with current and future conditions for that city and that city is added to the search history
    var searchHistoryContainer = $('#past-searches');
    var searchForm = $('search-form');
    //WHEN I search for a city
    searchForm.submit(function( event ) {
        alert( "Handler for .submit() called." );
        event.preventDefault();
        console.log(event);
        });
});

