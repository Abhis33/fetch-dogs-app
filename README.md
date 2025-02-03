# 🐶 Fetch Dogs App

A React-based web application that allows users to search, filter, and favorite shelter dogs for adoption. Users can browse available dogs, sort by breed, and generate a match based on their favorites.

### Building the app -

`git clone https://github.com/your-username/fetch-dogs-app.git`
`cd fetch-dogs-app`
 `docker build -t fetch-dogs-app . `

### Running the app -

`docker run -p 3000:3000 fetch-dogs-app`

## 🚀 Features

✅ User Authentication - Login with name & email (session managed via cookies).
✅ Search & Filtering - Filter dogs by breed, sort results alphabetically.
✅ Pagination - Browse paginated results for better navigation.
✅ Favorites Management - Select and manage favorite dogs.
✅ Find a Match - Generate a match based on selected favorites.
✅ Responsive UI - Styled with SCSS for a clean and accessible layout.

## 📦 Tech Stack

-    Frontend: React, Redux, SCSS
-    State Management: Redux Toolkit
-    API Calls: Axios (withCredentials: true)
-    Environment: Dockerized for consistent deployment
-    Backend API: Fetch Take-Home Service

## 🎨 UI Screens

1️⃣ Login Page

-    Users enter name & email to authenticate.

2️⃣ Search Page

-    Filter dogs by breed
-    Sort results alphabetically
-    Paginate through dogs
-    Add/Remove favorites

3️⃣ Favorites Section

-    View favorite dogs
-    Click "Find a Match" to generate the best match
