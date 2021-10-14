
export function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

export const setLocalizedLang = (lang) => {
    localStorage.setItem('lang', lang)
}

export const getLocalizedLang = () => {
    let lang = localStorage.getItem('lang')
    return lang ? lang : 'ro'
}