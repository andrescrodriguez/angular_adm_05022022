export function parsearErroresAPI(response:any): string[] {
   const result: string[] = [];
   
   if(response.error){

       if(typeof response.error === 'string'){
           result.push(response.error);
       }
       else if(typeof response.error === 'object'){
        result.push(response.error.title);
       }
       else if(Array.isArray(response.error)){
        response.error.forEach(element => {
            result.push(element.description);
        });
       }
       else{
           const mapaErrores = response.error.errors;
           const entradas = Object.entries(mapaErrores);
           entradas.forEach((arreglo: any[]) => {
               const campo = arreglo[0];
               arreglo[1].forEach(mensajeError => {
                   result.push(campo + ': ' + mensajeError);
               });
           })
       }
   }

   return result;
}