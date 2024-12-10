# Task Manager Client

This project is a [Task Manager Client](https://ng-recipe-book-19d7d.web.app/) built using **Angular** and **GraphQL**. It is designed to help users manage tasks efficiently by providing features such as task creation, filtering, and assignment.

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
│   │   │   │   ├── skeleton/         # Skeleton loader component
│   │   │   │   └── task-card/        # Task card component
│   │   ├── error/                    # Error module
│   │   ├── not-found/                # 404 not found page
│   │   └── settings/                 # User settings module
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

## Key Observations

### 1. Core (`app/core`)

This folder contains essential functionalities and services for the application, including:

- **GraphQL**: Setup and queries for data fetching.
- **Guards**: Route guards for controlling access to different parts of the app.
- **Helpers**: Utility functions for common tasks across the app.
- **Interceptors**: HTTP interceptors to handle requests and responses.
- **Models**: TypeScript interfaces and models used across the application.
- **Services**: Core services like API services for interacting with backend data.

### 2. Modules (`app/modules`)

This folder contains feature-specific modules, ensuring the app remains modular and easy to maintain:

- **Dashboard**: Contains all components related to the task dashboard.
- **Error**: Handles error management for the app.
- **Not Found**: Displays a 404 page when the user navigates to an unknown route.
- **Settings**: Manages user-specific settings and preferences.

### 3. Shared (`app/shared`)

Resources that are used across multiple modules or components are placed in this folder:

- **Components**: Shared UI components such as confirmation dialogs, layout components, and loading spinners.
- **Directives**: Custom directives that modify the behavior of DOM elements.
- **Pipes**: Custom pipes for transforming data in templates.
- **Services**: Shared services for functionality that needs to be used across different parts of the app.
- **Utils**: Utility functions and helpers that can be used globally.

### 4. Environment Configuration (`environments`)

Contains configuration files for different environments, such as:

- **Development**: Settings for the development environment.
- **Production**: Settings for the production environment.
- This allows you to manage different configurations for various stages of deployment.

### 5. Styles (`styles`)

Contains global styles for the app:

- Likely includes SCSS or CSS files that define the overall look and feel of the application.
- Ensures consistent styling across the entire app.

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

To set up the environment-specific configuration, you need to create the `environments` folder in `src/app/enviroments` and add the `environment.ts` file. Here's an example of what your `environment.ts` file should look like:

```typescript
export const environment = {
  production: false, // should be true if it's a production build
  API_URL: "[API_URL]",
  API_TOKEN: "[API_TOKEN]"
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
