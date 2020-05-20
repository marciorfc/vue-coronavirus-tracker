export function formatDate(data) {
    const [, mes, dia] = data.split('-');
    return `${dia}/${mes}`;
}