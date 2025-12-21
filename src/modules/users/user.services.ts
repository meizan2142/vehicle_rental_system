import { pool } from "../../config/db"

const getUsers = async () => {
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users WHERE id=$1`, [id]);
    return result;
};

const updateSingleUser = async (name: string, email: string, phone: string, role: string, id: string) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);
    delete result.rows[0].password;
    return result;
}

export const userServices = {
    getUsers,
    getSingleUser,
    updateSingleUser
}