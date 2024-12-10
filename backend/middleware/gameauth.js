import jwt from "jsonwebtoken"
import Game from "../models/gameUser.js";

export const gameAuth= async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(":")[1];

        if (!token)
            return res
                .status(403)
                .json({
                    Error: "Authorization Revoked . Please provide valid auth-headers",
                });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(403).json({ Error: "Token Error" });

        const user = await Game.findOne(
            { email: decoded.email },
            { _id: 0, password: 0, tokens: 0 }
        );
        // console.log(doctor)
        req.email = user.email;
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(403)
            .json({
                Error: "Authorization Revoked . Please provide valid auth-headers",
            });
    }
};