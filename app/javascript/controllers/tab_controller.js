import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab","panel"]

  connect() {
    this.showActiveTab()
  }

  click() {
    event.preventDefault()

    // Remove active class from all tabs and add hidden class to all panels
    this.tabTargets.forEach(tab => tab.classList.remove("active"))
    this.panelTargets.forEach(panel => panel.classList.add("hidden"))

    // Add active class to the clicked tab
    event.currentTarget.classList.add("active")

    // Get the corresponding panel using data attributes and show it
    const targetPanel = this.panelTargets.find(panel => panel.dataset.panel === event.currentTarget.dataset.tab)
    targetPanel.classList.remove("hidden")
  }

  showActiveTab() {
    const activetab = this.tabTargets.find(tab => tab.classList.contains("active"))
    if (activetab) {
      const targetPanel = this.panelTarget.find(panel => panel.dataset.panel === activeTab.dataset.tab)
      if (targetPanel) {
        targetPanel.classList.remove("hidden")
      }
    }
  }
}