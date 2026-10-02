import Image from "next/image";

const INF_CATEGORIES = [
  { label: "thisisbebe",                   category: "Sporty & Healthy",  emoji: "💪",  color: "#4caf50",  initial: "T",  photo: "/inf-categories/cat-thisisbebe.jpeg" },
  { label: "ออมมิ่วคิ้วขมวด",              category: "TikTok Stars",      emoji: "🎵",  color: "#e91e8c",  initial: "อ",  photo: "/inf-categories/cat-ommiew.jpeg" },
  { label: "soundtiss",                    category: "Beauty Blogger",    emoji: "💄",  color: "#9c27b0",  initial: "S",  photo: "/inf-categories/cat-soundtiss.jpeg" },
  { label: "อาชิมีลูกชายหรือหญิง",          category: "Beauty Blogger",    emoji: "💄",  color: "#9c27b0",  initial: "อ",  photo: "/inf-categories/cat-archi.jpeg" },
  { label: "Mawinn Taweephol",             category: "Foodie",            emoji: "🍜",  color: "#ff9800",  initial: "M",  photo: "/inf-categories/cat-mawinn.jpeg" },
  { label: "pigkaploy",                    category: "Youtuber",          emoji: "🎬",  color: "#f44336",  initial: "P",  photo: "/inf-categories/cat-pigkaploy.jpeg" },
  { label: "frungnarikunn",               category: "Doctor & Nurse",    emoji: "🩺",  color: "#2196f3",  initial: "F",  photo: "/inf-categories/cat-frungnarikunn.jpeg" },
  { label: "Toeyprim เตยพริมเป็นหมอฟัน",  category: "Dentist",           emoji: "🦷",  color: "#00bcd4",  initial: "T",  photo: "/inf-categories/cat-toeyprim.jpeg" },
  { label: "กิ่งที่ชอบร้องเพลงไง",          category: "Entertainment",     emoji: "🎤",  color: "#e91e8c",  initial: "ก",  photo: "/inf-categories/cat-king.jpg" },
  { label: "รัชนก สุวรรณเกตุ",              category: "Live",              emoji: "🔴",  color: "#f44336",  initial: "ร",  photo: "/inf-categories/cat-ratchanok.jpg" },
  { label: "Boriboon family",              category: "Entertainment",     emoji: "🎤",  color: "#e91e8c",  initial: "B",  photo: "/inf-categories/cat-boriboon-family.jpg" },
  { label: "พาเธอไป Journey",              category: "Lifestyle",         emoji: "✨",  color: "#9c27b0",  initial: "พ",  photo: "/inf-categories/cat-pa-thoe-pai-journey.jpg" },
  { label: "พยาบาลนินิวที่โก๊ะๆอะ",          category: "Lifestyle",         emoji: "✨",  color: "#9c27b0",  initial: "พ",  photo: "/inf-categories/cat-nurse-ninew.jpg" },
  { label: "นัทตี้ ที่เป็น นักข่าว",           category: "Infotainment",      emoji: "📰",  color: "#2196f3",  initial: "น",  photo: "/inf-categories/cat-nutty.jpg" },
  { label: "ปอนด์พีโอเรีย",                category: "Beauty",            emoji: "💄",  color: "#9c27b0",  initial: "ป",  photo: "/inf-categories/cat-pond-peoria.jpg" },
  { label: "Kiekiekieee",                  category: "Health",            emoji: "💪",  color: "#4caf50",  initial: "K",  photo: "/inf-categories/cat-kiekiekieee.jpg" },
  { label: "Eatguide",                     category: "Food Review",       emoji: "🍜",  color: "#ff9800",  initial: "E",  photo: "/inf-categories/cat-eatguide.jpg" },
  { label: "Mommychicky",                  category: "Family",            emoji: "👨‍👩‍👧",  color: "#ff9800",  initial: "M",  photo: "/inf-categories/cat-mommychicky.jpg" },
  { label: "ประธาน!",                      category: "Comedy",            emoji: "😂",  color: "#ff9800",  initial: "ป",  photo: "/inf-categories/cat-prathan.jpg" },
  { label: "ISNOTFONE",                    category: "Entertainment",     emoji: "🎤",  color: "#e91e8c",  initial: "I",  photo: "/inf-categories/cat-isnotfone.jpg" },
  { label: "NISAMANEENUTT",                category: "Lifestyle",         emoji: "✨",  color: "#9c27b0",  initial: "N",  photo: "/inf-categories/cat-nisamaneenutt.jpg" },
  { label: "Arm GoodSunday",               category: "Comedy",            emoji: "😂",  color: "#ff9800",  initial: "A",  photo: "/inf-categories/cat-arm-goodsunday.jpg" },
  { label: "nuna88999",                    category: "Family",            emoji: "👨‍👩‍👧",  color: "#ff9800",  initial: "N",  photo: "/inf-categories/cat-nuna88999.jpg" },
];

function CatCard({ cat }: { cat: typeof INF_CATEGORIES[0] }) {
  return (
    <div style={{
      width: "300px", flexShrink: 0,
      display: "flex", flexDirection: "row", alignItems: "center", gap: "16px",
      padding: "18px 22px",
      background: "rgba(255,255,255,0.55)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "0 8px 32px rgba(95,38,229,0.10)",
      borderRadius: "20px", boxSizing: "border-box",
    }}>
      <div style={{ position: "relative", width: "62px", height: "62px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
        <Image src={cat.photo} alt={cat.label} fill sizes="62px"
          style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
        <span style={{ color: "#111827", fontWeight: 700, fontSize: "18px", lineHeight: "1.2",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {cat.label}
        </span>
        <span style={{
          color: "#5f26e5", fontSize: "13px", fontWeight: 500,
          padding: "4px 12px", borderRadius: "20px",
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          display: "inline-block", width: "fit-content", whiteSpace: "nowrap",
        }}>
          {cat.category} {cat.emoji}
        </span>
      </div>
    </div>
  );
}

export default function CategoriesMarquee() {
  // Alternate creators between the two rows so categories stay mixed.
  const row1 = INF_CATEGORIES.filter((_, i) => i % 2 === 0);
  const row2 = INF_CATEGORIES.filter((_, i) => i % 2 === 1);
  // Each row (~11-12 cards × 316px) is already wider than any viewport, so a
  // single copy is the base; it's doubled below for the seamless -50% loop.
  const base1 = row1;
  const base2 = row2;
  const looped1 = [...base1, ...base1];
  const looped2 = [...base2, ...base2];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", overflow: "hidden", width: "100%" }}>
      {/* Row 1 — scrolls left */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="marquee-track-slow" style={{ display: "flex", gap: "20px", width: "max-content" }}>
          {looped1.map((cat, i) => <CatCard key={i} cat={cat} />)}
        </div>
      </div>
      {/* Row 2 — scrolls right */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="marquee-track-slow-reverse" style={{ display: "flex", gap: "20px", width: "max-content" }}>
          {looped2.map((cat, i) => <CatCard key={i} cat={cat} />)}
        </div>
      </div>
    </div>
  );
}
