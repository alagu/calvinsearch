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

$('#search').bind('keyup', function(e) {
   console.log($(this).val());
   console.log(calvin_search($(this).val()));
});

})();