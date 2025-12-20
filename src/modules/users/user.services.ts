import { pool } from "../../config/db"
import bcrypt from "bcryptjs"

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;
    const hashedPass = await bcrypt.hash(password as string, 10)
    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
}

const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result;
}

// const updateSingleUser = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string, id: string) => {
//     const result = await pool.query(
//         "UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *",
//         [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]
//     );
//     return result;
// }

// const deleteSingleUser = async (id: string) => {
//     const result = await pool.query(
//         "DELETE FROM vehicles WHERE id=$1 RETURNING *",
//         [id]
//     );
//     return result;
// }


export const userServices = {
    createUser,
    getUsers,
    getSingleUser
}