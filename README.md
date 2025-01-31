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

---

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

---

Here are some images of the application

Main screen
![Main Screen](https://i.imgur.com/bV4QPk8.png!)  
Create a task
![Create a Task](https://i.imgur.com/2BZFMZH.jpeg)
Modify a task
![Update task](https://i.imgur.com/b8O4frz.png)

# Run the App

In order to start the app locally you need to do the following steps:

- Clone the Repository locally:
```bash
git clone https://github.com/VladTetikov/toDoCloud.git
```
- Have the docker engine running, make sure the following command doesn't fail:
```bash
docker ps
```
- Build the docker image with the following command:
```bash
cd toDoCloud
docker build . -t us-central1-docker.pkg.dev/taskproject-449320/cloud-app/test-app
```
- Start the app with docker-compose:
```bash
docker-compose -f dockerdb/cloudDB.yml up
```
- To access the portal visit http://localhost:8080
- Stop the app with docker-compose:
```bash
docker-compose -f dockerdb/cloudDB.yml down
```

> **_NOTE:_** The App will fail to start once or twice because it starts faster than the database. You can ignore the db connection errors thrown.     

##  Automated Docker Build and Deployment

This repository contains a GitHub Actions workflow that automates the process of building, pushing, and deploying a Java-based Docker application. Every time code is pushed to the `main` branch, the workflow builds the application, packages it into a Docker image, and deploys it to a remote virtual machine.

---

##  Workflow Overview

### **Trigger**
The workflow runs automatically when code is pushed to the `main` branch.

### **Build Process**
- The repository is cloned.
- The application is built into a Docker image using the provided `Dockerfile`.
- The image is tagged with a unique commit identifier (`SHA`).

### **Push to Google Artifact Registry (GAR)**
- The Docker image is pushed to Google Artifact Registry for storage and deployment.

### **Deploy to Remote Virtual Machine**
- The workflow connects to a remote VM via SSH.
- The VM pulls the latest image from GAR.
- The old container is stopped and removed.
- A new container is started with the updated image.

---

##  Workflow File: `.github/workflows/docker-build.yml`

### **Key Steps in the Workflow**

#### **Checkout the Repository**
```yaml
- name: Checkout repository
  uses: actions/checkout@v3
```
This step fetches the latest code from the repository.

#### **Login to Google Artifact Registry (GAR)**
```yaml
- name: Login to GAR
  uses: docker/login-action@v3
  with:
    registry: us-central1-docker.pkg.dev
    username: _json_key
    password: ${{ secrets.REGISTRY_JSON }}
```
Authenticates with Google Artifact Registry using a secure JSON key stored in GitHub Secrets.

#### **Build the Docker Image**
```yaml
- name: Build Maven Java App Image
  run: |
    docker build -t us-central1-docker.pkg.dev/taskproject-449320/cloud-app/test-app:${{ github.sha }} -f Dockerfile .
```
Uses Docker to build the application image, tagging it with the commit SHA.

#### **Push the Image to GAR**
```yaml
- name: Push Java App Image to Docker Hub
  run: |
    docker push us-central1-docker.pkg.dev/taskproject-449320/cloud-app/test-app:${{ github.sha }}
```
Uploads the newly built image to Google Artifact Registry.

#### **Deploy to the Remote VM**
```yaml
- name: Execute command on remote VM
  uses: appleboy/ssh-action@v1.2.0
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.USERNAME }}
    key: ${{ secrets.KEY }}
    port: ${{ secrets.PORT }}
    script: |
      echo "Running command on remote VM"
      sudo cat key.json | docker login -u _json_key --password-stdin https://us-central1-docker.pkg.dev/
      sudo docker pull us-central1-docker.pkg.dev/taskproject-449320/cloud-app/test-app:${{ github.sha }}
      sudo docker rm -f cloud-app >> /dev/null
      sudo docker run -d --name cloud-app -p 8080:8080 --network my-network us-central1-docker.pkg.dev/taskproject-449320/cloud-app/test-app:${{ github.sha }}
```
- Connects to the remote VM using SSH.
- Logs into Google Artifact Registry.
- Pulls the latest Docker image.
- Removes the old running container.
- Starts a new container with the updated image on port `8080`.

---

##  **Requirements**

### **GitHub Secrets**
Ensure the following secrets are configured in the repository:

| Secret Name          | Description |
|----------------------|-------------|
| `REGISTRY_JSON`      | JSON key for Google Artifact Registry authentication |
| `HOST`              | Remote VM IP Address |
| `USERNAME`          | SSH username |
| `KEY`               | SSH private key |
| `PORT`              | SSH port (default: 22) |

### **Dockerfile**
A valid `Dockerfile` must be present in the repository to define how the application should be containerized.



