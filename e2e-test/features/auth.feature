Feature: authenticate user

    In order to purchase product, a user needs to be authenticated.

    Scenario Outline: Authenticate user by email and password
        Given a user is in auth page.
        When she enters her email and password
        And clicks on Submit button
        Then the user is authorized
        And redirected to trending page