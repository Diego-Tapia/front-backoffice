export interface IUser {
	shortName: string;
	lastName: string;
	userName: string;
	dni: number;
	cuil: number;
	pass: string;
	email: string;
	phoneNumber: number;
	rol?: string;
	avatar_url?: string;
	userId?: string;
	createdAt?: Date;
}
