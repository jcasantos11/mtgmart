<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Item Details
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                        <v-flex x12>
                            <v-card-text>
                                <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="editedTitle"
                                required
                                >
                                </v-text-field>
                                <v-text-field
                                name="Price"
                                label="Price"
                                id="price"
                                required
                                suffix="Php"
                                v-model.lazy="editedPrice"
                                v-money="money">
                                </v-text-field>
                                <v-text-field
                                name="description"
                                label="Description"
                                id="desc"
                                required
                                multi-line
                                v-model="editedDesc">
                                </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn 
                            flat 
                            class="blue--text darken-1" 
                            @click="editDialog = false">Close</v-btn>
                            <v-btn 
                            flat 
                            class="blue--text darken-1" 
                            @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
  import {VMoney} from 'v-money'

  export default {
    props: ['item'],
    data () {
      return {
        money: {
          decimal: '.',
          thousands: ',',
          precision: 2,
          masked: false
        },
        editDialog: false,
        editedTitle: this.item.title,
        editedDesc: this.item.desc,
        editedPrice: this.item.price
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDesc.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateItemData', {
          id: this.item.id,
          title: this.editedTitle,
          desc: this.editedDesc,
          price: this.editedPrice
        })
      }
    },
    directives: {money: VMoney}
  }
</script>
