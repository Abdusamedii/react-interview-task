# Flex Business Solutions Tech Test - Inventory Management

In Flex Business Solutions, we aim to provide excellence and efficiency on all our lines of code in order to support the day-to-day activities of the company using our software solutions. In this task, you will be provided with a simple design of an app, fetching a list of products from an external source and allowing the user to search or filter among the list.

### Tech Test Overview

We have provided below the Figma link of this task. On the main page, we have a list of job sites with their corresponding status. By clicking the "Create" button we can create other job sites and add them to the list. By clicking to the jobsite name, we are redirected to the inventory dashboard for that particular job site. There, we can update items inside categories by double cliking on each cell where the content of that row will automatically be shown on the modal. Updating any specific column and hitting "Save", the content of the table should be automatically updated.

[FIGMA] [https://www.figma.com/file/uOxY3AiUFaGuxsU9nk0H1O/ReactJs-Test?node-id=0%3A1]

We love to see:

- Functional code
- Good design
- Unit testing

### Notes

All of you work should take place inside this repository.

You are free to use any packages that would help with this task

You do not need to add additional security measures as part of this exercise.
We're interested in how you break down the work and build your solution in a clean, easy-to-use, reusable and testable manner.

## Deliverables

You must follow the Figma design and need to add the functionality of:
a) Create new job sites with their categories
c) Search job sites & items on the inventory page
b) Update items on each category

**Create a folder inside the repository and include finished screenshots of the app.**
**Please make sure to update the readme with**:

- How to run your app with all the necessary details
  # Run App

## Getting Started

Thank you for your interest in my project. This document provides all the necessary details to run and explore the application.

### Live Demo

You can view a live, running version of the application and its API at the following addresses:

- **Frontend:** [https://witty-bay-02ad12d03.2.azurestaticapps.net](https://witty-bay-02ad12d03.2.azurestaticapps.net)
- **Backend API:** [https://abdusamedscaffoldsystems-ekgfdhfwf7b9h2f4.westeurope-01.azurewebsites.net/swagger/index.html](https://abdusamedscaffoldsystems-ekgfdhfwf7b9h2f4.westeurope-01.azurewebsites.net/swagger/index.html)

**Note:** The live database has IP address restrictions for security. To test the live application with full functionality, your IP address must be whitelisted.

---

### Running the Application Locally

If you wish to set up and run the application locally, please follow the instructions below for the backend and frontend.

### 1. Backend Setup

The backend is a .NET application. You can run it using Docker or directly from Visual Studio.
Run the database via compose.yaml file found on backend/FlexScaffoldSystems (go to the directory and docker-compose)
Run the frontend on (frontend/flexScaffold) change the .env file to include the Backend Server Ip and than 
npm install and npm run dev

- Relating to the task please add answers to the following questions;
  1. How might you make this app more secure?
  1. Answer:
     First thing first i would implement JWT Authentication and Authorization, i would encrypt sensetive data of the users (e.g Passwords), would use HTTPS for encrypted communication to evade MIM attacks, Would rely on Cloudflares DDOS attack prevention, Prevent SQL Injection by not writing hard coded SQL queries and relying on ORM, This app will use Dependencies so a thurough Dependency scanning is required, Anti-CSRF tokens, Regular updates to prevent new vurnabilities on our software.
  1. How would you make this solution scale to millions of records?
     Seeing as the Database most of the times is the first to bottleneck and there are million of records, i would focus on the database first, using the right architechture depending on the app, seeing that this app is used to manage inventory and requires transactional matters, has Relationships between tables,complex analytics joins, And Data integrety is a must, than it's more than reasonable to use SQL databases (e.g MySQL,PostgreSQL,MSSQL etc...).
     To improve read times and to ease the workload from the Database i would use Caching technology like Redis, this helps massively on read times since the data is saved on the Volitale Storage instead of non-Volitale Storage which has a longer read-write time, correct and careful indexing on the SQL Database is a must, Use tools like ElasticSearch to not make the Database to do FuzzySearch as it is extremley resource hungry, I would also Create Database Duplicates to increase Read times, would split Databases by for example Names - A-L \_ M-Z (Depending on Where is the median of Names Or by Location), Would use a seperate Database NoSQL only for Telemetrics and Logging,An Horizontal Scaling plan by Docker Containers, using Amazon or Azure Cloud Services provided ther offer an auto scaling function, I would also implement an Load balancer. ETC.

On completion email a link to your repository to your contact at FLEX BUSINESS SOLUTIONS and ensure it is publicly accessible.
