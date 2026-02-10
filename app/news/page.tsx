// News & Events Page

"use client";

import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export default function NewsPage() {
  const news = [
    {
      id: 1,
      category: "Academic",
      title: "Spring 2027 Term Registration Now Open",
      date: "February 1, 2026",
      image: "📚",
      excerpt:
        "Registration for Spring 2027 semester is officially open. Students can now enroll in courses through the student portal. Early registration ends March 15, 2026.",
      content:
        "We are pleased to announce that course registration for the Spring 2027 semester is now available. All current and newly admitted students can access the registration portal through their student accounts. The semester begins January 15, 2027. Don't miss the early registration deadline to secure your preferred courses and schedule.",
      featured: true,
    },
    {
      id: 2,
      category: "New Program",
      title: "Introducing Bachelor in Artificial Intelligence",
      date: "January 28, 2026",
      image: "🤖",
      excerpt:
        "We're excited to launch our new 4-year Bachelor's degree program in Artificial Intelligence, starting Fall 2026. Applications are now being accepted.",
      content:
        "In response to growing industry demand, we're launching a comprehensive Bachelor's program in Artificial Intelligence. The program covers machine learning, neural networks, computer vision, natural language processing, and AI ethics. Students will gain hands-on experience with cutting-edge AI tools and work on real-world projects.",
      featured: true,
    },
    {
      id: 3,
      category: "Event",
      title: "Annual Tech Fair 2026 - March 20-22",
      date: "January 25, 2026",
      image: "💻",
      excerpt:
        "Join us for our biggest tech event of the year! Students will showcase innovative projects, and industry leaders will conduct workshops and recruitment sessions.",
      content:
        "The Annual Tech Fair is back! This three-day event will feature student project exhibitions, guest speakers from leading tech companies, hands-on workshops, career fair, and networking opportunities. Open to all students and the public. Registration opens February 15.",
      featured: false,
    },
    {
      id: 4,
      category: "Announcement",
      title: "Fall 2026 Semester Starts September 1",
      date: "January 20, 2026",
      image: "🎓",
      excerpt:
        "Mark your calendars! The Fall 2026 semester begins September 1, 2026. Orientation for new students starts August 28.",
      content:
        "The Fall 2026 academic calendar has been finalized. Classes begin September 1, with new student orientation scheduled for August 28-30. Registration deadlines: Early registration closes July 15, final registration closes August 20. Campus facilities will be open August 25 for early arrivals.",
      featured: false,
    },
    {
      id: 5,
      category: "New Program",
      title: "Electric Vehicle Technology Diploma Launched",
      date: "January 15, 2026",
      image: "⚡",
      excerpt:
        "New 2-year diploma program in Electric Vehicle Technology addresses the automotive industry's shift to sustainable transportation.",
      content:
        "As the automotive industry rapidly transitions to electric vehicles, we're introducing a specialized diploma program in EV Technology. Students will learn about battery systems, electric motors, charging infrastructure, power electronics, and EV diagnostics. The program includes internships with leading EV manufacturers.",
      featured: false,
    },
    {
      id: 6,
      category: "Event",
      title: "Career Day with Industry Partners - February 28",
      date: "January 10, 2026",
      image: "💼",
      excerpt:
        "Meet recruiters from 50+ companies across Computer Science, Engineering, and Industrial sectors. Bring your resume and dress professionally!",
      content:
        "Our Career Day connects students with potential employers. This year, we're hosting representatives from major tech companies, automotive manufacturers, and engineering firms. Activities include company presentations, mock interviews, resume clinics, and on-the-spot job interviews for graduating students.",
      featured: false,
    },
    {
      id: 7,
      category: "Event",
      title: "Automotive Engineering Workshop - March 5",
      date: "January 8, 2026",
      image: "🚗",
      excerpt:
        "Guest speaker from Tesla will conduct a hands-on workshop on modern automotive diagnostics and EV systems. Limited seats available.",
      content:
        "We're hosting an exclusive workshop led by a senior engineer from Tesla. Topics include advanced vehicle diagnostics, EV powertrain systems, battery management, and the future of autonomous vehicles. This is a rare opportunity to learn from industry leaders. Registration required - limited to 50 participants.",
      featured: false,
    },
    {
      id: 8,
      category: "Academic",
      title: "Summer 2026 Intensive Courses Available",
      date: "January 5, 2026",
      image: "☀️",
      excerpt:
        "Fast-track your education with summer intensive courses. Complete a full semester course in 8 weeks. Registration opens March 1.",
      content:
        "Summer intensive courses allow students to complete full semester courses in an accelerated 8-week format. Perfect for students who want to catch up, get ahead, or lighten their fall course load. Courses available in Computer Science, Math, Engineering fundamentals, and General Education requirements.",
      featured: false,
    },
    {
      id: 9,
      category: "Announcement",
      title: "New Library Study Spaces Opening Soon",
      date: "December 28, 2025",
      image: "📖",
      excerpt:
        "Renovated library will feature modern study pods, collaborative workspaces, and a 24/7 study area. Opening February 15, 2026.",
      content:
        "After months of renovation, our library is getting a major upgrade. New features include private study pods with whiteboards, collaborative group spaces with large displays, a quiet zone for focused study, expanded computer lab, and a 24/7 access area for students during exam periods. Grand opening ceremony February 15.",
      featured: false,
    },
    {
      id: 10,
      category: "New Program",
      title: "Industrial Automation Certificate Program",
      date: "December 20, 2025",
      image: "⚙️",
      excerpt:
        "6-month certificate program in Industrial Automation and PLC programming. Designed for working professionals and career changers.",
      content:
        "Our new Industrial Automation certificate program provides intensive training in Programmable Logic Controllers (PLCs), SCADA systems, robotics, and industrial networks. Classes meet evenings and weekends to accommodate working professionals. Graduates will be prepared for roles as automation technicians and control systems engineers.",
      featured: false,
    },
  ];

  const categories = [
    { name: "All", value: "all" },
    { name: "Academic", value: "Academic" },
    { name: "New Programs", value: "New Program" },
    { name: "Events", value: "Event" },
    { name: "Announcements", value: "Announcement" },
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
                News & Events
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Stay updated with the latest announcements, events, and
                developments at our institution
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {news
                .filter((item) => item.featured)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {item.date}
                        </span>
                      </div>
                      <div className="text-6xl mb-4">{item.image}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{item.content}</p>
                      <Link
                        href="/contact"
                        className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center"
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Category Filter (Visual Only) */}
        <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category.value === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All News Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Latest Updates
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {news
                .filter((item) => !item.featured)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.category === "Academic"
                              ? "bg-purple-100 text-purple-800"
                              : item.category === "New Program"
                                ? "bg-green-100 text-green-800"
                                : item.category === "Event"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="text-4xl mb-3">{item.image}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{item.date}</p>
                      <p className="text-gray-700 mb-4">{item.excerpt}</p>
                      <Link
                        href="/contact"
                        className="text-blue-600 font-semibold hover:text-blue-800 text-sm inline-flex items-center"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Calendar */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600">
                Mark your calendar for these important dates
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  date: "FEB 28",
                  title: "Career Day",
                  time: "9:00 AM - 4:00 PM",
                  location: "Main Auditorium",
                  type: "Career",
                },
                {
                  date: "MAR 05",
                  title: "Automotive Workshop",
                  time: "2:00 PM - 5:00 PM",
                  location: "Engineering Lab",
                  type: "Workshop",
                },
                {
                  date: "MAR 15",
                  title: "Early Registration Ends",
                  time: "11:59 PM",
                  location: "Online",
                  type: "Deadline",
                },
                {
                  date: "MAR 20-22",
                  title: "Annual Tech Fair",
                  time: "All Day",
                  location: "Campus Grounds",
                  type: "Event",
                },
                {
                  date: "JUL 15",
                  title: "Fall 2026 Application Deadline",
                  time: "11:59 PM",
                  location: "Online",
                  type: "Deadline",
                },
                {
                  date: "SEP 01",
                  title: "Fall 2026 Semester Begins",
                  time: "8:00 AM",
                  location: "Campus Wide",
                  type: "Academic",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-lg p-3 mr-4 text-center min-w-[80px]">
                      <div className="text-sm font-semibold">
                        {event.date.split(" ")[0]}
                      </div>
                      <div className="text-2xl font-bold">
                        {event.date.split(" ")[1] || ""}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                      <span
                        className={`inline-block mt-3 text-xs font-semibold px-2 py-1 rounded ${
                          event.type === "Career"
                            ? "bg-green-100 text-green-800"
                            : event.type === "Workshop"
                              ? "bg-purple-100 text-purple-800"
                              : event.type === "Deadline"
                                ? "bg-red-100 text-red-800"
                                : event.type === "Academic"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Informed
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter for the latest news, events, and
              announcements delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
