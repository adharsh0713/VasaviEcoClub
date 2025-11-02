import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-md">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">VCE Eco Club</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building a sustainable future through collective action and environmental awareness.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/activities" className="hover:text-foreground transition-colors" data-testid="footer-link-events">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors" data-testid="footer-link-projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-foreground transition-colors" data-testid="footer-link-gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-foreground transition-colors" data-testid="footer-link-impact">
                  Our Impact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span data-testid="text-contact-email">vceecoclub@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span data-testid="text-contact-phone">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-testid="text-contact-location">JC Block Room no 208</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p data-testid="text-copyright">© {currentYear} VCE Eco Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
