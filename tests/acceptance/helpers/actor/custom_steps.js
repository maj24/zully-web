/**
 * Created by yellowdev on 6/23/17.
 */
'use strict';

module.exports = function() {
  return actor({
    login() {
      this.amOnPage('/login');
      this.fillField('#email', 'client@brandonlogan.co');
      this.fillField('#password', '123456789012');
      this.click('//form/*[@type="submit"]');
    },
  });
};
