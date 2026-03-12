"use client"

import { useEffect } from "react"

export function CardScrollHandler() {
  useEffect(() => {
    const cards = document.querySelectorAll(".sticky-card")
    if (!cards.length) return

    // Initial state - stack all cards
    cards.forEach((card, index) => {
      if (index === 0) {
        card.classList.add("active")
      } else {
        card.classList.add("next")
      }
    })

    const handleScroll = () => {
      const containerTop = document.querySelector(".sticky-cards-container")?.getBoundingClientRect().top || 0
      const containerHeight = document.querySelector(".sticky-cards-container")?.clientHeight || 0
      const viewportHeight = window.innerHeight

      // Calculate how far we've scrolled into the container
      const scrollProgress = -containerTop / (containerHeight - viewportHeight)

      // Calculate which card should be active based on scroll progress
      const totalCards = cards.length
      const activeCardIndex = Math.min(Math.floor(scrollProgress * totalCards), totalCards - 1)

      // Update card classes based on their position relative to the active card
      cards.forEach((card, index) => {
        card.classList.remove("active", "prev", "next")

        if (index < activeCardIndex) {
          card.classList.add("prev")
        } else if (index === activeCardIndex) {
          card.classList.add("active")
        } else {
          card.classList.add("next")
        }
      })
    }

    // Initial call to set up the cards
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
