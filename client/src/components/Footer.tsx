import React from "react";
import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface FooterColumn {
  titleKey: string;
  links: { key: string; href: string }[];
}

const COLUMNS: FooterColumn[] = [
  {
    titleKey: "footer.product",
    links: [
      { key: "footer.features", href: "#features" },
      { key: "footer.pricing", href: "#pricing" },
      { key: "footer.security", href: "#security" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { key: "footer.about", href: "#about" },
      { key: "footer.blog", href: "#blog" },
      { key: "footer.careers", href: "#careers" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { key: "footer.documentation", href: "#docs" },
      { key: "footer.support", href: "#support" },
      { key: "footer.community", href: "#community" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { key: "footer.privacy", href: "#privacy" },
      { key: "footer.terms", href: "#terms" },
      { key: "footer.contact", href: "#contact" },
    ],
  },
];

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="text-lg font-extrabold bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent">
                {t("common.appName")}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {t("home.tagline")}
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="text-slate-600 hover:text-cyan-700 transition-colors"
                    >
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-slate-500">
            © {year} {t("common.appName")}. {t("footer.allRightsReserved")}
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-cyan-700 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-cyan-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-cyan-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
