import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.connectionString}`
})

const initDB = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL
        CHECK (type IN ('car', 'bike', 'van', 'suv'))
        CHECK (type = LOWER(type)),
    registration_number VARCHAR(150) UNIQUE NOT NULL,
    daily_rent_price NUMERIC(10,2) NOT NULL
        CHECK (daily_rent_price > 0),
    availability_status VARCHAR(50) NOT NULL
        CHECK (availability_status IN ('available', 'booked'))
        CHECK (availability_status = LOWER(availability_status))
);
`);
};


export default initDB;