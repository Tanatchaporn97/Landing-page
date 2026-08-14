import json
import os

def update_dict(path, seo_data):
    if not os.path.exists(path):
        print(f"{path} not found")
        return
        
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data['seo'] = seo_data
    
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        # Add newline at EOF
        f.write('\n')

update_dict('dictionaries/en.json', {
    "title": "Buddy Review — Data-Powered Influencer Marketing",
    "description": "From Strategy To Insight, We Turn Influence Into Impact."
})

update_dict('dictionaries/th.json', {
    "title": "Buddy Review | การตลาดอินฟลูเอนเซอร์ที่ขับเคลื่อนด้วยข้อมูล (Influencer Marketing)",
    "description": "จากกลยุทธ์สู่ข้อมูลเชิงลึก เราเปลี่ยนอิทธิพลอินฟลูเอนเซอร์ให้เป็นผลลัพธ์ทางธุรกิจที่วัดผลได้"
})
print("Dictionaries updated successfully")
