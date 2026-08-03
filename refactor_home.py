import re

def refactor():
    with open('app/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add Imports
    imports = """import Navbar from "./components/Navbar";
import LogoMarquee from "./components/LogoMarquee";
import CategoriesMarquee from "./components/CategoriesMarquee";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import KolPackagesSection from "./components/KolPackagesSection";
import BlogPostsSection from "./components/BlogPostsSection";
import FAQAccordion from "./components/FAQAccordion";
import ContactFormSection from "./components/ContactFormSection";
import Footer from "./components/Footer";
"""
    content = content.replace('import { motion } from "motion/react";\n', 'import { motion } from "motion/react";\n' + imports + '\n')

    # 2. Remove LogoMarquee, CatCard, CategoriesMarquee, TestimonialsCarousel (lines 13-235 approx)
    # Using regex to remove from /* ── Logo Marquee ── */ to just before /* ── Icons ── */
    content = re.sub(r'/\* ── Logo Marquee ── \*/.*?/\* ── Icons ── \*/', '/* ── Icons ── */', content, flags=re.DOTALL)

    # 3. Remove BLOG_POSTS, KOL_PACKAGES, TESTIMONIALS, INF_CATEGORIES
    content = re.sub(r'const BLOG_POSTS = \[.*?\n\];\n', '', content, flags=re.DOTALL)
    content = re.sub(r'const KOL_PACKAGES = \[.*?\n\];\n', '', content, flags=re.DOTALL)
    content = re.sub(r'const TESTIMONIALS = \[.*?\n\];\n', '', content, flags=re.DOTALL)
    content = re.sub(r'const INF_CATEGORIES = \[.*?\n\];\n', '', content, flags=re.DOTALL)

    # 4. Remove contact form states from Home component
    content = re.sub(r'  const \[consented, setConsented\].*?\n', '', content)
    content = re.sub(r'  const \[formData, setFormData\].*?\n', '', content)
    content = re.sub(r'  const \[formStatus, setFormStatus\].*?\n', '', content)
    content = re.sub(r'  const \[faqOpen, setFaqOpen\].*?\n', '', content)
    content = re.sub(r'  const \[menuOpen, setMenuOpen\].*?\n', '', content)
    content = re.sub(r'  const \[expandedKol, setExpandedKol\].*?\n', '', content)
    
    # 5. Remove handleFormChange and handleFormSubmit
    content = re.sub(r'  const handleFormChange =.*?};\n', '', content, flags=re.DOTALL)
    content = re.sub(r'  const handleFormSubmit =.*?};\n', '', content, flags=re.DOTALL)

    # 6. Replace Navbar
    content = re.sub(
        r'      {/\* ── Navbar ── \*/}.*?      {/\* ── Hero ── \*/}',
        '      {/* ── Navbar ── */}\n      <Navbar variant="home" lang={lang} onLangChange={setLang} />\n\n      {/* ── Hero ── */}',
        content,
        flags=re.DOTALL
    )

    # 7. Replace Brand Logos Marquee
    content = re.sub(
        r'      {/\* ── Brand Logos Marquee ── \*/}.*?      {/\* ── Your Trusted Partner ── \*/}',
        '      {/* ── Brand Logos Marquee ── */}\n      <LogoMarquee />\n\n      {/* ── Your Trusted Partner ── */}',
        content,
        flags=re.DOTALL
    )

    # 8. Replace Trust Influencers TestimonialsCarousel
    content = re.sub(
        r'          {/\* Infinite marquee — auto-slides right to left \*/}\n          <TestimonialsCarousel items={TESTIMONIALS} lang={lang} />',
        '          {/* Infinite marquee — auto-slides right to left */}\n          <TestimonialsCarousel lang={lang} />',
        content,
        flags=re.DOTALL
    )

    # 9. Replace Influencer Categories Marquee
    content = re.sub(
        r'        <CategoriesMarquee categories={INF_CATEGORIES} />',
        '        <CategoriesMarquee />',
        content
    )

    # 10. Replace KOL Campaign Packages
    content = re.sub(
        r'      {/\* ── KOL Campaign Packages ── \*/}.*?      {/\* ── Industry Insights ── \*/}',
        '      {/* ── KOL Campaign Packages ── */}\n      <KolPackagesSection lang={lang} />\n\n      {/* ── Industry Insights ── */}',
        content,
        flags=re.DOTALL
    )

    # 11. Replace Industry Insights (BlogPostsSection)
    content = re.sub(
        r'      {/\* ── Industry Insights ── \*/}.*?      {/\* ── FAQs ── \*/}',
        '      {/* ── Industry Insights ── */}\n      <BlogPostsSection lang={lang} />\n\n      {/* ── FAQs ── */}',
        content,
        flags=re.DOTALL
    )

    # 12. Extract FAQS_LANDING out of Home and replace FAQ section
    faqs_landing_match = re.search(r'        const FAQS_LANDING = \[.*?        \];', content, flags=re.DOTALL)
    if faqs_landing_match:
        faqs_landing = faqs_landing_match.group(0).replace('        const FAQS_LANDING', 'const FAQS_LANDING')
        content = content.replace(faqs_landing_match.group(0), '')
        content = content.replace('export default function Home() {', f'{faqs_landing}\n\nexport default function Home() {{')

    content = re.sub(
        r'      {/\* ── FAQs ── \*/}.*?      {/\* ── Contact Us ── \*/}',
        '      {/* ── FAQs ── */}\n      <FAQAccordion faqs={FAQS_LANDING} lang={lang} variant="home" />\n\n      {/* ── Contact Us ── */}',
        content,
        flags=re.DOTALL
    )

    # 13. Replace Contact Us section
    content = re.sub(
        r'      {/\* ── Contact Us ── \*/}.*?      {/\* ── Footer ── \*/}',
        '      {/* ── Contact Us ── */}\n      <ContactFormSection lang={lang} />\n\n      {/* ── Footer ── */}',
        content,
        flags=re.DOTALL
    )

    # 14. Replace Footer
    content = re.sub(
        r'      {/\* ── Footer ── \*/}.*?      </footer>',
        '      {/* ── Footer ── */}\n      <Footer variant="home" />',
        content,
        flags=re.DOTALL
    )

    # 15. Write back
    with open('app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    refactor()
