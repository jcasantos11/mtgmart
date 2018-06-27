<template>
    <v-container>
        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                indeterminate
                class="secondary--text"
                :width="7"
                :size="70"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card>
                    <v-card-title>
                        <h3 class="primary--text">{{ item.title }}</h3>
                        <v-spacer></v-spacer>
                        <h4 class="info--text"> {{ item.price + ' Php' }}</h4>
                        <template v-if="userIsCreator">
                            <edit-diag :item="item"></edit-diag>
                        </template>
                    </v-card-title>
                    <v-card-media
                    :src="item.imageUrl"
                    height="300px"
                    >
                    </v-card-media>
                    <v-card-text>
                        <div class="info--text">Posted on {{ item.date | date }}</div>
                        <p>{{ item.desc }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn primary>Buy This!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
export default {
  props: ['id'],
  computed: {
    item () {
      return this.$store.getters.loadedItem(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.item.user
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
    .limited {
        height: 300px;
        overflow: hidden;
        display: block;
    }
</style>
