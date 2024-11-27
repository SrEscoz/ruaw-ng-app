export interface Spell {
	id: number;
	name: string;
	magicSchool: string;
	level: number;
	description: string;
	castingTime: string;
	range: string;
	components: string;
	materials: string;
	duration: string;
	ritual: boolean;
	concentration: boolean;
	highLevelsDescription: string;
	source: string;
	classes: string[];
}

export interface SpellResponse {
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
	content: Spell[];
}


export interface SpellFilters {
	pageNumber: number;
	pageSize: number;
	school?: string;
	class?: string;
	name?: string;
	level?: number;
}