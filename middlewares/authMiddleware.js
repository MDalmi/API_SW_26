const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
    
    const authHeader = req.headers["authorization"];
    
    // O formato esperado é: "Bearer <token>" 
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            sucesso: false,
            error: "Acesso negado. Token de autenticação não fornecido.",
        });
    }

    // 3. Verifica a assinatura e a expiração do token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
           
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    sucesso: false,
                    error: "Token expirado. Realize o login novamente.",
                });
            }
            // 4. Token inválido retorna 403 (Forbidden) 
            return res.status(403).json({
                sucesso: false,
                error: "Token inválido.",
            });
        }

        // 5. Token válido: anexa o payload (id e role) ao req.user 
        req.user = decoded;
        next(); 
    }); 
}



function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        
        const userRole = req.user && (req.user.role || req.user.flag_perm);
        if (!req.user || !userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({
                sucesso: false,
                error: "Acesso negado. Permissão insuficiente para esta operação.",
            });
        }
        next(); 
    };
}

module.exports = { authenticateToken, authorizeRoles };