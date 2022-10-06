import {usersRepository} from "../data-source";

export async function confirmUser(userId: string) {
    const user = await usersRepository.findOne({where:{id:userId}});
    if (!user) {
        throw new Error("User not found");
    }
    user.confirm = true;
    await usersRepository.update({id: user.id}, user);
    return;
}