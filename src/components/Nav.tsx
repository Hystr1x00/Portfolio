import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-12 flex justify-between items-center glass border-b-0 backdrop-blur-md">
            <Link href="/" className="font-display font-bold text-xl text-white tracking-widest">
                PORTFOLIO
            </Link>
            <div className="flex gap-8">
                {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="font-mono text-sm text-slate-400 hover:text-[#00d4ff] transition-colors"
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
