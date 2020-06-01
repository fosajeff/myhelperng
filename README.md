## Project Name:
 ### MyHelperNg

Contributors - Team foxtrot-flair, project phase StartNG '20
___

@Sahmie - Backend | DevOp | Team Lead
@Tibesti - Frontend
@Belrah - Frontend | Content Creator
@fosajeff - Backend

 #### Description

MyHelpNg is a platform that aims to connect volunteers seeking to offer their skills/expertise and time with NGOs/charity organizations that needs those skills/services. 

We make it easy for nonprofits to clearly communicate their needs, and for people to give their time, skills or funds in the most effective way possible. By volunteering online, donating funds or even just hitting the “Share” button – supporting great causes can take many shapes and forms, and we’re here to make it all possible.

From research most NGO organisations lack sufficient man power and necessary resources to carry out thier goals and reach out to communities in need of help/relief. MyHelperNg aims to bridge the gap by providing a platform where these organisations can get help from volunteers willing to offer their skills and also get Donations from willing donors and philanthropists online.

#### Who is it for

* NGOs - This platform can be of help to NGO organizations seeking skills/services and donations to achieve the organizational goals. 

* Volunteers - This platform can also be of help to volunteers who want to offer their time and skills in service for free.

* Philanthropists - The platform can also be a means to contribute to worthy NGOs for those seeking to make donations.


## API DOCUMENTATION

#### Prerequisites 

##### List of dependencies

* bcryptjs
* connect-flash
* cookie-parser
* debug
* dotenv
* ejs
* express
* express-messages
* express-session
* express-validator
* http-errors
* mongoose
* morgan
* passport
* passport-local


##### How to install project and test locally

* clone the repo
* run npm install
* create a .env file and configure your mongodb database or use a localhost db from the app.js file, the variable name from the .env file for the connection url is `MONGODB_URI`
*  run npm start
* access app on localhost:3000


### END POINTS 

#### signup as volunteer(req.body)

` Route: POST  /join/volunteer` 

required fields 

1. name
2. email
3. contact
4. state
5. password
6. password2(confirm password)

example response:
```javascript
 {
   "status": "success",
   "message": "Resgistration successful"
 }
```
