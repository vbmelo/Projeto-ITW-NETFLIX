const btnsumbit = document.getElementById("1stform");
const inputed = document.getElementById("forminput");

var filtroBusca;
var baseUri="";
var controleBusca = 0;

$( "input" ).on( "click", function() {
    $( "#log" ).html( $( "input:checked" ).val() + " Foi Selecionado Para Busca!" );
    filtroBusca = $("input:checked").val();
    console.log("Filtro de busca selecionado = "+filtroBusca);
    switch (filtroBusca) {
        case "filtro_Titulos":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Titles?name=';
            break;
        case "filtro_Filmes":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Movies?name=';
            break;
        case "filtro_Series":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Series?name=';
            break;
        case "filtro_Categoria":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Categories?name=';
            break;
        case "filtro_Paises":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Countries?name=';
            break;
        case "filtro_Diretores":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Directors?name=';
            break;
    }
    console.log("Base Uri = "+baseUri);
    return baseUri;
});

$.limparBusca = function(){
    $( "#Name" ).empty();
    $( "#Idd" ).empty();
    $( "#titleDetails" ).empty();
    controleBusca = 0;
    console.log("Busca limpa com sucesso");
};

btnsumbit.addEventListener("submit", function(e){
    console.log(inputed.value);
    var inputedSearch = inputed.value;
    inputed.value.replace(/\s+/g, '');
    if (baseUri==""){
        baseUri = 'http://192.168.160.58/netflix/api/Search/Titles?name=';
    }
    var composedUri = baseUri + inputedSearch;
    console.log("composed Uri = " + composedUri);
    if (controleBusca == 1){
        $( "#Name" ).empty();
        $( "#Idd" ).empty();
        $( "#titleDetails" ).empty();
        controleBusca = 0;
        console.log("Busca limpa com sucesso");
    }
    $(document).ready(function(){
        
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
                    $("#myModalSearch").modal({backdrop: true});
                    $("#myModalSearch").modal("show");
                    $('#searchError1').show();
                } else {
                    $("#myModalSearch").modal({backdrop: true});
                    $("#myModalSearch").modal("show");
                    $('#searchTable1').show();
                    $.each(data, function(){
                        $('#Name').append('<li>'+ this['Name']+ '</li>');
                        $('#Id').append('<li>'+ this['Id']+ '</li>');
                        var Id_GET = parseInt(this['Id']);
                        var baseUrl = './titleDetails.html?id=';
                        var urlDetails = baseUrl + Id_GET;
                        $('#titleDetails').append(`<li><a href="${urlDetails}"><i class="fa fa-eye" title="Selecione para ver detalhes"></i></a></li>`);
                    });
                    controleBusca = 1;
                    console.log("Valor do controleBusca = " + controleBusca);
                }

            },
        });

    });
    
    inputed.value = "";
    e.preventDefault();
});


