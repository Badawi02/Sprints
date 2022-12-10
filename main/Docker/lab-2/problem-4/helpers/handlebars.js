function exphbsHelpers(exphbs) {
    exphbs.registerHelper("contains", function(value, haystack) {
      
        return parseInt(value) + 1;
    });
  
    // More helpers...
  }
  
  module.exports = exphbsHelpers;