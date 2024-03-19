var contact_notifications=[];

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");
    show_all_loan_offers();   
    show_all_loan_categories(); 
    document.querySelector("#new-loan-offer-form").addEventListener("submit", () => add_loan_offer());
    });

function show_all_loan_offers(){
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "offeredLoansDiv");
  const titleDiv = document.createElement("div");
  titleDiv.innerHTML="<h3>All Loan Offers</h3>";
     // Show all offered_loans
  fetch(`/offered_loans`) // url with that API
    .then(response => response.json())
    .then(all_offered_loans=> {
      var offered_loans=all_offered_loans["offered_loans"];
      for (let i = 0; i < offered_loans.length; i++) {
        build_loan_offer(offered_loans[i],newDiv);
      }
      document.querySelector('#adminOfferedLoansDiv').appendChild(titleDiv);
      document.querySelector('#adminOfferedLoansDiv').appendChild(newDiv);
    });
}

function show_all_loan_categories(){
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "offeredLoansCategoryDiv");
     // Show all posts
    fetch(`/offered_loans`) // url with that API
    .then(response => response.json())
    .then(all_offered_loans=> {
      var offered_loans=all_offered_loans["offered_loans"];
      for (let i = 0; i < offered_loans.length; i++) {
        const categoryDiv = document.createElement("div");
        categoryDiv.setAttribute("class", "categoryDiv");
        var a  = document.createElement('a');
        var loan_category_p = document.createElement("p"); //creat
        loan_category_p.setAttribute("id","loan_category_p"+ offered_loans[i].id);
        loan_category_p.innerHTML=offered_loans[i].description;
        a.setAttribute("href", "register");
        a.setAttribute("class", "loan-types-button");
        a.append(offered_loans[i].category);
        categoryDiv.appendChild(a);
        categoryDiv.appendChild(loan_category_p);
        newDiv.appendChild(categoryDiv);
      }
      document.querySelector('#allOfferedLoansCategoriesDiv').appendChild(newDiv);

    });
}

function build_loan_offer(loanOffer,newDiv) {
  var ul = document.createElement("ul");
  var eachLoanul = document.createElement("ul");
  ul.style="list-style-type: none";
  var li, a;
  var loan_p = document.createElement("p"); //creat
  loan_p.setAttribute("id","loan_p"+loanOffer.id);
  li = document.createElement('li');
  const loanOfferDiv = document.createElement("div");
  loanOfferDiv.setAttribute("id","loanOfferDiv"+loanOffer.id);
  loanOfferDiv.setAttribute("class","loanOfferDiv");
  eachLoanul.innerHTML += `<li> Category :`+ loanOffer.category+ `</li>`;
  eachLoanul.innerHTML += `<li> Max Amount :`+ loanOffer.max_amount+ `</li>`;
  eachLoanul.innerHTML += `<li> Min Amount :`+ loanOffer.min_amount+ `</li>`;
  eachLoanul.innerHTML += `<li> Min Credit :`+ loanOffer.min_credit+ `</li>`;
  eachLoanul.innerHTML += `<li> Payment Frequency :`+ loanOffer.payment_frequency+ `</li>`;
  eachLoanul.innerHTML += `<li> Interest Rate :`+ loanOffer.rate+ `</li>`;
  loan_p.innerHTML="<h1>Loan</h1>" + loanOffer.category;
  const delBtnDiv = document.createElement("div");
  delBtnDiv.setAttribute("id","delBtnDiv"+loanOffer.id);
  delBtnDiv.setAttribute("class","delBtnDiv");
  const deleteBtn = document.createElement("BUTTON");
  deleteBtn.innerHTML= 'Delete Loan Offer';
  deleteBtn.setAttribute("id","deleteBtn"+loanOffer.id);
  deleteBtn.setAttribute("class","login-contact-btn"  );
  deleteBtn.onclick = function(){
    remove_loan_offer(loanOffer.id);      
  };  
  loanOfferDiv.appendChild(eachLoanul);
  delBtnDiv.appendChild(deleteBtn);
  li.appendChild(loanOfferDiv);
  li.appendChild(delBtnDiv);

  ul.appendChild(li);
// add the text node to the newly created div
  newDiv.appendChild(ul);
}

function contact_user() {
  const fullname=document.querySelector('#fullname').value;
  const email=document.querySelector('#email').value;
  const phone=document.querySelector('#phone').value;
  const postal_code=document.querySelector('#postal').value;
  const message=document.querySelector('#message').value;
  document.getElementById('contactDiv').innerHTML="";
  document.getElementById('contactDiv').innerHTML="<h3>Thank you "+ fullname+ " for contacting us.Someone will be in touch with you within the next 24 hours!</h3>";
  fetch('/contact_notification', {
    method: 'POST',
    body: JSON.stringify({
      fullname:fullname,
      email:email,
      phone :phone,
      postal_code:postal_code,
      message:message,
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);

  })
  // Catch any errors and log them to the console
  .catch(error => {
    console.log('Error:', error);
  });
}


function add_loan_offer() {
    const category=document.querySelector('#category').value;
    const description=document.querySelector('#description').value;
    const payment_frequency=document.querySelector('#payment_frequency').value;
    const rate=document.querySelector('#rate').value;
    const min_credit=document.querySelector('#min_credit').value;
    const min_amount=document.querySelector('#min_amount').value;
    const max_amount=document.querySelector('#max_amount').value;
    const max_tenure=document.querySelector('#max_tenure').value;

    fetch('/loan_offer', {
      method: 'POST',
      body: JSON.stringify({
        category:category,
        description:description,
        payment_frequency :payment_frequency,
        rate:rate,
        min_credit:min_credit,
        min_amount:min_amount,
        max_amount:max_amount,
        max_tenure:max_tenure      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
  
    })
    // Catch any errors and log them to the console
    .catch(error => {
      console.log('Error:', error);
    });
    location.reload();
  }



function new_application(){
  var categories=document.getElementById('categories').value;
  var username=document.getElementById('username').value;
   // Create a form dynamically
   var form = document.createElement("form");
   form.setAttribute("method", "post");
   form.setAttribute("action", "javascript:create_new_application(\""+username+"\")");
   form.setAttribute("id", "new_application_form");

  // Create an breakline  element
   var br = document.createElement("br"); 
   // Create an input element for each field
   var selectList = document.createElement("select");
   selectList.id = "category";
   selectList.setAttribute("class", "new-application-form-control");
   var stringarrays1 =categories.split("[");
   var stringarrays2 =stringarrays1[1].split("]");
   const array = stringarrays2[0].split(",");
      //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
       // Removing the first character
       var slice=array[i].replaceAll("\'", "");
        option.text = slice;
        option.value = slice;
        selectList.appendChild(option);
      }
  
  var lbltitle = document.createElement("label");
  lbltitle.innerHTML="<strong>Please fill the information below start your loan application.We will use you existing profile.If anything has changed,please update your profile before applying.</strong>";
  lbltitle.setAttribute("class", "new-application-form-control");
   var lblcategory = document.createElement("label");
   lblcategory.innerHTML="Category/Type: ";
   lblcategory.setAttribute("class", "new-application-form-control");
   var lblreq_amt = document.createElement("label");
   lblreq_amt.innerHTML="Amount Requested: ";
   lblreq_amt.setAttribute("class", "new-application-form-control");
   var req_amt = document.createElement("input");
   req_amt.setAttribute("class", "new-application-form-control");
   req_amt.setAttribute("type", "number");
   req_amt.setAttribute("id", "requested_amount");
   req_amt.setAttribute("placeholder", "Amount requested");
   var s = document.createElement("input");
   s.setAttribute("type", "submit");
   s.setAttribute("value", "Submit Application ");
   s.setAttribute("class", "login-contact-btn");
   s.setAttribute("id", "btnSubmitApplication");

   form.appendChild(lbltitle); 
   form.appendChild(br.cloneNode()); 
   form.appendChild(lblcategory); 
   form.appendChild(selectList); 
   form.appendChild(br.cloneNode()); 
   form.appendChild(lblreq_amt); 
   form.appendChild(req_amt); 
   form.appendChild(br.cloneNode()); 
   form.appendChild(s); 
   var currentDiv = document.getElementById('newApplicationDiv');
   currentDiv.innerHTML="";
   currentDiv.appendChild(form);
   //currentDiv.appendChild(newDiv);
}
function create_new_application(username){
  var amount = document.getElementById('requested_amount').value;
  var category = document.getElementById('category').value;
  save_application(username,amount,category).then(function() {
    location.reload();  
  });  
}
function  save_application(username,amount,category){
  try {
    return  fetch('/new-application', {
      method: 'POST',
      body: JSON.stringify({
        username:username,
        amount:amount,
        category:category
          })   
    });
  } catch (error) {
    console.log('Error:', error);
  } 
  location.reload();
}
    
function remove_notification(btnID){
  var idArray= btnID.split("btnDeleteNotification-");
  var id= idArray[1];
  delete_notification(id).then(function() {
    location.reload();  
  });  
}
function delete_notification(id){
 
  try {
    return  fetch('/contact_notification', {
      method: 'DELETE',
      body: JSON.stringify({
        id:id,
          })   
    });
  } catch (error) {
    console.log('Error:', error);
  } 
  location.reload();
}

function withdraw_application(btnID){
  if (confirm('Are you sure you want to withdraw this application?')) {
    // delete application !
    var idArray= btnID.split("btnDeleteApplication-");
    var id= idArray[1];
    delete_application(id).then(function() {
      location.reload();  
    });  
    console.log('Application deleted');
  } else {
    // Do nothing!
    console.log('Application not deleted');
  }
}
function  delete_application(id){
  try {
    return  fetch('/applications/'+ id , {
      method: 'DELETE',
      body: JSON.stringify({
          })   
    });
  } catch (error) {
    console.log('Error:', error);
  } 
}
    
function remove_loan_offer(id){
  if (confirm('Are you sure you want to remove  this loan offer?')) {
    // delete application !
    delete_loan_offer(id).then(function() {
      location.reload();  
    });  
    console.log('loan_offer deleted');
  } else {
    // Do nothing!
    console.log('loan_offer not deleted');
  }
}
function delete_loan_offer(id){
 
  try {
    return  fetch('/loan_offer', {
      method: 'DELETE',
      body: JSON.stringify({
        id:id
          })   
    });
  } catch (error) {
    console.log('Error:', error);
  } 
  location.reload();
}