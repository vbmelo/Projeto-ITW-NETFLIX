const btnsumbit = document.getElementById("1stform");
const inputed = document.getElementById("forminput");

var filtroBusca;
var baseUri="";
var baseDetailsUri="";
var composedUrlDetails="";
var controleBusca = 0;
var searchName="";
var searchId="";
var searchDetails="";

$( "input" ).on( "click", function() {
    $( "#log" ).html( $( "input:checked" ).val() + " Foi Selecionado Para Busca!" );
    filtroBusca = $("input:checked").val();
    console.log("Filtro de busca selecionado = "+filtroBusca);
    switch (filtroBusca) {
        case "filtro_Titulos":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Titles?name=';
            baseDetailsUri = './titleDetails.html?id=';
            searchName="Title Name";
            searchId="Title Id";
            searchDetails="Title Details";
            break;
        case "filtro_Filmes":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Movies?name=';
            baseDetailsUri = './moviesDetails.html?id=';
            searchName="Movie Name";
            searchId="Movie Id";
            searchDetails="Movie Details";
            break;
        case "filtro_Series":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Series?name=';
            baseDetailsUri = './seriesDetails.html?id=';
            searchName="Series Name";
            searchId="Series Id";
            searchDetails="Series Details";
            break;
        case "filtro_Atores":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Actors?name=';
            baseDetailsUri = './actorDetails.html?id=';
            searchName="Actor Name";
            searchId="Actor Id";
            searchDetails="Actor Details";
            break;
        case "filtro_Categoria":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Categories?name=';
            baseDetailsUri = './categoriesDetails.html?id=';
            searchName="Categoria Name";
            searchId="Category Id";
            searchDetails="Category Details";
            break;
        case "filtro_Paises":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Countries?name=';
            baseDetailsUri = './countriesDetails.html?id=';
            searchName="Country Name";
            searchId="Country Id";
            searchDetails="Country Details";
            break;
        case "filtro_Diretores":
            baseUri = 'http://192.168.160.58/netflix/api/Search/Directors?name=';
            baseDetailsUri = './directorsDetails.html?id=';
            searchName="Director Name";
            searchId="Director Id";
            searchDetails="Director Details";
            break;
    }
    console.log("Base Uri = "+baseUri);
    return baseUri;
});

$.limparBusca = function(){
    $("#searchName").empty();
    $("#searchId").empty();
    $("#searchDetails").empty();
    $( "#Name" ).empty();
    $( "#Id" ).empty();
    $( "#Details" ).empty();
    $('#searchError1').hide();
    controleBusca = 0;
    console.log("Busca limpa com sucesso");
};

btnsumbit.addEventListener("submit", function(e){
    console.log(inputed.value);
    var inputedSearch = inputed.value;
    inputed.value.replace(/\s+/g, '');
    if (baseUri==""){
        baseUri = 'http://192.168.160.58/netflix/api/Search/Titles?name=';
        baseDetailsUri = './titleDetails.html?id=';
        searchName="Title Name";
        searchId="Title Id";
        searchDetails="Title Details";
    }
    var composedUri = baseUri + inputedSearch;
    console.log("composed Uri = " + composedUri);
    if (controleBusca == 1){
        $("#searchName").empty();
        $("#searchId").empty();
        $("#searchDetails").empty();
        $( "#Name" ).empty();
        $( "#Id" ).empty();
        $( "#Details" ).empty();
        $('#searchError1').hide();
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
                    $('#searchError1').hide();
                    $("#myModalSearch").modal({backdrop: true});
                    $("#myModalSearch").modal("show");
                    $('#searchTable1').show();
                    $("#searchName").append(searchName);
                    $("#searchId").append(searchId);
                    $("#searchDetails").append(searchDetails);
                    $.each(data, function(){
                        $('#Name').append('<li>'+ this['Name']+ '</li>');
                        $('#Id').append('<li>'+ this['Id']+ '</li>');
                        var Id_GET = parseInt(this['Id']);
                        composedUrlDetails = baseDetailsUri + Id_GET;
                        console.log('urldetaisl = '+ composedUrlDetails);
                        $('#Details').append(`<li><a href="${composedUrlDetails}"><i class="fa fa-eye" title="Selecione para ver detalhes"></i></a></li>`);
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


