# To-Do List App

A simple and intuitive To-Do List application built using React and Flask. This app allows users to manage tasks efficiently with features like adding, editing, deleting, marking tasks as completed, and downloading task reports.

---

## Features

- Add tasks
- Edit task titles and completion status.
- Delete tasks.
- Mark tasks as completed or pending.
- Download all tasks as a `.docx` report.
- Dynamic and responsive UI built with Material-UI.
- Backend powered by Flask and SQLite for data persistence.

---

## Installation and Setup

### **Frontend (React)**
1. Clone the repository:
   git clone https://github.com/yash-kulkarni2000/to-do-list.git
   cd to-do-list/frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

The React app will be available at http://localhost:3000.

### **Backend (Flask)**
1. Navigate to the backend folder:
   cd ../backend

2. Set up a virtual environment:
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install dependencies:
    pip install -r requirements.txt

4. Start the Flask server:
    python app.py

The backend will be available at http://127.0.0.1:5000.


### **Usage**

Open the frontend at http://localhost:3000.
Use the interface to manage tasks:
Add new tasks using the input field and "Add Task" button.
Edit tasks by clicking the "Edit" button.
Mark tasks as completed or pending using the checkbox.
Delete tasks by clicking the "Delete" button.
Download all tasks as a .docx file using the "Download" button.

### **Technologies Used**
Frontend: React, Material-UI
Backend: Flask, SQLite, python-docx (for generating .docx reports)


### **Folder Structure**
<repository-name>
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend
│   ├── instance
│   │   └── tasks.db
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
└── README.md


### **Contributing**
Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.

2. Create a new branch:
    git checkout -b feature-name

3. Commit your changes:
    git commit -m "Add feature-name"

4. Push to your branch:
    git push origin feature-name

5. Open a pull request.

## ** Contact **
For any questions or suggestions, feel free to reach out:

Email: y.kulkarni2000@gmail.com
GitHub: yash-kulkarni2000

