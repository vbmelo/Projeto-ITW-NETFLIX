var baseUri = 'http://192.168.160.58/netflix/api/Titles/';

let composedUri, id;

var arrayFavsIDS = new Array();

var arrayLocalStorage = new Array(localStorage.getItem("IDS"));
console.log(arrayLocalStorage);
var actualArray = new Array();

function chama(composedUri, id) {
    $.ajax({
        type: "GET",

        url: composedUri,

        data: {},

        success: function (data) {
            console.log("Data:" + JSON.stringify(data, null, 4)); // show all data retrieved
            console.log("Data Length: " + data.length);

            var self = this;

            $("#tab2").show();

            var Id_GET = id;
            var baseUrl = './titleDetails.html?id=';
            var urlDetails = baseUrl + Id_GET;

            $("#tab2 > tbody")
                .append($('<tr>')
                    .append($('<td>')
                        .append($(`<span>${data.Name}</span>`))
                    )
                    .append($('<td>')
                        .append($(`<span>${data.Id}</span>`))
                    )
                    .append($('<td style="text-align: center;">')
                        .append($(`<span style="text-align: center;">${data.ReleaseYear}</span>`))
                    )
                    .append($('<td class="text-right">')
                        .append($(`<a href=${urlDetails} target="_blank"><i class="fa fa-eye" title="Selecione para ver detalhes"></i></a>
                                        <button class="btn btn-sm addfav">
                                            <i class="fa fa-heart" id="showme" style="font-size: 14px;"
                                                onclick="removefav(event)" data-bind="attr : { 'id': 'favourite_'+Id }"
                                                title="Selecione para remover dos favoritos"></i>
                                        </button>`)
                        )
                    )
                );

        },
        error: function () {
            console.log("erroooor");
        }

    });

}

$(document).ready(function () {
    console.log("ready!");

    $("#menu-toggle").click(function (e) {
        e.preventDefault(); //meaningless 
        $("#wrapper").toggleClass("menuDisplayed");
    });


    //PRINt FROM LOCALSTORAGE

    console.log(arrayLocalStorage);

    actualArray = arrayLocalStorage[0].split(",");

    console.log(actualArray);

    arrayTamanho = actualArray.length;
    console.log(arrayTamanho);

    if (arrayTamanho === 1) {
        $("#tab2").empty();
        $("#myModalFavorites").modal("show");
    }

    actualArray.forEach(function (id) {

        composedUri = baseUri + id;

        chama(composedUri, id);

    });


});


/* TA UMA MRDA , but workng*/

function removefav(event) {
    console.log("iM IN");
    var clicked = event.currentTarget;
    var len = actualArray.length;

    //make it go away
    var outElemtn = clicked.parentElement.parentElement.parentElement;

    console.log(outElemtn);

    console.log(len);

    var infoTr = new Array(outElemtn.innerText.split("	"));
    var stelem = infoTr[0][1];
    console.log("abacate " + stelem);


    var retrievedArray = new Array();
    retrievedArray = [localStorage.getItem("IDS")];

    console.log("retrived array " + retrievedArray);

    if (actualArray.includes(stelem)) {
        console.log("proceding to remove");
        actualArray.splice(actualArray.indexOf(stelem), 1);
        outElemtn.remove();
        localStorage.setItem("IDS", actualArray);
    } else {
        console.log("Já foi removido.. ou n existe!");
    }


    if (len == 1) {
        $("#tab2").hide();
        $("#myModalFavorites").modal("show");
        
    }


    /*     actualArray.splice(actualArray.indexOf(stelem), 1)
     */
    console.log("REMOVIDO - - - - - " + actualArray); //parfait


}

