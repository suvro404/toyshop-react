Feature: Login

	As a user I should be able to login to the site if I provide the right email and password.

	Scenario: As a user I can login
		Given I am on the "auth" page
		And I enter "eve.holt@reqres.in" as my "email"
		And I enter "cityslicka" as my "password"
		When I click the "submit" button
		Then I should be on the "trending" page
