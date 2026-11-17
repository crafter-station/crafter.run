# Media recipe

Every file ends up flat in `./crafter-changelog/<slug>/`. Working files stay in `/tmp`.

## Capture rules

- Viewport 1280x800, light mode, viewport only (no browser chrome, no full-page scrolls).
- Use your own agent-browser session so you do not disturb other work: `--session changelog-<slug>`.
- Launch with the animation flags, otherwise a headless page is hidden and animations freeze:

  ```bash
  --args "--disable-renderer-backgrounding,--disable-background-timer-throttling,--disable-backgrounding-occluded-windows"
  ```

- Show the product with realistic, public data. No private accounts, emails or tokens in any frame.

## Screenshots

```bash
S=changelog-<slug>
A='--disable-renderer-backgrounding,--disable-background-timer-throttling,--disable-backgrounding-occluded-windows'
agent-browser --session $S --args "$A" open https://example.com/page
agent-browser --session $S set viewport 1280 800
agent-browser --session $S set media light
agent-browser --session $S wait 2000
agent-browser --session $S screenshot /tmp/<slug>-first.png
magick /tmp/<slug>-first.png -resize 1280x -quality 84 crafter-changelog/<slug>/first.webp
```

The cover shot is separate: set the viewport to `1280 800 2` (device scale 2), screenshot, and save as `crafter-changelog/<slug>/shot.png`. It is the input for the cover generator (see the Cover section of `SKILL.md`), not a figure in the body.

## Clips

Six to ten seconds, one action, loops cleanly. Record with the cursor so clicks are legible:

```bash
agent-browser --session $S record start /tmp/<slug>-raw.mp4 --cursor
# drive the page: click, type, scroll, with short waits between steps
agent-browser --session $S record stop
```

Encode for the web: H.264, crf 27, faststart, no audio, width 1280.

```bash
ffmpeg -y -i /tmp/<slug>-raw.mp4 -an -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart -vf "scale=1280:-2" crafter-changelog/<slug>/demo.mp4
```

The poster is the most readable frame of the clip, as webp at quality 84:

```bash
ffmpeg -y -ss 3 -i crafter-changelog/<slug>/demo.mp4 -frames:v 1 /tmp/<slug>-poster.png
magick /tmp/<slug>-poster.png -quality 84 crafter-changelog/<slug>/demo.webp
```

## CLI and terminal products

Record a vhs clip with a colored theme instead of a browser. `demo.tape`:

```
Output demo.mp4
Set Shell "bash"
Set Width 1280
Set Height 800
Set FontSize 28
Set Padding 40
Set Theme "Catppuccin Mocha"
Set TypingSpeed 60ms
Type "crafter changelog check crafter-changelog/my-launch"
Sleep 400ms
Enter
Sleep 4s
```

`vhs validate demo.tape`, then `vhs demo.tape`, and encode the output with the same ffmpeg command. Use real output of a real command, never a mock.

## Look at every frame

Before keeping any clip, extract frames and open them:

```bash
ffmpeg -y -i crafter-changelog/<slug>/demo.mp4 -vf fps=2 /tmp/<slug>-frame-%02d.png
```

Read each frame. Reject the clip for a cut-off layout, a loading spinner, a private value, a stray cursor, or a frozen animation. Then re-record.

## Size

`crafter changelog check` prints every file size and warns above 2 MB. A clip over that usually means a longer take or a lower crf; shorten the take first.
