<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1>
                Post an Item    
                </h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <form @submit.prevent="onPostItem">
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            v-model="title"
                            required
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field
                            name="Price"
                            label="Price"
                            id="price"
                            required
                            v-model="price">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field
                            name="imageUrl"
                            label="Image URL"
                            id="image-url"
                            required
                            v-model="imageUrl">                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <img :src="imageUrl" height="200px">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex x12 sm6 offset-sm3>
                            <v-text-field
                            name="description"
                            label="Description"
                            id="desc"
                            required
                            multi-line
                            v-model="desc">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                            class="secondary" 
                            :disabled="!formIsValid"
                            type="submit">
                                Post Item
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        price: '',
        imageUrl: '',
        desc: '',
        date: new Date(),
        time: new Date()
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.price !== '' &&
        this.imageUrl !== '' &&
        this.desc !== ''
      },
      submitDate () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onPostItem () {
        if (!this.formIsValid) {
          return
        }
        const itemData = {
          title: this.title,
          price: this.price,
          imageUrl: this.imageUrl,
          desc: this.desc,
          date: new Date(),
          id: '3'
        }
        this.$store.dispatch('postItem', itemData)
        this.$router.push('/item/search')
      }
    }
  }
</script>
