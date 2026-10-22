import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, Youtube, Pin } from "lucide-react";
import { QUICK_LINKS, CUSTOMER_CARE } from "../../data";
import { serif } from "../../utils/format";
import Container from "../../components/common/Container";
import Logo from "../../components/common/Logo";

const FooterList = ({ title, items }) => (
  <div>
    <h4 className={`${serif} mb-3 text-[14px] font-semibold text-white`}>{title}</h4>
    <ul className="space-y-1.5 text-[10px] text-[#cbbd9f]">
      {items.map((x) => (
        <li key={x.label || x}>
          {x.to ? <Link to={x.to} className="hover:text-white">{x.label}</Link> : <a href="#" className="hover:text-white">{x}</a>}
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-[#231810] text-[#cbbd9f]">
    <Container className="grid gap-8 py-8 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
      <div>
        <Logo dark />
        <p className={`${serif} mt-3 max-w-[200px] text-[11px] leading-snug`}>A celebration of timeless style, modern elegance and the unique grace in every woman.<br />By Gouri Garments.</p>
        <div className="mt-3 flex gap-3 text-white"><Instagram size={14} /><Facebook size={14} /><Youtube size={14} /><Pin size={14} /></div>
      </div>
      <FooterList title="Quick Links" items={QUICK_LINKS} />
      <FooterList title="Customer Care" items={CUSTOMER_CARE} />
      <div className="md:border-l md:border-[#4a3a28] md:pl-8">
        <h4 className={`${serif} mb-3 text-[14px] font-semibold text-white`}>Gouri Garments</h4>
        <ul className="space-y-2.5 text-[10px]">
          <li className="flex items-center gap-2.5"><MapPin size={12} className="text-white" /> Kolkata, West Bengal</li>
          <li className="flex items-center gap-2.5"><Mail size={12} className="text-white" /> contact@gourigarments.com</li>
          <li className="flex items-center gap-2.5"><Phone size={12} className="text-white" /> +91 99178 00000</li>
          <li className="flex items-center gap-2.5"><Clock size={12} className="text-white" /> Mon - Sat, 10:00 AM - 7:00 PM</li>
        </ul>
      </div>
    </Container>
    <div className="border-t border-[#3a2b1c]">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[9px]">
        <span>© 2026 FLORANZA. All rights reserved. &nbsp;|&nbsp; By Gouri Garments, Kolkata.</span>
        <span className="flex gap-3">
          <a href="#">Privacy Policy</a>|<a href="#">Terms &amp; Conditions</a>|<a href="#">Sitemap</a>
        </span>
      </Container>
    </div>
  </footer>
);

export default Footer;
