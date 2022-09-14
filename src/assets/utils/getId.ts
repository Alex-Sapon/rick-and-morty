export const getId = (url: string) => {
    if (url) {
        const id = Number(url.replace(/\D/gi, ''));
        if (id) {
            return id;
        }
        return null;

    }

    return null;
}