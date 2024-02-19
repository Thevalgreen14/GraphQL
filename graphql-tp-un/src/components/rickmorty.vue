<template>
    <div>
      <h1>Personnages de Rick and Morty</h1>
      <ul>
        <li v-for="character in characters" :key="character.id">
          {{ character.name }}
        </li>
      </ul>
      <div>
        <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">
          Précédent
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="loadPage(currentPage + 1)" :disabled="currentPage === totalPages">
          Suivant
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  
  const GET_CHARACTERS = gql`
    query($page: Int) {
        characters(page: $page) {
            info {
            count
            }
            results {
            name
            }
        }
    }
  `;
  
  export default defineComponent({
    setup() {
      const currentPage = ref(1);
      const { result } = useQuery(GET_CHARACTERS, { page: currentPage });
  
      const characters = ref(result.value?.data.characters.results || []);
      const totalPages = ref(result.value?.data.characters.info.pages || 1);
  
      const loadPage = async (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
          currentPage.value = page;
          const newResult = await result.refetch({ page });
          characters.value = newResult.data.characters.results;
          totalPages.value = newResult.data.characters.info.pages;
        }
      };
  
      return {
        characters,
        currentPage,
        totalPages,
        loadPage,
      };
    },
  });
  </script>