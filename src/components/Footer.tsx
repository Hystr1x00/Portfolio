export default function Footer() {
    return (
        <footer className="py-8 border-t border-[#00d4ff15] text-center">
            <p className="font-mono text-xs text-slate-500">
                Built with Next.js & Tailwind CSS. © {new Date().getFullYear()}
            </p>
        </footer>
    )
}
