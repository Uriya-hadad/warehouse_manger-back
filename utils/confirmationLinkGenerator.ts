
export function generateConfirmationLink(url, userId) {
    return `${url}/user/confirm/${userId}`;
}