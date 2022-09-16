export const setStatusStyles = (status: 'Dead' | 'Alive' | 'unknown') => {
    return status === 'Alive'
        ? 'bg-emerald-600 text-white' : status === 'Dead'
            ? 'bg-[#ff7070]' : 'bg-slate-300 text-slate-600';
}