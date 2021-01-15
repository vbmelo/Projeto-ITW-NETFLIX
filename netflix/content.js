var titleId = null ;
function carouselDetails(elem) {
    console.log("CarouselDetails foi INVOCADA");
    var contentIMG_ID = $(elem).attr("id");
    console.log("id da imagem clicada = "+ contentIMG_ID);
    var contentIMG_NAME = $(elem).attr("alt");
    console.log("Nome da imagem clicada = "+ contentIMG_NAME);
    titleId = contentIMG_ID ;
    var baseUrl = "http://192.168.160.58/netflix/api/titles/"; //Base url do title details
    

     if($("#myModalContent").is(":hidden")){
         $("#nome_Conteudo").empty();
     }
    $("#myModalContent").modal({backdrop: true});
    $("#myModalContent").modal("show");
    $("#nome_Conteudo").append("Mais Sobre: " + contentIMG_NAME);
} 

// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/netflix/api/titles/');
    self.displayName = 'Title Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.actors = ko.observableArray('');
    self.categories = ko.observableArray('');
    self.countries = ko.observableArray('');
    self.dateAdded = ko.observable('');
    self.description = ko.observable('');
    self.directors = ko.observableArray('');
    self.duration = ko.observable('');
    self.id = ko.observable('');
    self.name = ko.observable('');
    self.rating = ko.observable('');
    self.releaseYear = ko.observable('');
    self.type = ko.observable('');
    //--- Page Events
    titleChanged = function () {
        getTitle();
    };
    //---
    getTitle = function()   {
        console.log('CALL: getTitle...');
        var composedUri = self.baseUri() + titleId;
        console.log(composedUri)
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.actors(data.Actors);
            self.categories(data.Categories);
            self.countries(data.Countries);
            self.dateAdded(data.DateAdded);
            self.description(data.Description);
            self.directors(data.Directors);
            self.duration(data.Duration);
            self.id(data.Id);
            self.name(data.Name);
            self.rating(data.Rating);
            self.releaseYear(data.ReleaseYear);
            self.type(data.Type);
        });
    };
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });

    }
    function showLoading() {
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        });
    }
    function limpar() {
        self.actors = ko.observableArray('');
        self.categories = ko.observableArray('');
        self.countries = ko.observableArray('');
        self.dateAdded = ko.observable('');
        self.description = ko.observable('');
        self.directors = ko.observableArray('');
        self.duration = ko.observable('');
        self.id = ko.observable('');
        self.name = ko.observable('');
        self.rating = ko.observable('');
        self.releaseYear = ko.observable('');
        self.type = ko.observable('');
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});


