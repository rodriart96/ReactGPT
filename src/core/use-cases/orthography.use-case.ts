import type { OrthographyCheckInterface } from "../../interfaces/orthographyCheck.interface";

export const orthographyUseCase = async (prompt: string) => {
 try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt})
    })

    if(!response.ok) throw new Error('message: No se pudo realizar la correcion.');
    const data = await response.json() as OrthographyCheckInterface;
    return{
        ok: true,
        ...data,
    }
    
 } catch (error) {
    return{
        ok: false,
        userScore:0,
        errors: [],
        message: "No se pudo realizar la correcion."
    }
 }
}