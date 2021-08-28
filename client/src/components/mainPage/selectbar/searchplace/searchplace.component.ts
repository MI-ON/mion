import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import PlaceItemComponent from "../../placeitem/placeitem.component.vue";

@Component({ components: { PlaceItemComponent } })
export default class SearchPlaceComponent extends Vue {
  @Prop(Object) protected searchResult!: Object;
  @Watch("searchResult")
  updateSearchResult() {}
  keyword: string = "";

  public searchPlaces(e: Event) {
    e.preventDefault();
    this.$emit("searchplace-keyword", this.keyword);
  }
}
