import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["monthView", "weekView", "monthButton", "weekButton", "previous", "next"]

  connect() {
    if (this.leftTarget contain) {

    } else {
      this.showMonthView()
    }
  }

  showMonthView() {
    this.monthViewTarget.classList.remove("hidden")
    this.weekViewTarget.classList.add("hidden")
    this.monthButtonTarget.classList.add("text-blue-600", "border-blue-600")
    this.monthButtonTarget.classList.remove("text-gray-600", "border-transparent")
    this.weekButtonTarget.classList.add("text-gray-600", "border-transparent")
    this.weekButtonTarget.classList.remove("text-blue-600", "border-blue-600")

    let leftUrl = this.leftTarget.href
    this.leftTarget.href = this.removeSpecificQueryParam(leftUrl, "view=weeks")
  }

  showWeekView() {
    this.monthViewTarget.classList.add("hidden")
    this.weekViewTarget.classList.remove("hidden")
    this.monthButtonTarget.classList.add("text-gray-600", "border-transparent")
    this.monthButtonTarget.classList.remove("text-blue-600", "border-blue-600")
    this.weekButtonTarget.classList.add("text-blue-600", "border-blue-600")
    this.weekButtonTarget.classList.remove("text-gray-600", "border-transparent")
    let leftUrl = this.leftTarget.href
    this.removeSpecificQueryParam(leftUrl, "view=weeks")
  }

  removeSpecificQueryParam(url, param) {
    const suffix = `&${param}`;
    if (url.endsWith(suffix)) {
      return url.slice(0, -suffix.length);
    }
    return url;
  }



}