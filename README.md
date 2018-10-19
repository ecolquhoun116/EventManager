# EventManager
## How to insall
 
 First of all you have to install nodejs, [Download page](https://nodejs.org/en/download/).  
 Then when you have nodejs installed and clone the repository you have to install all the dependencies of the projects.
> npm install

## How to run ?
 #### For devevloppent
 It rebuild the project when you are developping.
 > npm run dev  

Just one time and then keep it reload automatically. You can develop without re-run the comand.

#### For production
 > npm run start

## See the website
Go on your <3 browser at the adress [Localhost](localhost:3000) 
 ## Structure of the project
```bash
EventManager
|
|- bin : do not care for now
|-node_modules: folder of all depedencies we use. Carefull to not upload in git
|
|- publics : directories to put front end javascript, css, pictures. 
|   |- images
|   |- css
|   |- javascript
|
|- routes 
|   |
|   | - index.js : Main entry point. Contain the routes for our app
|   | - user.js : dont know
|   
|- views :folder for the html/ejs template
|   |-index.ejs : main page contain html/ejs
|   |-error.ejs : contain the template when the page have an error
|   |-partials : smaller piece of template who will be used in multiple files
|
|-package.json : configuration files for the dependencies
|-app.js : dont care now

```
### Notes
Go over routes/index.js I add some comments to explain how is the mecanishm.
