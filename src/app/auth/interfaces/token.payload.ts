export interface JwtPayload {
	sub: string;
	authorities: { authority: string }[];
	iat: number;
	exp: number;
}