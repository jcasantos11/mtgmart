<template>
    <v-container>
        <v-layout row wrap v-for="item in items" :key="item.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="info" >
                    <v-container fluid secondary>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                :src="item.imageUrl"
                                height="130px">
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title dark>
                                    <div>
                                        <h4 class="white--text mb-0">{{ item.title }}</h4>
                                        <h4 class="white--text mb-0">{{ item.price + ' Php' }}</h4>
                                        <div class="white--text">Posted on {{ item.date | date }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn 
                                    flat
                                    dark
                                    :to="'/item/' + item.id">
                                        <v-icon left dark>arrow_forward</v-icon>
                                        View Item
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.getters.loadedItems
    }
  }
}
</script>
