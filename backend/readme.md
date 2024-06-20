install "npm i bcryptjs" for encrypt password..


2) used JSON WEB TOKEN for log the use in or to sign the  user in to our application..

go : jwt.io
IT is a open industry standard method for representing claims securely between two parties.
explanation: The two parties think front end and backend so your front end your user usese the front end to make a request to the  backend which has your database and the rest of the. so user make that request by providing you their user name and their password.Then you do is that when they try to sign in..the first thing you  do is check your database of that user exist.and if exist you then issue them a token ..which is this json web token.
then that token will anable them or give them rights to access their data on the backend..

so tht in sign in part we going togenerate web token and going to use it to verify that user is correctly logged with the correct details.

first install : jason web token..
type in terminal..: npm i jsonwetoken 


3)how can use the generated token to log the user applicatio.
//loging mean sending that token to our front end or to our client which is the browser and that is going to tell front end that look this user has been properly authenticated.....Then can access backend.....

to install cokeis package === "npm i install cookie-parser

following link is about cookie web site
https://www.tutorialspoint.com/res-cookie-method-in-express-js


  


  //forgot password steps
  Create forgot password route
  create token model
  create email sender
  create controller function



