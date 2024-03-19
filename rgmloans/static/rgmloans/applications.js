document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");
    document.querySelector('#statusesDiv').style.display = 'none';
    show_all_applications();
  });

   function show_all_applications(){
    // Show all applications
    const newDiv = document.createElement("div");
      newDiv.innerHTML = '<h3>All  Applications</h3>';
      newDiv.setAttribute("class", "allApplicationsNestedDiv");
   fetch('/applications/all') // url with that API
   .then(response => response.json())
   .then(all_applications=> {
     const applications =all_applications["all_applications"];
     for (let i = 0; i < applications.length; i++) {
      build_AppDiv(applications[i],newDiv);
     }
     document.querySelector('#allApplicationsDiv').appendChild(newDiv);

   });
   document.querySelector('#allApplicationsDiv').innerHTML = "";
}

function build_AppDiv(application,newDiv) {
    var ul = document.createElement("ul");
    ul.style="list-style-type: none";
    var li, a;
    const applicationDiv = document.createElement("div");
    var link="/profiles/"+ application.user;
    var application_p = document.createElement("p"); //creat
    application_p.setAttribute("id","application_p"+application.id);
    applicationDiv.setAttribute("id","applicationDiv"+application.id);
    applicationDiv.setAttribute("class","applicationDiv");
    application_p.innerHTML ='<strong> Application #: </strong>'+ application.id + 
                        '<br><strong>Loan Type Applied:</strong>'+ application.loan_applied_for + 
                        '<br><strong>   Requested Amount:</strong>'+ application.requested_amount +
                        '<br><strong>   Date Applied:</strong>'+ application.date_applied+
                        '<br><strong>   Applicant:</strong><a href="' + link + '">'+ application.user +'</a>'+
                        '<br><strong>   Status:</strong>'+ application.status;
    const updateBtn = document.createElement("BUTTON");
    updateBtn.innerHTML= 'Update Status';
    updateBtn.setAttribute("class","login-contact-btn");
    updateBtn.setAttribute("id","btnUpdateAppStatus-"+application.id);
    li = document.createElement('li');
    updateBtn.onclick = function(){
      edit_application(application);
    };  
    applicationDiv.append(application_p);
    applicationDiv.appendChild(updateBtn);
    li.appendChild(applicationDiv);
    ul.appendChild(li);
  // add the text node to the newly created div
    newDiv.appendChild(ul);
}

function edit_application(application){
    var application_p = document.createElement("p"); //creat
    var status_p = document.createElement("p"); //creat
    var saveBtn = document.createElement("button");
    var id=application.id;
    var statuses= document.getElementById("statusesDiv").innerHTML;
    statuses = statuses.replace(/[^a-zA-Z0-9]/g,' ');
    const sArray = statuses.split(" ");
    let array= [...new Set(sArray)];
     //Create and append select list
     const newDiv = document.createElement("div");
     var link="/profiles/"+ application.user;
     newDiv.setAttribute("id", "saveAppStatusDiv-"+ application.id);
     application_p.innerHTML = '<strong>Loan Applied:</strong>'+ application.loan_applied_for + 
                            '<br><strong>Requested_amount:</strong>'+ application.requested_amount +
                            '<br><strong>Date Applied:</strong>'+ application.date_applied+
                            '<br><strong>Applicant:</strong><a href="' + link + '">'+ application.user +'</a>'+
                            '<br><strong>Status:</strong>'+ application.status;
      var selectList = document.createElement("select");
      selectList.id = "appStatuses"+id;
      //Create and append the options
      for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
      }
    application_p.setAttribute("class","edit_application");
    application_p.setAttribute("id", "editApplication" + id);
    saveBtn.innerHTML= 'Save Status';
    saveBtn.setAttribute("name", "saveBtn" + id);
    saveBtn.onclick = function(){
      save_application(id);      
    };  
    var currentDiv = document.getElementById('applicationDiv'+ id);
    const applicationDiv = document.createElement("div");
    applicationDiv.setAttribute("id","editApplicationDiv" + id);
    var current_p = document.getElementById('application_p'+ id);
    current_p.style.display = 'none';
    var editBtn = document.getElementById('btnUpdateAppStatus-'+ id);
    editBtn.remove();
    applicationDiv.append(application_p);
    applicationDiv.appendChild(selectList);
    //applicationDiv.appendChild(status_p);
    applicationDiv.appendChild(saveBtn);
    currentDiv.prepend(applicationDiv);
  }

function save_application(id) {
  var e = document.getElementById("appStatuses"+id);
  var selected_value = e.options[e.selectedIndex].value;
  updateStatus(id,selected_value).then(function() {
        show_all_applications();
    });
  
  }
  
function updateStatus(applicationID,status) {
    try {
    return  fetch('/applications/' + applicationID, {
      method: 'PUT',
      body: JSON.stringify({
        status: status,
      })
    });
  } catch (error) {
    console.log('Error:', error);
  } 
   //location.reload();  
  }
   
