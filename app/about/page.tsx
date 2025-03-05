import React from "react";
import Link from "next/link";
import AboutIntro from "@/components/AboutIntro";

// Reusable Section Component
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

// Reusable InfoCard Component
interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => (
  <div className="bg-gray-800 p-6 rounded-md shadow-md">
    <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-200">{description}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <>
      {/* Animated Intro Section */}
      <AboutIntro />

      {/* Main Content */}
      <main className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* What Pulp101 Offers */}
          <Section title="What Pulp101 Offers">
            <div className="grid md:grid-cols-2 gap-8">
              <InfoCard
                title="For SDK Users"
                description="Pulp101 offers a comprehensive and interactive guide designed to help developers harness the full power of Pulp’s SDK. With detailed documentation, real-world code examples, and intuitive workflows, users can dive deep into automation, NLP, and more."
              />
              <InfoCard
                title="For Students & Interns"
                description="Pulp101 serves as the ultimate onboarding guide for students and interns eager to integrate into the Pulp team. It provides an in-depth look at our company culture, collaborative work style, and the tools we use to create and innovate."
              />
            </div>
          </Section>

          {/* Key Features */}
          <Section title="Key Features">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Interactive, Engaging Documentation:</strong> Not just static documents—an interactive, hands-on learning platform with live code examples.
              </li>
              <li>
                <strong>SDK Mastery:</strong> Step-by-step tutorials, detailed guides, and code references to unlock the full potential of Pulp’s SDK.
              </li>
              <li>
                <strong>Team Culture & Collaboration:</strong> A behind-the-scenes look at how Pulp operates as a team, showcasing our collaborative work style and communication tools.
              </li>
              <li>
                <strong>Smooth Onboarding:</strong> Clear onboarding checklists, mentorship guides, and tips to ensure a seamless transition.
              </li>
            </ul>
          </Section>

          {/* Goals */}
          <Section title="Goals">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Streamlined Onboarding:</strong> Ensuring that students and interns hit the ground running with a clear, welcoming path.
              </li>
              <li>
                <strong>Empowered SDK Users:</strong> Equipping developers with everything they need to create, automate, and analyze using Pulp’s SDK.
              </li>
              <li>
                <strong>Collaborative Growth:</strong> Fostering a community-driven resource where users and team members can learn, share ideas, and collaborate.
              </li>
            </ol>
          </Section>

          {/* Why Pulp101 */}
          <Section title="Why Pulp101?">
            <p className="mb-4">
              Pulp101 is your ultimate guide to everything Pulp—from technical resources to insights on how we operate as a team. It’s designed to help you not only understand our powerful tools but also thrive within the Pulp ecosystem.
            </p>
            <p>
              In essence, Pulp101 is where <strong>innovation</strong> meets <strong>community</strong>. It’s a place for developers, students, and interns to connect, collaborate, and grow, all while being empowered by the tools, culture, and processes that make Pulp a leader in the tech space.
            </p>
          </Section>

          {/* Call-to-Action */}
          <div className="text-center mt-12">
            <Link
              href="/docs"
              className="inline-block bg-white text-black px-8 py-4 rounded-md text-lg font-semibold transition duration-200 hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
