# Todos
Simple SPA react & axios app using Typescript for keeping a todo list

### Main user's features
1. CRUD for todos with requests to API by axios
2. List todos (from API by axios)
3. Filter todos

### Main programmer's features
1. Using @reduxjs/toolkit for operating app state
2. Using react-hook-form for operating forms in based on hooks way
3. Using third-party packages (such as @radix-ui/react-checkbox, react-select) for reusing existing components
4. Using yup for validating forms in based on schema way
5. Using Sass for styles
6. Using react-hot-toast for notifications
7. Using @testing-library/react for tests 

### Used packages:
- **@hookform/resolvers**
- **@radix-ui/colors**
- **@radix-ui/react-checkbox**
- **@radix-ui/react-icons**
- **@reduxjs/toolkit**
- **@testing-library/jest-dom**
- **@testing-library/react**
- **@types/jest**
- **@types/node**
- **@types/react**
- **@types/react-dom**
- **@types/react-select**
- **@types/redux-logger**
- **@types/uuid**
- **axios**
- **classnames**
- **date-fns**
- **jest**
- **jest-mock-axios**
- **react** 
- **react-dom** 
- **react-hook-form** 
- **react-hot-toast**
- **react-icons** 
- **react-redux** 
- **react-scripts** 
- **react-select**
- **sass** 
- **uuid**
- **yup**  

### Tests coverage
Approximately 87% of the code. Details in the report in the **coverage** folder

### How to start
After git clone install all project's dependecies from package.json:
#### `npm i` or `yarn`

And start the project:
#### `npm start` or `yarn start`

To communicate with API you should also run the to_do_api project and change the APIClient baseURL in the `src/api/APIClient.js` file to match its start url
