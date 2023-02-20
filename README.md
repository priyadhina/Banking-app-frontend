# Banking-app-frontend


Frontend repo for customer banking  project


**Getting Started**

1. Install all dependencies:

        npm install


2. Run the development server:

        npm start

Open http://localhost:3000 with your browser to see the result.


**Libraries used:**


Framework - React

Styling - Material-ui

State management - Redux

API - axios

Validation - Yup

Forms - Formik



**Default login credentials:**

    username - user

    password - user
    
 **Requirement details**
 
 Customer Banking Project

Frontend module:(ReactJs)
1. Created a login page and home page with navigation links to other pages as a panel.
2. On home page, basic details of the customer along with option to set withdrawal limit is displayed. Customer can also update his basic details.
3. Created different pages to show details of the customer like account summary, fund transfer and transaction history.
4. Under Fund Transfer page, customer can have choices of whether the transfer is Deposit/Withdraw.
	i. On choosing 'Deposit', he/she will be asked to select whether it's by cash or by cheque.
	ii. If it's by cash, he/she will be asked to select denominations and specify the count of each denomination.
	iii. If it's by cheque, it will ask details of cheque number and issuer bank along with the amount to be deposited.
5. On choosing 'Withdraw', details of amount to be withdrawn and optional remarks can be added.
6. Under Transaction history page, latest 5 transactions of the customer is shown by default. Pagination has also been added.
7. validations have been included across the pages and a modal is shown with details.

Backend module:(NodeJs)
1. Included authorisation using JWT webtoken for login validation.
2. Included different API calls to perform calculations and send the response based on requests made.

