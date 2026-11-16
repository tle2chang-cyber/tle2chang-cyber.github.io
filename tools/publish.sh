#!/bin/zsh
# Đưa thay đổi lên web: gắn số phiên bản mới cho css/js (để trình duyệt không dùng bản cũ), commit, push.
# Dùng: zsh tools/publish.sh "nội dung thay đổi"
cd "$(dirname "$0")/.."
v=$(date +%Y%m%d%H%M)
sed -i '' -E "s/(styles\.css|data\.js|app\.js)(\?v=[0-9]+)?\"/\1?v=$v\"/g" index.html
git add -A && git commit -qm "${1:-Cập nhật web}" && git push -q && echo "✓ Đã đẩy lên (v=$v). Web cập nhật sau ~1 phút."
