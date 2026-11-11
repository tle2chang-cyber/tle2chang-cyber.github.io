// ======================================================================
//  NỘI DUNG PORTFOLIO — chỉnh sửa tại đây là đủ, không cần đụng code khác
// ======================================================================

window.SITE = {
  name: "Thắng Lê",
  role: "Video Production",
  tagline: "Kể chuyện bằng khung hình.",
  intro: "TVC, phim ngắn, hoạt hình, AI video và motion graphic — từ ý tưởng đến bản dựng cuối cùng.",
  email: "tle2chang@gmail.com",
  phone: "0865 860 126",
  socials: [                           // ← thêm mạng xã hội, ví dụ: { label: "Facebook", url: "https://..." }
  ],
  about: {
    photo: "media/portrait.jpg",
    years: 5,
    text: "5 năm trong nghề video production, mình làm trọn vẹn một dự án: từ ý tưởng, kịch bản, tiền kỳ, quay, đến hậu kỳ dựng, màu, âm thanh — và cả video AI.",
    skills: ["Ý tưởng & kịch bản", "Tiền kỳ & sản xuất", "Quay phim", "Dựng & hậu kỳ", "Motion graphic", "Video AI"],
  },
};

// Danh mục — thứ tự ở đây là thứ tự hiển thị trên trang
window.CATEGORIES = [
  { id: "tvc",   name: "TVC",          headline: "TVC.",          sub: "Thương hiệu, kể bằng cảm xúc." },
  { id: "film",  name: "Phim ngắn",    headline: "Phim ngắn.",    sub: "Những câu chuyện trọn vẹn trong vài phút." },
  { id: "anim",  name: "Hoạt hình",    headline: "Animated series.", sub: "Thế giới riêng, nhân vật riêng." },
  { id: "ai",    name: "AI",           headline: "AI Video.",     sub: "Hình ảnh chưa từng được quay." },
  { id: "mg",    name: "Motion Graphic", headline: "Motion Graphic.", sub: "Chuyển động có chủ đích." },
  { id: "th",    name: "Talking Head", headline: "Talking Head.", sub: "Gần gũi, rõ ràng, giữ chân người xem." },
];

// Tác phẩm video. "v": true = video dọc 9:16. "feature": true = dùng làm ảnh nền cho ô danh mục
window.WORKS = [
  { id: "tvc-vsr",              cat: "tvc",  title: "VSR",                    feature: true },
  { id: "tvc-prepcando-series", cat: "tvc",  title: "PREPCANDO #1–3" },
  { id: "tvc-lo-trinh",         cat: "tvc",  title: "Lộ trình" },
  { id: "tvc-hanh-trinh",       cat: "tvc",  title: "Hành trình" },

  { id: "film-kb1",             cat: "film", title: "Tết là nhất #1",            feature: true },
  { id: "film-kb2",             cat: "film", title: "Tết là nhất #2" },

  { id: "anim-pte-1",           cat: "anim", title: "PTE — Trailer 1",        feature: true },
  { id: "anim-pte-2",           cat: "anim", title: "PTE — Trailer 2" },

  { id: "ai-skoda",             cat: "ai",   title: "Skoda Kodiaq",           feature: true },
  { id: "ai-xanhsm",            cat: "ai",   title: "Xanh SM" },
  { id: "ai-coloa",             cat: "ai",   title: "Cổ Loa" },
  { id: "ai-wuxia-1",           cat: "ai",   title: "Wuxia — I" },
  { id: "ai-wuxia-2",           cat: "ai",   title: "Wuxia — II" },
  { id: "ai-wuxia-3",           cat: "ai",   title: "Wuxia — III" },
  { id: "ai-dog-robot",         cat: "ai",   title: "Dog & Robot" },
  { id: "ai-balloon-1",         cat: "ai",   title: "Balloon — I",  v: true },
  { id: "ai-balloon-2",         cat: "ai",   title: "Balloon — II", v: true },

  { id: "mg-lig-1",             cat: "mg",   title: "LIG Ads 01", v: true, feature: true },
  { id: "mg-lig-2",             cat: "mg",   title: "LIG Ads 02", v: true },

  { id: "th-zen-4",             cat: "th",   title: "Zen — Ep. 4", v: true, feature: true },
  { id: "th-zen-8",             cat: "th",   title: "Zen — Ep. 8", v: true },
];

// Bộ ảnh
window.PHOTOS = [
  { id: "homestay", name: "Homestay",        count: 21 },
  { id: "office",   name: "Văn phòng Sài Gòn", count: 16 },
];
