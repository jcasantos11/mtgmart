<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                <v-btn
                large 
                router
                to='/item/search'
                class="info">Search Items</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
                <v-btn
                large 
                router
                to='/item/add'
                class="info">Post Item</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
