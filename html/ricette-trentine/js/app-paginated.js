/**
 * Una volta il documento HTML e' finito da scaricare, 
 * eseguire il seguente javascript
 */
$(document).ready(function() {
  caricareRicette();  
});


/**
 * caricareRicette: questa funzione fa le seguente cose: 
 * 1. Legge i dati dall'origine (in questo caso, dal file locale "data/ricette.xml")
 * 
 */
function caricareRicette() {
  // Per ottenere il dataset delle ricette, si fa una richiesta HTTP del tipo GET 
  // sull'URL dove si trovano i dati. Una volta ottenuto il risultato con successo,
  // si percorre ogni ricetta nel dataset e si crea una riga nella tabella delle
  // ricette con l'informazione sulla ricetta. 
  $.ajax({
    type: "GET",     
    url: "data/ricette.xml", 
    dataType: "xml",
    success: function (xml) {
      var jsonArray = [];
      $(xml).find('Recipes').each(function(){
        var id = $(this).find('RecipeID').text();
        var title = $(this).find('Title').text();
        var category = $(this).find('Category').text();
        var ingredients = $(this).find('Ingredient').text();
        var preparation = $(this).find('Preparation').text();
        
        
        var ricetta = new Ricetta (id,title,category,ingredients,preparation);
        jsonArray.push(ricetta);
      });
      
      console.log("Filling table....");
      $('#example').DataTable({
        "data": jsonArray, 
        "iDisplayLength": 5,   // records per page
        "columns":[
            { "data": "id" },
            { "data": "title" },
            { "data": "category" },
            { "data": "ingredients" },
            { "data": "preparation" }
        ]
      });
    }
  });
}

function Ricetta ( id, title, category, ingredients, preparation ) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.ingredients = ingredients;
    this.preparation = detaglioPreparazione(id,title,preparation);
};


function detaglioPreparazione(id,titolo,preparazione) {
  var htmlModal = 
      "<button class='btn btn-primary' data-toggle='modal' data-target='#ricetta"+id+"'>"+
      "  Dettaglio"+
      "</button>"+
      "<div class='modal fade' id='ricetta"+id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel"+id+"' aria-hidden='true'>"+
      "<div class='modal-dialog modal-lg' >"+
      "<div class='modal-content'>"+
      "  <div class='modal-header'>"+
      "    <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
      "    <h4 class='modal-title'>Preparazione di: "+titolo+"</h4>"+
      "  </div>"+
      "  <div class='modal-body'>"+
      "    <p>"+preparazione+"</p>"+
      "  </div>"+
      "  <div class='modal-footer'>"+
      "    <button type='button' class='btn btn-default' data-dismiss='modal'>Chiudi</button>"+
      "  </div>"+
      "</div><!-- /.modal-content -->"+
      "</div><!-- /.modal-dialog -->"+
      "</div>";
  return htmlModal;
}

