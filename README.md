# InterviewAI

A React + Vite app powered by shadcn/ui.

## 🎉 Features

- **File Upload**  
  - Drag-and-drop or click-to-select resume and job description  
  - Accepts PDF, DOC, DOCX  
- **Chat Interface**  
  - Streamed AI questions and user answers in a scrollable pane  
  - “Send” button with loading state  
  - Tracks a 5-question interview flow  
- **Interview Control**  
  - “Start Interview” after uploads  
  - “End Interview” button after 5 questions  
- **Styling & Layout**  
  - Built with Vite (React + TS)  
  - React Router for navigation (`/`, `/interview/:id`, `/feedback/:id`)  
  - Tailwind CSS + shadcn/ui components  
  - Consistent light/dark styling 

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 22 or above)
- npm (package manager)

## 🚀 Getting Started

Follow these steps to get started:

1. Clone the repository:

   ```bash
   git clone https://github.com/amantulsyan35/ai_interviewer_client
   ```

2. Navigate to the project directory:

   ```bash
   cd ai_interviewer_client
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Add env for server URL:

   ```bash
   VITE_API_URL=http://localhost:8000
   ```

5. Start the development server:

   ```bash
   npm dev
   ```

## Sample Job Description
[Job Title_ Senior Full-Stack Engineer (AI Products).docx](https://github.com/user-attachments/files/20428006/Job.Title_.Senior.Full-Stack.Engineer.AI.Products.docx)



## 📜 Available Scripts

- npm dev - Starts the development server.
- npm build - Builds the production-ready code.
- npm lint - Runs ESLint to analyze and lint the code.
- npm preview - Starts the Vite development server in preview mode.

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
ai_interviewer_client/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── lib/           # Utility functions
  │   ├── hooks/         # Hooks for data fetching and mutation  
  │   ├── routes/        # Individual Pages for routes
  │   ├── App.tsx        # Application entry point
  │   └── main.tsx       # Main rendering file
  ├── eslint.config.js   # ESLint configuration
  ├── index.html         # HTML entry point
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## Tooling

- **Vercel V0 for design aesthetic**  

## Additional Features which can be added to this project

- **Time configurations by user** 
- **Question configurations by user** 
- **Ability to pause while giving the interview**
- **Ability to login to a dashboard app to see interview score and share with other people**
- **Peer to peer interviews matched by the score**

