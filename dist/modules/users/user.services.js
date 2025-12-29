"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const getUsers = async () => {
    const result = await db_1.pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
};
const getSingleUser = async (id) => {
    const result = await db_1.pool.query(`SELECT id, name, email, phone, role FROM users WHERE id=$1`, [id]);
    return result;
};
const updateSingleUser = async (name, email, phone, role, id) => {
    const result = await db_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);
    delete result.rows[0].password;
    return result;
};
const deleteSingleUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result;
};
exports.userServices = {
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
};
