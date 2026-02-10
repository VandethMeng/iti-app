// Admissions Page

"use client";

import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export default function AdmissionsPage() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Admissions
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Join our community of learners and begin your journey to
                excellence
              </p>
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Admission Process
              </h2>
              <p className="text-lg text-gray-600">
                Follow these simple steps to apply
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <p className="text-gray-600">
                  Create your account with basic information
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Documents</h3>
                <p className="text-gray-600">
                  Upload required academic documents
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Review</h3>
                <p className="text-gray-600">
                  Our admissions team reviews your application
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enrollment</h3>
                <p className="text-gray-600">
                  Get approved and begin your journey
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Admission Requirements */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Admission Requirements
                </h2>
                <ul className="space-y-4">
                  {[
                    "Completed application form",
                    "High school diploma or equivalent",
                    "Official transcripts from previous institutions",
                    "Valid identification document",
                    "Recent passport-sized photographs",
                    "Proof of address",
                    "Academic reference letters (if applicable)",
                  ].map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Dates */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Important Dates
                </h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      Fall Semester 2026
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Application Opens:</strong> March 1, 2026
                      </li>
                      <li>
                        <strong>Application Deadline:</strong> July 15, 2026
                      </li>
                      <li>
                        <strong>Classes Begin:</strong> September 1, 2026
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      Spring Semester 2027
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Application Opens:</strong> September 1, 2026
                      </li>
                      <li>
                        <strong>Application Deadline:</strong> December 15, 2026
                      </li>
                      <li>
                        <strong>Classes Begin:</strong> January 15, 2027
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Offered */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Available Programs
              </h2>
              <p className="text-lg text-gray-600">
                Choose from our diverse range of academic programs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Computer Science",
                  duration: "4 Years",
                  degree: "Bachelor of Science",
                },
                {
                  title: "Business Administration",
                  duration: "4 Years",
                  degree: "Bachelor of Business",
                },
                {
                  title: "Engineering",
                  duration: "4 Years",
                  degree: "Bachelor of Engineering",
                },
                {
                  title: "Arts & Design",
                  duration: "3 Years",
                  degree: "Bachelor of Arts",
                },
                {
                  title: "Health Sciences",
                  duration: "4 Years",
                  degree: "Bachelor of Science",
                },
                {
                  title: "Education",
                  duration: "4 Years",
                  degree: "Bachelor of Education",
                },
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>Duration:</strong> {program.duration}
                    </p>
                    <p>
                      <strong>Degree:</strong> {program.degree}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Aid */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Financial Aid & Scholarships
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  We believe that financial constraints should not prevent
                  talented students from pursuing their education. We offer
                  various financial aid options and merit-based scholarships.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Merit-based scholarships (up to 100% tuition)
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need-based financial aid
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Flexible payment plans
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Work-study opportunities
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Tuition & Fees
                </h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        Undergraduate (per year)
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        $12,000
                      </span>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Application Fee</span>
                      <span className="text-xl font-semibold text-gray-900">
                        $50
                      </span>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        Registration Fee (per semester)
                      </span>
                      <span className="text-xl font-semibold text-gray-900">
                        $200
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    * Additional fees may apply for specific programs and
                    services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the first step towards your future. Apply now and join our
              community of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Apply Now
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "When is the application deadline?",
                  answer:
                    "Application deadlines vary by semester. For Fall 2026, the deadline is July 15, 2026. For Spring 2027, the deadline is December 15, 2026.",
                },
                {
                  question: "Can international students apply?",
                  answer:
                    "Yes, we welcome international students. Additional documentation may be required, including proof of English proficiency (TOEFL/IELTS) and visa documentation.",
                },
                {
                  question: "How long does the admission process take?",
                  answer:
                    "The review process typically takes 2-4 weeks after all required documents are submitted. You will be notified via email about your application status.",
                },
                {
                  question: "Is the application fee refundable?",
                  answer:
                    "No, the application fee is non-refundable. However, fee waivers are available for students with demonstrated financial need.",
                },
                {
                  question: "Can I transfer credits from another institution?",
                  answer:
                    "Yes, we accept transfer credits from accredited institutions. Each transfer request is evaluated individually by our academic committee.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 group"
                >
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
