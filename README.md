# CHATTY
# CHATTY_BACK

<h3>Hello all, this is a basic one on one chat application developed using socket.io and MERN stack as a assignment for flo mobility interview processs</h3>

<h3> This web application includes features like features like real time chatting along with status monitoring of users made possible via web sockets </h3>


<h1>Data Base Design and Setup</h1>

<h3>The Data Base used is Mongo DB deployed in Atlas shared cluster and all the schemas and queries were done using mongoose</h3>

<h3> The Data base mainly consists for two collections namely </h3>

<h3>Users :</h3>
<h3>Stores details regarding name,email,password (passwords are hashed using bycrypt) </h3>
<h3>Messages :</h3>
<h3>Stores message conversations between users made possible by having fields like users array storing usersids and message field storing messages belonging between the users this simple structure helps in further extending the design and features when needed for instance addition of group chat feature etc..</h3>
 
 
<h1> API'S USED </h1>

<h3> API's that were used to build this application were mainly login, register, add message, get message,get users</h3>

<h1> WEB SOCKETS USED </h1>

<h3> Web sockets were mainly used to emit events and listen to events emitted from frontend each user was separately isolated in a roon like logical structure to make 
real time messaging possible</h3>

<h3> For status monitoring to reduce the complexity of the problem instead of a cache based DB and I have used server's memory to store user's status which is emitted to all the rooms present whenever a users leaves or opens the chatty application </h3>

<h1>Assumptions made</h1>
<h3> The assusmptions made on developing backend is using of server's memory instead of a db like redis to cache the status of users believing that this 
demo app will not cause any crash of memory limit</h3>
  
<h3> For live demo click <a href="https://meek-platypus-30bf1a.netlify.app/"> here </a> </h3>
<h3> For Frontend Code click <a href="https://github.com/deekshith03/CHATTY_FRONT"> here </a> </h3>  

<h3> P.S please wait for some time during the first time logins and signups as it is being hosted in free server it takes some time to kick in </h3>

 
 
