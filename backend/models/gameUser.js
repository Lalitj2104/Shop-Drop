import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import validator from "validator";

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate(value) {
            if (!value) throw new Error(`Name field is required.`);
        },
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        },
    },
    googleId: {
        type: String,
        unique: true,
        required: true,
    },
    imageUrl: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
    },
    chess: {
        Played: { type: Number, default: 0 },
        Wins: { type: Number, default: 0 },
        Losses: { type: Number, default: 0 },
    },
    candyCrush: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    wordle: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    ticTacToe: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    mario: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    breakout: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    tetris: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
        maxLevelReached: { type: Number, default: 0 }
    },
    tzfe: {
        points: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
    },
    total: {
        type: Number,
        default: 0
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

GameSchema.methods.generateAuthToken = async function () {
    try {
        if (this.tokens.length > 1) this.tokens.splice(0, 1);
        const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET);
        this.tokens.push({ token: token });
        return token;
    } catch (e) {
        return e;
    }
};

const Game = new mongoose.model("gamezone-user", GameSchema);

export default Game;
