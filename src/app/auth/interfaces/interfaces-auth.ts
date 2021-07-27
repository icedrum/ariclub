
export interface authresponse {
    ok: boolean,
    codusu?: number,
    nombre?: string,
    nivelusu?: number,
    token?: string,
    msg?: string 

}   
export interface Usuario{
    codusu: number,
    nombre: string,
    token: string
}