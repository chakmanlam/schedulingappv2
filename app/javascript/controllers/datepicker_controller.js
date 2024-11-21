import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    if (typeof flatpickr === 'undefined') {
      console.error("Flatpickr is not loaded")
    } else {
      console.log("Flatpickr is loaded")
      flatpickr(this.element, {
        inline: true,
        onChange: this.onChange.bind(this),
      })
    }
  }
  onChange(selectedDates) {
    const selectedDate = selectedDates[0]
    console.log(`Date selected: ${selectedDate}`)

    // Create a URL with the selected date as a parameter
    const url = new URL(window.location.href)
    url.searchParams.set('date', selectedDate.toISOString().split('T')[0]) // Only the date part

    // Navigate to the new URL
    window.location = url.toString()
  }
}
