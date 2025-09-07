# Rick and Morty Frontend App

This is a single-page application built to list, filter, and manage characters from the Rick and Morty universe, leveraging a modern React and GraphQL stack.

---

## 🚀 Technologies Used

* **React 18**: The core library for building the user interface.
* **Tailwind CSS**: A utility-first CSS framework used for all responsive design and styling.
* **@apollo/client**: A comprehensive state management library for connecting to a GraphQL API.
* **react-router-dom**: Used for handling application routing and navigation.
* **graphql**: The library for parsing GraphQL queries.
* **Context API**: Used for global state management of favorites and soft-deleted characters.
* **Docker**: Used for running the application in a containerized environment.

---

## ✨ Key Features

* **Character Listing**: Fetches and displays a list of all characters from the Rick and Morty GraphQL API.
* **Character Details**: Clicking on a character navigates to a dedicated page showing detailed information.
* **Responsive Design**: The application is fully responsive. On mobile, filters and character details are displayed in full-screen modals.
* **Search and Filters**: Users can search for characters by name in real-time. Filters for `Species` and `Gender` are also available, with the ability to sort by name (`A-Z` / `Z-A`).
* **Favorites Functionality**: Characters can be marked as favorites, which adds them to a separate list that is dynamically updated across the application.
* **Soft Delete**: A character can be "soft-deleted" from the view. This feature uses global state to hide the character from all lists without removing them from the API.
* **Comments section**: Implements the possibility of adding comments to each character.

---

## 🛠️ How to Run the Application

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/LauraCaa/rick-and-morty-app.git
cd rick-and-morty-app
```

### 2. Install project dependencies

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

```bash
npm install
```

### 3. Run the Application

You can run the app locally either with Docker or with npm.

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d --build
```
The application will be accessible in your browser at [http://localhost:3000/](http://localhost:3000/)

#### Option B: Using npm

```bash
npm start
```
The app will open at [http://localhost:3000/](http://localhost:3000/)

---

## 🧪 Running Tests

To execute the test suite, run:

```bash
npm test
```

This will run all tests located in files ending with `.test.js` inside the project.

---

## 🌐 How the API is Used

This application uses the public [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql), consuming it through Apollo Client.

- **Apollo Client** is initialized in `/src/context/ApolloClientProvider.js`:

  ```js
  import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  export default function AppApolloProvider({ children }) {
    return (
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    );
  }
  ```

- **Data fetching** is handled by custom hooks in `/src/services/charactersApi.js`, using Apollo's `useQuery` for both lists and single character details:

  ```js
  import { gql, useQuery } from '@apollo/client';

  export const GET_CHARACTERS = gql`
    query GetCharacters {
      characters {
        results {
          id
          name
          status
          species
          image
          gender
        }
      }
    }
  `;

  export const GET_CHARACTER_BY_ID = gql`
    query GetCharacterById($id: ID!) {
      character(id: $id) {
        id
        name
        species
        status
        image
        gender
      }
    }
  `;

  export const useGetCharacters = () => {
    const { loading, error, data } = useQuery(GET_CHARACTERS);
    return { loading, error, characters: data?.characters?.results || [] };
  };

  export const useGetCharacter = (id) => {
    const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
      variables: { id },
    });
    return { loading, error, character: data?.character };
  };
  ```

- These hooks are used throughout the app to fetch data for the character list and details, leveraging Apollo's caching and state management.

You can explore and test the API at [https://rickandmortyapi.com/graphql](https://rickandmortyapi.com/graphql).

---

## 🧑‍💻 How to Use the App

1. **Browse Characters:** On the home page, you’ll see a list of Rick and Morty characters. Scroll or paginate through the list.
2. **Search and Filter:** Use the search bar to filter characters by name. Apply additional filters for species or gender.
3. **View Details:** Click on any character card to view detailed information in a dedicated page or modal (on mobile).
4. **Mark Favorites:** Click the "favorite" icon on any character to add them to your Favorites list.
5. **Soft Delete:** Use the "delete" icon to hide a character from your view (only from your current session).
6. **Add Comments:** On the character detail page, add your own comments for each character.

---

## 📦 Project Structure

Below is an overview of the main folders and files:

```
src/
│
├── assets/
│   └── fonts/
│
├── components/
│   ├── characters/
│   │    ├── card/
│   │    │    ├── CharacterCard.jsx
│   │    │    ├── CharacterCard.test.js
│   │    │    ├── CharacterDetails.jsx
│   │    │    ├── CharacterDetails.test.js
│   │    │    └── DeleteCharacterButton.jsx
│   │    ├── lists/
│   │    │    ├── CharacterItem.jsx
│   │    │    ├── CharacterItem.test.js
│   │    │    ├── CharacterView.jsx
│   │    │    ├── CharacterView.test.js
│   │    │    ├── FavoriteCharacterList.jsx
│   │    │    ├── FavoriteCharacterList.test.js
│   │    │    ├── OtherCharacterList.jsx
│   │    │    └── OtherCharacterList.test.js
│   │    ├── comments/
│   │    │    ├── CommentForm.jsx
│   │    │    ├── CommentList.jsx
│   │    │    └── CommentsSection.jsx
│   │    ├── search/
│   │    │    ├── SearchAndFilterBar.jsx
│   │    │    └── SearchFilter.jsx
│   │    └── ui/
│   │         ├── BackButton.jsx
│   │         ├── FavoriteButton.jsx
│   │         └── FavoriteButton.test.js
│   │
│   └── layout/
│        ├── Header.jsx
│        └── Layout.jsx
│
├── context/
│   ├── ApolloClientProvider.js
│   ├── DeletedCharactersContext.js
│   └── FavoritesContext.js
│
├── hooks/
│   ├── useFilteredCharacters.js
│   └── useFilteredCharacters.test.js
│
├── pages/
│   └── Home.js
│
├── services/
│   └── charactersApi.js
│
├── styles/
│   └── (css files)
│
├── App.css
├── App.js
├── index.css
├── index.js
├── setupTests.js
│
├── .gitignore
├── compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── README.md
```

**Feel free to open issues or PRs if you encounter any problems or want to suggest improvements!**
