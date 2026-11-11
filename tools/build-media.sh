#!/bin/zsh
# Nén video/ảnh gốc thành bản cho web (GitHub Pages: mỗi file < 100MB, cả repo < 1GB)
# Dùng: zsh tools/build-media.sh "/Users/macbook/Documents/Riêng/Port chuẩn"
SRC="$1"; OUT="$(cd "$(dirname "$0")/.." && pwd)/media"
mkdir -p "$OUT"/{video,preview,poster,photo/homestay,photo/office}

vid() { # $1 = đường dẫn tương đối, $2 = slug
  local in="$SRC/$1" s="$2"
  local dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
  local scale="scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'"
  [[ -f "$OUT/video/$s.mp4" ]] || ffmpeg -nostdin -loglevel error -y -i "$in" -vf "$scale,fps=30" \
    -c:v h264_videotoolbox -b:v 1800k -maxrate 2500k -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ac 2 -movflags +faststart "$OUT/video/$s.mp4"
  local ss=$(echo "$dur*0.25" | bc -l); local pd=6
  (( $(echo "$dur < 8" | bc) )) && { ss=0; pd=$dur; }
  [[ -f "$OUT/preview/$s.mp4" ]] || ffmpeg -nostdin -loglevel error -y -ss $ss -t $pd -i "$in" -an \
    -vf "scale='if(gt(iw,ih),-2,480)':'if(gt(iw,ih),480,-2)',fps=30" \
    -c:v h264_videotoolbox -b:v 900k -pix_fmt yuv420p -movflags +faststart "$OUT/preview/$s.mp4"
  [[ -f "$OUT/poster/$s.jpg" ]] || ffmpeg -nostdin -loglevel error -y -ss $(echo "$dur*0.3" | bc -l) -i "$in" -frames:v 1 \
    -vf "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'" -q:v 4 "$OUT/poster/$s.jpg"
  echo "✓ $s"
}

vid "TVC/Copy of VSR_Final.mp4" tvc-vsr
vid "TVC/Copy of Lộ trình_Final.mp4" tvc-lo-trinh
vid "TVC/Copy of Hành trình_Final.mp4" tvc-hanh-trinh
vid "TVC/PREPCANDO #1-3 FNIII.mp4" tvc-prepcando-series
vid "Phim ngắn/FNXKB1.mp4" film-kb1
vid "Phim ngắn/FNKB2X6.mp4" film-kb2
vid "Animated series/PTE Trailer 1 FINAL + Outro.mp4" anim-pte-1
vid "Animated series/PTE trailer 2 draft2.mp4" anim-pte-2
vid "AI/SkodaKodiaq_FN.mp4" ai-skoda
vid "AI/XanhSM_FN.mp4" ai-xanhsm
vid "AI/CoLoa_AI_D1.mp4" ai-coloa
vid "AI/Wuxia1.mp4" ai-wuxia-1
vid "AI/Wuxia2.mp4" ai-wuxia-2
vid "AI/Wuxia3.mp4" ai-wuxia-3
vid "AI/Dog_and_robot_in_garden_404d1aab_1080p.mp4" ai-dog-robot
vid "AI/Toddler_holding_balloon_with_cat_1dad1374_1080p.mp4" ai-balloon-1
vid "AI/Cat_pulls_balloon_down_for_ccc21a0e_1080p.mp4" ai-balloon-2
vid "Motion Graphic/LIG ads 1.mp4" mg-lig-1
vid "Motion Graphic/LIG ad 2.mp4" mg-lig-2
vid "Talking Head/Zen4FNL.mp4" th-zen-4
vid "Talking Head/Zen8 (1).mp4" th-zen-8

# Ảnh: cạnh dài 1800px, JPG chất lượng tốt
i=1; for f in "$SRC"/Ảnh*/Homestay/*(.N); do sips -s format jpeg -s formatOptions 78 -Z 1800 "$f" --out "$OUT/photo/homestay/$(printf %02d $i).jpg" >/dev/null; ((i++)); done
i=1; for f in "$SRC"/Ảnh*/Văn\ phòng*/*(.N); do sips -s format jpeg -s formatOptions 78 -Z 1800 "$f" --out "$OUT/photo/office/$(printf %02d $i).jpg" >/dev/null; ((i++)); done
echo "✓ photos"

# Showreel cho hero: ghép 8 đoạn 4s từ các video ngang (720p)
cd "$OUT/video"; args=(); n=0; f=""
for s in tvc-vsr film-kb1 anim-pte-1 ai-skoda tvc-prepcando-series ai-wuxia-3 film-kb2 tvc-lo-trinh; do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $s.mp4)
  args+=(-ss $(echo "$d*0.4" | bc -l) -t 4 -i $s.mp4)
  f+="[$n:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=30[v$n];"; ((n++))
done
for k in {0..$((n-1))}; do f+="[v$k]"; done
ffmpeg -nostdin -loglevel error -y "${args[@]}" -filter_complex "${f}concat=n=$n:v=1:a=0[o]" -map "[o]" \
  -c:v h264_videotoolbox -b:v 2800k -pix_fmt yuv420p -movflags +faststart "$OUT/reel.mp4"
echo "✓ reel — xong"; du -sh "$OUT"
