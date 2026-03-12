// Helper function to get a description for a category
export function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "AI Privacy": "Privacy-preserving machine learning techniques and data protection",
    Education: "AI-powered educational tools and assessment systems",
    Environment: "AI applications for environmental monitoring and conservation",
    "Ethical AI": "Ethical frameworks for AI deployment and responsible AI development",
    Healthcare: "AI applications in medical diagnosis, treatment, and healthcare management",
    NLP: "Natural Language Processing research and applications",
    "Computer Vision": "Research in image recognition, object detection, and visual understanding",
    Robotics: "AI for robotics, automation, and intelligent systems",
    Other: "Miscellaneous research publications across various emerging fields",
    // Default description for any other category
    default: "Research and publications in this emerging field",
  }

  return descriptions[category] || descriptions["default"]
}
