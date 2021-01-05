const btnsumbit = document.getElementById("1stform");
const inputed = document.getElementById("forminput");

btnsumbit.addEventListener("submit", function(e){
    console.log(inputed.value);
    inputedSearch = inputed.value;
    inputed.value.replace(/\s+/g, '');
    baseUri = 'http://192.168.160.58/netflix/api/Search/Titles?name=';
var composedUri = baseUri + inputedSearch;
console.log(composedUri);
$(function(){
    
    $.ajax({
        type: "GET",
        url: composedUri,
        data:{
            pagesize: 50,
        },
        success: function(data) {
            console.log("Data:" + data);
            console.log("Data Length: " + data.length);
            if(data.length == 0){
                console.log('Nenhum Titulo Encontrado');
                $('#searchError1').show();
            } else {
                $('#searchTable1').show();
                $.each(data, function(){
                    $('#Name').append('<li>'+ this['Name']+ '</li>');
                    $('#Id').append('<li>'+ this['Id']+ '</li>');
                    var Id_GET = parseInt(this['Id']);
                    var baseUrl = './titleDetails.html?id=';
                    var urlDetails = baseUrl + Id_GET;
                    $('#titleDetails').append(`<li><a href="${urlDetails}"><i class="fa fa-eye" title="Selecione para ver detalhes"></i></a></li>`);
                });
            }

        },
    });

});
    inputed.value = "";
    e.preventDefault();
});


