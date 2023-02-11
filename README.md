# React Movie App

A Simple Movie Application using React JS, Typescript and Tailwind css, allows user to search and see the trailer of the movie.

## Demo

Check out a live demo and try it for yourself: [Live demo](https://tmovies-blush.vercel.app/)

## Screenshots

  <kbd><img width="931" alt="hero section" src="https://user-images.githubusercontent.com/122378993/218236029-9bcf16a3-6cb7-47c1-83a0-fcb795343e82.png"></kbd>

  <kbd><img width="950" alt="youtube video" src="https://user-images.githubusercontent.com/122378993/218236507-d55ca04d-2d6c-414b-9316-3817ae1a6cd7.png"></kbd>

  <kbd><img width="955" alt="movies slide" src="https://user-images.githubusercontent.com/122378993/218236543-a33ec859-a0ee-4073-97bd-021f8401a00e.png"></kbd>

  <kbd><img width="937" alt="movie detail" src="https://user-images.githubusercontent.com/122378993/218236527-fbf494ef-d62c-45c3-81cf-7fbeb1c0c3b5.png"></kbd>

  <kbd><img width="957" alt="search movie" src="https://user-images.githubusercontent.com/122378993/218236559-2424a745-eef7-4835-8311-e5cd3030e921.png"></kbd>



### **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

\***\*Prerequisites\*\***

- git
  If you want to clone the project from GitHub and work with it locally, you will need to have Git installed on your system. You can download and install Git from the official website (**[https://git-scm.com/](https://git-scm.com/)**).
- Node.js
  Application requires Node.js to be installed on your system in order to run. You can download and install the latest version of Node.js from the official website (**[https://nodejs.org/](https://nodejs.org/)**).
- npm (Node Package Manager)
  npm is the package manager for Node.js, and is used to manage the dependencies and packages required for your Next.js project. It is installed automatically when you install Node.js.
  To check if npm is installed on your system, you can open a terminal or command prompt and enter the following command:
  ```bash
  npm -v
  ```

Once you have these prerequisites in place, you can proceed to clone the project from GitHub using Git.

\***\*Installing\*\***

Make sure you have all the necessary prerequisites installed on your system. Follow the below steps to install the setup the project on your machine:

- Open a terminal or command prompt and navigate to the directory where you want to clone the project.
- Run the following command to clone the project from GitHub:
  ```bash
  git clone https://github.com/sudeepmahato16/movies-app.git
  ```
- This will create a new directory called "movies-app" in the current location, containing the code for the movie app project.
- Navigate to the project directory by running the following command:

  ```bash
  cd movies-app
  ```

- Run the following command to install the project's dependencies using npm:

  ```bash
  npm install --legacy-peer-deps
  ```

- Start the server

  ```bash
  npm run dev
  ```

- To use the movie project, you will need to set up some environment variables on your development machine. Here are the steps to follow:

  1. Create a **`.env`** file in the root of the project.
  2. Add the following variables to the **`.env`** file, replacing the placeholder values with your own:

  ```jsx
  VITE_API_KEY=<your-tmdb-api-key>
  VITE_TMDB_API_BASE_URL = https://api.themoviedb.org/3
  ```

  3. Save the **`.env`** file.

- Once the dependencies are installed, you can run the project locally by running the following command:
  ```bash
  npm run dev
  ```

This will start the development server and open the movie application in your default web browser.

### Contributing

We welcome contributions to movie app! If you have an idea for a new feature, an improvement to an existing feature, or a bug fix, please open an issue to discuss it before submitting a pull request. This helps me to review and understand your changes more efficiently.

To contribute code to movie app project:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes to the new branch
4. Run the automated tests to ensure that your changes do not break any existing functionality
5. Open a pull request back to the main repository, including a description of your changes and any relevant issue numbers

Thank you for your contribution to Movie app project! We appreciate your efforts to help make this a great movie application.
