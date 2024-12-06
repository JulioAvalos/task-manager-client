# Task Manager Client

This project is a **Task Manager Client** built using **Angular** and **GraphQL**. It is designed to help users manage tasks efficiently by providing features such as task creation, filtering, and assignment.

## Features
- Create, update, and delete tasks.
- Filter tasks based on various parameters.
- Assign tasks to users.
- Utilize a GraphQL API for efficient data fetching and updates.
- Responsive design using **Bootstrap** and **Angular Material**.

## Technologies Used
- **Angular**: A powerful framework for building single-page applications.
- **GraphQL**: Used for querying and mutating the task data efficiently.
- **Bootstrap**: For styling and responsive design.
- **Angular Material**: For modern UI components.

## Folder Structure
The project follows a clean and organized folder structure:
Thanks for sharing your folder structure! Based on this, here's a summary of your **`src/`** folder organization:

### Folder Structure Breakdown

```plaintext
src/
├── app/                              # Core application code
│   ├── core/                         # Core modules (services, guards, etc.)
│   │   ├── graphql/                  # GraphQL setup and queries
│   │   ├── guards/                   # Route guards
│   │   ├── helpers/                  # Helper functions and utilities
│   │   ├── interceptors/             # HTTP interceptors
│   │   ├── models/                   # Interfaces and models
│   │   └── services/                 # Core services (e.g., API services)
│   ├── modules/                      # Feature modules
│   │   ├── dashboard/                # Dashboard module
│   │   │   ├── components/           # Dashboard-specific components
│   │   │   │   ├── column/           # Column component
│   │   │   │   ├── dashboard-filter/ # Dashboard filter component
│   │   │   │   ├── empty-state/      # Empty state component
│   │   │   │   ├── modal-form/       # Modal form component
│   │   │   │   └── task-card/        # Task card component
│   │   ├── error/                    # Error module
│   │   └── not-found/                # 404 not found page
│   └── shared/                       # Shared resources across modules
│       ├── components/               # Shared UI components
│       │   ├── confirmation-dialog/  # Confirmation dialog component
│       │   ├── layout/               # Layout components
│       │   └── loading-spinner/      # Loading spinner component
│       ├── directives/               # Custom directives
│       ├── pipes/                    # Custom pipes
│       ├── services/                 # Shared services
│       └── utils/                    # Utility functions and helpers
├── environments/                     # Environment-specific configuration (e.g., dev, prod)
└── styles/                           # Global styles and theming
```

### Key Observations:
1. **Core (`app/core`)**: Handles low-level utilities, services, and helpers such as GraphQL, interceptors, guards, and models.
2. **Modules (`app/modules`)**: Contains feature-specific modules like `dashboard`, `error`, and `not-found`, making your application modular.
3. **Shared (`app/shared`)**: Includes shared components (e.g., confirmation dialog, layout), utilities, and services that are reusable across your app.
4. **Environment Configuration (`environments`)**: Configuration files for different environments (e.g., development and production settings).
5. **Styles (`styles`)**: Global styles for the app, likely including SCSS or CSS files.

This structure seems well-organized, with clear separations for different responsibilities such as core logic, features, and shared resources.

## Setup and Installation
1. Clone this repository:
   ```bash  
   git clone https://github.com/your-username/task-manager-client.git  
   cd task-manager-client  
   ```  

2. Install dependencies:
   ```bash  
   npm install  
   ```  

3. Start the development server:
   ```bash  
   ng serve  
   ```  
   Open your browser and navigate to `http://localhost:4200`.

4. Connect the app to your GraphQL server by configuring the `environment.ts` file:
   ```typescript  
   export const environment = {  
     production: false,  
     graphqlEndpoint: 'http://your-graphql-server-endpoint',  
   };  
   ```  

## Usage
### Filtering Tasks
The dashboard includes advanced filtering options with the following fields:
- **Name**: Input field to search by task name.
- **pointEstimate**: Select dropdown for single choice.
- **assigneeId**: Dropdown to assign tasks to a specific user.
- **status**: Single-choice dropdown for task status.
- **tags**: Multi-choice dropdown for task tags.
- **ownerId**: Dropdown to select task owner.
- **dueDate**: Date picker to filter by deadline.

### Task Form
Use the **modal-form component** to create or update tasks with all relevant details.

## Contribution
Feel free to contribute to this project by submitting issues or pull requests.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---
