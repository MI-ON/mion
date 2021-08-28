import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({})
export default class AlertComponent extends Vue {
  @Prop(String) protected alertMessage!: String;
  @Watch("alertMessage")
  updateAlertMessage() {
    this.alertToggle = true;
    setInterval(() => {
      this.progressValue == 100
        ? (this.progressValue = 0)
        : (this.progressValue += 5);
    }, 50);
  }
  alertToggle: boolean = false;
  progressValue: number = 0;

  onClickCancel(): void {
    this.alertToggle = false;
  }
}
