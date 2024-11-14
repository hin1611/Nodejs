import connection from './connectDB.js'; // Import file connectDB.js

connection.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Lỗi kết nối:', err);
        return;
    }
    console.log('Kết nối thành công:', results);
});
