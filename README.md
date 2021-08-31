# news-app
**News Stories Dashboard **
 This project is an Angular application In order to run this
 You should have Node installed on your machine.
 
**-After cloning the Application  > Go to Project directory**
-Open terminal and type 'npm install ' (It will download all the dependencies listed in package.json)
-After the download is completed check to see if the node_module folder is generated in your directory with all the dependencies.

Now on terminal type **' npm start '** it will start the application on your local port localhost:4200.

**WORKING : -**
I have used Angular Material UI to design the Dashboard to list all the latest Stories, Job Stories, Ask Stories, and Show stories.
To implement this I have used Angular Material Table, Toolbar, and Input fields and buttons. I have implemented a getNewStories API which returns the Items for that particular type of job-based on the URL Provided. Then I pass these Item ID's from that Api response and call another API getNewsItems API which provides me the JSON object based on ItemID provided.  These all Json Objects are pushed into the data source for Material Table Dash Board and are listed in UI.

**FUNCTIONALITY:-**
I have provided the capability to Search the Stories, Sort the user stories (Click on the header) based on column name.
User can Go To any story of his choice by clicking the link 'Go To Story' for any story.
I have also added a filter to filter on Story By (Column name) once all the stories are loaded from the API.

For Accessibility, the User can navigate through the UI with the keyboard 
To write the test cases I have used the Jest framework . Currently, the coverage is more than 80 percent for the project.
With more time, I aim to increase the test coverage and provide a filter based on the Date (Time) Column.

