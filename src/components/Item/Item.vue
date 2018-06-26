<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card>
                    <v-card-title>
                        <h3 class="primary--text">{{ item.title }}</h3>
                        <v-spacer></v-spacer>
                        <h4 class="info--text"> {{ item.price + ' Php' }}</h4>
                    </v-card-title>
                    <v-card-media
                    :src="item.imageUrl"
                    height="300px">
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
    }
  }
}
</script>

<style>

</style>
