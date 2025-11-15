export type Actor = {
    id: string;
    name: string
};

export const createActor = () => ({ 
    id: String(crypto.randomUUID()),
    name: "" 
});