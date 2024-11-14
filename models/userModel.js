import connection from '../configs/connectDB.js';

const getAllUsers = async () => {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const addUser = async (user) => {
    const { username, password, fullname, address, sex, email } = user;
    await connection.query(
        'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)',
        [username, password, fullname, address, sex, email]
    );
};

const updateUser = async (id, user) => {
    const { username, password, fullname, address, sex, email } = user;
    await connection.query(
        'UPDATE users SET username = ?, password = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?',
        [username, password, fullname, address, sex, email, id]
    );
};

const deleteUser = async (id) => {
    await connection.query('DELETE FROM users WHERE id = ?', [id]);
};

export { getAllUsers, getUserById, addUser, updateUser, deleteUser };
