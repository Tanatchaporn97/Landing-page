with open("app/influencer/page.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
i = 0
while i < len(lines):
    if i == 7: # Line 8
        new_lines.append('const KT = { fontFamily: "var(--font-kanit),\'Noto Sans Thai\',sans-serif" };\n\n')
        new_lines.append('import Navbar from "../components/Navbar";\n')
        new_lines.append('import Footer from "../components/Footer";\n')
        new_lines.append('import FAQAccordion from "../components/FAQAccordion";\n')
        new_lines.append('import TestimonialsGrid from "../components/TestimonialsGrid";\n')
        new_lines.append('import LogoMarquee from "../components/LogoMarquee";\n')
        new_lines.append('import SuccessStoriesSlider from "../components/SuccessStoriesSlider";\n\n')
        new_lines.append('const PTP_STEPS = [\n')
        new_lines.append('  { step: "01", img: "/path-to-partnership/Step-1.png", title: "สมัครเป็นอินฟลูกับเรา", desc: "สมัครบัญชีอินฟลูเอนเซอร์ง่ายๆ แค่ 5 นาที พร้อมเชื่อมต่อช่องทางโซเชียลมีเดีย ให้เรารู้จักคุณมากขึ้นและเปิดโอกาสในการร่วมงานกับแบรนด์ชั้นนำ" },\n')
        new_lines.append('  { step: "02", img: "/path-to-partnership/Step-2.png", title: "ค้นหางานที่ใช่", desc: "เลือกดูงานรีวิวจากแบรนด์ดังที่คัดมาให้คุณโดยเฉพาะ เมื่อเจอที่ชอบก็คลิกสมัครได้เลย ไม่ต้องรอช้า!" },\n')
        new_lines.append('  { step: "03", img: "/path-to-partnership/Step-3.png", title: "คอนเฟิร์มและรับบรีฟ", desc: "เมื่อได้รับการคัดเลือกจากแบรนด์ ทีมงานติดต่อกลับเพื่อคอนเฟิร์มการรับงานและส่งรายละเอียดบรีฟ" },\n')
        new_lines.append('  { step: "04", img: "/path-to-partnership/Step-4.png", title: "สร้างสรรค์ได้เลย", desc: "สร้างสรรค์คอนเทนต์สุดปังในสไตล์ของคุณได้เต็มที่ จากนั้นส่งดราฟต์ให้เราตรวจสอบผ่านแพลตฟอร์มของเราได้เลยแบบง่ายๆ" },\n')
        new_lines.append('  { step: "05", img: "/path-to-partnership/Step-5.png", title: "รอตรวจดราฟต์", desc: "ทีมงานจะแจ้งกลับทันทีหากมีการแก้ไข แต่ถ้าคอนเทนต์ของคุณพร้อมแล้ว ก็เตรียมตัวโพสต์ตามกำหนดการได้เลย" },\n')
        new_lines.append('  { step: "06", img: "/path-to-partnership/Step-6.png", title: "ลงโพสต์", desc: "ได้เวลาไวรัล! โพสต์คอนเทนต์สุดปังของคุณให้กับผู้ติดตามของคุณได้เลย" },\n')
        new_lines.append('  { step: "07", img: "/path-to-partnership/Step-7.png", title: "รับเงินได้เลย", desc: "โดยจ่ายเป็น Buddy Points ซึ่งสามารถนำพอยท์ไปแลกเป็นเงินสดได้ทันที ไม่มีเบี้ยว" },\n')
        new_lines.append('];\n\n')
        i = 159 # Skip to line 160
    elif i == 161: # Line 162
        new_lines.append('  const [ptpIndex, setPtpIndex] = useState(0);\n')
        new_lines.append('  const [hoveredUnlock, setHoveredUnlock] = useState<number | null>(null);\n')
        new_lines.append('  const ptpRef = useRef<HTMLDivElement>(null);\n\n')
        i = 178 # Skip to line 179
    elif i == 210: # Line 211
        new_lines.append('      {/* ── Navbar ── */}\n')
        new_lines.append('      <Navbar />\n\n')
        i = 290 # Skip to line 291
    elif i == 474: # Line 475
        new_lines.append('      {/* ── Brand Logos Marquee ── */}\n')
        new_lines.append('      <LogoMarquee />\n\n')
        i = 489
    elif i == 718: # Line 719
        new_lines.append('      {/* ── Case Studies ── */}\n')
        new_lines.append('      <SuccessStoriesSlider />\n\n')
        i = 801
    elif i == 830: # Line 831
        new_lines.append('      {/* ── FAQs ── */}\n')
        new_lines.append('      <FAQAccordion />\n\n')
        i = 950
    elif i == 951: # Line 952
        new_lines.append('      {/* ── Footer ── */}\n')
        new_lines.append('      <Footer />\n')
        i = 1022
    else:
        new_lines.append(lines[i])
        i += 1

with open("app/influencer/page.tsx", "w") as f:
    f.writelines(new_lines)
