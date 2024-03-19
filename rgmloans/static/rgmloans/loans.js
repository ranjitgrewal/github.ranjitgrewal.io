document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");
    show_all_loans();
  });

   function show_all_loans(){
    // Show all loans
    const newDiv = document.createElement("div");
      newDiv.innerHTML = '<h3>All  Loans</h3>';
     fetch('/loans/all') // url with that API
   .then(response => response.json())
   .then(all_loans=> {
     const loans =all_loans["all_loans"];
     for (let i = 0; i < loans.length; i++) {
      build_LoanDiv(loans[i],newDiv);
     }
     document.querySelector('#allLoansDiv').appendChild(newDiv);

   });
   document.querySelector('#allLoansDiv').innerHTML = "";
}

function build_LoanDiv(loan,newDiv) {
    var id= loan.id;
    var ul = document.createElement("ul");
    ul.style="list-style-type:'+ none";
    var li, a;
    const loanDiv = document.createElement("div");
    var link="/profiles/"+ loan.user;
    var loan_p = document.createElement("p"); //creat
    loan_p.setAttribute("id","loan_p"+id);
    loanDiv.setAttribute("id","loanDiv"+id);
    loanDiv.setAttribute("class","loanDiv");
    loan_p.innerHTML='<strong>Borrower:</strong>'+ '<a href="' + link + '">'+ loan.user +'</a>'+
            '<br><strong>    Loan Application #:</strong>'+loan.application_id +
            '<br><strong>    Loan Application Status:</strong>'+loan.application_status+
            '<br><strong>    Amount Approved:</strong>'+ loan.amount_approved+
            '<br><strong>    Date Approved/Updated:</strong>'+ loan.date_approved+
            '<br><strong>Payment Starting Date:</strong>'+ loan.payment_starting_date+
            '<br><strong>Payment Ending Date:</strong>'+ loan.payment_ending_date +
            '<br><strong>    Payment Frequency:</strong>'+ loan.payment_frequency+
            '<br><strong>Payment Amount:</strong>'+ loan.payment_amount+
            '<br><strong>Interest Rate:</strong>'+ loan.interest_rate+
            '<br><strong>Total # of Payments</strong>'+ loan.no_of_payments+
            '<br><strong>Loan Tenure(Months):</strong>'+ loan.num_of_months+
            '<br><strong>Payments Made:</strong>'+ loan.payments_made+
            '<br><strong>Payments Remaining:</strong>'+ loan.payments_remaining+
            '<br><strong>Balance Owing:</strong>'+ loan.balance_owing;
    const updateBtn = document.createElement("BUTTON");
    updateBtn.innerHTML= 'Update Loan';
    updateBtn.setAttribute("id","btnUpdateLoan-"+id);
    updateBtn.setAttribute("class","login-contact-btn");

    li = document.createElement('li');
    updateBtn.onclick = function(){
      edit_loan(loan);
    };  
    loanDiv.append(loan_p);
    loanDiv.appendChild(updateBtn);
    li.appendChild(loanDiv);
    ul.appendChild(li);
  // add the text node to the newly created div
    newDiv.appendChild(ul);
}

function edit_loan(loan){
    var id= loan.id;
    var loan_p = document.createElement("p"); //creat
    var saveBtn = document.createElement("button");
    var id=id;
    const array = ["Monthly","Weekly","Bi-weekly"];
     //Create and append select list
    const newDiv = document.createElement("div");
    var link="/profiles/"+ loan.user;
    newDiv.setAttribute("id", "saveLoanDiv-"+ id);
    loan_p.innerHTML='<strong>Borrower:</strong>'+ '<a href="' + link + '">'+ loan.user +'</a>'+
            '<br><strong>    Loan Application #:</strong>'+loan.application_id +
            '<br><strong>    Loan Application Status:</strong>'+loan.application_status+
            '<br><strong>    Date Approved/Updated:</strong>'+loan.date_approved+
            '<br><strong>Payment Ending Date:</strong>'+ loan.payment_ending_date +
            '<br><strong>Payment Amount:</strong>'+ loan.payment_amount+
            '<br><strong>Total # of Payments</strong>'+ loan.no_of_payments+
            '<br><strong>Payments Made:</strong>'+ loan.payments_made+
            '<br><strong>Payments Remaining:</strong>:'+ loan.payments_remaining+
            '<strong>Balance Owing:</strong>:'+ loan.balance_owing;
    var selectList = document.createElement("select");
    selectList.id = "paymentFrequency"+id;
    var option = document.createElement("option");
    option.value = "";
    option.text = "Please choose payment frequency";
    selectList.appendChild(option);
      //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
      }
    var lblAmtApproved = document.createElement("label");
    lblAmtApproved.innerHTML="<br><strong>Amount Approved<\strong>";
    var lblInterestRate = document.createElement("label");
    lblInterestRate.innerHTML="<br><strong>Interest Rate<\strong>";
    var lblPaymentStartingDate = document.createElement("label");
    lblPaymentStartingDate.innerHTML="<br><strong>Payment Starting Date<\strong>";
    var lblInterestRate = document.createElement("label");
    lblInterestRate.innerHTML="<br><strong>Interest Rate<\strong> ";
    var lbPaymentFrequency = document.createElement("label");
    lbPaymentFrequency.innerHTML="<br><strong>Payment Frequency <\strong> ";
    var lblNumOfMonths = document.createElement("label");
    lblNumOfMonths.innerHTML="<br><strong>Loan Tenure(Months):</strong>:  ";
    var newAmtApproved = document.createElement("input");
    var newPaymentStartingDate = document.createElement("input");
    var newInterestRate = document.createElement("input");
    var newNumOfMonths = document.createElement("input");
    var saveBtn = document.createElement("button");
    newAmtApproved.setAttribute("class","newAmtApproved");
    newAmtApproved.setAttribute("type","number");
    newAmtApproved.setAttribute("id", "newAmtApproved" + id);
    newAmtApproved.setAttribute("value", loan.amount_approved);
    newPaymentStartingDate.setAttribute("class","newPaymentStartingDate");
    newPaymentStartingDate.setAttribute("type","date");
    newPaymentStartingDate.setAttribute("value", loan.payment_starting_date);
    newPaymentStartingDate.setAttribute("id", "newPaymentStartingDate" + id);
    newInterestRate.setAttribute("class","newInterestRate");
    newInterestRate.setAttribute("type","number");
    newInterestRate.setAttribute("id", "newInterestRate" + id);
    newInterestRate.setAttribute("value", loan.interest_rate);
    newNumOfMonths.setAttribute("value", loan.num_of_months);
    newNumOfMonths.setAttribute("id", "newNumOfMonths" + id);
    newNumOfMonths.setAttribute("type","number");
    newNumOfMonths.setAttribute("class","newPaymentStartingDate");
    saveBtn.innerHTML= 'Save Loan';
    saveBtn.setAttribute("name", "saveBtn" + id);
    saveBtn.setAttribute("class", "login-contact-btn");
    saveBtn.onclick = function(){
      save_loan(id);      
    };  
    var currentDiv = document.getElementById('loanDiv'+ id);
    var br = document.createElement("br"); 
    const loanDiv = document.createElement("div");
    loanDiv.setAttribute("id","editLoanDiv" + id);
    var current_p = document.getElementById('loan_p'+ id);
    current_p.style.display = 'none';
    var editBtn = document.getElementById('btnUpdateLoan-'+ id);
    editBtn.remove();
    loanDiv.append(loan_p);
    loan_p.appendChild(lblAmtApproved);
    loan_p.appendChild(br.cloneNode());

    loan_p.appendChild(newAmtApproved);

    loan_p.appendChild(lblPaymentStartingDate);
    loan_p.appendChild(br.cloneNode());

    loan_p.appendChild(newPaymentStartingDate);

    loan_p.appendChild(lblInterestRate);
    loan_p.appendChild(br.cloneNode());

    loan_p.appendChild(newInterestRate);

    loan_p.appendChild(lblNumOfMonths);
    loan_p.appendChild(br.cloneNode());

    loan_p.appendChild(newNumOfMonths);

    loan_p.appendChild(lbPaymentFrequency);
    loan_p.appendChild(br.cloneNode());

    loan_p.appendChild(selectList);
    loan_p.appendChild(br.cloneNode());

    loanDiv.appendChild(saveBtn);
    currentDiv.prepend(loanDiv);
  }

function save_loan(id) {
  var e = document.getElementById("paymentFrequency"+id);
  var selected_value = e.options[e.selectedIndex].value;
  var newAmtApproved = document.getElementById("newAmtApproved"+id).value;
  var newPaymentStartingDate = document.getElementById("newPaymentStartingDate"+id).value;
  var newInterestRate = document.getElementById("newInterestRate"+id).value;
  var newNumOfMonths = document.getElementById("newNumOfMonths"+id).value;
  updateLoan(id,selected_value,newAmtApproved,newNumOfMonths,newPaymentStartingDate,newInterestRate).then(function() {
        show_all_loans();
    });
  
  }

function updateLoan(id,payment_frequency,newAmtApproved,newNumOfMonths,newPaymentStartingDate,newInterestRate) {
    try {
    return  fetch('/loan/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        payment_frequency: payment_frequency,
        amount_approved:newAmtApproved,
        payment_starting_date:newPaymentStartingDate,
        interest_rate:newInterestRate,
        num_of_months:newNumOfMonths
          })
    });
  } catch (error) {
    console.log('Error:', error);
  } 
   //location.reload();  
  }
   