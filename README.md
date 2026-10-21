# CivicSync

CivicSync is a municipal issue and grievance management demo built with React, Express, and MongoDB. It provides separate experiences for citizens, municipal workers, and administrators to report issues and follow their progress.

## Features

- **Citizen portal:** browse community reports, submit an issue with its category, location and optional photo, track its status, and upvote reports.
- **Worker portal:** view assigned field tasks, update progress, add work notes, and attach resolution proof.
- **Admin portal:** view complaint and worker information, review issue activity, assign a worker, and update priority or status.
- **Complaint lifecycle:** reports move through Pending, In Progress, and Resolved, with a timeline of activity.
- **Responsive views:** citizen and worker screens can be shown in a mobile frame or expanded view.
- **Sample data:** the app includes example complaints and worker profiles for exploring the demo.

## Technology

- **Frontend:** React 19, Create React App, and Lucide React
- **Backend:** Node.js, Express 4, and Mongoose
- **Database:** MongoDB

## Project structure

```text
.
├── public/                 # Static assets served by the React app
├── src/
│   ├── components/         # Citizen, worker, and admin screens
│   └── context/            # Client-side demo data and state
└── server/
    └── src/
        ├── config/         # MongoDB connection
        ├── models/         # Mongoose models
        ├── routes/         # REST API routes
        └── seed/           # Sample database data
```

## Prerequisites

- Node.js and npm
- MongoDB, either a local instance or a MongoDB Atlas cluster

## Run the frontend demo

From the repository root:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Use the role options on the login screen to enter the citizen, worker, or admin demo experience. The OTP and role login flows are demonstrations and do not provide production authentication.

The frontend currently uses sample data and browser `localStorage` for complaints and workers. It does **not** call the Express API yet. As a result, starting the backend does not connect the frontend to MongoDB, and browser demo changes are not persisted in the database.

## Run the API

1. Install the server dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create `server/.env` from `server/.env.example` and set `MONGO_URI` to your MongoDB connection string:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/civicsync
   CLIENT_ORIGIN=http://localhost:3000
   ```

   For MongoDB Atlas, use the connection string supplied by Atlas instead. Keep credentials private and do not commit your `.env` file.

3. Start the API from the `server` directory:

   ```bash
   npm run server
   ```

   The API listens on [http://localhost:5000](http://localhost:5000). It connects to MongoDB before listening and seeds sample data automatically when the workers collection is empty. Check the health endpoint at [http://localhost:5000/api/health](http://localhost:5000/api/health).

To run both the React development server and API together, install the server dependencies as above, then run from the repository root:

```bash
npm --prefix server run dev
```

The API's `CLIENT_ORIGIN` value controls which frontend origin is allowed by CORS.

## Seed data

From the `server` directory, run:

```bash
npm run seed
```

This **deletes and recreates** the users, workers, complaints, and complaint counter collections with the sample data. The API also exposes `POST /api/admin/reset`, which performs the same reset; use it only with a development database.

## API overview

All routes are prefixed with `/api`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Check that the API is running |
| `POST` | `/auth/login` | Demo role login |
| `GET` | `/workers` | List workers |
| `GET` | `/workers/:id` | Get a worker |
| `GET` | `/complaints` | List complaints; supports `status`, `ward`, `workerId`, and `citizenEmail` query filters |
| `GET` | `/complaints/:id` | Get a complaint by its CivicSync ID |
| `POST` | `/complaints` | Create a complaint |
| `PATCH` | `/complaints/:id/assign` | Assign a worker and optionally set priority |
| `PATCH` | `/complaints/:id/status` | Update a complaint's status and add notes or resolution proof |
| `PATCH` | `/complaints/:id/upvote` | Upvote a complaint |
| `POST` | `/admin/reset` | Reset the database to sample data (development only) |

The API login route is also a demo: it does not verify OTPs or passwords and is not suitable for production authentication.

## Available frontend scripts

Run these commands from the repository root:

| Command | Description |
| --- | --- |
| `npm start` | Start the React development server |
| `npm test` | Run the Create React App test runner |
| `npm run build` | Create an optimized production build in `build/` |

## License

No license is currently specified for this repository.
