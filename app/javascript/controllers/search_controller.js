import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "input", "results" ]

  connect() {
    this.timeout = null
  }

  search() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      fetch(`/clients/search?query=${this.inputTarget.value}`, {
        headers: { "Accept": "text/vnd.turbo-stream.html" }
      })
      .then(response => response.text())
      .then(html => {
        this.resultsTarget.innerHTML = html
        this.resultsTarget.classList.remove('hidden')
      })
    }, 300)
  }

  hideResults() {
    this.resultsTarget.classList.add('hidden')
  }
}
