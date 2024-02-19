<template>
	<div>
		<h1>Personnages de Rick and Morty</h1>
		<ul>
			<li v-for="character in characters" :key="character.id" @click="loadCharacterDetails(character.id)">
				{{ character.name }}
			</li>
		</ul>

		<div v-if="selectedCharacter">
			<h2>Details for {{ selectedCharacter.name }}</h2>
			<p>Status: {{ selectedCharacter.status }}</p>
			<p>Species: {{ selectedCharacter.species }}</p>
			<p>Type: {{ selectedCharacter.type }}</p>
		</div>

		<div>
			<button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1 || loading">
				Précédent
			</button>
			<span>Page {{ currentPage }} of {{ totalPages }}</span>
			<button @click="loadPage(currentPage + 1)" :disabled="currentPage === totalPages || loading">
				Suivant
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { CharactersQueryResult } from '../models/CharactersQueryResult';
import { Character } from '../models/Character';

const GET_CHARACTERS = gql`
	query($page: Int) {
		characters(page: $page) {

			info {
				count
				pages
			}

			results {
				name,
				id,
				status,
				species,
				type ,
				__typename
			}
		}
	}
`;

export default defineComponent({
	setup() {
		const currentPage = ref(1);
		const { result, loading, refetch } = useQuery<CharactersQueryResult>(GET_CHARACTERS, { page: currentPage });

		const characters = ref(result.value?.characters.results || []);
		const totalPages = ref(result.value?.characters.info.pages || 1);
		const selectedCharacter = ref<Character | null>(null);

		watchEffect(() => {
			if (result.value && result.value.characters) {
				characters.value = result.value.characters.results;
				totalPages.value = result.value.characters.info.pages;
			}
		});

		const loadPage = async (page: number) => {
			if (page >= 1 && page <= totalPages.value) {
				currentPage.value = page;
				const newResult = await refetch({ page });

				if (newResult && newResult.data && newResult.data.characters) {
					characters.value = newResult.data.characters.results;
				}

				if (newResult && newResult.data && newResult.data.characters) {
					totalPages.value = newResult.data.characters.info.pages;
				}
			}
		};

		const loadCharacterDetails = async (id: number) => {
				const { data } = await refetch({ id }) as { data: CharactersQueryResult };
				if (data && data.characters) {
					const foundCharacter = data.characters.results.find(x => x.id === id);
					selectedCharacter.value = foundCharacter || null;
				} else {
					selectedCharacter.value = null; 
			};
		};

		return {
			characters,
			currentPage,
			totalPages,
			loadPage,
			loading,
			selectedCharacter,
			loadCharacterDetails,
		};
	},
});
</script>

<style>
ul {
	list-style-type: none;
	cursor: pointer;
}
</style>
