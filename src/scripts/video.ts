/** Swaps a poster for the host player on tap. Supports YouTube, Vimeo, Wistia and direct MP4 URLs. */
function embedFor(url: string): HTMLElement | null {
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return iframe(`https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&playsinline=1&rel=0`);
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return iframe(`https://player.vimeo.com/video/${m[1]}?autoplay=1&playsinline=1`);
  m = url.match(/wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/([\w]+)/);
  if (m) return iframe(`https://fast.wistia.net/embed/iframe/${m[1]}?autoPlay=true&playsinline=true`);
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) {
    const v = document.createElement('video');
    v.src = url;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    return v;
  }
  return null;
}

function iframe(src: string): HTMLIFrameElement {
  const f = document.createElement('iframe');
  f.src = src;
  f.allow = 'autoplay; fullscreen; picture-in-picture';
  f.setAttribute('allowfullscreen', '');
  f.title = 'Project video';
  return f;
}

export function initVideoTiles(): void {
  document.querySelectorAll<HTMLElement>('[data-video]').forEach((tile) => {
    const button = tile.querySelector<HTMLButtonElement>('[data-video-play]');
    const url = tile.dataset.video;
    if (!button || !url) return;
    button.addEventListener('click', () => {
      const player = embedFor(url);
      if (!player) {
        window.open(url, '_blank', 'noopener');
        return;
      }
      tile.appendChild(player);
      button.remove();
    });
  });
}
