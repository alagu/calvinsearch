importScripts('calvin-data.js')

self.addEventListener 'message',( (e)->
  if e.data
    word = e.data.toLowerCase()
    result_list = {}
    for comic, text of calvin
      found = calvin[comic].toLowerCase().indexOf(word)
      result_list[comic] = calvin[comic].toLowerCase().replace(word, "<b>" + word + "</b>") unless found is -1

    self.postMessage({type: 'result', data: result_list})
  ), false