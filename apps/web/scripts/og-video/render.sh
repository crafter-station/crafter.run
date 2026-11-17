#!/bin/zsh
# Renders the home link-preview film: public/og/home-{es,en}.mp4 (1200x630, 10 s, 30 fps) and
# its first frame as public/og/home-{es,en}.jpg. Needs agent-browser, ffmpeg, magick and python3.
# Run from anywhere: apps/web/scripts/og-video/render.sh
set -euo pipefail
web=${0:A:h:h:h}
work=$web/.og-video
port=4780
# Ships with a product cover, one per maker. Edit when better covers land.
pick='["Tiny Lima","TOCus","glyf","hack0","PinturilloElements","Radar","Wompi SDK","awake"]'
rm -rf $work; mkdir -p $work
curl -fsS "https://api.crafter.run/v1/ships?limit=100" | python3 -I -c "
import json, sys
ships = json.load(sys.stdin)['ships']
pick = json.loads(sys.argv[1])
by_name = {s['name']: s for s in ships}
chosen = [by_name[n] for n in pick if n in by_name and by_name[n].get('imageUrl')]
data = {'total': len(ships), 'ships': [{'name': s['name'], 'handle': s['owner']['handle'], 'avatar': s['owner']['avatarUrl'], 'cover': s['imageUrl']} for s in chosen]}
open(sys.argv[2], 'w').write('window.DATA=' + json.dumps(data, ensure_ascii=False))
print(data['total'], 'ships,', len(chosen), 'covers')
" "$pick" $work/data.js
cp ${0:A:h}/scene.html $work/scene.html
python3 -I -m http.server $port --bind 127.0.0.1 --directory $web >/dev/null 2>&1 &
server=$!
trap "kill $server 2>/dev/null" EXIT
sleep 1
for lang in es en; do
  frames=$work/frames-$lang; mkdir -p $frames
  ab() { agent-browser --session og-video-$lang "$@" >/dev/null 2>&1 }
  ab set viewport 1200 630
  ab open "http://127.0.0.1:$port/.og-video/scene.html?lang=$lang"
  ab eval "window.ready"
  for i in $(seq 0 299); do
    ab eval "window.render($(( i / 30.0 )))"
    ab screenshot $frames/$(printf %04d $i).png
  done
  ab close
  ffmpeg -y -loglevel error -framerate 30 -i $frames/%04d.png -c:v libx264 -profile:v high -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart -an $web/public/og/home-$lang.mp4
  magick $frames/0000.png -strip -quality 92 $web/public/og/home-$lang.jpg
  echo "$lang: $(du -h $web/public/og/home-$lang.mp4 | cut -f1)"
done
rm -rf $work
