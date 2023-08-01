import jwt_decode from 'jwt-decode';

export function isTokenExpired(token) {
    try {
        const decoded = jwt_decode(token);

        if (!decoded || !decoded.exp) {
            return true;
        }

        const dateNow = Math.floor(Date.now() / 1000);

        return decoded.exp < dateNow;
    } catch (err) {
        return true;
    }
};