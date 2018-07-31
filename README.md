# Menus
A scalable backend for the menus module on an online restaurant reservation application. The module retrieves items and their respective descriptions, dietary information, and other details for a given restaurant.

## Related Projects
- https://github.com/greyscale-hyperdrive/overviews-logan
- https://github.com/greyscale-hyperdrive/datatable-reservations
- https://github.com/greyscale-hyperdrive/reviews_tonaR

## Usage
1. Clone the repository.
2. Install dependencies by running the following steps from within the root directory.
```sh
npm install
npm run build
npm start
```
3. Create a config.js file based on the example to connect to PostgreSQL.
4. Start PostgreSQL if it is not already running.
5. Generate the data and seed the database by running the commands below.
- Generate the data
```sh
npm run pg-generate
```
- Generate the schema
```sh
npm run pg-schema
```
- Seed the database
```sh
npm run pg-seed1 && npm run pg-seed2
```
- Add foreign keys
```sh
npm run pg-keys
```
- Add indexes
```sh
npm run pg-index
```
