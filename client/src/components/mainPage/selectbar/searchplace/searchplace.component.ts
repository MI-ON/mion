import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import PlaceItemComponent from '../../placeitem/placeitem.component.vue';

@Component({ components: { PlaceItemComponent } })
export default class SearchPlaceComponent extends Vue {
  @Prop({ default: () => ({}) }) protected searchResult!: Record<string, unknown>;
  @Watch('searchResult')
  updateSearchResult(): void {}

  keyword: string = '';

  public searchPlaces(e: Event): void {
    e.preventDefault();
    this.$emit('searchplace-keyword', this.keyword);
  }
}
