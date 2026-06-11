import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge'
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatBerlinTime() {
  const parts = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    hour12: false,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).formatToParts(new Date());

  const get = (type) => parts.find((part) => part.type === type)?.value || '';

  return {
    time: `${pad(get('hour'))}:${pad(get('minute'))}`,
    date: `${get('weekday')} ${get('day')}. ${get('month')}`
  };
}

function safeBackgroundUrl(request) {
  const { searchParams, origin } = new URL(request.url);
  const version = searchParams.get('v') || Date.now();
  const image = searchParams.get('bg') || `${origin}/ichigo.png?v=${version}`;

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return `${origin}/${image.replace(/^\/+/, '')}`;
}

function el(type, props, ...children) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    key: null,
    ref: null,
    props: {
      ...(props || {}),
      children: children.length <= 1 ? children[0] : children
    },
    _owner: null
  };
}

export default function handler(request) {
  const backgroundUrl = safeBackgroundUrl(request);
  const { time, date } = formatBerlinTime();

  return new ImageResponse(
    el(
      'div',
      {
        style: {
          width: '400px',
          height: '150px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#111'
        }
      },
      el('img', {
        src: backgroundUrl,
        width: '400',
        height: '150',
        style: {
          position: 'absolute',
          inset: 0,
          width: '400px',
          height: '150px',
          objectFit: 'cover'
        }
      }),
      el('div', {
        style: {
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.62) 100%)'
        }
      }),
      el(
        'div',
        {
          style: {
            position: 'absolute',
            right: '16px',
            bottom: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }
        },
        el(
          'div',
          {
            style: {
              color: 'white',
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '2px',
              textShadow: '0 1px 2px rgba(0,0,0,0.95)'
            }
          },
          time
        ),
        el(
          'div',
          {
            style: {
              color: 'rgba(255,255,255,0.94)',
              fontSize: '13px',
              fontWeight: 700,
              marginTop: '2px',
              letterSpacing: '0.5px',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)'
            }
          },
          date
        )
      )
    ),
    {
      width: 400,
      height: 150,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=1, must-revalidate'
      }
    }
  );
}
