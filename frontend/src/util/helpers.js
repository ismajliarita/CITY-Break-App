import { jwtDecode as jwt_decode } from 'jwt-decode';

export function isTokenExpired(token) {
  // const token = localStorage.getItem('token');

  if (!token) {
    return true;
  }

    try {
        const decoded = jwt_decode(token);
        if (decoded.exp < Date.now() / 1000) { 
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}


// const token = localStorage.getItem('token');
// if (isTokenExpired(token)) {
//     console.log('Token has expired');
// } else {
//     console.log('Token has not expired');
// }