# Angular Todo List Application

A modern, full-stack todo application built with Angular 8+ and Node.js/Express backend. Features real-time updates, optimistic UI updates, and a clean, responsive design.

## ✨ Features

- **📝 CRUD Operations**: Create, read, update, and delete todos
- **✅ Toggle Completion**: Mark todos as complete/incomplete with visual feedback
- **📝 Inline Editing**: Edit todos with a beautiful modal interface
- **🔄 Real-time Updates**: Optimistic UI updates for instant feedback
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🎨 Modern UI**: Clean interface with smooth animations
- **⚡ Performance**: Efficient state management with RxJS Observables
- **🔍 Sorting**: Sort todos by completion status, date, or alphabetically
- **💾 Data Persistence**: Backend integration with API endpoints
- **🌐 Loading States**: Professional loading indicators

## 🛠️ Technologies Used

### Frontend

- **Angular 8+** - Modern framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming with Observables
- **CSS3** - Modern styling with animations

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **RESTful API** - Standard HTTP methods
- **JSON Storage** - File-based data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Frontend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todolist
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create or update `src/environments/environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:3000",
   };
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200`

### Backend Setup

1. **Navigate to your backend directory**

   ```bash
   cd ../todo-backend  # Adjust path as needed
   ```

2. **Install backend dependencies**

   ```bash
   npm install express cors dotenv
   npm install -D nodemon
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

## 📁 Project Structure

```
todolist/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── todo.model.ts          # Todo interface
│   │   ├── services/
│   │   │   └── todo.service.ts        # HTTP service & state management
│   │   ├── todo-header/
│   │   │   ├── todo-header.html
│   │   │   ├── todo-header.css
│   │   │   └── todo-header.ts
│   │   ├── todo-input/
│   │   │   ├── todo-input.html        # Add todo form
│   │   │   ├── todo-input.css
│   │   │   └── todo-input.ts
│   │   ├── todo-list/
│   │   │   ├── todo-list.html         # Todo display & edit modal
│   │   │   ├── todo-list.css
│   │   │   └── todo-list.ts
│   │   ├── app.config.ts              # App configuration
│   │   ├── app.html                   # Main app template
│   │   ├── app.css                    # Global styles
│   │   └── app.ts                     # Root component
│   ├── environments/
│   │   ├── environment.ts             # Development config
│   │   └── environment.prod.ts        # Production config
│   ├── styles.css                     # Global styles
│   └── main.ts                        # Bootstrap file
├── angular.json                       # Angular CLI config
├── package.json                       # Dependencies
└── README.md                         # This file
```

## 🔧 API Endpoints

| Method   | Endpoint            | Description       |
| -------- | ------------------- | ----------------- |
| `GET`    | `/api/v1/todos`     | Get all todos     |
| `POST`   | `/api/v1/todos`     | Create a new todo |
| `PUT`    | `/api/v1/todos/:id` | Update a todo     |
| `DELETE` | `/api/v1/todos/:id` | Delete a todo     |

### Request/Response Format

**Todo Object:**

```json
{
  "_id": "string",
  "text": "string",
  "completed": boolean,
  "createdAt": "ISO date string"
}
```

**API Response Format:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    /* array of todos or single todo */
  ],
  "count": 4
}
```

## 🎯 Key Features Explained

### Optimistic Updates

The application implements optimistic UI updates for better user experience:

- Changes appear instantly in the UI
- API calls happen in the background
- If an error occurs, the UI reverts to the previous state

### State Management

Uses RxJS BehaviorSubject pattern:

- Centralized state in TodoService
- Components subscribe to state changes
- Automatic UI updates when data changes

### Modal Edit System

- Click edit icon to open modal
- Pre-populated with current todo text
- Submit with Enter key or Save button
- Smooth animations for modal open/close

### Responsive Design

- Mobile-first approach
- Flexible layouts that work on all screen sizes
- Touch-friendly interface elements

## 🔄 Development Workflow

### Adding New Features

1. Update the Todo model if needed (`models/todo.model.ts`)
2. Add service methods (`services/todo.service.ts`)
3. Update components (`todo-list/`, `todo-input/`)
4. Add corresponding backend endpoints
5. Test the full flow

### Code Style

- Use TypeScript strict mode
- Follow Angular style guide
- Implement proper error handling
- Use RxJS operators for data transformation

## 🚀 Building for Production

1. **Build the Angular app**

   ```bash
   ng build --prod
   ```

2. **Update environment variables**
   Update `src/environments/environment.prod.ts` with your production API URL

3. **Deploy**
   - Frontend: Deploy `dist/` folder to your hosting service
   - Backend: Deploy your Node.js API to your server

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**

- Ensure your backend has CORS enabled for your frontend domain
- Check that API URLs match between frontend and backend

**Todos not updating:**

- Verify backend is running on the correct port
- Check browser network tab for failed API calls
- Ensure component is subscribed to `todos$` observable

**Form submission issues:**

- Check that button types are correct (`type="submit"` vs `type="button"`)
- Verify ngModel binding with proper name attributes

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Angular 8+ and modern web technologies**
