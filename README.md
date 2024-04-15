# Hyperloop

Team project for the course "Databases II" at the Warsaw University of Technology.

## Pre-requisites

- Node.js
- Yarn (or npm)
- PostgreSQL (or Docker)
- Docker w/ Docker Compose (optional)

## Getting started locally

1. Clone the repository
2. Run `docker compose up` to start the PostgreSQL database
3. Go to the `src` directory and run `yarn` (or `npm install`)
4. Run `npx prisma push` to create the database schema
5. Run `npx prisma generate` to generate the Prisma client
6. Run `yarn run dev` (or `npm run dev`) to start the development server
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Working with In-Docker PostgreSQL

1. Run `docker compose up` to start the PostgreSQL database
2. Connect to the database using the following credentials:
   - Host: `localhost`
   - Port: `5432`
    - User: `johndoe`
    - Password: `randompassword`
    - Database: `hyperloop`

    For more information, check the `docker-compose.yml` file.

## Useful links

- [React documentation](https://reactjs.org/docs/getting-started.html) to work with React
- [Next.js documentation](https://nextjs.org/docs/getting-started) to work with framework, define routes and business logic
- [Tailwind CSS documentation](https://tailwindcss.com/docs) to style the application
- [Prisma documentation](https://www.prisma.io/docs/) to work with the database
