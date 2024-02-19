<template>
    <div>
        <h1>{{ data?.hello }}</h1>
    </div>
</template>
  
<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const HELLO_QUERY = gql`
query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
}

`;

export default {
    setup() {
        const { data } = useQuery(HELLO_QUERY);
        return { data };
    },
};
</script>
  