import { IUserId } from "./user-id.interface";

export interface IUserProfile {
	id: string;
	username: string;
	shortName: string;
	lastName: string;
	dni: number;
	cuil: number;
	password: string;
	email: string;
	phoneNumber: number;
	userId: IUserId;
	rol: string;
	avatarUrl: string;
	clientId: string;
	createdAt: Date;
	updatedAt: Date;
}

