var query;

$(document).ready(function() {
    // Youtube API function, gets data from API and displays it in Dom
    $('form').submit(function(event) {
        event.preventDefault();

        $('.container').show();
        query = $(".js-query").val()
        getDataFromApi(query);
        //clears search
        $('.js-query').val("");
    });

    // write code for the next button here
    $('#next').on('click', function() {
        // get token
        var token = $('#next').attr("data-next-token")
            // use the token to getDataFromAPI

        getDataFromApi(query, token);
        // get the token and see
        console.log($('#next').data('next-token'), 'token');
    });

    // write code for the previous button here
    $('#previous').on('click', function() {
        // get token
        var token = $('#previous').attr("data-previous-token")
            // use the token to getDataFromAPI
            // look at line 6 through 8. write more code below.. up is fine.

        getDataFromApi(query, token);
        // get the token and see
        console.log($('#previous').data('previous-token'), 'token');

    });

});

// Display search results
function displaySearchResults(videoObject) {
    // write clean up or empty search-results
    $('.search-results').empty();
    var html = "";
    $.each(videoObject.items, function(index, video) {
        html = html + "<li><p>" + video.snippet.title +
            "</p><a target='_blank' href='https://www.youtube.com/watch?v=" + video.id.videoId +
            "'><img src='" + video.snippet.thumbnails.high.url + "'/></a></li>";

    });

    $('.search-results').append(html);
}

function getDataFromApi(query, token) {
    console.log('query', query);
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
        part: "snippet",
        key: "AIzaSyC2N3gC7yHIQB_UXod7kJ4D3axDowfY3-A",
        type: "video",
        q: query,
        pageToken: token,
        maxResults: 9
    }).done(function(data) {
        console.log(data.nextPageToken, 'token in getDataFromApi()');
        // next page 
        $('#next').attr("data-next-token", data.nextPageToken)
            // previous page
        $('#previous').attr("data-previous-token", data.prevPageToken)
        console.log('data', data);
        if (data.pageInfo.totalresults == 0) {
            alert("No videos found!");
        } else {
            displaySearchResults(data);
        }
    });
}
