import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.connectionString}`
})

const initDB = async () => {
    // * USERS Schema
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL 
                CHECK (email ~* '^\\S+@\\S+\\.\\S+$' AND email = LOWER(email)),
            password TEXT NOT NULL 
                CHECK (LENGTH(password) >= 6),
            phone TEXT NOT NULL 
                CHECK (phone ~ '^01[3-9][0-9]{8}$'),
            role VARCHAR(50) NOT NULL 
                CHECK (role IN ('admin', 'customer')) CHECK (role = LOWER(role))
    );
    `);
    // * vehicles Schema
    await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL 
            CHECK (type IN ('car', 'bike', 'van', 'suv')) 
            CHECK (type = LOWER(type)),
        registration_number VARCHAR(150) UNIQUE NOT NULL,
        daily_rent_price INTEGER NOT NULL 
            CHECK (daily_rent_price > 0),
        availability_status VARCHAR(50) NOT NULL 
            CHECK (availability_status IN ('available', 'booked')) 
            CHECK (availability_status = LOWER(availability_status))
);
`);
};


export default initDB;