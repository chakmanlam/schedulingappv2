import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["monthView", "weekView", "monthButton", "weekButton", "previous", "next"]

  connect() {
    this.currentView = new URLSearchParams(window.location.search).get('view') || 'month'
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
}