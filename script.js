(->
  word = "dad"
  calvin_search = (word) ->
    word = word.toLowerCase()
    result_list = []
    for comic of calvin
      console.log "Searching"
      found = calvin[comic].toLowerCase().indexOf(word)
      result_list.push comic  unless found is -1
    result_list

  renderResults = ->
    results = $("#results ul li")
    
    #http://query.yahooapis.com/v1/public/yql?q=select%20src%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.gocomics.com%2Fcalvinandhobbes%2F1993%2F09%2F19%22%20and%20xpath%3D'%2F%2Fp%5B%40class%3D%22feature_item%22%5D%2F%2Fimg'&format=json&diagnostics=true&callback=image_url
    for resultitem of results
      console.log $(results[resultitem]).attr("id")

  $("#search-form").bind "submit", (e) ->
    $("#status").html "Searching.."
    console.log $("#search").val()
    results = (calvin_search($("#search").val()))
    $("#status").html "Done searching"
    $("#results").html "<ul></ul>"
    for id of results
      $("#results ul").append "<li id=\"" + results[id] + "\">" + calvin[results[id]] + "</li>"
    $("#status").html "Rendering results"
    renderResults()
    false

)()