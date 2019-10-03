var differentThanDefects = $(".ui-sortable tr img[alt!='Defect Sub-task'] ");
var closedDefects = $(".ui-sortable tr span:contains('Closed')");

$("#view-subtasks_heading").append("<button id='show' style='border-radius:6px;margin:3px;background-color: #2684ff;border: none;color: white;padding: 5px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px;'>show</button>");
$("#view-subtasks_heading").append("<button id='hide' style='border-radius:6px;margin:3px;background-color: #2684ff;border: none;color: white;padding: 5px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px;'>hide</button>");


$("#hide").click(() => {

	differentThanDefects.parent().parent().parent().hide();
	closedDefects.parent().parent().hide();
})

$("#show").click(() => {

	differentThanDefects.parent().parent().parent().show();
	closedDefects.parent().parent().show();
})

