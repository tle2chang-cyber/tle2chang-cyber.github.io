# Portfolio web — ghi chú cho Claude

Web portfolio video production, phong cách apple.com, HTML/CSS/JS thuần (không build), sẽ host trên GitHub Pages + tên miền riêng.

- Nội dung (tên, email, mạng xã hội, danh sách video/ảnh): `data.js`
- Giao diện: `index.html`, `styles.css`, `app.js`
- Media web đã nén ở `media/` (video 720p, preview 6s, poster, ảnh 1800px, `reel.mp4` cho hero)
- Video/ảnh gốc 4K nằm ở thư mục cha `../` (Port chuẩn) — KHÔNG đưa lên git, không xoá
- Nén media mới: `zsh tools/build-media.sh "/Users/macbook/Documents/Riêng/Port chuẩn"` (bỏ qua file đã có)
- Xem thử: `python3 -m http.server 8000` (có sẵn trong `.claude/launch.json`)
- Giới hạn GitHub Pages: mỗi file < 100MB, cả repo < 1GB
- Hướng dẫn deploy + tên miền: `README.md`

## Trạng thái
- Xong: giao diện, nén media (~337MB).
- Chưa: điền tên/email/mạng xã hội thật trong `data.js`; kiểm tra lại tiêu đề tác phẩm (đang đoán từ tên file); tạo repo GitHub và đẩy lên; gắn tên miền.
- Người dùng nói tiếng Việt.
