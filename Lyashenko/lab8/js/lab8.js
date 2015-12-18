$(document).ready(function(){

  var valInd=0;
  var maxInd=0;

    var hash=[];
    for(var i=0;i<10;i++){
      var number=Math.round(Math.random()*100);
      hash[i]=number;
      //maxInd=i;
    }

    //maxInd=i

  function ascendingSort(a,b){
    return a-b;
  };

function viewIndex(n){
  var index = n;
  $('#index').html(index);
};

function viewVal(n){
  var value=hash[n];
  $('#val').html(value);
};

function nextVal(){
  valInd++;
  checkValInd();
  viewIndex(valInd);
  viewVal(valInd);
};

function previousVal(){
  valInd--;
  checkValInd();
  viewIndex(valInd);
  viewVal(valInd);
};

function checkValInd(){
  if(valInd>maxInd-1){valInd=maxInd-1};
  if(valInd<0){valInd=0};
};

function addNewElem(){
  var val=$('#newVal').val();
  if(val !=""){
    hash.push(val);
    maxInd++;
    $('#quantity').html(maxInd);
  }
};

maxInd=i;
hash.sort(ascendingSort);
console.log(hash);
console.log(maxInd);

  $('#quantity').html(maxInd);
  $('#firstElem').click(function() {viewVal(0)});
  $('#firstElem').click(function() {viewIndex(0)});
  $('#next').click(function(){nextVal()});
  $('#previous').click(function(){previousVal()});
  $('#add').click(function() {addNewElem()});
  //addNewElem();
  //addNewElem();
  //console.log(hash);
  //addNewElem();
});
