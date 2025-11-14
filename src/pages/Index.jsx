import { useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import ApplyFormModal from "@/components/jobs/ApplyFormModal";

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    employment_type: "Full-time",
    salary_min: 12,
    salary_max: 16,
    posted_date: "2 days ago",
    closing_date: "Dec 31, 2025",
    experience_level: "Senior",
    status: "Open",
    description: `We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building and maintaining high-quality web applications using modern technologies.

This role offers the opportunity to work on challenging projects, collaborate with talented engineers, and contribute to products used by thousands of users.`,
    requirements: `• 5+ years of professional experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Strong understanding of HTML, CSS, and responsive design
• Experience with state management libraries (Redux, Zustand, etc.)
• Excellent problem-solving and communication skills
• Bachelor's degree in Computer Science or equivalent experience`,
    benefits: `• Competitive salary and equity
• Comprehensive health insurance
• Flexible work schedule
• Remote work options
• Professional development budget
• Annual performance bonuses`,
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "Mumbai, India",
    employment_type: "Full-time",
    salary_min: 13,
    salary_max: 17,
    posted_date: "1 week ago",
    closing_date: null,
    experience_level: "Mid",
    status: "Open",
    description: `Join our product team to help shape the future of our platform. As a Product Manager, you will work closely with engineering, design, and business teams to deliver features that delight our users.

You'll be responsible for defining product strategy, prioritizing features, and ensuring successful product launches.`,
    requirements: `• 3+ years of product management experience
• Strong analytical and problem-solving skills
• Excellent communication and leadership abilities
• Experience with agile development methodologies
• Data-driven decision making approach
• Bachelor's degree in Business, Engineering, or related field`,
    benefits: `• Competitive compensation
• Health and dental insurance
• Stock options
• Unlimited PTO
• Learning and development budget
• Modern office with great amenities`,
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "Bangalore, India",
    employment_type: "Full-time",
    salary_min: 10,
    salary_max: 14,
    posted_date: "3 days ago",
    closing_date: null,
    experience_level: "Mid",
    status: "Open",
    description: `We're seeking a talented UX Designer to create exceptional user experiences for our digital products. You'll work closely with product managers and developers to design intuitive interfaces.

This role requires a strong portfolio, excellent communication skills, and a passion for user-centered design.`,
    requirements: `• 4+ years of UX/UI design experience
• Proficiency in Figma, Sketch, or Adobe XD
• Strong portfolio demonstrating design thinking
• Understanding of accessibility and design systems
• Experience with user research and usability testing
• Excellent communication and collaboration skills`,
    benefits: `• Competitive salary
• Full health benefits
• Flexible work arrangements
• Creative work environment
• Professional growth opportunities
• Team events and outings`,
  },
  {
    id: "4",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    employment_type: "Contract",
    salary_min: 9,
    salary_max: 13,
    posted_date: "5 days ago",
    closing_date: "Jan 15, 2026",
    experience_level: "Mid",
    status: "Open",
    description: `Join our team as a Full Stack Developer to build scalable web applications. You'll work on both frontend and backend, using modern technologies and best practices.

This is a contract position with potential for conversion to full-time.`,
    requirements: `• 3+ years of full-stack development experience
• Proficiency in Node.js, React, and databases
• Experience with cloud infrastructure (AWS/Azure/GCP)
• Strong problem-solving skills
• Knowledge of RESTful APIs and microservices
• Experience with version control (Git)`,
    benefits: `• Competitive hourly rate
• Flexible schedule
• 100% remote work
• Contract-to-hire opportunity
• Work with cutting-edge technologies`,
  },
  {
    id: "5",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Pune, India",
    employment_type: "Full-time",
    salary_min: 11,
    salary_max: 15,
    posted_date: "1 week ago",
    closing_date: null,
    experience_level: "Senior",
    status: "Open",
    description: `We're looking for an experienced DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You'll ensure system reliability, security, and performance.

This role requires strong technical skills and experience with modern DevOps tools and practices.`,
    requirements: `• 4+ years of DevOps experience
• Expertise in Docker, Kubernetes, and CI/CD tools
• Strong knowledge of AWS or Azure
• Experience with infrastructure as code (Terraform, CloudFormation)
• Understanding of security best practices
• Excellent troubleshooting skills`,
    benefits: `• Competitive compensation package
• Health, dental, and vision insurance
• Flexible PTO policy
• Professional certification support
• Relocation assistance available
• Work-life balance`,
  },
  {
    id: "6",
    title: "React Developer",
    department: "Engineering",
    location: "Remote",
    employment_type: "Full-time",
    salary_min: 10,
    salary_max: 14,
    posted_date: "4 days ago",
    closing_date: null,
    experience_level: "Mid",
    status: "Open",
    description: `We're hiring a React Developer to build modern, responsive web applications. You'll work with a talented team to deliver high-quality features and maintain our codebase.

This is a fully remote position with flexible working hours.`,
    requirements: `• 3+ years of React development experience
• Strong JavaScript/TypeScript skills
• Experience with modern React patterns and hooks
• Knowledge of testing frameworks (Jest, React Testing Library)
• Understanding of web performance optimization
• Good communication skills`,
    benefits: `• Competitive salary
• 100% remote work
• Health insurance
• Annual bonus
• Home office stipend
• Professional development budget`,
  },
];

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleViewDetails = (jobId) => {
    const job = mockJobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsDetailModalOpen(true);
    }
  };

  const handleApply = () => {
    setIsDetailModalOpen(false);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 px-4">
        <div className="container mx-auto text-center space-y-6">
          <img 
            src="/accipere-primary-black.png" 
            alt="Accipere" 
            className="h-24 mx-auto"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-6">
            Open Positions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore current opportunities and join our team
          </p>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Open Positions
              </h2>
              <p className="text-muted-foreground mt-2">
                {mockJobs.length} jobs available
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onApply={handleApply}
      />
      <ApplyFormModal
        jobTitle={selectedJob?.title || ""}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
