import re

def refactor():
    with open('app/faq/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Imports
    imports = """import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQAccordion from "../components/FAQAccordion";
"""
    content = re.sub(r'import { useSearchParams } from "next/navigation";\n', 'import { useSearchParams } from "next/navigation";\n' + imports, content)

    # Remove SOCIAL
    content = re.sub(r'const SOCIAL = \[.*?\];\n', '', content, flags=re.DOTALL)

    # Remove FaqAccordion component
    content = re.sub(r'function FaqAccordion.*?  \);\n}\n', '', content, flags=re.DOTALL)

    # Remove SharedFooter component
    content = re.sub(r'function SharedFooter.*?  \);\n}\n', '', content, flags=re.DOTALL)

    # Remove LandingNavbar component
    content = re.sub(r'function LandingNavbar.*?  \);\n}\n', '', content, flags=re.DOTALL)

    # Remove InfluencerNavbar component
    content = re.sub(r'function InfluencerNavbar.*?  \);\n}\n', '', content, flags=re.DOTALL)

    # In FaqPageContent:
    # Remove const textColor and gradientEnd
    content = re.sub(r'  const textColor = .*?;\n', '', content)
    content = re.sub(r'  const gradientEnd = .*?;\n', '', content)

    # Replace Navbars
    content = content.replace(
        '{fromInfluencer ? <InfluencerNavbar /> : <LandingNavbar />}',
        '{fromInfluencer ? <Navbar variant="influencer" /> : <Navbar variant="home" />}'
    )

    # Replace FaqAccordion
    content = content.replace(
        '<FaqAccordion faqs={active.faqs} />',
        '<div style={{ marginTop: "-100px" }}><FAQAccordion faqs={active.faqs} variant="influencer" hideCta={true} /></div>'
    )
    # Wait, the padding on FAQAccordion is 100px top and bottom. 
    # faq/page.tsx has padding 0 48px 80px on its container. 
    # Let's adjust the padding wrapper or just use the negative margin. 
    # I'll just use the FAQAccordion directly and see.

    # Replace Footer
    content = content.replace(
        '<SharedFooter textColor={textColor} gradientEnd={gradientEnd} />',
        '<Footer variant={fromInfluencer ? "influencer" : "home"} />'
    )

    # Clean up empty lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open('app/faq/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    refactor()
