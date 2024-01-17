import jwt from 'jsonwebtoken';

// Middleware pour autoriser uniquement l'admin
const isAdmin = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé. Rôle insuffisant.' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

// Middleware pour autoriser uniquement l'admin ou l'employé
const isAdminOrEmployed = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if (req.user.role !== 'admin' && req.user.role !== 'employed') {
            return res.status(403).json({ message: 'Accès non autorisé. Rôle insuffisant.' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

// Middleware pour autoriser uniquement l'admin, l'employé ou l'utilisateur avec l'autorisation du token
const isAdminOrEmployedOrAuthorizedUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if (req.user.role === 'admin' || req.user.role === 'employed' || req.user.userId === req.params.userId) {
            return next();
        } else {
            return res.status(403).json({ message: 'Accès non autorisé. Rôle insuffisant.' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

// Nouveau Middleware pour autoriser uniquement l'admin ou l'utilisateur avec l'autorisation du token
const isAdminOrAuthorizedUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if (req.user.role === 'admin' || req.user.userId === req.params.userId) {
            return next();
        } else {
            return res.status(403).json({ message: 'Accès non autorisé. Rôle insuffisant.' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

// Nouveau Middleware pour autoriser uniquement l'admin ou l'utilisateur avec l'autorisation du token
const justVerifiyHeaderTokenAuthorization = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};





export { isAdmin, isAdminOrEmployed, isAdminOrAuthorizedUser, isAdminOrEmployedOrAuthorizedUser ,justVerifiyHeaderTokenAuthorization};
