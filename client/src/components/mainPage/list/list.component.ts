import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ListComponent extends Vue {
  zoomIn(): void {
    console.log('zoom in');
  }
}
