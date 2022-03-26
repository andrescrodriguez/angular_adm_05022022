export function generarNombreDeRuta(valor: string): string {
    if(!valor) return '';
    if(valor.length === 0) return '';

        var specialChars = "!@#$^&%*()+=-[]\/{}|:<>¿?,."; 
        for (var i = 0; i < specialChars.length; i++) 
        { 
            valor = valor.replace(new RegExp("\\" + specialChars[i], 'gi'), ''); 
        }

        valor = valor
            .toLowerCase()
            .trim()
            .split(' ')
            .join('-');

        while(valor.includes('--')){ valor = valor.replace('--','-') }

    return valor;
}