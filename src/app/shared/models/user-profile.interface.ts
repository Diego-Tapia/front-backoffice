import { IUserId } from "./user-id.interface";

export interface IUserProfile {
	id: string;
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
	createdAt: Date;
}
