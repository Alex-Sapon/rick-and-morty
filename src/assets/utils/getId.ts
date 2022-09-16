export const getId = (url: string) => {
    if (url) {
        const id = Number(url.replace(/\D/gi, ''));
        if (id) {
            return String(id);
        }
        return '';
    }

    return '';
}