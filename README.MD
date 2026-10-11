# organizeInternet2

## Run

```bash
npm install
npm run dev
```

Client: http://localhost:5173

API: http://localhost:3001

## Database

Postgres comes from `docker-compose.yml`. Create a repo-root `.env` before migrating:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/organize_internet
```

Start the database, generate a migration from `server/src/db/schema.ts`, then apply it:

```bash
docker compose up -d
npm run generate
npm run migrate
```

`generate` writes SQL into `server/drizzle`. `migrate` applies those files. See the [Drizzle migrations docs](https://orm.drizzle.team/docs/migrations), [`drizzle-kit generate`](https://orm.drizzle.team/docs/drizzle-kit-generate), and [`drizzle-kit migrate`](https://orm.drizzle.team/docs/drizzle-kit-migrate).

## Endpoints

- `GET /api/links` — list
- `POST /api/links` — create (`url`, optional `title`)
- `DELETE /api/links/:id` — delete


## Ideas for imporvement
- AI Automatically creates categories
- I generates descriptions, does filtering and validating when whatever is in the link has changed.

