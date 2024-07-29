import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["monthView", "weekView", "monthButton", "weekButton"]

  connect() {
    this.showMonthView()
  }

  showMonthView() {
    this.monthViewTarget.classList.remove("hidden")
    this.weekViewTarget.classList.add("hidden")
    this.monthButtonTarget.classList.add("text-blue-600", "border-blue-600")
    this.monthButtonTarget.classList.remove("text-gray-600", "border-transparent")
    this.weekButtonTarget.classList.add("text-gray-600", "border-transparent")
    this.weekButtonTarget.classList.remove("text-blue-600", "border-blue-600")
  }

  showWeekView() {
    this.monthViewTarget.classList.add("hidden")
    this.weekViewTarget.classList.remove("hidden")
    this.monthButtonTarget.classList.add("text-gray-600", "border-transparent")
    this.monthButtonTarget.classList.remove("text-blue-600", "border-blue-600")
    this.weekButtonTarget.classList.add("text-blue-600", "border-blue-600")
    this.weekButtonTarget.classList.remove("text-gray-600", "border-transparent")
  }
}