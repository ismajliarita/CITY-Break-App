// import jwt_decode from 'jwt-decode';

// function isTokenExpired(token) {
//     try {
//         const decoded = jwt_decode(token);
//         if (decoded.exp < Date.now() / 1000) { // Date.now() returns milliseconds since Epoch, so we divide by 1000 to get seconds
//             return true;
//         } else {
//             return false;
//         }
//     } catch (err) {
//         return false;
//     }
// }

// const token = localStorage.getItem('token');
// if (isTokenExpired(token)) {
//     console.log('Token has expired');
// } else {
//     console.log('Token has not expired');
// }