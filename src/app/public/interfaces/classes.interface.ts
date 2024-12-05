export interface MinimalClass {
	id: number;
	name: string;
	simpleDescription: string;
}


export interface CompleteClass {
	id: number;
	name: string;
	description: string;
	spells: ClassSpell[];
	levels: Level[];
}

export interface Level {
	level: number;
	proficiencyBonus: number;
	knownCantrips: number;
	features: null;
	spellSlots: { [key: string]: string };
}

export interface ClassSpell {
	id: number;
	name: string;
	level: number;
}