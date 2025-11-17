// Centralized mock data for the application
import { ROLES } from '@/constants/roles';

export const stages = [
  { id: "hr-screening", label: "HR Screening", value: "hr-screening" },
  { id: "technical-screening", label: "Technical Screening", value: "technical-screening" },
  { id: "interview-1", label: "Interview 1", value: "interview-1" },
  { id: "interview-2", label: "Interview 2", value: "interview-2" },
  { id: "hr-interview", label: "HR Interview", value: "hr-interview" },
  { id: "offer-sent", label: "Offer Sent", value: "offer-sent" },
  { id: "joined", label: "Joined", value: "joined" },
];

export const stageColors = {
  "HR Screening": "bg-blue-100 text-blue-700",
  "Technical Screening": "bg-purple-100 text-purple-700",
  "Interview 1": "bg-yellow-100 text-yellow-700",
  "Interview 2": "bg-orange-100 text-orange-700",
  "HR Interview": "bg-pink-100 text-pink-700",
  "Offer Sent": "bg-green-100 text-green-700",
};

export const defaultStages = [
  { id: "1", name: "HR Screening", description: "Initial resume screening and basic qualification check", order: 1 },
  { id: "2", name: "Technical Screening", description: "Technical skills assessment and domain knowledge evaluation", order: 2 },
  { id: "3", name: "Interview 1", description: "First round interview with team lead", order: 3 },
  { id: "4", name: "Interview 2", description: "Second round interview with manager", order: 4 },
  { id: "5", name: "HR Interview", description: "Final HR discussion on compensation and benefits", order: 5 },
  { id: "6", name: "Offer Sent", description: "Official offer letter sent to candidate", order: 6 },
  { id: "7", name: "Joined", description: "Candidate has joined the organization", order: 7 },
];

export const mockCandidates = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    job_title: "Senior Frontend Developer",
    stage: "Interview 2",
    applied_date: "2024-01-15",
    last_updated: "2024-01-22",
    resume_url: "#",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@email.com",
    job_title: "Senior Frontend Developer",
    stage: "Interview 1",
    applied_date: "2024-01-18",
    last_updated: "2024-01-20",
    resume_url: "#",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@email.com",
    job_title: "Senior Frontend Developer",
    stage: "Technical Screening",
    applied_date: "2024-01-20",
    last_updated: "2024-01-21",
    resume_url: "#",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@email.com",
    job_title: "Senior Frontend Developer",
    stage: "HR Screening",
    applied_date: "2024-01-22",
    last_updated: "2024-01-22",
    resume_url: "#",
  },
];

export const mockJobs = [
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

export const mockJobData = {
  "1": {
    title: "Senior Frontend Developer",
    department: "engineering",
    location: "Remote",
    type: "full-time",
    experience: "senior",
    salary_min: "80000",
    salary_max: "120000",
    description: "We are looking for an experienced Frontend Developer to join our team...",
    requirements: "5+ years of experience with React, TypeScript, and modern web technologies...",
    benefits: "Competitive salary, health insurance, remote work, flexible hours..."
  },
  "2": {
    title: "Product Manager",
    department: "product",
    location: "New York, NY",
    type: "full-time",
    experience: "mid",
    salary_min: "90000",
    salary_max: "130000",
    description: "Join our product team to drive innovation and deliver exceptional user experiences...",
    requirements: "3+ years of product management experience, strong analytical skills...",
    benefits: "Health insurance, 401k matching, professional development budget..."
  }
};

export const mockUsers = [
  {
    id: "1",
    email: "john.doe@company.com",
    firstName: "John",
    lastName: "Doe",
    role: ROLES.ADMINISTRATOR,
  },
  {
    id: "2",
    email: "jane.smith@company.com",
    firstName: "Jane",
    lastName: "Smith",
    role: ROLES.RECRUITER,
  },
  {
    id: "3",
    email: "mike.johnson@company.com",
    first_name: "Mike",
    last_name: "Johnson",
    role: "Technical Evaluator",
  },
];

export const mockApplicant = {
  id: 1,
  job_id: 1,
  first_name: "Sarah",
  last_name: "Johnson",
  email: "sarah.j@email.com",
  phone: "+1 (555) 123-4567",
  total_experience: "5 years",
  relevant_experience: "4 years",
  current_ctc: "$80,000",
  expected_ctc: "$100,000",
  notice_period: "30 days",
  current_job_title: "Senior Frontend Developer",
  skill_set: "React, TypeScript, Node.js, AWS, Docker, GraphQL, Jest, Tailwind CSS",
  linkedin: "https://linkedin.com/in/sarahjohnson",
  github: "https://github.com/sarahjohnson",
  street: "123 Tech Street",
  city: "San Francisco",
  state: "CA",
  zip_code: "94102",
  status: "Interview 2",
  stage: "interview-2",
  assigned_user_id: 5,
  notes: "Strong technical background, excellent communication skills",
  applied_date: "2024-01-15T10:30:00Z",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-22T14:20:00Z",
  job_title: "Senior Frontend Developer",
  resume_content_type: "application/pdf",
};

export const mockTimeline = [
  {
    id: 1,
    application_id: 1,
    status_id: 1,
    status_name: "HR Screening",
    assigned_user_id: 3,
    assigned_user_name: "John Doe",
    notes: "Initial screening completed. Candidate has strong qualifications.",
    status_date: "2024-01-16T09:00:00Z",
    created_at: "2024-01-16T09:00:00Z",
  },
  {
    id: 2,
    application_id: 1,
    status_id: 2,
    status_name: "Technical Screening",
    assigned_user_id: 4,
    assigned_user_name: "Jane Smith",
    notes: "Technical skills validated. Passed coding assessment with 85%.",
    status_date: "2024-01-18T14:30:00Z",
    created_at: "2024-01-18T14:30:00Z",
  },
  {
    id: 3,
    application_id: 1,
    status_id: 3,
    status_name: "Interview 1",
    assigned_user_id: 5,
    assigned_user_name: "Mike Wilson",
    notes: "First round interview completed. Good cultural fit.",
    status_date: "2024-01-20T11:00:00Z",
    created_at: "2024-01-20T11:00:00Z",
  },
  {
    id: 4,
    application_id: 1,
    status_id: 4,
    status_name: "Interview 2",
    assigned_user_id: 5,
    assigned_user_name: "Mike Wilson",
    notes: "Second round in progress. Technical deep dive scheduled.",
    status_date: "2024-01-22T10:00:00Z",
    created_at: "2024-01-22T10:00:00Z",
  },
];
export const jobOpenings = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "2024-01-15",
    status: "active",
    applicants: 24,
    in_pipeline: 18,
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    posted: "2024-01-20",
    status: "active",
    applicants: 32,
    in_pipeline: 15,
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2024-01-18",
    status: "active",
    applicants: 28,
    in_pipeline: 12,
  },
  {
    id: "4",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    posted: "2024-01-10",
    status: "active",
    applicants: 45,
    in_pipeline: 22,
  },
  {
    id: "5",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    posted: "2024-01-08",
    status: "paused",
    applicants: 19,
    in_pipeline: 8,
  },
];
