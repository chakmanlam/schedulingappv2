import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "calendar"]

  connect() {
    this.currentDate = new Date()
    this.selectedDate = null
    this.render()
  }

  render() {
    const month = this.currentDate.getMonth()
    const year = this.currentDate.getFullYear()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    let dateHtml = `
      <div class="flex justify-between items-center mb-4">
        <button data-action="click->tailwind-datepicker#previousMonth" class="text-gray-600 hover:text-gray-800">&lt;</button>
        <span class="text-lg font-bold">${this.getMonthName(month)} ${year}</span>
        <button data-action="click->tailwind-datepicker#nextMonth" class="text-gray-600 hover:text-gray-800">&gt;</button>
      </div>
      <div class="grid grid-cols-7 gap-1">
        ${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => `<div class="text-center text-gray-600 text-sm">${day}</div>`).join('')}
    `

    for (let i = 0; i < firstDay; i++) {
      dateHtml += '<div></div>'
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected = this.selectedDate && date.toDateString() === this.selectedDate.toDateString()
      const isToday = date.toDateString() === new Date().toDateString()

      dateHtml += `
        <div
          data-action="click->tailwind-datepicker#selectDate"
          data-date="${date.toISOString()}"
          class="text-center py-1 cursor-pointer hover:bg-blue-100 rounded
            ${isSelected ? 'bg-blue-500 text-white' : ''}
            ${isToday && !isSelected ? 'border border-blue-500' : ''}
          "
        >
          ${day}
        </div>
      `
    }

    dateHtml += '</div>'
    this.calendarTarget.innerHTML = dateHtml
  }

  selectDate(event) {
    this.selectedDate = new Date(event.target.dataset.date)
    this.inputTarget.value = this.formatDate(this.selectedDate)
    this.currentDate = new Date(this.selectedDate)
    this.render()

    // Send a request to the update_calendar action
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // getMonth() is zero-based
    const url = `/bookings/update_calendar?year=${year}&month=${month}`;

    console.log(`Fetching calendar for ${year}-${month}`)
    fetch(url, {
      headers: {
        Accept: "text/vnd.turbo-stream.html",
      },
    })
    .then(response => response.text())
    .then(html => {
      console.log("Received HTML:", html)
      document.getElementById('meeting-calendar').innerHTML = html
    })
    .catch(error => console.error("Error loading month view:", error));
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    this.render()
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    this.render()
  }

  getMonthName(month) {
    return new Date(0, month).toLocaleString('default', { month: 'long' })
  }

  formatDate(date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
}