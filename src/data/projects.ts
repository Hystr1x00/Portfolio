export interface Project {
    id: number;
    title: string;
    type: string;
    desc: string;
    tech: string[];
    status: string;
    featured: boolean;
    metrics: [string, string][];
    color: string;
    link: string;
    github: string;
    images: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'FinFlow',
        type: 'FINTECH · SaaS',
        desc: 'A real-time financial dashboard with multi-currency support, transaction analytics, and automated reporting for SMBs. Serves 5,000+ active users.',
        tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
        status: 'LIVE',
        featured: true,
        metrics: [['5K+', 'Users'], ['99.9%', 'Uptime'], ['<100ms', 'API Resp']],
        color: '#00d4ff',
        link: '#',
        github: '#',
        images: [
            `https://placehold.co/800x600/225ad9/ffffff?font=lora&text=FinFlow+Main`,
            `https://placehold.co/800x600/00d4ff/000000?font=lora&text=FinFlow+Dashboard`,
            `https://placehold.co/800x600/316ac5/ffffff?font=lora&text=FinFlow+Analytics`
        ]
    },
    {
        id: 2,
        title: 'ShopX Platform',
        type: 'E-COMMERCE',
        desc: 'Multi-vendor e-commerce platform with real-time inventory, vendor dashboards, and seamless payment integrations. Built to scale.',
        tech: ['React', 'NestJS', 'MongoDB', 'Socket.io', 'AWS S3'],
        status: 'LIVE',
        featured: true,
        metrics: [['200+', 'Vendors'], ['10K+', 'Products'], ['3x', 'Perf Gain']],
        color: '#00ffcc',
        link: '#',
        github: '#',
        images: [
            `https://placehold.co/800x600/225ad9/ffffff?font=lora&text=ShopX+Storefront`,
            `https://placehold.co/800x600/00ffcc/000000?font=lora&text=ShopX+Admin`,
            `https://placehold.co/800x600/316ac5/ffffff?font=lora&text=ShopX+Cart`
        ]
    },
    {
        id: 3,
        title: 'TaskFlow CLI',
        type: 'OPEN SOURCE · TOOL',
        desc: 'A Rust-powered CLI task manager that syncs with Notion and Google Calendar. 800+ GitHub stars.',
        tech: ['Rust', 'Notion API', 'Google APIs', 'SQLite'],
        status: 'OPEN SOURCE',
        featured: false,
        metrics: [['800+', 'Stars'], ['50+', 'Forks'], ['15+', 'Contrib']],
        color: '#7c3aed',
        link: '#',
        github: '#',
        images: [
            `https://placehold.co/800x600/225ad9/ffffff?font=lora&text=TaskFlow+CLI`,
            `https://placehold.co/800x600/7c3aed/ffffff?font=lora&text=TaskFlow+Commands`,
            `https://placehold.co/800x600/316ac5/ffffff?font=lora&text=TaskFlow+Config`
        ]
    },
    {
        id: 4,
        title: 'DevLogger',
        type: 'SAAS · MONITORING',
        desc: 'Lightweight app performance monitoring with real-time alerts, error tracking, and beautiful dashboards.',
        tech: ['Next.js', 'Go', 'TimescaleDB', 'Grafana', 'Docker'],
        status: 'BETA',
        featured: false,
        metrics: [['1M+', 'Events/day'], ['<5ms', 'Ingest'], ['50+', 'Beta Users']],
        color: '#f59e0b',
        link: '#',
        github: '#',
        images: [
            `https://placehold.co/800x600/225ad9/ffffff?font=lora&text=DevLogger+Dashboard`,
            `https://placehold.co/800x600/f59e0b/000000?font=lora&text=DevLogger+Alerts`,
            `https://placehold.co/800x600/316ac5/ffffff?font=lora&text=DevLogger+Settings`,
            `https://placehold.co/800x600/808080/ffffff?font=lora&text=DevLogger+Logs`
        ]
    },
];
