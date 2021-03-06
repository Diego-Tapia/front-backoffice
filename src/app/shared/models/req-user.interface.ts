export interface IReqUser {
	shortName: string;
	lastName: string;
	username: string;
	dni: number;
	cuil: number;
	password: string;
	email: string;
	phoneNumber: number;
	customId: string;
	clientId: string;
	rol: string;
	avatarUrl: string;
	createdAt: Date;
	id: string;
}

export interface IUserStatus {
	status: string
}