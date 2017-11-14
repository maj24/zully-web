/**
 * Created by hidalgo on 6/11/17.
 */
Feature('Log in to brandon');

// Refactor this to a page object
Scenario('User log in to brandon web page', (I) => {
  /*
   This is what the login function do
   I.amOnPage('/login');
   I.fillField('#email', 'client@brandonlogan.co');
   I.fillField('#password', '123456789012');
   I.click('//form/!*[@type="submit"]');
   */
  I.login('client@brandonlogan.co', '123456789012');
  I.seeCurrentUrlEquals('/dashboard/projects');
});
