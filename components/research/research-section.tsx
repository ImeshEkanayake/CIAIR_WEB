import Link from "next/link"

export default function ResearchSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Research</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CIAIR conducts cutting-edge AI research focused on addressing challenges specific to Sri Lanka and the
            Global South.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Research Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/research?category=Education" className="text-blue-600 hover:underline">
                  AI in Education
                </Link>
              </li>
              <li>
                <Link href="/research?category=Environment" className="text-blue-600 hover:underline">
                  Environmental AI
                </Link>
              </li>
              <li>
                <Link href="/research?category=Ethical+AI" className="text-blue-600 hover:underline">
                  Ethical AI Frameworks
                </Link>
              </li>
              <li>
                <Link href="/research?category=AI+Privacy" className="text-blue-600 hover:underline">
                  Privacy-Preserving AI
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/research" className="text-blue-600 hover:underline">
                View all research projects →
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Latest Publications</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/research/publications" className="text-blue-600 hover:underline font-medium">
                  A novel application with explainable machine learning (SHAP and LIME) to predict soil N, P, and K
                  nutrient content
                </Link>
                <p className="text-sm text-gray-600">Smart Agricultural Technology, 2025</p>
              </li>
              <li>
                <Link href="/research/publications" className="text-blue-600 hover:underline font-medium">
                  Prediction of alkali-silica reaction expansion of concrete using explainable machine learning methods
                </Link>
                <p className="text-sm text-gray-600">Discover Applied Sciences, 2025</p>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/research/publications" className="text-blue-600 hover:underline">
                View all publications →
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/research/publications"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Our Publications
          </Link>
        </div>
      </div>
    </section>
  )
}
