1. 
  a - Does it load the default policies? 
  b - Does it check the default policies that now appear on the screen? (use any of the data rows to confirm)

a) Loading the default policies by making sure that the 'Load Default Policies' button exists and then targeting and clicking it.

b) Checking that the default policies appear on the screen by checking that the <table> element has <tbody> appended to it. (if the policies do not appear the table will be empty and therefore produce an error)



2. 
  a - Whether it does create a Data Policy called TestLenses and set the options required in the form, such as some sensitive data are protected. 

  b - It Checks that the New Policy has been added and is present.

a) Creating a new Policy by targeting and clicking the 'New Policy' button.
Then filling all the fields in a way that the data is being protected (according to the documentation)

b) Checking that the new Policy has been added by targeting the Search input and typing the name of the policy. Then checking if the table has any appended tr in it. If it does then the policy has been added successfully



3. Delete the newly created Policy and confirm it was removed. ( optional )

Deleting the newly created Policy by targeting the <tr> from the step 2.b, finding the <a> tag in the last <td> of the row using :last-child selector, and clicking it. Then targeting the delete button in the popup window and clicking it as well. 

Then checking if the deletion was successful by typing the name of the new Policy, in this case 'TestLenses' in the search field and check if there is a <tbody> tag and also if it contains the name of the new Policy.



4. how you would further enhance / automate such a scenario if you had ample time to polish it.

First of all i would detect the parts of the code that are not following the DRY (do not repeat yourself) principle and create either a function, or a variable to replace them in the code.

Then i would probably split the test in 3 smaller tests.
  a - Load Policies
  b - Create new Policy
  c - Delete a Policy

After that i would try to remove everything that is hardcoded, like the text of a button in a 'should('contain', ...) method, and replace it with a variable to make the test(s) reusable in other parts of the application or entirely other applications

Last but not least i would test every single option in the selection fields of the New Policy form, and possibly, if the nature of the application demanded it, i would also check for every possible combination (though it seems unnecessary in this case)
