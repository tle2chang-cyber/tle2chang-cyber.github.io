# Portfolio — Video Production

Web tĩnh (HTML/CSS/JS thuần), không cần build, chạy được trên GitHub Pages.

## Sửa nội dung
Mở `data.js`:
- `SITE` — tên, email, số điện thoại, mạng xã hội
- `WORKS` — tiêu đề từng video, thứ tự hiển thị, video nào làm ảnh nền (`feature: true`)

## Thêm video mới
1. Thả file gốc vào thư mục `Port chuẩn` (đúng danh mục).
2. Thêm 1 dòng `vid "Danh mục/tên file.mp4" slug-moi` vào `tools/build-media.sh`, chạy:
   `zsh tools/build-media.sh "/Users/macbook/Documents/Riêng/Port chuẩn"`
   (file đã nén rồi sẽ được bỏ qua).
3. Thêm 1 dòng vào `WORKS` trong `data.js` với `id: "slug-moi"`.

## Xem thử trên máy
`python3 -m http.server 8000` rồi mở http://localhost:8000

## Đưa lên GitHub Pages
1. Tạo repo mới trên github.com, ví dụ `portfolio` (Public).
2. Trong thư mục này:
   ```
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/portfolio.git
   git push -u origin main
   ```
3. Repo → Settings → Pages → Source: *Deploy from a branch*, Branch: `main` / `(root)` → Save.
   Sau ~1 phút web có ở `https://<username>.github.io/portfolio/`.
   (Đặt tên repo là `<username>.github.io` thì địa chỉ là `https://<username>.github.io/`.)

## Gắn tên miền riêng
1. Mua tên miền (Namecheap, Cloudflare, PA Vietnam, Mắt Bão…).
2. Ở DNS của tên miền thêm:
   - 4 bản ghi **A** cho `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 bản ghi **CNAME** cho `www` → `<username>.github.io`
3. Repo → Settings → Pages → Custom domain: nhập `tenmien.com` → Save, đợi DNS cập nhật rồi tick **Enforce HTTPS**.

## Giới hạn GitHub Pages
- Mỗi file < 100 MB, cả trang nên < 1 GB, băng thông ~100 GB/tháng.
- Video ở đây đã nén 720p (~2 Mbps). Nếu sau này cần 4K, nên đưa bản đầy đủ lên YouTube/Vimeo.
