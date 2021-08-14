<template>
  <v-container>
    <v-layout row>
      <v-flex id="placeInfoContainer" colum>
        <v-flex>
          {{ searchResult.place_name }}
        </v-flex>
        <v-flex>
          {{ searchResult.address_name }}
          {{ searchResult.road_address_name }}
        </v-flex>
        <v-flex>
          {{ searchResult.phone }}
        </v-flex>
      </v-flex>
      <v-flex id="voteButtonContainer" colum>
        <v-btn fab
          ><v-img
            src="../../../assets/vote-icon.png"
            max-height="80"
            max-width="80"
        /></v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PlaceItemComponent extends Vue {
  @Prop(String) protected searchResult!: string;
}
</script>
