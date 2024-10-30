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
  isDragging: false,
  dragOffset: { x: 0, y: 0 },

  init() {
    this.addingHtml();
    this.cacheDomElements();
    this.populateIssueArrays();
    this.attachFilterEventHandlers();
    this.attachToggleEventHandlers();
    this.makeDraggable();
  },

  cacheDomElements() {
    this.lists.elements = $('.issuerow');
  },

  populateIssueArrays() {
    this.lists.elements.each((index, el) => {
      var issueStatus = $(el).find('.status span').text();
      var issueType = $(el).find('.issuetype a img').attr('alt');
      var issueAssignment = $(el).find('.assignee').text();

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
      <div id="addon-content" style="
        position: fixed;
        bottom: 2rem;
        backdrop-filter: blur(10px);
        border: 1px solid #f5f1f1;
        max-width: 210px;
        max-height: 410px;
        height: fit-content;
        padding: 1em;
        z-index: 100;
        overflow: auto;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
      ">
        <div>
          <p class="filter-title" style="display: flex; justify-content: space-between;">
            <strong class="toggle-button" data-target="checkboxesOfIssueType" style="font-size: 16px; text-decoration: underline;  cursor: pointer;">Issue Type:</strong>      
          </p>
          <form class="checkboxesOfIssueType"></form>
          
          <p class="filter-title" style="display: flex; justify-content: space-between;">
            <strong class="toggle-button" data-target="checkboxesOfIssueStatus" style="font-size: 16px; text-decoration: underline; cursor: pointer;">Issue Status:</strong>
          </p>
          <form class="checkboxesOfIssueStatus"></form>
          
          <p class="filter-title" style="display: flex; justify-content: space-between;">
            <strong class="toggle-button" data-target="checkboxesOfIssueAssignment" style="font-size: 16px; text-decoration: underline; cursor: pointer;">Issue Assignee:</strong>
          </p>
          <form class="checkboxesOfIssueAssignment"></form>
        </div>
        <svg  id="draggable-element" width="34px" height="34px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)rotate(90)" style="margin: -5px; cursor: pointer;">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#121923"></path>
          </g>
        </svg>
      </div>
    `;
    $("#greenhopper-agile-issue-web-panel").append(htmlContent);
  },

  attachToggleEventHandlers() {
    $('.toggle-button').on('click', (event) => {
      const targetClass = $(event.target).data('target');
      $(`.${targetClass}`).toggle(200);
    });
  },

  makeDraggable() {
    const draggableTrigger = document.getElementById('draggable-element');
    const draggableContent = document.getElementById('addon-content');

    draggableTrigger.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragOffset.x = e.clientX - draggableContent.offsetLeft;
      this.dragOffset.y = e.clientY - draggableContent.offsetTop;

      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        draggableContent.style.left = `${e.clientX - this.dragOffset.x}px`;
        draggableContent.style.top = `${e.clientY - this.dragOffset.y}px`;
        draggableContent.style.position = 'fixed';
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }
};


jiraAddon.init();


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
