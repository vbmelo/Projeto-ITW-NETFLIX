$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: 'http://192.168.160.58/netflix/api/Statistics',
        data:{},
        success: function(data){
            console.log('Dados recebidos com sucesso!');
            $('#data_Actors').append(data.Actors);
            $('#data_Titles').append(data.Titles);
            $('#data_Categories').append(data.Categories);
            $('#data_Directors').append(data.Directors);
            $('#data_Countries').append(data.Countries);
        }
    });

});