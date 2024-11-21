import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["monthView", "weekView", "monthButton", "weekButton", "previous", "next", "event"]

  connect() {
    this.currentView = new URLSearchParams(window.location.search).get('view') || 'month'
    this.selectedDate = new URLSearchParams(window.location.search).get('date') || new Date().toISOString().split('T')[0]
    this.showView(this.currentView)
  }

  showMonthView() {
    this.showView('month')
  }

  showWeekView() {
    this.showView('week')
  }

  showView(view) {
    this.currentView = view
    if (view === 'month') {
      this.monthViewTarget.classList.remove("hidden")
      this.weekViewTarget.classList.add("hidden")
      this.monthButtonTarget.classList.add("text-blue-600", "border-blue-600")
      this.monthButtonTarget.classList.remove("text-gray-600", "border-transparent")
      this.weekButtonTarget.classList.add("text-gray-600", "border-transparent")
      this.weekButtonTarget.classList.remove("text-blue-600", "border-blue-600")
    } else {
      this.monthViewTarget.classList.add("hidden")
      this.weekViewTarget.classList.remove("hidden")
      this.monthButtonTarget.classList.remove("text-blue-600", "border-blue-600")
      this.monthButtonTarget.classList.add("text-gray-600", "border-transparent")
      this.weekButtonTarget.classList.remove("text-gray-600", "border-transparent")
      this.weekButtonTarget.classList.add("text-blue-600", "border-blue-600")
    }
  }

  navigateKeepingView(event) {
    event.preventDefault()
    let url = new URL(event.currentTarget.href)
    url.searchParams.set('view', this.currentView)
    window.location = url.toString()
  }

  handleSlotClick(event) {
    const date = event.currentTarget.dataset.date
    const booked = event.currentTarget.dataset.booked === 'true'

    const [datePart, timePart] = date.split(' ')
    const [year, month, day] = datePart.split('-')
    const [hour, minute] = timePart ? timePart.split(':') : ['00', '00']


    const formattedDate = `${year}-${month}-${day}`
    const formattedTime = `${hour}:${minute}`
    console.log(formattedDate, formattedTime)

    if (booked) {
      console.log("booked")
    } else {
      const url = `/bookings/new?date=${formattedDate}&time=${formattedTime}`
      window.location.href = url
    }
  }

  updateCalendar() {
    let selectedDate = event.detail
    let view = this.currentView

    console.log(`Selected date: ${selectedDate}`)
    console.log(`Current view: ${view}`)

    if (this.currentView === 'month') {
      this.loadMonthView(this.selectedDate)
    } else {
      this.loadWeekView(this.selectedDate)
    }
  }

  loadMonthView(selectedDate) {
    console.log(`Load month view for date: ${selectedDate}`)
    // Example AJAX request to fetch month view data for the selected date
    fetch(`/calendar/month?date=${selectedDate}`)
      .then(response => response.json())
      .then(data => {
        // Update the month view with the fetched data
        console.log(`Month view data for ${selectedDate}:`, data)
        // Update the DOM with the new data
        this.monthViewTarget.innerHTML = data.html
      })
      .catch(error => console.error('Error loading month view:', error))
  }

}