[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Mvibic7M)
# Homework 2
Read the HW specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/Ee5EyOzz3KlPoaqm2IFtL0YBfD9GE204MLqmaTNKiIEOSQ?e=CSPCfb).

In the sections below, list and describe each contribution briefly.

## Team Member 1 [Amisha Tiwari] contribution
1. Worked on the application and behaviour of the application.
2. Created home page that consists of header, sidebar and displays all the questions added.
3. Worked on searching a question by tag and text.
4. Created buttons that sort questions based on newest, active and unanswered.
5. Created the new questions page. The user can create and add a new question that further gets displayed on the home page.
6. Worked on new answers page. The user can create and add a new answer for a question.
7. Debugged cypress test cases.

## Team Member 2 [Akshat Khare] contribution
1. Worked on the Entire Application Structure as well as behaviour of the application.
2. Helped in creating home page that consists of header, sidebar and displays all the questions added.
3. Created Tags page and the routing of tag to there filtered Questions.
4. Implemented the URL filtering logic as well as modified the New Answer Page, Ask Question Page and View Questions Page. 
6. Modified the new answers page so that user can enter URL's in the form of source and target.
7. Ran and Debugged cypress test cases.
8. Removed Eslint errors and warnings.
9. Created and modified Design Documents.
10. Updated Readme file with the Design Pattern used.

**Create a directory design and submit your design documents there.** Design documents include the class diagrams and the sequence diagrams.

Design Pattern Used

Component-Based Architecture (CBA)
Our project follows a component-based architecture, where the application is divided into reusable, self-contained components. Each component serves a specific purpose, promoting reusability, modularity, and maintainability. Let's take a closer look at how our project is structured:

1. Reusable UI Components:
Header Component (Header.jsx): Manages the application header, providing search functionality and user interaction elements.

Questions Component (Questions.jsx): Displays a list of questions, enabling users to view, sort, and search for questions. Handles interactions related to questions, such as sorting and viewing specific questions.

Sidebar Component (Sidebar.jsx): Represents the sidebar menu, offering navigation options like "Questions," "Tags," and "Ask a Question." Allows users to switch between different sections of the application.

Tags Component (Tags.jsx): Displays a list of tags and allows users to filter questions based on selected tags.

AskQuestions Component (AskQuestions.jsx): Provides a form for users to submit new questions.

ViewQuestion Component (ViewQuestion.jsx): Displays detailed information about a specific question, including its answers and comments.

AnswerQuestion Component (AnswerQuestion.jsx): Allows users to submit answers to specific questions.

2. Data Handling Components:
fakeStackOverflow Component (fakeStackOverflow.jsx): Acts as a container component orchestrating interactions between UI components and the data model. Manages the state, handles user events, and passes down necessary data and functions to child components.

3. Data Model:
Model (model.js): Represents the data model of the application. Contains predefined data structures for questions, tags, and answers. This model encapsulates the application's data and serves as the single source of truth for the components.

4. Utility Components:
Utility Functions (utility.js): Contains utility functions for operations such as date formatting, searching, and sorting. These functions are used by the fakeStackOverflow component to manipulate and process data efficiently.

Benefits of Component-Based Architecture(CBA):
Reusability: Components are self-contained and can be reused across different parts of the application, promoting code reuse and reducing redundancy.

Modularity: Each component focuses on a specific task, making it easier to understand and maintain. Changes or updates to a specific feature can be isolated within its corresponding component.

Scalability: New features can be added by creating new components or extending existing ones. This modular approach allows the application to scale without significantly impacting the existing codebase.

Collaboration: Developers can work on different components simultaneously, enabling efficient collaboration and parallel development. Each component can be developed and tested independently.

Maintainability: The modular structure facilitates easier bug tracking, debugging, and updates. Modifications can be localized to specific components without affecting the entire application.

By embracing this component-based architecture, our project ensures a clean, organized codebase, making it easier to develop, maintain, and extend in the future. Each component can be tested independently, ensuring a robust and reliable application overall.