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
 * 2. Percorre i dati e per ogni ricerca, aggiunge una riga al body della tabella "auto-table-body" 
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
      $(xml).find('Recipes').each(function(){
        var id = $(this).find('RecipeID').text();
        var title = $(this).find('Title').text();
        var category = $(this).find('Category').text();
        var ingredients = $(this).find('Ingredient').text();
        var rowHTML = creareHTMLDiRiga(id,title,category,ingredients);
        $('<tr id='+id+'></tr>').html(rowHTML).appendTo('#auto-table-body');
      });
    }
  });
}

/**
 * Funzione non-generale che crea la riga per le ricette
 */
function creareHTMLDiRiga(id, title, category, ingredients) {
  var cellaId = "<td>"+id+"</td>";
  var cellaTitle = "<td>"+title+"</td>";
  var cellaCategory = "<td>"+category+"</td>"
  var cellaIngredients = "<td>"+ingredients+"</td>";
  return cellaId + cellaTitle + cellaCategory + cellaIngredients;
}