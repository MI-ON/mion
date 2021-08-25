import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class VotedPlaceItemComponent extends Vue {
  @Prop(Object) protected votedPlaceData!: String;
  @Watch("votedPlaceData")
  updateMessage() {
    console.log("votedplaceitem에서 변경 감지");
    console.log(this.votedPlaceData);
  }
}
