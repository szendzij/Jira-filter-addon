var differentThanDefects = $(".ui-sortable tr img[alt!='Defect Sub-task'] ");
var closedDefects = $(".ui-sortable tr span:contains('Closed')");


$("#view-subtasks_heading").append("<button id='show' style='border-radius:6px;margin:3px;background-color: #2684ff;border: none;color: white;padding: 5px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;'>show</button>");
$("#view-subtasks_heading").append("<button id='hide' style='border-radius:6px;margin:3px;background-color: #2684ff;border: none;color: white;padding: 5px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px;'>hide</button>");


$("#hide").click(() => {
	differentThanDefects.parent().parent().parent().hide(500);
  closedDefects.parent().parent().hide(500);
})

$("#show").click(() => {
	differentThanDefects.parent().parent().parent().show(500);
  closedDefects.parent().parent().show(500);
})




var html = '<div class="issues-wrap" style="padding: 16px;border: 1px solid #d4d4d4;border-radius: 9px 9px 9px 9px;">' +
'<p style="font-size:16px;"><strong>Issue Type:</strong></p>' + 
'<form>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-type" value="Change subtask" id="Change subtask" /> Change subtask</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-type" value="Enhancement estimation subtask" id="Enhancement estimation subtask" /> Enhancement estimation subtask</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-type" value="Defect Sub-task" id="Defect Sub-task" /> Defect Sub-task</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-type" value="Sub-task - " id="Sub-task" /> Sub-task</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-type" value="Sub Test Execution" id="Sub Test Execution" /> Sub Test Execution</label>' + 
  '<br>' + 
'</form>' + 
'<p style="font-size:16px;"><strong>Issue status:</strong></p>' + 
'<form>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="New" id="New" /> New</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Resolved" id="Resolved" /> Resolved</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Closed" id="Closed" /> Closed</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Reopened" id="Reopened" /> Reopened</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="In Progress" id="In Progress" /> In Progress</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Ready to review" id="Ready to review" /> Ready to review</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="In review" id="In review" /> In review</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Reviewed" id="Reviewed" /> Reviewed</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Testing on branch" id="Testing on branch" /> Testing on branch</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Testing on branch suspended" id="Testing on branch suspended" /> Testing on branch suspended</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Verified on branch" id="Verified on branch" /> Verified on branch</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Integrated into trunk" id="Integrated into trunk" /> Integrated into trunk</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Testing after integration" id="Testing after integration" /> Testing after integration</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Verified QA" id="Verified QA" /> Verified QA</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="UAT in progress" id="UAT in progress" /> UAT in progress</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Accepted by business" id="Accepted by business" /> Accepted by business</label>' + 
  '<br>' + 
  '<label style="font-size:16px;">' + 
	'<input type="checkbox" name="issue-status" value="Suspended" id="Suspended" /> Suspended</label>' + 
'</form>' + 
'</div>';

$("#greenhopper-agile-issue-web-panel_heading").append(html);




// var $filterCheckboxes = $('input[type="checkbox"]');

// $filterCheckboxes.on('change', function() {

//   var selectedFilters = {};

//   $filterCheckboxes.filter(':checked').each(function() {

//     if (!selectedFilters.hasOwnProperty(this.name)) {
//       selectedFilters[this.name] = [];
//     }

//     selectedFilters[this.name].push(this.value);
// 	console.log(selectedFilters);
//   });

//   // create a collection containing all of the filterable elements
//   var $filteredResults = $('#issuetable .issuerow');
//   console.log($filteredResults);

//   // loop over the selected filter name -> (array) values pairs
//   $.each(selectedFilters, function(name, filterValues) {

//     // filter each .issuetype element
//     $filteredResults = $filteredResults.filter(function() {

//       var matched = false,
//         currentFilterValues = $(this).data('');

//       // loop over each category value in the current .flower's data-category
//       $.each(currentFilterValues, function(_, currentFilterValue) {

//         // if the current category exists in the selected filters array
//         // set matched to true, and stop looping. as we're ORing in each
//         // set of filters, we only need to match once

//         if ($.inArray(currentFilterValue, filterValues) != -1) {
//           matched = true;
//           return false;
//         }
//       });

//       // if matched is true the current .flower element is returned
//       return matched;

//     });
//   });

//   $('.flower').hide().filter($filteredResults).show();

// });



var filtering = {
    
  selectedFilters : [],
  tab_resoult : [],
  tab : [],
  init : function(){
      // przygotowuje dane:
      // tab - cala tablica subtascków
      filtering.tab = $($('.issuerow'));
      // przygotowujemy sobie tablice pomocniczą z elementami ktor na każdym tasku będziemy filtrować 
      filtering.tab.each(function(ind, el){ 
          var status = $(el).find('.status span').text();
          var itype =  $(el).find('.issuetype a img').attr('alt')
          filtering.tab_resoult[ind] = [status, itype];
          console.log(el); 
      });
      
      // zbieramy z widoku listę filtrów
      var $filterCheckboxes = $('.issues-wrap input[type="checkbox"]');
      // każdy filtr będzie nasłuchiwał zmiany wartości
      $filterCheckboxes.on('change', function(elem) {
          // filtering.selectedFilters zawiera aktualne zaznaczone checkboxy 
          filtering.selectedFilters = [];

          $filterCheckboxes.filter(':checked').each(function(j, el) {
              // twożymy listę zaznaczonych w tablicy filtering.selectedFilters  ( poprostu update)
              filtering.selectedFilters.push(el.value);
          });
          // wołamy funkcję filtrującą dane (hide /show)
          console.warn(filtering.selectedFilters);
          filtering.filter();
      });
      // filtering.filter();
  },
  filter : function() {
      // dla każego elementu z widoku robimy sprawdzenie czy spełnia WSZYSTKIE warunki filtru
      filtering.tab.each(function(ind, el){ 
          // każdy element ze zbioru wyżej przechodzi przez each dla filtru niżej
          var test = true;
          filtering.selectedFilters.forEach(function(intValue, filterValue){ 
              if(filtering.tab_resoult.indexOf(filterValue)==-1) {
                  test = false;
              }

          });

          switch(test){ 
          case true: 
              $(el).show();
              break;
          default:
              $(el).hide();
              break;
          }
          
      });
  }    

}




filtering.init();

