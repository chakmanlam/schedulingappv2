import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener('focus', this.showPicker)
  }

  showPicker(event) {
    event.target.setAttribute('type', 'time')
    event.target.setAttribute('step', '1800')
  }
}
