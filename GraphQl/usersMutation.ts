import {
    usersRepository
} from "../data-source";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import {User} from "../entity/User";
import {QueryFailedError} from "typeorm";


export const register = async ({username, password}) => {
    username = username.toLowerCase();
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        await usersRepository.save(
            {
                username,
                password: hashPassword,
                role: "Client"
            }
        )
        return "User created successfully!"
    } catch (e) {
        if (e instanceof QueryFailedError && e.driverError.code === "23505")
            throw new Error(`The username is taken`);
        throw new Error("User failed to be created...");
    }
}

export const login = async ({username, password}) => {
    const TTL = parseInt(process.env.TTL);
    username = username.toLowerCase();
    const user: User = await usersRepository.findOneBy({username});
    if (!user) {
        throw new Error("Username / password is incorrect!");
    }
    const isAuthorities: boolean = await bcrypt.compare(password, user.password)
    if (isAuthorities) {
        const token: string = jsonwebtoken.sign({user}, process.env.JWT_SECRET, {
            expiresIn: TTL
        })
        return (token);
    }
    throw new Error("Username / password is incorrect!");
}

export const changeRole = async ({username, reqRole}) => {
    username = username.toLowerCase();
    const user: User = await usersRepository.findOneBy({username});
    if (!user) {
        throw new Error(`There is no user with username: ${username}`);
    }
    user.role = reqRole;
    await usersRepository.update({username: user.username}, user);
    return user;
}