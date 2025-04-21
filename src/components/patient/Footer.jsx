import "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                contact@healthcare.com
              </p>
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Medical Center Dr, Health City
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Emergency
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Emergency Only</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
