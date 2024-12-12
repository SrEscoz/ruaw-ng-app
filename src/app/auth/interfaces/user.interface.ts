export interface LoginResponse {
	status: number;
	token: string;
	expiresIn: string;
}

export interface User {
	username: string;
	authorities: string[];
	createdAt: Date;
	expiresAt: Date;
}