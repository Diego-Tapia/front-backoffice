export interface ITransaccion {
    hash: string;
    amount: number;
    notes: string;
    token: string;
    userId: string;
    transactionType: string; 
    walletFrom: string;
    walletTo: string;
}