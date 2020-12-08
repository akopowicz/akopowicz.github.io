$(document).ready(function() {
    $('button').click(function() {

        // Wariant 1 
        // $.get('https://akademia108.pl/api/ajax/get-post.php')
        // .done(function(data) {

        //     let pId = $('<p></p>').text(`Id: ${data.id}`);
        //     let pUserId = $('<p></p>').text(`User Id: ${data.userId}`);
        //     let pTitle = $('<p></p>').text(`Title: ${data.text}`);
        //     let pBody = $('<p></p>').text(`Body: ${data.body}`);
        //     let hr = $('<hr />');

        //     let body = $('body');

        //     body.append(pId);
        //     body.append(pUserId);
        //     body.append(pTitle);
        //     body.append(pBody);
        //     body.append(hr);
        // })
        // .fail(function(error) {
        //     console.error(error);
        // });
        

        // Wariant 2 

        $.getJSON('https://akademia108.pl/api/ajax/get-post.php')
        .done(function(data) {

            let pId = $('<p></p>').text(`Id: ${data.id}`);
            let pUserId = $('<p></p>').text(`User Id: ${data.userId}`);
            let pTitle = $('<p></p>').text(`Title: ${data.text}`);
            let pBody = $('<p></p>').text(`Body: ${data.body}`);
            let hr = $('<hr />');

            let body = $('body');

            body.append(pId);
            body.append(pUserId);
            body.append(pTitle);
            body.append(pBody);
            body.append(hr);
        })
        .fail(function(error) {
            console.error(error);
        });
    });
});