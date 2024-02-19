<template>
    <div>
      <div v-if="loading">Chargement...</div>
  
      <div v-else>
        <div v-for="character in characters.results" :key="character.name">
          {{ character.name }}
        </div>
  
        <div>
          <button @click="previousPage" :disabled="currentPage === 1">Page précédente</button>
          <span>Page {{ currentPage }} sur {{ characters.info.pages }}</span>
          <button @click="nextPage" :disabled="currentPage === characters.info.pages">Page suivante</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive, watch } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import { gql } from 'graphql-tag';
  
  const CHARACTERS_QUERY = gql`
    query Characters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          count
          pages
          next
          prev
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
  
      const variables = reactive({
        page: currentPage.value,
        filter: { name: 'rick' }, // Ajoutez d'autres filtres selon vos besoins
      });
  
      const { result, loading } = useQuery(CHARACTERS_QUERY, variables);
  
      const characters = ref(result.value?.characters || {});
  
      watch(result, (newResult) => {
        characters.value = newResult.characters;
      });
  
      const nextPage = () => {
        if (characters.value.info.next) {
          currentPage.value += 1;
          variables.page = currentPage.value;
        }
      };
  
      const previousPage = () => {
        if (characters.value.info.prev) {
          currentPage.value -= 1;
          variables.page = currentPage.value;
        }
      };
  
      return { characters, loading, currentPage, nextPage, previousPage };
    },
  });
  </script>
  