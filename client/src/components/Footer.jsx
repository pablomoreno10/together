import UserBox from './UserBox';
function Footer() {
  return (
    <footer className="text-wine py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
            <p className="text-sm font-medium">
                Built for Rutgers University–Newark | Together FC © {new Date().getFullYear()}
            </p>
            <p className="text-xs text-wine">Supporting student-athletes & team unity.</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-wine">
            <a href="https://www.njacsports.com/" target="_blank" rel="noreferrer" className="hover:underline">NJAC Conference</a>
            <a href="https://rutgersnewarkathletics.com/" target="_blank" rel="noreferrer" className="hover:underline">Rutgers–Newark Athletics</a>
            <a href="mailto:pablonicolasmc5@gmail.com" className="hover:underline">Contact Developer</a>
            </div>
            <UserBox />
        </div>
    </footer>

  );
}

export default Footer;
