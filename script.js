// Generated by CoffeeScript 1.4.0
(function() {

  (function() {
    var report_result, yql;
    yql = "http://query.yahooapis.com/v1/public/yql?q=select%20src%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.gocomics.com%2Fcalvinandhobbes%2F19{{year}}%2F{{month}}%2F{{date}}%3Findex%3D{{index}}%22%20and%20xpath%3D'%2F%2Fp%5B%40class%3D%22feature_item%22%5D%2F%2Fimg'&format=json&diagnostics=true";
    window.results = null;
    report_result = function(results) {
      var content, data, date, fulldate, index, month, page, template, text, year, yql_url;
      page = 1;
      for (index in results) {
        text = results[index];
        page++;
        year = index[0] + index[1];
        month = index[2] + index[3];
        date = index[4] + index[5];
        data = {
          year: year,
          month: month,
          date: date,
          text: text,
          fulldate: index
        };
        yql_url = yql.replace("{{year}}", year).replace("{{month}}", month).replace("{{date}}", date).replace("{{index}}", index);
        fulldate = index;
        $.getJSON(yql_url, function(data) {
          fulldate = data.query.diagnostics.url.content.split("?index=")[1];
          return $("#img-" + fulldate).attr("src", data.query.results.img.src);
        });
        template = Handlebars.compile($('#result-template').html());
        content = template(data);
        content = content.replace("&lt;b&gt;", "<b>").replace("&lt;/b&gt;", "</b>");
        $("#results").append($(content));
        if (page > 11) {
          break;
        }
      }
      return $("#status").html("");
    };
    return $("#search-form").bind("submit", function(e) {
      var text, worker;
      $("#results").html("");
      text = $("#search").val();
      if (!Worker) {
        $("#status").html("Your browser doesn't support web workers. Use latest version of chrome");
      } else {
        $("#status").html("Searching for " + text + "..");
        worker = new Worker('search.js');
        worker.postMessage(text);
        worker.addEventListener('message', function(e) {
          if (e.data.type === 'result') {
            return report_result(e.data.data);
          }
        });
      }
      return false;
    });
  })();

}).call(this);
