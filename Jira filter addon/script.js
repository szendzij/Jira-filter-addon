var jiraAddon = {
  selectedFiltersOfType: [],
  selectedFiltersOfStatus: [],
  listOfElements: [],
  arrayIssueStatus: [],
  arrayIssueType: [],
  listOfCheckboxesOfType: [],
  listOfCheckboxesOfStatus: [],
  init: function () {
    jiraAddon.addingHtml();
    jiraAddon.listOfElements = $($('.issuerow'));
    jiraAddon.listOfElements.each(function (ind, el) {
      var issueStatus = $(el).find('.status span').text();
      var isseuType = $(el).find('.issuetype a img').attr('alt');
      jiraAddon.arrayIssueStatus[ind] = issueStatus;
      jiraAddon.arrayIssueType[ind] = isseuType;
      jiraAddon.addStatusHtml(issueStatus);
      jiraAddon.addTypeHtml(isseuType);
    });
    var filterCheckboxesOfType = $('.checkboxesOfIssueType input[type="checkbox"]');
    filterCheckboxesOfType.on('change', function (elem) {
      jiraAddon.selectedFiltersOfType = [];

      filterCheckboxesOfType.filter(':checked').each(function (j, el) {
        jiraAddon.selectedFiltersOfType.push(el.value);
      });
      jiraAddon.filter();
    });
    var filterCheckboxesOfStatus = $('.checkboxesOfIssueStatus input[type="checkbox"]');
    filterCheckboxesOfStatus.on('change', function (elem) {
      jiraAddon.selectedFiltersOfStatus = [];
      filterCheckboxesOfStatus.filter(':checked').each(function (j, el) {
        jiraAddon.selectedFiltersOfStatus.push(el.value);
      });
      jiraAddon.filter();
    });
  },
  addingHtml: function () {
    var jiraAddonContent =
      '<div class="issues-wrap" style="padding-top: 16px;">' +
      '<p style="font-size:16px;text-decoration: underline;"><strong>Issue Type:</strong></p>' +
      '<form class="checkboxesOfIssueType">' +
      '</form>' +
      '<p style="font-size:16px;text-decoration: underline;"><strong>Issue Status:</strong></p>' +
      '<form class="checkboxesOfIssueStatus">' +
      '</form>' +
      '</div>';

    $("#greenhopper-agile-issue-web-panel_heading").append(jiraAddonContent);
  },
  addStatusHtml: function (issueStatus) {
    if (jiraAddon.listOfCheckboxesOfStatus.indexOf(issueStatus) == -1) {
      jiraAddon.listOfCheckboxesOfStatus.push(issueStatus);
      $('.checkboxesOfIssueStatus').append(
        '<label style="font-size:16px;">' +
        '<input type="checkbox" name="issue-type" value="' + issueStatus + '"/> ' + issueStatus + '</label>' +
        '<br>')
    }
  },
  addTypeHtml: function (isseuType) {
    if (jiraAddon.listOfCheckboxesOfType.indexOf(isseuType) == -1) {
      jiraAddon.listOfCheckboxesOfType.push(isseuType);
      $('.checkboxesOfIssueType').append(
        '<label style="font-size:16px;">' +
        '<input type="checkbox" name="issue-type" value="' + isseuType + '"/> ' + isseuType + '</label>' +
        '<br>')
    }
  },
  filter: function () {
    jiraAddon.listOfElements.each(function (ind, el) {
      var elementInType = jiraAddon.selectedFiltersOfType.indexOf(jiraAddon.arrayIssueType[ind]) !== -1 ? true : false;
      var elementInStatus = jiraAddon.selectedFiltersOfStatus.indexOf(jiraAddon.arrayIssueStatus[ind]) !== -1 ? true : false;
      if (jiraAddon.selectedFiltersOfType.length == 0) {
        elementInType = true;
      }
      if (jiraAddon.selectedFiltersOfStatus.length == 0) {
        elementInStatus = true;
      }
      if (elementInType == true && elementInStatus == true) {
        $(el).show(100);
      } 
      else {
        $(el).hide(100);
      }
    });
  }
}

jiraAddon.init();