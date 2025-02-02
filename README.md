# Final Year Project - Document Digitizer

## Project Overview

This project aims to digitize and convert handwritten, old registered documents into a readable and accessible format in regional languages improving public access and readability of historical records.

## Team Members

- **Charankumar E G D**
- **Arunprasad S**
- **Dharani Dharan R**

**Mentor:** Mrs. A. Sangeetha  
**Institution:** PSNA College of Engineering and Technology  
**Department:** Information Technology

## Technology Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Typescript
- **Backend:** Python (Flask)
- **OCR Engine:** Tesseract OCR
- **Translation:** Google Translate

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (for frontend)
- **Python 3.x** (for backend)
- **Tesseract OCR** (for text extraction)
- **Poppler** (for PDF processing)

You can install them as follows:

1. **Node.js:** [Install Node.js](https://nodejs.org/)
2. **Python 3.x:** [Install Python](https://www.python.org/)
3. **Tesseract OCR:** [Install Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
4. **Poppler:**
   - **Linux:** `sudo apt-get install poppler-utils`
   - **MacOS:** `brew install poppler`
   - **Windows:** [Install Poppler on Windows](http://blog.alivate.com.au/poppler-windows/)

## Installation

Follow the steps below to set up the project locally.

### 1. Clone the repository:

```sh
git clone https://github.com/charankumaregd/final_year_project.git
```

### 2. Navigate to the project folder:

```sh
cd final_year_project/code
```

### 3. Install frontend dependencies:

```sh
cd frontend
npm install
```

### 4. Create the virtual environment for backend:

```bash
cd backend
python -m venv .venv
```

### 5. Activate the virtual environment

```bash
.venv\Scripts\Activate
```

### 6. Install backend dependencies:

```sh
pip install -r requirements.txt
```

### 7. Set up the environment variables:

**For frontend:** Copy the `.env.example` file to `.env` inside the `frontend` folder and configure the necessary environment variables.

```sh
cd frontend
cp .env.example .env
```

### 8. To test run individual modules in backend:

```bash
cd backend
python -m <package_name>.<module_name>
```

### 9. Start the backend server:

```sh
cd backend
flask run
```

### 10. Start the frontend:

```sh
cd frontend
npm run dev
```

## Usage

- Upload scanned or handwritten documents.
- Extract text using OCR.
- Translate the extracted text into regional languages.
- Download or share the processed document.
