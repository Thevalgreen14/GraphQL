import { PageInfo } from './PageInfo';
import { Character } from './Character';

export interface CharactersQueryResult {
	characters: {
		info: PageInfo;
		results: Character[];
		__typename: string;
	};
}