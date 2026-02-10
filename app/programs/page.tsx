// Programs Page

"use client";

import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export default function ProgramsPage() {
  const programs = [
    {
      field: "Computer Sciences",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description:
        "Master programming, software development, networking, and cutting-edge technologies to build the digital future.",
      offerings: [
        {
          type: "Short Course",
          duration: "3-6 Months",
          courses: [
            "Web Development Fundamentals",
            "Mobile App Development",
            "Database Management",
            "Cybersecurity Basics",
          ],
        },
        {
          type: "Diploma",
          duration: "2 Years",
          courses: [
            "Software Development",
            "Network Administration",
            "Computer Systems & Hardware",
            "Data Science Fundamentals",
          ],
        },
        {
          type: "Bachelor",
          duration: "4 Years",
          courses: [
            "Computer Science (B.Sc.)",
            "Software Engineering (B.Eng.)",
            "Information Technology (B.IT)",
            "Artificial Intelligence (B.Sc.)",
          ],
        },
      ],
    },
    {
      field: "Automotive Engineering",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8 17a2 2 0 100 4 2 2 0 000-4zM16 17a2 2 0 100 4 2 2 0 000-4zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
      ),
      description:
        "Learn vehicle design, maintenance, diagnostics, and emerging electric vehicle technologies in modern automotive systems.",
      offerings: [
        {
          type: "Short Course",
          duration: "3-6 Months",
          courses: [
            "Basic Vehicle Maintenance",
            "Automotive Diagnostics",
            "Engine Repair Fundamentals",
            "Electrical Systems",
          ],
        },
        {
          type: "Diploma",
          duration: "2 Years",
          courses: [
            "Automotive Technology",
            "Vehicle Systems & Diagnostics",
            "Engine Performance",
            "Hybrid & Electric Vehicles",
          ],
        },
        {
          type: "Bachelor",
          duration: "4 Years",
          courses: [
            "Automotive Engineering (B.Eng.)",
            "Vehicle Design & Manufacturing",
            "Automotive Electronics",
            "Sustainable Transportation Systems",
          ],
        },
      ],
    },
    {
      field: "Industrial Mechanics",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description:
        "Gain expertise in machinery installation, maintenance, hydraulics, pneumatics, and industrial automation systems.",
      offerings: [
        {
          type: "Short Course",
          duration: "3-6 Months",
          courses: [
            "Basic Industrial Maintenance",
            "Hydraulics & Pneumatics",
            "Welding & Fabrication",
            "Safety & Equipment Operation",
          ],
        },
        {
          type: "Diploma",
          duration: "2 Years",
          courses: [
            "Industrial Mechanics Technology",
            "Machine Tool Operations",
            "Manufacturing Processes",
            "Industrial Automation",
          ],
        },
        {
          type: "Bachelor",
          duration: "4 Years",
          courses: [
            "Mechanical Engineering (B.Eng.)",
            "Industrial Engineering",
            "Manufacturing Engineering",
            "Mechatronics Engineering",
          ],
        },
      ],
    },
  ];

  return (
    <>
      <PublicHeader />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Programs
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Discover comprehensive programs designed to prepare you for
                success in your chosen field
              </p>
            </div>
          </div>
        </section>

        {/* Program Types Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Program Types
              </h2>
              <p className="text-lg text-gray-600">
                Choose the learning path that fits your goals and schedule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Short Courses */}
              <div className="bg-blue-50 rounded-lg p-8 text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Short Courses
                </h3>
                <p className="text-gray-600 mb-4">3-6 Months</p>
                <p className="text-gray-700">
                  Quick skill development and certification programs for
                  immediate job readiness or career advancement.
                </p>
              </div>

              {/* Diploma */}
              <div className="bg-green-50 rounded-lg p-8 text-center">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Diploma Programs
                </h3>
                <p className="text-gray-600 mb-4">2 Years</p>
                <p className="text-gray-700">
                  Comprehensive technical training with hands-on experience and
                  industry-recognized credentials.
                </p>
              </div>

              {/* Bachelor */}
              <div className="bg-purple-50 rounded-lg p-8 text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Bachelor Degrees
                </h3>
                <p className="text-gray-600 mb-4">4 Years</p>
                <p className="text-gray-700">
                  Full university degree programs with advanced theoretical
                  knowledge and research opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs by Field */}
        {programs.map((program, programIndex) => (
          <section
            key={programIndex}
            className={`py-16 ${
              programIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Field Header */}
              <div className="flex items-center mb-8">
                <div className="text-blue-600 mr-4">{program.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {program.field}
                  </h2>
                  <p className="text-lg text-gray-600 mt-2">
                    {program.description}
                  </p>
                </div>
              </div>

              {/* Offerings Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {program.offerings.map((offering, offeringIndex) => (
                  <div
                    key={offeringIndex}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {offering.type}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {offering.duration}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {offering.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{course}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/admissions"
                      className="mt-6 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Benefits Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Programs?
              </h2>
              <p className="text-xl text-blue-100">
                Industry-aligned education with real-world outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Industry Partnerships",
                  description:
                    "Connections with leading companies for internships and job placements",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                  title: "Accredited Programs",
                  description:
                    "All programs are nationally recognized and industry-certified",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                  title: "Modern Facilities",
                  description:
                    "State-of-the-art labs and equipment for hands-on learning",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Expert Instructors",
                  description:
                    "Learn from experienced professionals with industry expertise",
                },
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-blue-100 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore our programs and take the first step toward your future
              career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
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
                href="/admissions"
                className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                View Admissions Info
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
