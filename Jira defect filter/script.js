
var jiraAddon = {

  selectedFiltersOfType: [],
  selectedFiltersOfStatus: [],
  listOfElements: [],

  arrayIssueStatus: [],
  arrayIssueType: [],
  // tab_resoult: [],

  listOfCheckboxesOfType: [],
  listOfCheckboxesOfStatus: [],

  init: function () {
    // przygotowuje dane:
    // listOfElements - cala tablica subtascków
    jiraAddon.addingHtml();

    jiraAddon.listOfElements = $($('.issuerow'));
    // przygotowujemy sobie tablice pomocniczą z elementami ktor na każdym tasku będziemy filtrować 

    jiraAddon.listOfElements.each(function (ind, el) {
      var issueStatus = $(el).find('.status span').text();
      var isseuType = $(el).find('.issuetype a img').attr('alt');

      jiraAddon.arrayIssueStatus[ind] = issueStatus;
      jiraAddon.arrayIssueType[ind] = isseuType;

      jiraAddon.addStatusHtml(issueStatus);
      jiraAddon.addTypeHtml(isseuType);


      // jiraAddon.tab_resoult[ind] = [issueStatus, isseuType];
      // do przemyślenia -- ---- -----------------------------------------------------------------------------
    });

    // zbieramy z widoku listę filtrów
    var filterCheckboxesOfType = $('.checkboxesOfIssueType input[type="checkbox"]');
    // każdy filtr będzie nasłuchiwał zmiany wartości
    filterCheckboxesOfType.on('change', function (elem) {
      // jiraAddon.selectedFilters zawiera aktualne zaznaczone checkboxy 
      jiraAddon.selectedFiltersOfType = [];

      filterCheckboxesOfType.filter(':checked').each(function (j, el) {
        // twożymy listę zaznaczonych w tablicy jiraAddon.selectedFilters  ( poprostu update)
        jiraAddon.selectedFiltersOfType.push(el.value);
      });
      // wołamy funkcję filtrującą dane (hide /show)
      jiraAddon.filter();
    });


    var filterCheckboxesOfStatus = $('.checkboxesOfIssueStatus input[type="checkbox"]');

    filterCheckboxesOfStatus.on('change', function (elem) {
      // jiraAddon.selectedFilters zawiera aktualne zaznaczone checkboxy 
      jiraAddon.selectedFiltersOfStatus = [];

      filterCheckboxesOfStatus.filter(':checked').each(function (j, el) {
        // twożymy listę zaznaczonych w tablicy jiraAddon.selectedFilters  ( poprostu update)
        jiraAddon.selectedFiltersOfStatus.push(el.value);
      });
      // wołamy funkcję filtrującą dane (hide /show)
      jiraAddon.filter();
    });

  },

  addingHtml: function () {
    var jiraAddonContent = 
    '<div class="issues-wrap" style="padding-top: 16px;">' +
    '<p style="font-size:16px;"><strong>Issue Type:</strong></p>' +
    '<form class="checkboxesOfIssueType">' +
    '</form>' +
    '<p style="font-size:16px;"><strong>Issue status:</strong></p>' +
    '<form class="checkboxesOfIssueStatus">' +
    '</form>' +
    '</div>';

    $("#greenhopper-agile-issue-web-panel_heading").append(jiraAddonContent);
  },

  addStatusHtml: function(issueStatus) {
    if (jiraAddon.listOfCheckboxesOfStatus.indexOf(issueStatus) == -1) {
      jiraAddon.listOfCheckboxesOfStatus.push(issueStatus);
      $('.checkboxesOfIssueStatus').append(
        '<label style="font-size:16px;">' +
        '<input type="checkbox" name="issue-type" value="' + issueStatus + '"/> ' + issueStatus + '</label>' +
        '<br>')
    }
  },

  addTypeHtml: function(isseuType) {
    if (jiraAddon.listOfCheckboxesOfType.indexOf(isseuType) == -1) {
      jiraAddon.listOfCheckboxesOfType.push(isseuType);
      $('.checkboxesOfIssueType').append(
        '<label style="font-size:16px;">' +
        '<input type="checkbox" name="issue-type" value="' + isseuType + '"/> ' + isseuType + '</label>' +
        '<br>')
    }
  },

  filter: function () {

    // dla każego elementu z widoku robimy sprawdzenie czy spełnia WSZYSTKIE warunki filtru

    jiraAddon.listOfElements.each(function (ind, el) {
      // każdy element ze zbioru wyżej przechodzi przez each dla filtru niżej

      // jiraAddon.test = false;

      var elementInType = jiraAddon.selectedFiltersOfType.indexOf(jiraAddon.arrayIssueType[ind]) !== -1 ? true : false;
      var elementInStatus = jiraAddon.selectedFiltersOfStatus.indexOf(jiraAddon.arrayIssueStatus[ind]) !== -1 ? true : false;


      if (jiraAddon.selectedFiltersOfType.length == 0) {
        elementInType = true;
        // jiraAddon.test = true;
      }

      if (jiraAddon.selectedFiltersOfStatus.length == 0) {
        elementInStatus = true;
        // jiraAddon.test = true;
      }

      if (elementInType == true && elementInStatus == true) {
        $(el).show(200);
      } else {
        $(el).hide(200);
      }
    });
  }
}

jiraAddon.init();