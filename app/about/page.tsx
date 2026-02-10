// About Page

import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Card,
  CardBody,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

export default function AboutPage() {
  const values = [
    {
      title: "Excellence",
      description:
        "Committed to delivering the highest quality education and student experience",
      icon: "🎯",
    },
    {
      title: "Innovation",
      description: "Embracing technology and modern teaching methodologies",
      icon: "💡",
    },
    {
      title: "Integrity",
      description:
        "Maintaining ethical standards and transparency in all operations",
      icon: "🤝",
    },
    {
      title: "Diversity",
      description: "Celebrating and welcoming students from all backgrounds",
      icon: "🌍",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Shaping the future through education, innovation, and commitment
              to excellence
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To provide accessible, high-quality education that empowers
                students to achieve their full potential and become leaders in
                their fields. We are dedicated to fostering an environment of
                academic excellence, innovation, and personal growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be a leading educational institution recognized globally
                  for excellence in teaching, research, and student success. We
                  envision a future where our graduates are equipped with the
                  knowledge, skills, and values to make meaningful contributions
                  to society.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our History
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Founded over 25 years ago, our institution has grown from a
                  small local college to a comprehensive educational system
                  serving thousands of students. We&apos;ve continually evolved
                  to meet the changing needs of our students and the demands of
                  the modern workforce.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-shadow"
                >
                  <CardBody>
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <CardTitle className="mb-3">{value.title}</CardTitle>
                    <CardDescription>{value.description}</CardDescription>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  5,000+
                </div>
                <div className="text-gray-600">Students Enrolled</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  300+
                </div>
                <div className="text-gray-600">Qualified Teachers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Programs Offered</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
