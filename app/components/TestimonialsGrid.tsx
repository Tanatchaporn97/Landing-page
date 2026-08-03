"use client";
import Image from "next/image";

const KT = { fontFamily: "var(--font-kanit),'Noto Sans Thai',sans-serif" };

const TESTIMONIALS = [
  {
    photo: "/influencers/inf-cheese.jpg",
    name: "ชีส",
    text: "ได้ร่วมงานกับ Buddy Review มาหลายปีแล้ว มีโอกาสได้รับงานที่หลากหลายและทีมงานน่ารักและใส่ใจทุกคน หวังว่าจะได้ร่วมงานกันไปนานๆ นะ ครับ Buddy Review Fighting!!",
  },
  {
    photo: "/influencers/inf-yam.jpg",
    name: "แยม",
    text: "รู้สึกดีใจที่ได้ร่วมงานกับทีมงานที่น่ารัก เป็นกันเองและมืออาชีพมากๆ อย่าง Buddy Review ภายใต้การร่วมงานดังกล่าว ทำให้แยมได้รับโอกาสร่วมงานกับแบรนด์ระดับประเทศที่มีความน่าเชื่อถือ ซึ่งนับว่าเป็นประสบการณ์ทำงานร่วมกันที่คุ้มค่ามากๆ ค่ะ",
  },
  {
    photo: "/influencers/inf-riwago.jpg",
    name: "ริวโกะ",
    text: "ชอบทำงานกับ Buddy Review มากๆเพราะบัดดี้คุยงานง่าย บรีฟเข้าใจ ทำงานไว เป็นระบบ ไม่เอาเปรียบอินฟลูและป้อนงานให้ริวโกะเยอะมากๆๆ🥺💖🙏🏻 รัก Buddy Review และอยากทำด้วยไปนานๆเลยค่ะ",
  },
  {
    photo: "/influencers/inf-maihom.jpg",
    name: "ไม้หอม",
    text: "เราเริ่มต้นรีวิวต่างๆจาก Buddy review เลยค่ะ เพื่อนแนะนำมา จนตอนนี่ผ่านไปหลายปีแล้วเราก็ยังรับงานจาก Buddy review อยู่ มีงานให้เลือกตลอด และได้มีโอกาสทำงานร่วมกับแบรนด์ดังหลายแบรนด์เลย ต้องขอบคุณเพื่อนคนนั้นมากๆที่แนะนำให้เรารู้จักกับที่นี่เพราะมันดีสุดๆ แอดมินก็ดูแลดีมากๆค่ะ",
  },
  {
    photo: "/influencers/inf-puifai.jpg",
    name: "ปุยฝ้าย",
    text: "ชอบทำงานกับ Buddy review ทั้งเรื่องของแบรนด์ที่มาจากช่องทางนี้จะเป็นแบรนด์ที่น่าเชื่อถือและเป็นที่รู้จักค่ะ บรีฟงานและรายละเอียดมักจะชัดเจน และเคารพการตัดสินใจของ influencer ที่สำคัญแอดมินทุกท่านเต็มใจและเข้าใจในการทำงาน ทำให้ทุกอย่างง่ายและ flow ไปในทิศทางเดียวกัน ทำให้การทำงานสนุกมากขึ้นค่ะ",
  },
  {
    photo: "/influencers/inf-may.jpg",
    name: "มาย",
    text: "Buddy Review เป็นช่องทางที่ทำให้เราได้แสดงศักยภาพได้อย่างเต็มที่และอิสระ ทำให้เราได้รู้จักคำว่า การทำงานสามารถทำได้ทุกที่บนโลกใบนี้ นอกจากนี้ก็ยังได้เพื่อน สังคมใหม่ๆ และเข้าใจคำว่าทีม และการซัพพอร์ต",
  },
];

export default function TestimonialsGrid() {
  const col1 = [0, 2, 4].map(i => TESTIMONIALS[i]);
  const col2 = [1, 3, 5].map(i => TESTIMONIALS[i]);

  const Card = ({ t }: { t: typeof TESTIMONIALS[0] }) => (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.07)",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      padding: "20px 22px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{ position: "relative", width: "57px", height: "57px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Image src={t.photo} alt={t.name} fill sizes="57px" style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <p style={{ ...KT, fontWeight: 600, fontSize: "24px", color: "#5f26e5", margin: 0, lineHeight: 1.3 }}>{t.name}</p>
      </div>
      <p style={{ ...KT, fontSize: "14px", color: "#000000", lineHeight: "1.7", margin: 0 }}>{t.text}</p>
    </div>
  );

  return (
    <div className="testimonials-masonry" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        {col1.map((t, i) => <Card key={i} t={t} />)}
      </div>
      <div className="testimonials-col-2" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", marginTop: "48px" }}>
        {col2.map((t, i) => <Card key={i} t={t} />)}
      </div>
    </div>
  );
}
