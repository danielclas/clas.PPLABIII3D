export class anuncio{

    constructor(obj){
        this.id = obj.id;
        this.titulo = obj.titulo;
        this.transaccion = obj.transaccion;
        this.descripcion = obj.descripcion;
        this.precio = obj.precio;
        this.num_puertas = obj.num_puertas;
        this.num_KMs = obj.num_KMs;
        this.potencia = obj.potencia;
    }
}