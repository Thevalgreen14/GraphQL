export interface Character {
	name: string;
	id:number;
	__typename: string;
	status : string;
	species : string;
	type : string;
	location:
	{
		name: string,
	};
	origin:
	{
		name: string,
	};
	image: string;
}