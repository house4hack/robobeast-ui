rb = {}

/* ---------------------------------------------
 * Capture the state from previous pages
 * --------------------------------------------- */
rb.captureState = function() {
    rb.state = {};
    var i, pair;
    var s = location.search;
    s = s.substring(1,s.length - 1);
    
    var parts = s.split('&');
    for(i=0; i<parts.length; i++) {
      pair = parts[i].split("=");
      rb.state[pair[0]] = pair[1];
    } 
}


/* ---------------------------------------------
 * Setup the top level menu
 * --------------------------------------------- */
rb.menu = function(items) {
    var menu = $('#top-menu');
    var li;
    
    console.log(items);
    
    menu.html("");

    for(key in items) {
      var item = items[key];
      if(typeof item.url == "undefined") {
          li = $('<li class="active xl">' + item.caption + '</li>');
          menu.append(li);          
      } else {
          li = $('<li class="xl"><a class="xl" href="' + item.url + '">' + item.caption + '</a></li>');
          menu.append(li);          
      }
    } 
} 



/* ---------------------------------------------
 * Navigate to a page
 * --------------------------------------------- */
rb.navigate = function(uri, params) {

    var query = "?";
    var i;

    // get the query string
    if(typeof params !== 'undefined') {
      for(var key in params){
          if (typeof key !== 'undefined' && typeof params[key] !== 'undefined') {
             console.log("Adding Key (A)");
            query = query + key + "=" + params[key] + "&";
          }
      }
    } 

    for(var key in rb.state) {
        if (typeof key !== 'undefined' && typeof rb.state[key] !== 'undefined') {
          console.log("Adding Key (B)");
          query = query + key + "=" + rb.state[key] + "&";
        }
    }

    var url = uri + query;
    document.location = url;
}


/* ---------------------------------------------
 * Call this function to check if the printer is ready
 * the response will come in the printerReadyResponse function
 * --------------------------------------------- */
rb.printerReadyRequest = function() {
    $.ajax({
        url: '/status',
        success: rb.printerReadyResponse,
    });
}

/* ---------------------------------------------
 * Call this function to check if the printer is ready
 * the response will come in the printerReadyResponse function
 * --------------------------------------------- */
rb.printerReadyResponse = function(res, result, req) {
  // /status response
    if(res == "READY") {
      $('#printer-status').html("Printer: ready...");
      $('#retry-button').prop('disabled', true);
      $('#print-button').prop('disabled', false);
    } else {
      $('#printer-status').html("Printer: error...");
      $('#retry-button').prop('disabled', false);
      $('#print-button').prop('disabled', true);
    } 
}

/* ---------------------------------------------
 * Look at state, calculate a file name and print it
 * --------------------------------------------- */
rb.printCurrentFile = function() {
    var file = rb.state.component + "-" + rb.state.orientation + "-" + rb.state.size;
    var url = "/loadAndPrint/" + file;

    alert("Call: " + url);


}
