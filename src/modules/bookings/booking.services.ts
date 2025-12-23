import { pool } from "../../config/db";

const createBooking = async (payload: any) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date(s) provided");
    }

    if (end < start) {
        throw new Error("rent_end_date must be the same or after rent_start_date");
    }

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const days =
        Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;

    try {
        const vRes = await pool.query(
            `SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1 FOR UPDATE`,
            [vehicle_id]
        );

        if (vRes.rows.length === 0) {
            throw new Error("Vehicle not found");
        }

        const vehicle = vRes.rows[0];

        if (vehicle.availability_status === "booked") {
            throw new Error("Vehicle currently not available");
        }

        const overlapQuery = ` SELECT 1 FROM bookings WHERE vehicle_id = $1 AND status = 'active' AND ($2::date <= rent_end_date) AND ($3::date >= rent_start_date) LIMIT 1`;

        const overlapRes = await pool.query(overlapQuery, [
            vehicle_id,
            rent_end_date,
            rent_start_date,
        ]);

        if (overlapRes.rows.length > 0) {
            throw new Error("Vehicle already booked for the selected dates");
        }

        const total_price = Number(vehicle.daily_rent_price) * days;

        const insertRes = await pool.query(
            `INSERT INTO bookings (customer_id, vehicle_id, total_price, rent_start_date, rent_end_date, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING id, rent_start_date, rent_end_date, total_price, status`,
            [
                customer_id,
                vehicle_id,
                total_price,
                rent_start_date,
                rent_end_date,
            ]
        );

        await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1 `,
            [vehicle_id]
        );

        await pool.query("COMMIT");

        return {
            id: insertRes.rows[0].id,
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status: "active",
            vehicle: {
                vehicle_name: vehicle.vehicle_name,
                daily_rent_price: vehicle.daily_rent_price,
            },
        };
    } catch (err) {
        await pool.query("ROLLBACK");
        throw err;
    }
};


const getBookings = async () => {
    const result = await pool.query(`

    SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status,
    json_build_object(
    'name',u.name,
    'email',u.email
    ) AS customer,
     json_build_object (
     'vehicle_name', v.vehicle_name,
     'registration_number', v.registration_number)  AS vehicle
  
 FROM bookings b 
  JOIN users u ON b.customer_id =u.id
  JOIN vehicles v ON b.vehicle_id=v.id
 `);

    result.rows = result.rows.map((b) => ({
        ...b,
        total_price: Number(b.total_price),
    }));

    return result;
};

const getSingleBooking = async (customerId: number) => {
    const result = await pool.query(
        `
    SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status,
   
     json_build_object (
     'vehicle_name', v.vehicle_name,
     'registration_number', v.registration_number  , 'type',v.type 
     )  AS vehicle
  
 FROM bookings b 
  JOIN vehicles v ON b.vehicle_id=v.id WHERE b.customer_id=$1
 `,
        [customerId]
    );

    result.rows = result.rows.map((b) => ({
        ...b,
        total_price: Number(b.total_price),
    }));

    return result;
};



export const bookingServices = {
    createBooking,
    getBookings, 
    getSingleBooking
}