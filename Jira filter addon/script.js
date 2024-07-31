var jiraAddon = {
  selectedFilters: {
    type: [],
    status: [],
    assignment: []
  },
  lists: {
    elements: [],
    issueStatus: [],
    issueType: [],
    issueAssignment: [],
    checkboxesOfType: [],
    checkboxesOfStatus: [],
    checkboxesOfAssignment: []
  },

  init() {
    this.addingHtml();
    this.cacheDomElements();
    this.populateIssueArrays();
    this.attachFilterEventHandlers();
  },

  cacheDomElements() {
    this.lists.elements = $('.issuerow');
  },

  populateIssueArrays() {
    this.lists.elements.each((index, el) => {
      var issueStatus = $(el).find('.status span').text();
      var issueType = $(el).find('.issuetype a img').attr('alt');
      var issueAssignment = $(el).find('.assignee').text(); // Assuming the assignment is in a span within an element with class "assignee"

      this.lists.issueStatus[index] = issueStatus;
      this.lists.issueType[index] = issueType;
      this.lists.issueAssignment[index] = issueAssignment;

      this.addFilterHtml('status', issueStatus);
      this.addFilterHtml('type', issueType);
      this.addFilterHtml('assignment', issueAssignment);
    });
  },

  addFilterHtml(filterType, value) {
    let checkboxesList;
    let container;
    
    if (filterType === 'status') {
      checkboxesList = this.lists.checkboxesOfStatus;
      container = '.checkboxesOfIssueStatus';
    } else if (filterType === 'type') {
      checkboxesList = this.lists.checkboxesOfType;
      container = '.checkboxesOfIssueType';
    } else if (filterType === 'assignment') {
      checkboxesList = this.lists.checkboxesOfAssignment;
      container = '.checkboxesOfIssueAssignment';
    }

    if (checkboxesList.indexOf(value) === -1) {
      checkboxesList.push(value);
      $(container).append(
        `<label style="font-size:16px;">
          <input type="checkbox" name="issue-${filterType}" value="${value}"/> ${value}
        </label><br>`
      );
    }
  },

  attachFilterEventHandlers() {
    $('.checkboxesOfIssueType input[type="checkbox"]').on('change', () => this.updateSelectedFilters('type'));
    $('.checkboxesOfIssueStatus input[type="checkbox"]').on('change', () => this.updateSelectedFilters('status'));
    $('.checkboxesOfIssueAssignment input[type="checkbox"]').on('change', () => this.updateSelectedFilters('assignment'));
  },

  updateSelectedFilters(filterType) {
    this.selectedFilters[filterType] = $(`.checkboxesOfIssue${capitalize(filterType)} input[type="checkbox"]:checked`).map((_, el) => el.value).get();
    this.filterIssues();
  },

  filterIssues() {
    this.lists.elements.each((index, el) => {
      let matchesType = this.selectedFilters.type.length === 0 || this.selectedFilters.type.includes(this.lists.issueType[index]);
      let matchesStatus = this.selectedFilters.status.length === 0 || this.selectedFilters.status.includes(this.lists.issueStatus[index]);
      let matchesAssignment = this.selectedFilters.assignment.length === 0 || this.selectedFilters.assignment.includes(this.lists.issueAssignment[index]);

      if (matchesType && matchesStatus && matchesAssignment) {
        $(el).show(100);
      } else {
        $(el).hide(100);
      }
    });
  },

  addingHtml() {
    let htmlContent = `
      <div class="issues-wrap" style="position: absolute; top: 0; right: -14rem;">
        <p style="font-size:16px;text-decoration: underline;"><strong>Issue Type:</strong></p>
        <form class="checkboxesOfIssueType"></form>
        <p style="font-size:16px;text-decoration: underline;"><strong>Issue Status:</strong></p>
        <form class="checkboxesOfIssueStatus"></form>
        <p style="font-size:16px;text-decoration: underline;"><strong>Issue Assignee:</strong></p>
        <form class="checkboxesOfIssueAssignment"></form>
      </div>
    `;
    $("#view-subtasks_heading").append(htmlContent);
  }
};

jiraAddon.init();

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
