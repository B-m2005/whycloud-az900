export type Domain = "Cloud Concepts" | "Architecture" | "Governance";

export const DOMAINS: { name: Domain; weight: string }[] = [
  { name: "Cloud Concepts", weight: "25–30%" },
  { name: "Architecture", weight: "35–40%" },
  { name: "Governance", weight: "30–35%" },
];

export interface Question {
  id: string;
  domain: Domain;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  whyWrong: string[];
  analogy: string;
}

export const QUESTIONS: Question[] = [
  {
    id: "cc-1",
    domain: "Cloud Concepts",
    prompt: "Which cloud model lets you pay only for the compute you use, with no upfront hardware cost?",
    options: ["Capital expenditure (CapEx)", "Consumption-based model (OpEx)", "Fixed-price leasing", "Reserved on-premises capacity"],
    answer: 1,
    explanation: "The cloud uses a consumption-based (OpEx) model: you pay per use and can scale up or down with no upfront investment.",
    whyWrong: ["CapEx means buying hardware upfront.", "", "Fixed leasing charges regardless of usage.", "On-premises capacity is bought ahead of time — that's CapEx."],
    analogy: "Like buying M-Pesa airtime in small bundles as you need it, instead of paying for a whole year of calls you might never make.",
  },
  {
    id: "cc-2",
    domain: "Cloud Concepts",
    prompt: "In which service model does the provider manage the OS, runtime and infrastructure while you manage only your app and data?",
    options: ["IaaS", "PaaS", "On-premises", "SaaS"],
    answer: 1,
    explanation: "PaaS (e.g. Azure App Service) handles infrastructure, OS and runtime. You focus on code and data.",
    whyWrong: ["IaaS still makes you patch and manage the OS.", "", "On-premises means you manage everything.", "SaaS manages the app too — you just use it."],
    analogy: "PaaS is like renting a fully-equipped stall at Kariakoo market: the stall, power and security are provided — you just bring your goods and sell.",
  },
  {
    id: "cc-3",
    domain: "Cloud Concepts",
    prompt: "Automatically adding resources when demand rises and removing them when it falls is called:",
    options: ["High availability", "Elasticity", "Fault tolerance", "Disaster recovery"],
    answer: 1,
    explanation: "Elasticity is the ability to automatically scale resources up and down in response to demand.",
    whyWrong: ["High availability is about uptime, not scaling.", "", "Fault tolerance keeps running when a component fails.", "Disaster recovery restores service after a major outage."],
    analogy: "A Lagos danfo operator adding extra buses at rush hour and parking them at midday — capacity follows the crowd.",
  },
  {
    id: "ar-1",
    domain: "Architecture",
    prompt: "What is an Azure Availability Zone?",
    options: ["A billing boundary for subscriptions", "A physically separate datacenter group within an Azure region", "A pair of regions on different continents", "A virtual network subnet"],
    answer: 1,
    explanation: "Availability Zones are physically separate locations within a region, each with independent power, cooling and networking.",
    whyWrong: ["Billing boundaries are subscriptions.", "", "That describes region pairs (usually same geography).", "Subnets are networking constructs, not physical sites."],
    analogy: "Like a bank keeping cash in three separate branches across Nairobi — if one branch floods, the other two still serve customers.",
  },
  {
    id: "ar-2",
    domain: "Architecture",
    prompt: "Which Azure service is best for running event-driven code without managing servers?",
    options: ["Azure Virtual Machines", "Azure Functions", "Azure Kubernetes Service", "Azure Virtual Desktop"],
    answer: 1,
    explanation: "Azure Functions is serverless compute: code runs in response to events and you pay only per execution.",
    whyWrong: ["VMs require you to manage the server.", "", "AKS orchestrates containers — you still manage clusters.", "Virtual Desktop delivers desktops, not event-driven code."],
    analogy: "A boda boda you hail only when you need a ride — no owning, fuelling or parking a motorbike yourself.",
  },
  {
    id: "ar-3",
    domain: "Architecture",
    prompt: "Which storage redundancy option replicates data to a secondary region?",
    options: ["LRS", "ZRS", "GRS", "Premium SSD"],
    answer: 2,
    explanation: "Geo-redundant storage (GRS) copies data to a paired secondary region hundreds of kilometres away.",
    whyWrong: ["LRS keeps 3 copies in a single datacenter.", "ZRS spreads copies across zones in one region.", "", "Premium SSD is a performance tier, not redundancy."],
    analogy: "Keeping a copy of your land title deed in Kampala and another with family in Mbarara — one fire can't destroy both.",
  },
  {
    id: "gv-1",
    domain: "Governance",
    prompt: "Which service enforces rules such as 'only deploy resources in South Africa North'?",
    options: ["Azure Policy", "Azure RBAC", "Resource Locks", "Microsoft Defender for Cloud"],
    answer: 0,
    explanation: "Azure Policy evaluates and enforces rules on resource properties like allowed locations or SKUs.",
    whyWrong: ["", "RBAC controls who can act, not what resources look like.", "Locks prevent deletion/modification only.", "Defender focuses on security posture and threats."],
    analogy: "County by-laws that say every new building must have a water tank — whoever builds, the rule applies.",
  },
  {
    id: "gv-2",
    domain: "Governance",
    prompt: "What does Azure RBAC control?",
    options: ["Network traffic between VNets", "Who has access to resources and what they can do", "Costs per department", "Data encryption at rest"],
    answer: 1,
    explanation: "Role-Based Access Control assigns roles (Owner, Contributor, Reader) to users, groups or apps at a scope.",
    whyWrong: ["NSGs/firewalls control traffic.", "", "Cost Management handles spending.", "Encryption is handled by storage/Key Vault."],
    analogy: "In a Kigali office, the receptionist, accountant and MD each get keys only to the rooms their job needs.",
  },
  {
    id: "gv-3",
    domain: "Governance",
    prompt: "Under the shared responsibility model, which is ALWAYS the customer's responsibility?",
    options: ["Physical datacenter security", "Host hypervisor patching", "Data, devices, accounts and identities", "Physical network cabling"],
    answer: 2,
    explanation: "Regardless of IaaS, PaaS or SaaS, you always own your information/data, devices, accounts and identities.",
    whyWrong: ["Microsoft secures the physical datacenter.", "Microsoft patches the host.", "", "Microsoft manages physical networking."],
    analogy: "The matatu SACCO maintains the vehicle, but you're always responsible for your own phone and wallet on board.",
  },
];
