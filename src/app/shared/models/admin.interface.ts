import { IUserId } from "./user-id.interface";

export interface IAdmin {
	id: string;
	username: string;
	shortName: string;
	lastName: string;
	dni: number;
	cuil: number;
	password: string;
	email: string;
	phoneNumber: number;
	rol: string;
	clientId: string;
	avatarUrl: string;
	createdAt: Date;
	updatedAt: Date;
}
