# Task Manager Cloud App

This is a small task manager app that lets you have your own ToDo program. This is a University Project and part of the learning experience on the way to visualize and practice in a cloud environment like google cloud.


# Project description

The project is a small task manager aimed at helping to keep tabs on important tasks in a persons daily life. It has most of the functionalities that one would expect from a classical todo app. Tasks are displayed on the main website of the app in a table. They can be created,  and have a couple of properties:

- Title- This is where one can write a Kategorie, that can repeat so as to group task that are in the same scope.
- Description- A text field in which the specific information of the task is held.
- Priority- This is a nummer(Integer) field that can be set from 1 to 10. One can priorities the tasks and sort them in the table in asc or desc order.
- Created date- The date in a dd/mm/yyyy hh/mm format of the time the task was created.
- Modified date- The date, in the same format as above, of the last change done to the task. Gets updated every time the task is changed.
- Status- A boolean that is either true (task done) or false (task not done). The status is displayed as a red cross or a green tick and can be changed by clicking on the icon.

Additionally tasks can be selected from the list and be modified or deleted. The fields that are modifiable are title, description and priority.

The following technologies were used for the project:

- Spring as part of the learning material
- Docker to get a mySQL image and to make the container of the app
- Java is the language i am most familiar with, thats why i went with it. The backend is written in java
- Maven for dependencies management and builds.
- Javascript for the RestAPI
- Html as a website for the app
- Css to Style the html

Outside the scope of the Program:

- Google cloud to host a virtual instance on which to install docker in order to get the app image installed.

Here are some images of the application

Main screen
![Main Screen](https://i.imgur.com/bV4QPk8.png!)  
Create a task
![Create a Task](https://i.imgur.com/2BZFMZH.jpeg)
Modify a task
![Update task](https://i.imgur.com/b8O4frz.png)
## Run the App
