import { pool } from "../../config/db"

const getUsers = async () => {
    const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result;
};


export const userServices = {
    getUsers,
    getSingleUser
}