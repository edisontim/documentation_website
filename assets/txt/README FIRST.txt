CONSUMER CREDIT INTEGRATION DOCUMENTATION

This guide is to assist you in integrating the Consumer Credit API into your environment.

Based on your needs, please review one or more of the documents found in this directory.

1.  Web Widget with Integrated Authentication
    - Consumer Credit - Simple Web Integration Guide.pdf
    - [COMING SOON] Webhook Integration Guide - brief documentation below
    - [COMING SOON] Web Messaging Integration Guide - brief documentation below
    - [COMING SOON] Video walk-thru of simple web integration

2.  Web Widget with Custom Authentication
    - Consumer Credit - Web Integration with Customer Authentication Guide.pdf
    - Consumer Credit - API Process Flow.pdf
    - Consumer Credit - B2C Communication & Token Flow.pdf
    - [COMING SOON] Webhook Integration Guide - brief documentation below
    - [COMING SOON] Web Messaging Integration Guide - brief documentation below
    - Consumer Credit - Direct API.postman_collection.json
    - Consumer Credit - Test API.postman_collection.json
    - direct_sample.html
    - aio_sample.html
    - tile_sample.html
    - tile_sample_score_only.html
    - [COMING SOON] Video walk-thru of custom web authentication integration

3.  API Integration for Custom Web or Mobile App
    - Consumer Credit - Direct API Integration Guide.pdf
    - Consumer Credit - App Integration.pdf
    - Consumer Credit - B2C Communication & Token Flow.pdf
    - Consumer Credit - Compliance.pdf
    - Consumer Credit - API Process Flow.pdf
    - [COMING SOON] Webhook Integration Guide - brief documentation below
    - Consumer Credit - Direct API.postman_collection.json
    - Consumer Credit - EFX API.postman_collection.json
    - Consumer Credit - User API.postman_collection.json
    - Consumer Credit - Test API.postman_collection.json
    - Consumer Credit - Getting Started - New User.postman_collection.json
    - Consumer Credit - Getting Started - Returning User.postman_collection.json
    - [COMING SOON] Video walk-thru of custom web and mobile app integration

*your credentials are in the Consumer_Credit.postman_environment file emailed to you upon registration.

BASIC STEPS TO CREATE A NEW USERS & RETURNING USERS INCLUDING DATA ACCESS STEPS
  NEW USERS
    Direct API
      Customer Login
      Register New User***
    User API
      Preauth Token
      User Identity
      Phone Verify
      Send Mobile Code
      Verify Mobile Code
      Get EFX Config
    EFX API
      OAUTH Token
        Credit Score Latest
          Credit Score History
          Credit Report List
            Credit Report Summary
            Credit Report (First in list) - PRINT
**The Consumer Credit - Getting Started - New User.postman_collection.json will walk you through these steps in order
***Be sure to save the userId when Registering a New User or you will not be able to generate a returning token for the user
****Once you create a user the identity information is hashed and used to verify if the same identity is being re-enrolled.  If a matching hash is found it will skip the identification process.  This is great in production, but may limit your ability to test.  To get past this, just add a number to the USER_STREET_2 and increment it each time you register a new user and want to go through the full authentication process.
*****In the test environment it is important that you use the User Test Identity provided to you verbatim.  You may change the email address and phone number ONLY*****

Additional Notes
  - On Register New User - change the email to your email.  You may add a +1, +2, etc to keep reusing the same email address (ex: test+1@test.com)
  - On Register New User & User Identity - change the phone number to your mobile phone number or you won't receive the SMS messages.
  - Using the Phone Verify, Send Mobile Code, Verify Mobile Code method, the code in the test system passes through, so you can just keep clicking the send on those functions, though you will receive the text as well.
  - For the Get Identity Quiz and Verify Identity Quiz methods, you will need to find the correct answers and update the Verify Identity Quiz body accordingly to successfully authenticate using those methods.
  - When registering a new user, be sure to save the userId or you will not be able to log that user in later.  As a matter of security, we do not allow the listing of user IDs.
  - REMEMBER - you MUST use the test user data EXACTLY as it is provided.  Only the phone number and email should be changed.


  RETURNING USERS
    Direct API
      Customer Login
      New User Token
    User API
      Preauth Token - if (idpass=false), the next four calls would need to be made, otherwise skip to Get EFX Config if true)
      User Identity
      Phone Verify
      Send Mobile Code
      Verify Mobile Code
      Get EFX Config
    EFX API
      OAUTH Token
        Credit Score Latest
        Credit Score History
        Credit Report List
          Credit Report Summary
          Credit Report (First in list) - PRINT


ACCESS CREDENTIALS
Access credentials will be sent to you in a Postman Environment.  It is pre-configured to allow you to use the scripts and walk through the Postman Scripts with minimal intervention to aid in understanding the API call structure.


WEBHOOKS
Webhooks are available to notify you when an alert (or other notifications) comes in so that you can message users in whatever fashion you wish to return to your site.

To get started, please provide us a URL endpoint to push the webhook to.
 * The webhook should implement SSL and Basic HTTP Authentication, so we need a username and password to the endpoint (15-char or less, it's not super secure and probably doesn't need to be).

The basic JSON for the web hook will look like the following (not all fields are present with all requests):
[{
    id: "String - Webhook ID, UUID format",
    type: "String - Webhook Type, see possible values below",
    user_id: "String - StitchCredit user ID, UUID format",
    host_id: "String - The host configuration generating the webhook, UUID format",
    time: "long - Linux epoch, seconds since 1/1/1970",
    error_code: "String - used to report host errors, future use at the moment",
    error_msg: "String - error code details"
    alert_id: "String - id for retrieving additional alert details when available",
    alert_date: "Date - the date/time the alert was reported",
    alert_source: "String - name of the institution reporting when available"
}]

When a webhook is received, a response is needed.  Responses with a status other than true will cause the webhook to be resent.
[{
    hook_id: "the ID of the webhook",
    status: true | false
}]

Webhook Type Values
ACCNEW		- New Account Created (only sent when created via web, not direct)
IDFAIL		- Identity Failed (user identification process failed)
ACCREG		- Account Registered (user passed identification and is registered for data)
ACCREGFAIL	- Account Registration Failed (user passed identification, but was unable to register for data)
ACCCLOSED	- Account Closed (only sent when completed via web, not direct)
ACCLOCKED	- Account Locked Out (account is temporarily locked out)
ACCLOGINFAIL	- Login Failure (when user authentication fails, web only)
ACCALERT	- Account Alert (when credit alert notifications, both daily and real-time)
SCOREREF	- User Score has been refreshed
REPORTREF	- User Report has been refreshed
ERROR		- Error (report important issues that may be of interest)
TEST		- Test (testing notification)

*Additional webhooks may be added without notice
**Please see attached Postman Script for some testing API calls.  In particular, the Webhook Test.  Once your host is configured you can use Webhook Test to send a test webhook for a user on demand.
"Consumer Credit - Test API.postman_collection.json" includes some webhook tests to help you understand and develop your solution.  See the Test API scripts for additional documentation.


WEB MESSAGING using POST MESSAGE
To interact with the Consumer Credit Widget you will need to implement a structure using Post Message to receive, process and respond to events generated by the Consumer Credit Widget in the iFrame.  Explanation for most messages is explained within the Javascript code.
*See direct_sample.html for a working implementation.
**Note that the /test/preauth-token call used in the getData function only functions in the development environment.  You should implement your own user authentication on your servers and return a valid preauth-token to continue.

<script>
    //this just throws in a default ID if one isn't provided on the query string
    const id = document.location.search.length > 0 ? document.location.search.split('&')[0].split('=')[1] : '988a6fd7-7297-4757-8b96-907daa14a1f6';
    console.log("ID: ",id);
    console.log("Loading Message Listener...");

    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
        if(event && event.source && event.data) {
            // You only need to implement the types that are important/relevant to your use case.
            if(event.data.type === 'AUTH_REQUIRED') {
                //The iframe clident will post this message when a valid preauth token does not exist.
                //Posting a proper message with a preauth token in response allows the client to continue seemlessly.
                //console.log("Auth Required Event Received");
                const es = event.source;
                //this code uses a test endpoint on the server to provide a preauth-token for any user ID without the usual hurdles.
                //This is ONLY for testing and does not exist in the production environment.
                getData("https://efx-dev.stitchcredit.com/api/test/preauth-token/"+id, function() {
                    const token = JSON.parse(this.responseText).token;
                    console.log("Status: ", this.status, ", token: ", token);
                    es.postMessage({type: 'PREAUTH', token: this.status == 200 ? token : null},"*");
                });
            }
            else if(event.data.type === 'REG_STARTED') {
                const es = event.source;
                //only valid for full web implementation, Direct API already creates the customer, so this will never happen in those instances
		// (new Date().valueOf()) - is used to generate a new email ID on the fly for testing purposes
                es.postMessage({type: 'REG', data: {fname:"Gertrude", lname:"Harkenreadeo", email: "test+" + (new Date().valueOf()) + "@test.com"}},"*");
            }
            else if(event.data.type === 'IDENTITY_STARTED') {
                const es = event.source;
                //You could use this function to pre-populate the given fields.  DoB and SSN will never be prepopulated as it violates compliance
		// new Date().valueOf().toString() - generates a unique number for street2 to ensure each run goes through the full identity process, remove to test sequential sign up of the same user
                es.postMessage({type: 'IDENTITY', data: {street1:"305 Linden Av", street2: new Date().valueOf().toString(), city: "Atlanta", state: "GA", zip: "30316", mobile: "0000000000"}},"*");
            }
            else if(event.data.type === 'LOGIN_SUCCESSFUL') {
                console.log("User succesfully logged in");
            }
            else if(event.data.type === 'LOGIN_FAILED') {
                //if you see this message more than a few times in a row, it's likely an issue
                //typically this will only occur for full web implementations, not Direct API
                console.log("User login failed");
            }
            else if(event.data.type === 'USER_ENROLLED') {
                //User successfully completed identity and has been enrolled for consumer data
                console.log("User enrollment successful");
            }
            else if(event.data.type === 'IDENTITY_FAILED') {
                //Identity process failed, user is likely "stuck" as they cannot continue
                console.log("User identity failure");
            }
            else if(event.data.type === 'SERVICE_FAILURE') {
                //Identity process failed most likely due to a service outage, but the user is stuck as they cannot continue without passing identity
                console.log("Identity service failure");
            }
        }

        function getData(req, action) {
        var xhr = new XMLHttpRequest();
            xhr.responesType = 'json';
            xhr.onload = action;
            xhr.open("GET", req);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        }

    }
</script>


RESPONSIVENESS BREAKPOINTS
These are two main breakpoints we use to scale desktop, tablet, and mobile devices. Devices with a width larger than 960px will be treated as a desktop view, devices with smaller widths fall under tablet and mobile device scaling thus will be displayed as a mobile view. With that being said, the widget should scale well on small, medium, and large devices without issues.

Each breakpoint (a key) matches with a fixed screen width (a value):

  - sm, small: 600px

  - md, medium: 960px

