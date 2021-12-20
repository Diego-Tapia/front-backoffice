export interface IActivo {
	description: string;
	shortName: string;
	symbol: string;
	initialAmount: number;
	price: number;
	money: string;
	status: string;
	id: string;
	emited: boolean;
	transferable: boolean;
	bcItemId?: number;
	operations?: string[];
	applicabilities?: string[];
	clientId: string;
	validFrom?: Date;
	validTo?: Date;
	observations?: string;
	createdAt: Date;
	updatedAt: Date;
}
