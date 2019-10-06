// var differentThanDefects = $(".ui-sortable tr img[alt!='Defect Sub-task'] ");
// var closedDefects = $(".ui-sortable tr span:contains('Closed')");


// $("#view-subtasks_heading").append("<button id='show' style='border-radius:6px;margin:3px;background-color: #2684ff;border: none;color: white;padding: 5px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;'>show</button>");
// $("#view-subtasks_heading").append("<button id='hide' style='border-radius:6px;margin:3px;background-color: #2684ff;border: none;color: white;padding: 5px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px;'>hide</button>");


// $("#hide").click(function () {
//   differentThanDefects.parent().parent().parent().hide(500);
//   closedDefects.parent().parent().hide(500);
// });

// $("#show").click(function () {
//   differentThanDefects.parent().parent().parent().show(500);
//   closedDefects.parent().parent().show(500);
// });




var jiraAddonContent =
  '<div class="issues-wrap" style="padding-top: 16px;">' +
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
  '<input type="checkbox" name="issue-type" value="Sub-task" id="Sub-task" /> Sub-task</label>' +
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

$("#greenhopper-agile-issue-web-panel_heading").append(jiraAddonContent);




var jiraAddon = {
  matchedIssueStatus: false,
  matchedIssueType: false,

  selectedFilters: [],
  listOfElements: [],

  arrayIssueStatus: [],
  arrayIssueType: [],
  // tab_resoult: [],

  init: function () {
    // przygotowuje dane:
    // listOfElements - cala tablica subtascków
    jiraAddon.listOfElements = $($('.issuerow'));
    // przygotowujemy sobie tablice pomocniczą z elementami ktor na każdym tasku będziemy filtrować 

    jiraAddon.listOfElements.each(function (ind, el) {
      var issueStatus = $(el).find('.status span').text();
      var isseuType = $(el).find('.issuetype a img').attr('alt');

      jiraAddon.arrayIssueStatus[ind] = [issueStatus];
      jiraAddon.arrayIssueType[ind] = [isseuType];

      // jiraAddon.tab_resoult[ind] = [issueStatus, isseuType];
      // do przemyślenia -- ---- -----------------------------------------------------------------------------
    });


    // zbieramy z widoku listę filtrów
    var filterCheckboxes = $('.issues-wrap input[type="checkbox"]');
    // każdy filtr będzie nasłuchiwał zmiany wartości
    filterCheckboxes.on('change', function (elem) {
      // jiraAddon.selectedFilters zawiera aktualne zaznaczone checkboxy 
      jiraAddon.selectedFilters = [];

      filterCheckboxes.filter(':checked').each(function (j, el) {
        // twożymy listę zaznaczonych w tablicy jiraAddon.selectedFilters  ( poprostu update)
        jiraAddon.selectedFilters.push(el.value);
      });
      // wołamy funkcję filtrującą dane (hide /show)
      jiraAddon.filter();
    });
  },


  filter: function () {

    // dla każego elementu z widoku robimy sprawdzenie czy spełnia WSZYSTKIE warunki filtru

    jiraAddon.listOfElements.each(function (ind, el) {
      // każdy element ze zbioru wyżej przechodzi przez each dla filtru niżej
      jiraAddon.matchedIssueStatus = false;
      jiraAddon.matchedIssueType = false;

      // jiraAddon.test = false;


      if (jiraAddon.selectedFilters.length == 0) {
        jiraAddon.matchedIssueStatus = true;
        jiraAddon.matchedIssueType = true;

        // jiraAddon.test = true;

      }

      jiraAddon.selectedFilters.forEach(function (filterValue, intValue) {

        //   if (ind == 1){
        //     console.warn('jiraAddon.arrayIssueStatus[ind] '+jiraAddon.arrayIssueStatus[ind]);
        //     console.warn('jiraAddon.arrayIssueType[ind] '+jiraAddon.arrayIssueType[ind]);

        //     console.warn('filter value '+filterValue);
        //     console.warn('indexOf status'+jiraAddon.  arrayIssueStatus[ind].indexOf(filterValue));
        //     console.warn('indexOf type'+jiraAddon.arrayIssueStatus[ind].indexOf(filterValue));
        // }



        // if (jiraAddon.tab_resoult[ind].indexOf(filterValue) !== -1) {
        //   jiraAddon.test = true;
        //   // return false;
        // }

        // return jiraAddon.test;

        if (jiraAddon.arrayIssueType[ind].indexOf(filterValue) !== -1) {
          jiraAddon.matchedIssueType = true;
          var dupa = function() {

          }
        }

        if (jiraAddon.arrayIssueStatus[ind].indexOf(filterValue) !== -1) {
          jiraAddon.matchedIssueStatus = true;
        }

      });
      // if (ind == 18) {
      //   console.log("sprawdzanie wartości dla");
      //   console.log(jiraAddon.test);
      //   console.log(ind);
      //   console.log(jiraAddon.selectedFilters);
      //   console.log(jiraAddon.tab_resoult[ind]);

      // }

      // $('.issuerow').hide(200).filter(this.selectedFilters).show(200);

      switch (true) {
        case (jiraAddon.matchedIssueStatus && jiraAddon.matchedIssueType):
          $(el).show(200);
          break;
        case (jiraAddon.matchedIssueStatus):
          $(el).show(200);
          break;
        case (jiraAddon.matchedIssueType):
          $(el).show(200);
          break;
        default:
          $(el).hide(200);
          break;
      }
    });
  }
}

jiraAddon.init();