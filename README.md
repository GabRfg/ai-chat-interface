# AI Chat Interface

Front-end for an internal AI assistant: a chat screen in the style of modern LLM products plus an admin area to manage who can access it. Built as the client side of an in-house language model project, with the integration points left ready for the backend.

**Stack:** React 19 · Material UI 7 · React Router · Formik + Yup · Docker · Nginx

**Status:** UI complete, running on mock data — the AI responses, authentication and user list are not yet connected to a backend.

---

## Screens

| Route | Screen |
| --- | --- |
| `/` | Login |
| `/register`, `/forgot` | Sign-up and password recovery |
| `/dashboard` | Chat: message history, typing animation for responses, file attachment |
| `/team` | User management table (MUI Data Grid) with edit and delete confirmation |
| `/form` | Create user, validated with Formik + Yup |
| `/edit-user/:id` | Edit user |

## Highlights

- **Two layouts in one router** — auth pages render standalone; the app pages share a sidebar and top bar
- **Responsive by design** — sidebar becomes a hamburger menu on mobile; chat, forms and tables were adapted with MUI breakpoints
- **Conversation model** — each "New chat" gets its own ID and the message list is lifted to the layout, so the sidebar and the chat share state
- **Light/dark theme** with a custom design-token palette (`src/theme.js`)
- **Production container** — multi-stage Dockerfile builds the app and serves the static bundle with Nginx

## Running locally

```bash
git clone https://github.com/GabRfg/react-ia-interface.git
cd react-ia-interface
npm install --legacy-peer-deps
npm start
```

Open `http://localhost:3000`. Any credentials log you in (authentication is mocked).

**With Docker:**

```bash
docker compose up --build
```

The app is served at `http://localhost:3001`.

## Connecting a real model

The integration points are marked in the code:

- `src/scenes/dashboard/index.jsx` → `handleSendPrompt()` currently answers with a fixed message after 1 s. Replace the `setTimeout` with a call to your model's API, sending `chatId`, the prompt and the attached file.
- `src/scenes/login/index.jsx` → `handleSubmit()` navigates without checking credentials.
- `src/scenes/team/index.jsx` → user list comes from `src/data/mockData.js`.

## Project structure

```
src/
├── scenes/
│   ├── dashboard/   # Chat screen
│   ├── team/        # User list
│   ├── form/        # Create user
│   ├── editUser/    # Edit user
│   ├── login/ register/ forgot/
│   └── global/      # Sidebar and Topbar
├── components/      # Shared UI (Header)
├── data/            # Mock data
└── theme.js         # Palette, typography and color mode
```

## Roadmap

- [ ] Connect chat to the model API with streaming responses
- [ ] Real authentication (JWT) and protected routes
- [ ] Persist conversation history per user
- [ ] Remove unused template dependencies (charts, calendar)
