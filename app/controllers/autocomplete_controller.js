import { Controller } from "@hotwired/stimulus"
import debounce from 'lodash/debounce'

export default class extends Controller {
  static targets = ["input", "results"]

  connect() {
    this.inputTarget.addEventListener('input', debounce(this.search.bind(this), 300))
  }

  search() {
    const query = this.inputTarget.value
    if (query.length < 2) {
      this.resultsTarget.innerHTML = ""
      return
    }

    fetch(`/clients/autocomplete?query=${query}`)
      .then(response => response.json())
      .then(data => {
        this.resultsTarget.innerHTML = data.map(client => `<li>${client}</li>`).join('')
      })
  }
}
