import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  static targets = ["input", "results"];

  connect() {
    console.log("Search controller connected");
  }

  search() {
    console.log("Search method triggered");
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.performSearch();
      this.showResults();
    }, 300); // debounce to avoid too many requests
  }

  performSearch() {
    const query = this.inputTarget.value.trim();
    console.log("Performing search with query:", query);

    if (query === "") {
      console.log("Query is empty, clearing results");
      this.resultsTarget.innerHTML = ""; // Clear results if query is empty
      return;
    }

    fetch(`/clients/search?query=${query}`, {
      headers: {
        Accept: "text/vnd.turbo-stream.html",
      },
    })
      .then(response => response.text())
      .then(html => {
        if (!this.hasResultsTarget) {
          console.error("Missing target element 'results' for 'search' controller");
          return;
        }
        console.log("Received response:", html);
        Turbo.renderStreamMessage(html);
      })
      .catch(error => console.error("Error fetching search results:", error));
  }

  hideResults() {
    if (!this.element.contains(event.target)) {
      this.resultsTarget.classList.add("hidden");
    }
  }

  showResults() {
    this.resultsTarget.classList.remove("hidden");
  }

}