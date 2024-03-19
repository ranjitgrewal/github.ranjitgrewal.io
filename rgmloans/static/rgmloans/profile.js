document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");
});
function edit_profile(){
    var id=document.getElementById('profileId').value;
    var username=document.getElementById("username").value;
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "saveProfileDiv-"+ id);
    var selectList = document.createElement("select");
    selectList.id = "province"+id;
    selectList.setAttribute("class", "update-profile-form-control");
    var provinces=document.getElementById('provinces').value;
    var provincesstr = provinces.replace(/[^a-zA-Z0-9]/g,' ');
    const sArray = provincesstr.split(" ");
    let array= [...new Set(sArray)];
      //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
      }
    // Create a form dynamically
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "javascript:update_profile(\""+ username+ "\","+id+")");
    form.setAttribute("id", "update_profile");

   // Create an breakline  element
   var br = document.createElement("br"); 

    // Create an input element for each field
    var FN = document.createElement("input");
    FN.setAttribute("class", "update-profile-form-control");
    FN.setAttribute("type", "text");
    FN.setAttribute("name", "first_name");
    FN.setAttribute("id", "first_name"+id);
    FN.setAttribute("value", document.getElementById('first_name').value);
    FN.setAttribute("placeholder", "First Name");
    var LN = document.createElement("input");
    LN.setAttribute("class", "update-profile-form-control");
    LN.setAttribute("type", "text");
    LN.setAttribute("name", "last_name");
    LN.setAttribute("id", "last_name"+id);
    LN.setAttribute("value", document.getElementById('last_name').value);
    LN.setAttribute("placeholder", "Last Name");
    var address = document.createElement("input");
    address.setAttribute("class", "update-profile-form-control");
    address.setAttribute("type", "text");
    address.setAttribute("name", "address");
    address.setAttribute("id", "address"+id);
    address.setAttribute("value", document.getElementById('address').value);
    address.setAttribute("placeholder", "Address"); 
    var city = document.createElement("input");
    city.setAttribute("class", "update-profile-form-control");
    city.setAttribute("type", "text");
    city.setAttribute("name", "city");
    city.setAttribute("id", "city"+id);
    city.setAttribute("value", document.getElementById('city').value);
    city.setAttribute("placeholder", "City"); 
    var postal_code = document.createElement("input");
    postal_code.setAttribute("class", "update-profile-form-control");
    postal_code.setAttribute("type", "text");
    postal_code.setAttribute("name", "postal_code");
    postal_code.setAttribute("id", "postal_code"+id);
    postal_code.setAttribute("value", document.getElementById('postal_code').value);
    postal_code.setAttribute("placeholder", "Postal Code without space"); 
    var phone = document.createElement("input");
    phone.setAttribute("class", "update-profile-form-control");
    phone.setAttribute("type", "text");
    phone.setAttribute("name", "phone");
    phone.setAttribute("id", "phone"+id);
    phone.setAttribute("value", document.getElementById('phone').value);
    phone.setAttribute("placeholder", "Phone ");
    var company = document.createElement("input");
    company.setAttribute("class", "update-profile-form-control");
    company.setAttribute("type", "text");
    company.setAttribute("name", "company");
    company.setAttribute("id", "company"+id);
    company.setAttribute("value", document.getElementById('company').value);
    company.setAttribute("placeholder", "Company or Business name ");
    
    var annual_family_income = document.createElement("input");
    annual_family_income.setAttribute("class", "update-profile-form-control");
    annual_family_income.setAttribute("type", "text");
    annual_family_income.setAttribute("name", "annual_family_income");
    annual_family_income.setAttribute("id", "annual_family_income"+id);
    annual_family_income.setAttribute("value", document.getElementById('annual_family_income').value);
    annual_family_income.setAttribute("placeholder", "Annual Family Income "); 
    
    var total_expenses = document.createElement("input");
    total_expenses.setAttribute("class", "update-profile-form-control");
    total_expenses.setAttribute("type", "text");
    total_expenses.setAttribute("name", "total_expenses");
    total_expenses.setAttribute("id", "total_expenses"+id);
    total_expenses.setAttribute("value", document.getElementById('total_expenses').value);
    total_expenses.setAttribute("placeholder", "Monthly Total Expenses "); 
    var existing_loan_payments = document.createElement("input");
    existing_loan_payments.setAttribute("class", "update-profile-form-control");
    existing_loan_payments.setAttribute("type", "text");
    existing_loan_payments.setAttribute("name", "existing_loan_payments");
    existing_loan_payments.setAttribute("id", "existing_loan_payments"+id);
    existing_loan_payments.setAttribute("value", document.getElementById('existing_loan_payments').value);
    existing_loan_payments.setAttribute("placeholder", "Existing Loan Payments  ");
    var assets_total = document.createElement("input");
    assets_total.setAttribute("class", "update-profile-form-control");
    assets_total.setAttribute("type", "text");
    assets_total.setAttribute("name", "assets_total");
    assets_total.setAttribute("id", "assets_total"+id);
    assets_total.setAttribute("value", document.getElementById('assets_total').value);
    assets_total.setAttribute("placeholder", "Assets Total Value ");
    var credit_rating = document.createElement("input");
    credit_rating.setAttribute("class", "update-profile-form-control");
    credit_rating.setAttribute("type", "text");
    credit_rating.setAttribute("name", "credit_rating");
    credit_rating.setAttribute("id", "credit_rating"+id);
    credit_rating.setAttribute("value", document.getElementById('credit_rating').value);
    credit_rating.setAttribute("placeholder", "Credit Score or Rating ");
    // create a submit button
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Update Profile");
    s.setAttribute("class", "login-contact-btn");
    s.setAttribute("id", "btnUpdateProfile"+id);
    var lblfirst_name = document.createElement("label");
    lblfirst_name.setAttribute("class", "update-profile-form-control");
    lblfirst_name.innerHTML="First Name: ";
    var lbllast_name = document.createElement("label");
    lbllast_name.setAttribute("class", "update-profile-form-control");
    lbllast_name.innerHTML="Last Name: ";
    var lbladdress = document.createElement("label");
    lbladdress.setAttribute("class", "update-profile-form-control");
    lbladdress.innerHTML="Address: ";
    var lblcity = document.createElement("label");
    lblcity.setAttribute("class", "update-profile-form-control");
    lblcity.innerHTML="City: ";
    var lblprovince = document.createElement("label");
    lblprovince.setAttribute("class", "update-profile-form-control");
    lblprovince.innerHTML="Province: ";
    var lblpostal = document.createElement("label");
    lblpostal.setAttribute("class", "update-profile-form-control");
    lblpostal.innerHTML="Postal Code: ";
    var lblphone = document.createElement("label");
    lblphone.setAttribute("class", "update-profile-form-control");
    lblphone.innerHTML="Phone: ";
    var lblcompany = document.createElement("label");
    lblcompany.setAttribute("class", "update-profile-form-control");
    lblcompany.innerHTML="Company/Business: ";
    var lblincome = document.createElement("label");
    lblincome.setAttribute("class", "update-profile-form-control");
    lblincome.innerHTML="Annual Family Income: ";
    var lblexpenses = document.createElement("label");
    lblexpenses.setAttribute("class", "update-profile-form-control");
    lblexpenses.innerHTML="Monthly Total Expenses: ";
    var lblloans = document.createElement("label");
    lblloans.setAttribute("class", "update-profile-form-control");
    lblloans.innerHTML="Existing Loan Payments(Monthly): ";
    var lblassets = document.createElement("label");
    lblassets.setAttribute("class", "update-profile-form-control");
    lblassets.innerHTML="Assets Total Value: ";
    var lblcredit = document.createElement("label");
    lblcredit.setAttribute("class", "update-profile-form-control");
    lblcredit.innerHTML="Credit Rating: ";
    // Append the full name input to the form
    form.appendChild(lblfirst_name); 
    form.appendChild(FN); 
    form.appendChild(br.cloneNode()); 
    form.appendChild(lbllast_name); 
    form.appendChild(LN); 
    form.appendChild(br.cloneNode());
    form.appendChild(lbladdress); 
    form.appendChild(address); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblcity); 
    form.appendChild(city); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblprovince); 
    form.appendChild(selectList); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblpostal); 
    form.appendChild(postal_code); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblphone); 
    form.appendChild(phone); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblcompany); 
    form.appendChild(company); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblincome); 
    form.appendChild(annual_family_income); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblexpenses); 
    form.appendChild(total_expenses); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblloans); 
    form.appendChild(existing_loan_payments); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblassets); 
    form.appendChild(assets_total); 
    form.appendChild(br.cloneNode());
    form.appendChild(lblcredit); 
    form.appendChild(credit_rating); 
    form.appendChild(br.cloneNode());
    form.appendChild(s); 
    var currentDiv = document.getElementById('editProfileDiv');
    currentDiv.innerHTML="";
    currentDiv.appendChild(form);
    //currentDiv.appendChild(newDiv);
  }

function update_profile(username,id) {
  var e = document.getElementById("province"+id);
  var province = e.options[e.selectedIndex].value;
  var first_name = document.getElementById("first_name"+id).value;
  var last_name = document.getElementById("last_name"+id).value;
  var address = document.getElementById("address"+id).value;
  var city = document.getElementById("city"+id).value;
  var postal_code = document.getElementById("postal_code"+id).value;
  var phone = document.getElementById("phone"+id).value;
  var company = document.getElementById("company"+id).value;
  var annual_family_income = document.getElementById("annual_family_income"+id).value;
  var total_expenses = document.getElementById("total_expenses"+id).value;
  var existing_loan_payments = document.getElementById("existing_loan_payments"+id).value;
  var assets_total = document.getElementById("assets_total"+id).value;
  var credit_rating = document.getElementById("credit_rating"+id).value;
  save_profile(username,first_name,last_name,address,city,province,postal_code,phone,company,annual_family_income,total_expenses,existing_loan_payments,assets_total,credit_rating).then(function() {
    location.reload();  
  });  
}

function save_profile(username,first_name,last_name,address,city,province,postal_code,phone,company,annual_family_income,total_expenses,existing_loan_payments,assets_total,credit_rating){
  try {
    return  fetch('/profile/' + username, {
      method: 'PUT',
      body: JSON.stringify({
        first_name:first_name,
        last_name:last_name,
        address:address,
        city:city,
        province:province,
        postal_code:postal_code,
        phone:phone,
        company:company,
        annual_family_income:annual_family_income,
        total_expenses:total_expenses,
        existing_loan_payments:existing_loan_payments,
        assets_total:assets_total,
        credit_rating:credit_rating
          })
    });
  } catch (error) {
    console.log('Error:', error);
  } 
  }
   