# 📝 React Todo App with Drag and Drop

A powerful, user-friendly Todo List App built with React, DnD Kit for drag-and-drop functionality, Context API for global state management, and Local Storage for persistent data.

---

## 🚀 Features

- ✅ **Add, Edit, Delete** todos
- 🎯 **Mark as Completed / Incomplete**
- 🗓️ **Search** todos by title (case-insensitive)
- 📦 **Persistent Storage** via browser's Local Storage
- 🏓️ **Sample Todos** preloaded for quick testing
- 🔁️ **Drag and Drop Reordering** with full **desktop + mobile support**
- ✨ **Modern UI** with clean animations and intuitive design
- 📱 Fully responsive for all screen sizes

---

## 🛠️ Tech Stack

- **React.js**
- **@dnd-kit/core & @dnd-kit/sortable**
- **React Icons**
- **Context API**
- **LocalStorage**

---

## 📂 Folder Structure

```
📂src
 ├📁components
 ┃ ├📁Modal
 ┃ ├📁SampleTodo
 ┃ └📁TodoList
 ├📁context
 ┃ └📄TodoContext.jsx
 ├📄App.jsx
 └📄main.jsx
```

---

## ⚙️ How to Run This App Locally

Follow the steps below to run this app on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-todo-dnd.git
cd react-todo-dnd
```

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** installed.

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open in Browser

Visit [http://localhost:5173](http://localhost:5173) to use the app.

---

## 📱 Mobile Support

This app uses `PointerSensor` and `TouchSensor` from `@dnd-kit` to ensure **drag-and-drop also works on mobile devices** like Chrome/Brave on Android or iOS.

Hold an item for ~250ms and drag to reorder.

---

## 🤝 Contribution

Feel free to fork and improve it, or open an issue if you find any bugs or have feature requests!

---

> Built with ❤️ using React and DnD Kit


