// tests/leaderboard.js
module.exports = {
  "Basic Walkthrough" : function (client) {
    client
    .url("http://localhost:3000")
    .waitForElementVisible('body', 1000)

    // make sure main elements are present
    .verify.elementPresent("#navbarHeader")
    .verify.elementPresent("#navbarHeaderNav")
    .verify.elementPresent("#mainPanel")
    .verify.elementPresent("#mainLayout")
    .verify.elementPresent("#navbarFooter")
    .verify.elementPresent("#navbarFooterNav")

    .end();
  }
}
