(function() {
var word = 'dad';

var calvin_search = function(word)
{
    word = word.toLowerCase();
    var result_list = [];
    for (comic in calvin) {
        console.log('Searching');
        found = calvin[comic].toLowerCase().indexOf(word);
        if (found != -1)
        {
            result_list.push(comic);
        }
    }
    
    return result_list;
}

var renderResults = function() {
    var results = $('#results ul li');
    for ( resultitem in results){
        console.log($(results[resultitem]).attr('id'));
    }
}

$('#search-form').bind('submit', function(e) {
   $('#status').html("Searching..")
   console.log($('#search').val());
   var results = (calvin_search($('#search').val()));
   $('#status').html("Done searching");
   $('#results').html('<ul></ul>');
   for(var id in results)
   {
       $('#results ul').append('<li id="'+ results[id] +'">' + calvin[results[id]] + '</li>')
   }
   
   $('#status').html("Rendering results");
   
   renderResults();
   return false;
});

})();
