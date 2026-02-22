import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";

const SOCIAL_LINKS = [
  { icon: faGithub,   href: "https://github.com/dzeno0405",                           label: "GitHub" },
  { icon: faLinkedin, href: "https://www.linkedin.com/in/dzenan-polutak-28098b168/", label: "LinkedIn" },
  { icon: faInstagram,href: "https://www.instagram.com/dzeno0405/",                  label: "Instagram" },
  { icon: faFacebook, href: "https://www.facebook.com/dpolutak/",                    label: "Facebook" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} Dzenan Polutak
        </span>
        <ul className="footer-links" aria-label="Social links">
          {SOCIAL_LINKS.map(({ icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-link"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
