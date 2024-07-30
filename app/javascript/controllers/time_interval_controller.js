import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["hiddenInput", "hour", "minute", "ampm"]

  connect() {
    this.updateHiddenInput()
    this.hourTarget.addEventListener('change', this.updateHiddenInput.bind(this))
    this.minuteTarget.addEventListener('change', this.updateHiddenInput.bind(this))
    this.ampmTarget.addEventListener('change', this.updateHiddenInput.bind(this))
  }

  updateHiddenInput() {
    const hour = parseInt(this.hourTarget.value)
    const minute = parseInt(this.minuteTarget.value)
    const ampm = this.ampmTarget.value

    let hour24 = hour
    if (ampm === "PM" && hour !== 12) {
      hour24 = hour + 12
    } else if (ampm === "AM" && hour === 12) {
      hour24 = 0
    }

    const timeString = `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    this.hiddenInputTarget.value = timeString
  }
}