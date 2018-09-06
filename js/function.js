
//paractice 1
var array = [];

var Constractor = function(index){
  this.index = index;
  var len = array.length

  if(len >= 3){
    console.log(array[Math.floor(Math.random() * array.length)]);
    return array[Math.floor(Math.random() * len)];
  }
  array.push(this);
  this.init();
};

Constractor.prototype = {
  init : function(){
    console.log(this.index);
  }
};

$(function(){
  new Constractor(0);
  new Constractor(1);
  new Constractor(2);
  new Constractor(3);
});
