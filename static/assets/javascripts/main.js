rb = {}


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

    // get the query string
    if(typeof params != 'undefined') {
      for(var key in params){
          query = query + key + "=" + params[key] + "&";
      }
    } 

    var url = uri + query;
    document.location = url;
}

