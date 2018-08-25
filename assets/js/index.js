var tripsArray = [], trigger = $('.hamburger'), overlay = $('.overlay'), isClosed = false;
$(document).ready(function () {
  trigger.click(function () {
    hamburger_cross();      
  });  
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  }); 
  
  $('#sortByOperator').click(function(){
    sorting(tripsArray, 'operator', 'sortByOperator');
  });
  $('#sortByOrigin').click(function(){
    sorting(tripsArray, 'origin', 'sortByOrigin');
  });
  $('#sortByDestination').click(function(){
    sorting(tripsArray, 'designation', 'sortByDestination');
  });
  $('#sortByDate').click(function(){
    sorting(tripsArray, 'time', 'sortByDate');
  });

  init();
});

function init(){
  var A = parseInt($('#leftsplit-section').width(), 10),
      B = parseInt($('#rightsplit-section').width() - 185, 10),
      Z = parseInt($('#splitter').width(), 10),
      minw = parseInt((A + B + Z) * 10 / 100, 10),
      offset = $('#two-column-container').offset(),
      splitter = function(event, ui){
          var aw = parseInt(ui.position.left),
              bw = A + B - aw;
          //set widths and information...
          $('#leftsplit-section').css({width : aw}).children();
          $('#rightsplit-section').css({width : bw}).children();
      };

  $('#splitter').draggable({
      axis : 'x',
      containment : [
          offset.left + minw,
          offset.top,
          offset.left + A + B - minw,
          offset.top + $('#two-column-container').height()
          ],
      drag : splitter
  });

  trigger.click();

  tripsArray = [
    {
      "origin" : "Delhi",
      "designation" : "Pune",
      "operator" : "Volvo 1",
      "time" : "17:30"
    },
    {
      "origin" : "Gwalior",
      "designation" : "Haridwar",
      "operator" : "Volvo 3",
      "time" : "28:30"
    },
    {
      "origin" : "Kanpur",
      "designation" : "Jabalpur",
      "operator" : "Volvo 5",
      "time" : "12:30",
      "active" : true
    },
    {
      "origin" : "Haridwar",
      "designation" : "Gwalior",
      "operator" : "Volvo 2",
      "time" : "24:30"
    },
    {
      "origin" : "Pune",
      "designation" : "Delhi",
      "operator" : "Volvo 4",
      "time" : "14:30"
    }
  ]

  printHtml(tripsArray);

}

function hamburger_cross() {
  trigger.toggleClass('fa-bars fa-times');
  if (isClosed == true) {          
    overlay.hide();
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
    isClosed = false;
  } else {   
    overlay.show();
    trigger.removeClass('is-closed');
    trigger.addClass('is-open');
    isClosed = true;
  }
}

function sorting(arr, sortOn, id) {
  console.log($('#'+id).html());
  var getAttributeValue = $('#'+id).attr('data-orderby');
  var how = 'asc';
  if(getAttributeValue == 'asc'){
    console.log("IF")
    $('#'+id).attr('data-orderby','dsc');
  }
  else{
    console.log("ELSE")
    how = '';
    $('#'+id).attr('data-orderby','asc');
  }
  arr.sort(function(a, b){
     var keyA = a[sortOn],
         keyB = b[sortOn]
     // Compare the 2 dates
     if(keyA < keyB) return (how==='asc')?1:-1;
     if(keyA > keyB) return (how==='asc')?-1:1;
     return 0;
  });
  console.log(arr);
  printHtml(arr)
}

function printHtml(data){
  $('#cards-container').html('');
  data.forEach(function(item){
    console.log(item);
    var activeCard;
    (item.active) ? activeCard = 'active' : activeCard = '';
    $('#cards-container')
    .append(`<div class="col-xs-12 each-card `+activeCard+`">
              <div class="circle-div">
                <i class="fa fa-plane"></i>
              </div>
              <div class="col-xs-8">
                <div class="station-name">
                  <span class="origin">`+item.origin+`</span> -
                  <span class="destination">`+item.designation+`</span>
                </div>
                <div class="caption operator-name">`+item.operator+`</div>
              </div>
              <div class="col-xs-4 caption text-right">
                <div>Departing</div>
                <div class="departing-time">`+item.time+`</div>
              </div>
            </div>`);
  });
}