document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");
  });

  
function show_user_profile(username){
    //document.getElementById("userProfileDiv").innerHTML='<object type="text/html" data="profile_.html" ></object>';

  fetch('/profile/'+ username) // or whatever url you assign to that view
    .then(response => response.text())
    .then(data => {
      var lblfirst_name = document.createElement("label");
      lblfirst_name.setAttribute("class", "profile-div-form-control");
      lblfirst_name.innerHTML="<strong>First Name:</strong>";
      var lbllast_name = document.createElement("label");
      lbllast_name.setAttribute("class", "profile-div-form-control");
      lbllast_name.innerHTML="<strong>Last Name:</strong>";
      var lbladdress = document.createElement("label");
      lbladdress.setAttribute("class", "profile-div-form-control");
      lbladdress.innerHTML="<strong>Address:</strong>";
      var lblcity = document.createElement("label");
      lblcity.setAttribute("class", "profile-div-form-control");
      lblcity.innerHTML="<strong>City:</strong>";
      var lblprovince = document.createElement("label");
      lblprovince.setAttribute("class", "profile-div-form-control");
      lblprovince.innerHTML="<strong>Province:</strong>";
      var lblpostal = document.createElement("label");
      lblpostal.setAttribute("class", "profile-div-form-control");
      lblpostal.innerHTML="<strong>Postal Code:</strong>";
      var lblphone = document.createElement("label");
      lblphone.setAttribute("class", "profile-div-form-control");
      lblphone.innerHTML="<strong>Phone:</strong>";
      var lblcompany = document.createElement("label");
      lblcompany.setAttribute("class", "profile-div-form-control");
      lblcompany.innerHTML="<strong>Company/Business:</strong>";
      var lblincome = document.createElement("label");
      lblincome.setAttribute("class", "profile-div-form-control");
      lblincome.innerHTML="<strong>Annual Family Income:</strong>";
      var lblexpenses = document.createElement("label");
      lblexpenses.setAttribute("class", "profile-div-form-control");
      lblexpenses.innerHTML="<strong>Monthly Total Expenses:</strong>";
      var lblloans = document.createElement("label");
      lblloans.setAttribute("class", "profile-div-form-control");
      lblloans.innerHTML="<strong>Existing Loan Payments(Monthly):</strong>";
      var lblassets = document.createElement("label");
      lblassets.setAttribute("class", "profile-div-form-control");
      lblassets.innerHTML="<strong>Assets Total Value:</strong>";
      var lblcredit = document.createElement("label");
      lblcredit.setAttribute("class", "profile-div-form-control");
      lblcredit.innerHTML="<strong>Credit Rating:</strong>";
      const newDiv = document.createElement("div");
      var username,first_name,last_name,city,province,postal_code,phone,company,annual_family_income,total_expenses,assets_total,existing_loan_payments,credit_rating;
      var arr=data.split(",");
      var datastr;
      var exists;
      for (let i = 0; i < arr.length; i++) {
        exists= (arr[i].includes("username"));
        if (exists == true){
           datastr=arr[i].split(":");
           username=datastr[1];
           username=username.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("first_name"));
        if (exists == true){
          datastr=arr[i].split(":");
          first_name=datastr[1];
          first_name=first_name.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("last_name"));
        if (exists == true){
          datastr=arr[i].split(":");
          last_name=datastr[1];
          last_name=last_name.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("address"));
        if (exists == true){
          datastr=arr[i].split(":");
          address=datastr[1];
          address=address.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("city"));
        if (exists == true){
          datastr=arr[i].split(":");
          city=datastr[1];
          city=city.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("province"));
        if (exists == true){
          datastr=arr[i].split(":");
          province=datastr[1];
          province=province.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("postal_code"));
        if (exists == true){
          datastr=arr[i].split(":");
          postal_code=datastr[1];
          postal_code=postal_code.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("phone"));
        if (exists == true){
          datastr=arr[i].split(":");
          phone=datastr[1];
          phone=phone.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("company"));
        if (exists == true){
          datastr=arr[i].split(":");
          company=datastr[1];
          company=company.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("annual_family_income"));
        if (exists == true){
          datastr=arr[i].split(":");
          annual_family_income=datastr[1];
          annual_family_income=annual_family_income.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("total_expenses"));
        if (exists == true){
          datastr=arr[i].split(":");
          total_expenses=datastr[1];
          total_expenses=total_expenses.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("existing_loan_payments"));
        if (exists == true){
          datastr=arr[i].split(":");
          existing_loan_payments=datastr[1];
          existing_loan_payments=existing_loan_payments.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("assets_total"));
        if (exists == true){
          datastr=arr[i].split(":");
          assets_total=datastr[1];
          assets_total=assets_total.replace(/['"]+/g, '');
        }
        exists= (arr[i].includes("credit_rating"));
        if (exists == true){
          datastr=arr[i].split(":");
          credit_rating=datastr[1];
          credit_rating=credit_rating.replace(/['"]+/g, '');
          credit_rating=credit_rating.replace("}", "");

        }
      }
      var br = document.createElement("br"); 
      newDiv.appendChild(lblfirst_name); 
      const first_name_node = document.createTextNode(first_name);
      newDiv.appendChild(first_name_node); 
      newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lbllast_name); 
      const last_name_node = document.createTextNode(last_name);
      newDiv.appendChild(last_name_node); 
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lbladdress); 
      const address_node = document.createTextNode(address);
      newDiv.appendChild(address_node); 
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblcity); 
      const city_node = document.createTextNode(city);
      newDiv.appendChild(city_node);
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblprovince); 
      const province_node = document.createTextNode(province);
      newDiv.appendChild(province_node);
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblpostal); 
      const postal_node = document.createTextNode(postal_code);
      newDiv.appendChild(postal_node);
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblphone); 
      const phone_node = document.createTextNode(phone);
      newDiv.appendChild(phone_node);
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblcompany); 
      const company_node = document.createTextNode(company);
      newDiv.appendChild(company_node);
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblincome); 
      const annual_family_income_node = document.createTextNode(annual_family_income);
      newDiv.appendChild(annual_family_income_node);
      newDiv.appendChild(br.cloneNode()); 
newDiv.appendChild(br.cloneNode()); 
      newDiv.appendChild(lblexpenses); 
      const total_expenses_node = document.createTextNode(total_expenses);
      newDiv.appendChild(total_expenses_node);
      newDiv.appendChild(br.cloneNode());   
      newDiv.appendChild(br.cloneNode());  
      newDiv.appendChild(lblloans); 
      const existing_loan_payments_node = document.createTextNode(existing_loan_payments);
      newDiv.appendChild(existing_loan_payments_node);
      newDiv.appendChild(br.cloneNode());     
      newDiv.appendChild(br.cloneNode());    
      newDiv.appendChild(lblassets); 
      const assets_total_node = document.createTextNode(assets_total);
      newDiv.appendChild(assets_total_node);
      newDiv.appendChild(br.cloneNode());   
       newDiv.appendChild(br.cloneNode());  
      newDiv.appendChild(lblcredit); 
      const credit_rating_node = document.createTextNode(credit_rating);
      newDiv.appendChild(credit_rating_node);
      newDiv.appendChild(br.cloneNode());   
      newDiv.appendChild(br.cloneNode());  
      document.getElementById("userProfileDiv").innerHTML="";
      document.getElementById("userProfileDiv").appendChild(newDiv);}
      )}
  