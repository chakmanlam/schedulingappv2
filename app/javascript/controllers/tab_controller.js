import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab","panel"]

  click() {
    event.preventDefault()

    // Remove active class from all tabs and add hidden class to all panels
    this.tabTargets.forEach(tab => {
      tab.classList.remove("active")
      this.toggleActiveClasses(tab, false)
    })

    this.panelTargets.forEach(panel => panel.classList.add("hidden"))

    // Add active class to the clicked tab
    event.currentTarget.classList.add("active")
    this.toggleActiveClasses(event.currentTarget, true)

    // Get the corresponding panel using data attributes and show it
    const targetPanel = this.panelTargets.find(panel => panel.dataset.panel === event.currentTarget.dataset.tab)
    targetPanel.classList.remove("hidden")
  }

  showActiveTab() {
    const activetab = this.tabTargets.find(tab => tab.classList.contains("active"))
    if (activetab) {
      this.toggleActiveClasses(activetab, true)
      const targetPanel = this.panelTarget.find(panel => panel.dataset.panel === activeTab.dataset.tab)
      if (targetPanel) {
        targetPanel.classList.remove("hidden")
      }
    }
  }

  toggleActiveClasses(tab, isActive) {
    const button = tab.querySelector("button")
    const svg = tab.querySelector("svg")

    if (isActive) {
      button.classList.replace("text-gray-500", "text-blue-500")
      button.classList.replace("hover:text-gray-700", "hover:text-blue-700")
      button.classList.replace("bg-white", "bg-indigo-100")
      svg.classList.replace("text-gray-500", "text-blue-500")
    } else {
      button.classList.replace("text-blue-500", "text-gray-500")
      button.classList.replace("hover:text-blue-700", "hover:text-gray-700")
      button.classList.replace("bg-indigo-100", "bg-white")
      svg.classList.replace("text-blue-500", "text-gray-500")
    }
  }
}