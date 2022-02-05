export function generarNombreDeRuta(valor: string): string {
    if(!valor) return '';
    if(valor.length === 0) return '';
    return valor
        .toLowerCase()
        .trim()
        .split(' ')
        .join('-');
}