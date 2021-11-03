Feature: Login to ToyShop site

	Scenario: Verify users can login to portal with valid credentials
		Given User visits auth page of ToyShop site
		When User enters "<email>" and "<password>"
		Then User can logged in successfully

        Examples:
            |email|password|
            |eve.holt@reqres.in|cityslicka|
