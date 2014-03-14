// ==UserScript==
// @name        jira create
// @namespace   http://jira.garmin.com.tw:8080/secure/
// @description auto fill trivial info when creating issue/bug
// @include     http://jira.garmin.com.tw:8080/secure/CreateIssue.jspa*
// @version     1
// @grant       none
// ==/UserScript==

// -------------------------------------------------------------------------- //

// html id
var html_project_name_id = 'xxx';
var html_product_dropdown_select_id = 'xxx';
var html_assignee_id = 'xxx';
var html_assignee_candidate_dropdown_id = 'xxx';
var html_due_day_id = 'xxx';
var html_sqa_verify_id = 'xxx';
var html_affect_version_id = 'xxx';
var html_fix_version_id = 'xxx';

// reduce product selection dropdown list
var project_name = document.getElementById(html_project_name_id).innerHTML;
var product_name_candidate_array = new Array();
product_name_candidate_array.push('xxx1');
product_name_candidate_array.push('xxx2');

if(project_name != null) {
    var dom_product_name_select = document.getElementById(html_product_dropdown_select_id);
    for(i=dom_product_name_select.options.length-1; i>=0; i--) {
        if(product_name_candidate_array.indexOf(dom_product_name_select.options[i].value.trim()) == -1) {
            dom_product_name_select.remove(i);
        }
    }
}

// fill default product name by project name automatically
document.getElementById(html_product_dropdown_select_id).value = product_name_candidate_array[0];

// "assign to me" by default
var user = document.getElementById(html_assignee_id).innerHTML;
var assign_array= new Array();
var assign_array = document.getElementById(html_assignee_candidate_dropdown_id);
var assignee_value = '';
for (i=0; i<assign_array.options.length; i++) {
    if(assign_array.options[i].text === user) {
        assignee_value = assign_array.options[i].value;
    }
}
if(assignee_value != '')
    document.getElementById(html_assignee_candidate_dropdown_id).value = assignee_value;

// set due date to seven days after today by deault
var due_date = new Date();
due_date.setDate(due_date.getDate() + 7);
var dd = due_date.getDate();
var mm = (['Jan', 'Feb', 'Mar','Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])[due_date.getMonth()];
var yyyy = due_date.getFullYear() - 2000;
document.getElementById(html_due_day_id).value = dd+"/"+mm+"/"+yyyy;

// set no to SQA verification by default
document.getElementById(html_sqa_verify_id).value = 'no';

// set smallest number to "Affects Version"
var aff_ver_array = document.getElementById(html_affect_version_id).options;
var min = 10000;
var and = 0;
for(var i=1; i<aff_ver_array.length ; i++) {
    if(aff_ver_array[i].label != 'Unknown' && aff_ver_array[i].label < min) {
        ans = aff_ver_array[i].value;
        min = aff_ver_array[i].label;
    }
}
document.getElementById(html_affect_version_id).value = ans;

// set largest number to "Fix Version"
var fix_ver_array = document.getElementById(html_fix_version_id).options;
var max = -10000;
ans = 0;
for(var i=1; i<fix_ver_array.length ; i++) {
    if(fix_ver_array[i].label != 'Unknown' && fix_ver_array[i].label > max) {
        ans = fix_ver_array[i].value;
        max = fix_ver_array[i].label;
    }
}
document.getElementById(html_fix_version_id).value = ans;

