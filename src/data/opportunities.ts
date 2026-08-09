import type { Job, Internship, Hackathon, Opportunity } from "../types";

// deadlines are generated relative to "now" so the demo always looks live
const hrs = (h: number) => new Date(Date.now() + h * 3600 * 1000).toISOString();
const days = (d: number) => hrs(d * 24);

const initial = (org: string) => org.trim().charAt(0).toUpperCase();

export const jobs: Job[] = [
  {
    id: "job-1", type: "job", title: "Frontend Developer (Fresher)", org: "Nimbus Labs",
    orgInitial: initial("Nimbus Labs"), deadline: hrs(9), skills: ["React", "JavaScript", "CSS"],
    location: "Bangalore", remote: false, description: "Build and ship customer-facing UI for a fast-growing SaaS product. Great first role for a fresher who knows React fundamentals.",
    eligibility: "Final year or recent graduate", postedDaysAgo: 3,
    jobType: "Full-time", experience: "Fresher", salary: "₹4.5 - 6 LPA",
  },
  {
    id: "job-2", type: "job", title: "Security Analyst — Entry Level", org: "CyberShield Technologies",
    orgInitial: initial("CyberShield Technologies"), deadline: days(1), skills: ["Networking", "SIEM", "Linux"],
    location: "Pune", remote: false, description: "Monitor alerts, triage incidents, and assist senior analysts with vulnerability assessments across client environments.",
    eligibility: "BCA/BTech, basic networking knowledge required", postedDaysAgo: 5,
    jobType: "Full-time", experience: "Fresher", salary: "₹3.8 - 5 LPA",
  },
  {
    id: "job-3", type: "job", title: "Backend Developer — Node.js", org: "Fintrack",
    orgInitial: initial("Fintrack"), deadline: days(2), skills: ["Node.js", "MongoDB", "REST APIs"],
    location: "Remote", remote: true, description: "Own backend services for a personal-finance app used by 200k+ users. API design, performance, and reliability focus.",
    eligibility: "0-2 years experience", postedDaysAgo: 2,
    jobType: "Remote", experience: "Entry-level", salary: "₹6 - 9 LPA",
  },
  {
    id: "job-4", type: "job", title: "Junior Penetration Tester", org: "RedHawk Security",
    orgInitial: initial("RedHawk Security"), deadline: days(3), skills: ["Cybersecurity", "Burp Suite", "OWASP"],
    location: "Mumbai", remote: false, description: "Assist with web and network penetration tests, write findings reports, and learn under senior red-team engineers.",
    eligibility: "Basic pentesting knowledge, certifications a plus", postedDaysAgo: 6,
    jobType: "Full-time", experience: "Fresher", salary: "₹4 - 5.5 LPA",
  },
  {
    id: "job-5", type: "job", title: "Data Analyst", org: "Metricly",
    orgInitial: initial("Metricly"), deadline: days(4), skills: ["SQL", "Python", "Power BI"],
    location: "Hyderabad", remote: false, description: "Turn raw product data into dashboards and insights that drive weekly product decisions.",
    eligibility: "Fresher / final year", postedDaysAgo: 4,
    jobType: "Full-time", experience: "Fresher", salary: "₹4.2 - 5.8 LPA",
  },
  {
    id: "job-6", type: "job", title: "QA Engineer", org: "Loopwire",
    orgInitial: initial("Loopwire"), deadline: days(5), skills: ["Manual Testing", "Selenium", "JIRA"],
    location: "Pune", remote: false, description: "Own the test plans for a B2B logistics platform and build out automated regression coverage.",
    eligibility: "0-1 years experience", postedDaysAgo: 7,
    jobType: "Full-time", experience: "Entry-level", salary: "₹3.5 - 4.5 LPA",
  },
  {
    id: "job-7", type: "job", title: "Cloud Support Engineer", org: "SkyGrid Cloud",
    orgInitial: initial("SkyGrid Cloud"), deadline: days(6), skills: ["AWS", "Linux", "Networking"],
    location: "Remote", remote: true, description: "First line of support for cloud infrastructure issues, escalating and documenting as needed.",
    eligibility: "Basic cloud/networking knowledge", postedDaysAgo: 8,
    jobType: "Remote", experience: "Fresher", salary: "₹4 - 6 LPA",
  },
  {
    id: "job-8", type: "job", title: "Product Design Intern → FTE", org: "Formless",
    orgInitial: initial("Formless"), deadline: days(7), skills: ["Figma", "UI/UX", "Prototyping"],
    location: "Bangalore", remote: false, description: "6-month paid trial converting into a full-time design role for the right candidate.",
    eligibility: "Portfolio required", postedDaysAgo: 1,
    jobType: "Full-time", experience: "Fresher", salary: "₹3.6 - 5 LPA",
  },
  {
    id: "job-9", type: "job", title: "DevOps Engineer — Junior", org: "Streamline Systems",
    orgInitial: initial("Streamline Systems"), deadline: days(9), skills: ["Docker", "CI/CD", "Linux"],
    location: "Chennai", remote: false, description: "Support build pipelines and container infrastructure for a 40-person engineering team.",
    eligibility: "0-2 years experience", postedDaysAgo: 3,
    jobType: "Full-time", experience: "Entry-level", salary: "₹5 - 7 LPA",
  },
  {
    id: "job-10", type: "job", title: "SOC Analyst (Night Shift)", org: "Vantage Point InfoSec",
    orgInitial: initial("Vantage Point InfoSec"), deadline: days(10), skills: ["Cybersecurity", "SIEM", "Incident Response"],
    location: "Noida", remote: false, description: "24x7 security operations center monitoring for enterprise clients across finance and retail.",
    eligibility: "BCA/BTech, willing to work night shifts", postedDaysAgo: 5,
    jobType: "Full-time", experience: "Fresher", salary: "₹4 - 5.5 LPA",
  },
  {
    id: "job-11", type: "job", title: "Mobile Developer — Flutter", org: "Appcove",
    orgInitial: initial("Appcove"), deadline: days(11), skills: ["Flutter", "Dart", "Firebase"],
    location: "Remote", remote: true, description: "Ship features across two consumer apps with a combined 500k+ downloads.",
    eligibility: "0-2 years experience", postedDaysAgo: 6,
    jobType: "Remote", experience: "Entry-level", salary: "₹5.5 - 8 LPA",
  },
  {
    id: "job-12", type: "job", title: "IT Support Executive", org: "Corewave Systems",
    orgInitial: initial("Corewave Systems"), deadline: days(12), skills: ["Networking", "Windows Server", "Troubleshooting"],
    location: "Nashik", remote: false, description: "Handle internal IT tickets, basic network administration, and hardware troubleshooting.",
    eligibility: "Fresher, basic networking knowledge", postedDaysAgo: 9,
    jobType: "Full-time", experience: "Fresher", salary: "₹2.8 - 3.6 LPA",
  },
  {
    id: "job-13", type: "job", title: "Machine Learning Engineer — Junior", org: "Prisma AI",
    orgInitial: initial("Prisma AI"), deadline: days(13), skills: ["Python", "TensorFlow", "ML"],
    location: "Bangalore", remote: false, description: "Support model training pipelines and experiment tracking for a computer-vision product.",
    eligibility: "Strong Python + ML fundamentals", postedDaysAgo: 4,
    jobType: "Full-time", experience: "Fresher", salary: "₹6 - 9 LPA",
  },
  {
    id: "job-14", type: "job", title: "Technical Support — Cybersecurity Product", org: "Bastion Networks",
    orgInitial: initial("Bastion Networks"), deadline: days(14), skills: ["Cybersecurity", "Networking", "Customer Support"],
    location: "Remote", remote: true, description: "Support enterprise customers using a firewall/VPN product; escalate complex issues to engineering.",
    eligibility: "Basic networking + security concepts", postedDaysAgo: 2,
    jobType: "Remote", experience: "Fresher", salary: "₹3.5 - 5 LPA",
  },
  {
    id: "job-15", type: "job", title: "Content & Growth Associate", org: "Loopwire",
    orgInitial: initial("Loopwire"), deadline: days(-1), skills: ["Writing", "SEO", "Analytics"],
    location: "Remote", remote: true, description: "Own blog content and organic growth experiments for an early-stage startup.",
    eligibility: "Fresher", postedDaysAgo: 15,
    jobType: "Remote", experience: "Fresher", salary: "₹3 - 4 LPA",
  },
];

export const internships: Internship[] = [
  {
    id: "int-1", type: "internship", title: "Cybersecurity Intern", org: "CyberShield Technologies",
    orgInitial: initial("CyberShield Technologies"), deadline: hrs(14), skills: ["Cybersecurity", "Networking", "Linux"],
    location: "Remote", remote: true, description: "Assist the SOC team with log analysis, basic threat hunting, and documentation. Great entry point into security.",
    eligibility: "Final-year students", postedDaysAgo: 2,
    duration: "3 months", paid: true, stipend: "₹15,000/month", mode: "Remote", domain: "Cybersecurity",
  },
  {
    id: "int-2", type: "internship", title: "Frontend Development Intern", org: "Nimbus Labs",
    orgInitial: initial("Nimbus Labs"), deadline: days(1), skills: ["React", "Tailwind CSS", "Git"],
    location: "Bangalore", remote: false, description: "Work directly with the product team shipping real features to production every sprint.",
    eligibility: "2nd/3rd year students", postedDaysAgo: 4,
    duration: "3 months", paid: true, stipend: "₹10,000/month", mode: "In-office", domain: "Development",
  },
  {
    id: "int-3", type: "internship", title: "AI/ML Research Intern", org: "Prisma AI",
    orgInitial: initial("Prisma AI"), deadline: days(2), skills: ["Python", "ML", "Research"],
    location: "Remote", remote: true, description: "Support research experiments and literature review for a small applied-AI research pod.",
    eligibility: "Strong Python fundamentals", postedDaysAgo: 3,
    duration: "6 months", paid: true, stipend: "₹18,000/month", mode: "Remote", domain: "AI/ML",
  },
  {
    id: "int-4", type: "internship", title: "Penetration Testing Intern", org: "RedHawk Security",
    orgInitial: initial("RedHawk Security"), deadline: days(3), skills: ["Cybersecurity", "OWASP", "Burp Suite"],
    location: "Mumbai", remote: false, description: "Shadow senior pentesters on live engagements and help draft vulnerability reports.",
    eligibility: "Basic security knowledge, 3rd year+", postedDaysAgo: 6,
    duration: "3 months", paid: true, stipend: "₹12,000/month", mode: "In-office", domain: "Cybersecurity",
  },
  {
    id: "int-5", type: "internship", title: "Data Analytics Intern", org: "Metricly",
    orgInitial: initial("Metricly"), deadline: days(4), skills: ["SQL", "Excel", "Power BI"],
    location: "Remote", remote: true, description: "Build weekly reporting dashboards and help clean up messy product datasets.",
    eligibility: "Any year, basic SQL", postedDaysAgo: 5,
    duration: "2 months", paid: true, stipend: "₹8,000/month", mode: "Remote", domain: "Data Science",
  },
  {
    id: "int-6", type: "internship", title: "UI/UX Design Intern", org: "Formless",
    orgInitial: initial("Formless"), deadline: days(5), skills: ["Figma", "UI/UX", "Design Systems"],
    location: "Bangalore", remote: false, description: "Design real screens for a live product and present work in weekly design reviews.",
    eligibility: "Portfolio required", postedDaysAgo: 2,
    duration: "3 months", paid: true, stipend: "₹9,000/month", mode: "Hybrid", domain: "Design",
  },
  {
    id: "int-7", type: "internship", title: "Cloud & DevOps Intern", org: "SkyGrid Cloud",
    orgInitial: initial("SkyGrid Cloud"), deadline: days(6), skills: ["AWS", "Docker", "Linux"],
    location: "Remote", remote: true, description: "Get hands-on with real cloud infrastructure — deployments, monitoring, and basic automation.",
    eligibility: "Basic Linux/cloud knowledge", postedDaysAgo: 7,
    duration: "3 months", paid: true, stipend: "₹11,000/month", mode: "Remote", domain: "Development",
  },
  {
    id: "int-8", type: "internship", title: "Network Security Intern", org: "Bastion Networks",
    orgInitial: initial("Bastion Networks"), deadline: days(7), skills: ["Networking", "Cybersecurity", "Firewalls"],
    location: "Remote", remote: true, description: "Learn firewall/VPN configuration and help test security product releases before launch.",
    eligibility: "Basic networking concepts", postedDaysAgo: 1,
    duration: "3 months", paid: true, stipend: "₹10,000/month", mode: "Remote", domain: "Cybersecurity",
  },
  {
    id: "int-9", type: "internship", title: "Backend Development Intern", org: "Fintrack",
    orgInitial: initial("Fintrack"), deadline: days(8), skills: ["Node.js", "MongoDB", "APIs"],
    location: "Remote", remote: true, description: "Build and test new API endpoints for a growing personal-finance product.",
    eligibility: "2nd/3rd year students", postedDaysAgo: 3,
    duration: "3 months", paid: true, stipend: "₹9,500/month", mode: "Remote", domain: "Development",
  },
  {
    id: "int-10", type: "internship", title: "Marketing & Growth Intern", org: "Loopwire",
    orgInitial: initial("Loopwire"), deadline: days(9), skills: ["Content Writing", "SEO", "Social Media"],
    location: "Remote", remote: true, description: "Run small growth experiments and manage content calendars for an early-stage startup.",
    eligibility: "Any year", postedDaysAgo: 8,
    duration: "2 months", paid: false, stipend: "Unpaid + certificate", mode: "Remote", domain: "Business",
  },
  {
    id: "int-11", type: "internship", title: "Mobile App Dev Intern — Flutter", org: "Appcove",
    orgInitial: initial("Appcove"), deadline: days(10), skills: ["Flutter", "Dart"],
    location: "Remote", remote: true, description: "Ship small features and bug fixes across two live consumer apps.",
    eligibility: "Basic Flutter/Dart knowledge", postedDaysAgo: 4,
    duration: "3 months", paid: true, stipend: "₹8,500/month", mode: "Remote", domain: "Development",
  },
  {
    id: "int-12", type: "internship", title: "SOC Monitoring Intern", org: "Vantage Point InfoSec",
    orgInitial: initial("Vantage Point InfoSec"), deadline: days(12), skills: ["Cybersecurity", "SIEM"],
    location: "Noida", remote: false, description: "Observe and assist analysts monitoring live security dashboards for enterprise clients.",
    eligibility: "Basic networking/security knowledge", postedDaysAgo: 6,
    duration: "1 month", paid: true, stipend: "₹6,000/month", mode: "In-office", domain: "Cybersecurity",
  },
  {
    id: "int-13", type: "internship", title: "Business Analyst Intern", org: "Metricly",
    orgInitial: initial("Metricly"), deadline: days(-2), skills: ["Excel", "SQL", "Communication"],
    location: "Remote", remote: true, description: "Support the product team with market research and internal reporting.",
    eligibility: "Any year", postedDaysAgo: 20,
    duration: "2 months", paid: true, stipend: "₹7,000/month", mode: "Remote", domain: "Business",
  },
];

export const hackathons: Hackathon[] = [
  {
    id: "hack-1", type: "hackathon", title: "AI Innovate 2026", org: "TechNova Foundation",
    orgInitial: initial("TechNova Foundation"), deadline: hrs(20), skills: ["AI/ML", "Python", "Open Innovation"],
    location: "Online", remote: true, description: "Build an AI-powered solution to any real-world problem of your choice. Open to individuals and teams.",
    eligibility: "All students, any year", postedDaysAgo: 5,
    soloFriendly: true, teamSize: "1-4 members", mode: "Online", prizePool: "₹2,00,000", beginnerFriendly: true, technology: "AI/ML",
  },
  {
    id: "hack-2", type: "hackathon", title: "Null Origin CTF Challenge", org: "Cyber HX",
    orgInitial: initial("Cyber HX"), deadline: days(1), skills: ["Cybersecurity", "CTF", "Cryptography"],
    location: "Online", remote: true, description: "Capture-the-flag challenge covering web exploitation, crypto, forensics, and reverse engineering.",
    eligibility: "Open to all, solo participation encouraged", postedDaysAgo: 8,
    soloFriendly: true, teamSize: "1 member", mode: "Online", prizePool: "₹50,000", beginnerFriendly: false, technology: "Cybersecurity",
  },
  {
    id: "hack-3", type: "hackathon", title: "Hack Devengers 1.0", org: "Team Devengers",
    orgInitial: initial("Team Devengers"), deadline: hrs(6), skills: ["Web Development", "Open Innovation"],
    location: "Online", remote: true, description: "Open innovation web app challenge — build a functional, responsive website solving a real-world problem.",
    eligibility: "Open to all students", postedDaysAgo: 1,
    soloFriendly: true, teamSize: "1-4 members", mode: "Online", prizePool: "Certificates + Goodies", beginnerFriendly: true, technology: "Web Development",
  },
  {
    id: "hack-4", type: "hackathon", title: "FinHack — Fintech Challenge", org: "PayCircle",
    orgInitial: initial("PayCircle"), deadline: days(3), skills: ["Fintech", "Blockchain", "APIs"],
    location: "Mumbai", remote: false, description: "Design solutions for financial inclusion using APIs from a real payments platform.",
    eligibility: "Teams of 2-4", postedDaysAgo: 6,
    soloFriendly: false, teamSize: "2-4 members", mode: "Offline", prizePool: "₹3,00,000", beginnerFriendly: false, technology: "Blockchain",
  },
  {
    id: "hack-5", type: "hackathon", title: "SecureStack CTF", org: "InfoSec Guild",
    orgInitial: initial("InfoSec Guild"), deadline: days(4), skills: ["Cybersecurity", "Networking", "OSINT"],
    location: "Online", remote: true, description: "Beginner-friendly CTF covering OSINT, basic pwn, and web exploitation — a great first CTF.",
    eligibility: "Beginners welcome, solo allowed", postedDaysAgo: 3,
    soloFriendly: true, teamSize: "1-2 members", mode: "Online", prizePool: "₹30,000", beginnerFriendly: true, technology: "Cybersecurity",
  },
  {
    id: "hack-6", type: "hackathon", title: "Open Innovation Sprint", org: "Newgen x AI Club IITM",
    orgInitial: initial("Newgen x AI Club IITM"), deadline: days(5), skills: ["Low-code", "AI", "Business"],
    location: "Online", remote: true, description: "Solve a real business problem on the NewgenONE platform with generative AI features.",
    eligibility: "Teams of 2", postedDaysAgo: 4,
    soloFriendly: false, teamSize: "2 members", mode: "Online", prizePool: "₹1,50,000", beginnerFriendly: true, technology: "AI/ML",
  },
  {
    id: "hack-7", type: "hackathon", title: "AppSec Village CTF", org: "Cyber HX",
    orgInitial: initial("Cyber HX"), deadline: days(6), skills: ["Cybersecurity", "Web Security", "OWASP"],
    location: "Online", remote: true, description: "Web application security focused CTF with challenges mapped to the OWASP Top 10.",
    eligibility: "Solo or duo", postedDaysAgo: 2,
    soloFriendly: true, teamSize: "1-2 members", mode: "Online", prizePool: "₹40,000", beginnerFriendly: false, technology: "Cybersecurity",
  },
  {
    id: "hack-8", type: "hackathon", title: "Campus Build-a-thon", org: "DevCircle",
    orgInitial: initial("DevCircle"), deadline: days(7), skills: ["Web Development", "Mobile", "Open Innovation"],
    location: "Nashik", remote: false, description: "24-hour offline hackathon for students to build anything — web, mobile, or hardware.",
    eligibility: "Teams of up to 4", postedDaysAgo: 5,
    soloFriendly: true, teamSize: "1-4 members", mode: "Offline", prizePool: "₹1,00,000", beginnerFriendly: true, technology: "Open Innovation",
  },
  {
    id: "hack-9", type: "hackathon", title: "GreenTech Hack", org: "EcoForward",
    orgInitial: initial("EcoForward"), deadline: days(8), skills: ["Sustainability", "IoT", "Open Innovation"],
    location: "Online", remote: true, description: "Build tech-driven solutions for climate and sustainability challenges.",
    eligibility: "Teams of 2-4", postedDaysAgo: 9,
    soloFriendly: false, teamSize: "2-4 members", mode: "Online", prizePool: "₹80,000", beginnerFriendly: true, technology: "Open Innovation",
  },
  {
    id: "hack-10", type: "hackathon", title: "Reverse Engineering Rumble", org: "Cyber HX",
    orgInitial: initial("Cyber HX"), deadline: days(9), skills: ["Cybersecurity", "Reverse Engineering", "Binary Exploitation"],
    location: "Online", remote: true, description: "Advanced CTF focused on reverse engineering and binary exploitation challenges.",
    eligibility: "Intermediate to advanced, solo allowed", postedDaysAgo: 7,
    soloFriendly: true, teamSize: "1 member", mode: "Online", prizePool: "₹60,000", beginnerFriendly: false, technology: "Cybersecurity",
  },
  {
    id: "hack-11", type: "hackathon", title: "HealthTech Hackfest", org: "MedBridge",
    orgInitial: initial("MedBridge"), deadline: days(10), skills: ["Healthcare", "Mobile Dev", "AI/ML"],
    location: "Pune", remote: false, description: "Build digital health solutions with mentorship from healthcare industry experts.",
    eligibility: "Teams of 2-4", postedDaysAgo: 6,
    soloFriendly: false, teamSize: "2-4 members", mode: "Offline", prizePool: "₹1,50,000", beginnerFriendly: false, technology: "AI/ML",
  },
  {
    id: "hack-12", type: "hackathon", title: "Solo Coder Cup", org: "IndieHack",
    orgInitial: initial("IndieHack"), deadline: days(11), skills: ["Web Development", "Design", "Open Innovation"],
    location: "Online", remote: true, description: "A hackathon designed entirely for solo builders — no teams allowed, everyone competes individually.",
    eligibility: "Individuals only", postedDaysAgo: 3,
    soloFriendly: true, teamSize: "1 member", mode: "Online", prizePool: "₹75,000", beginnerFriendly: true, technology: "Open Innovation",
  },
  {
    id: "hack-13", type: "hackathon", title: "Blockchain Builders Weekend", org: "ChainForge",
    orgInitial: initial("ChainForge"), deadline: days(13), skills: ["Blockchain", "Solidity", "Web3"],
    location: "Online", remote: true, description: "Build decentralized applications over a weekend with mentorship from Web3 engineers.",
    eligibility: "Teams of up to 3", postedDaysAgo: 4,
    soloFriendly: false, teamSize: "1-3 members", mode: "Online", prizePool: "₹2,50,000", beginnerFriendly: false, technology: "Blockchain",
  },
  {
    id: "hack-14", type: "hackathon", title: "Beginner's CTF League", org: "InfoSec Guild",
    orgInitial: initial("InfoSec Guild"), deadline: days(14), skills: ["Cybersecurity", "CTF"],
    location: "Online", remote: true, description: "A gentle introduction to capture-the-flag competitions, with write-ups provided after each round.",
    eligibility: "Beginners, solo participation", postedDaysAgo: 2,
    soloFriendly: true, teamSize: "1 member", mode: "Online", prizePool: "Certificates + Swag", beginnerFriendly: true, technology: "Cybersecurity",
  },
  {
    id: "hack-15", type: "hackathon", title: "EdTech Innovation Challenge", org: "LearnSphere",
    orgInitial: initial("LearnSphere"), deadline: days(-1), skills: ["EdTech", "Mobile Dev"],
    location: "Online", remote: true, description: "Reimagine how students learn with a functional edtech prototype.",
    eligibility: "Teams of 2-4", postedDaysAgo: 18,
    soloFriendly: false, teamSize: "2-4 members", mode: "Online", prizePool: "₹1,00,000", beginnerFriendly: true, technology: "Open Innovation",
  },
];

export const allOpportunities: Opportunity[] = [...jobs, ...internships, ...hackathons];

export const isExpired = (deadline: string) => new Date(deadline).getTime() < Date.now();

export const activeOpportunities = allOpportunities.filter((o) => !isExpired(o.deadline));
