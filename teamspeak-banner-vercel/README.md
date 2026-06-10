# TeamSpeak Banner mit Uhrzeit

Dieses Projekt ist fur Vercel gedacht und liefert ein echtes PNG-Bild aus.
Das ist wichtig, weil TeamSpeak bei `Banner GFX URL` keine HTML-Seite rendern
soll, sondern direkt eine Bild-URL erwartet.

## Dateien

- `api/banner.jsx` erzeugt das Banner als PNG.
- `public/background.png` ist dein Standard-Hintergrundbild.

## Deployment

1. Dieses Projekt in ein GitHub-Repository hochladen.
2. Das Repository bei Vercel importieren.
3. Nach dem Deployment diese URL in TeamSpeak eintragen:

   `https://DEIN-PROJEKT.vercel.app/api/banner`

## Hintergrund austauschen

Am einfachsten ersetzt du:

`public/background.png`

Danach neu zu GitHub hochladen, Vercel deployed automatisch.

Alternativ kannst du auch einen externen Hintergrund per URL ubergeben:

`https://DEIN-PROJEKT.vercel.app/api/banner?bg=https://example.com/background.png`

Der Link muss direkt zu einer Bilddatei fuhren, nicht zu einer Webseite.

## Hinweise

- Die Uhrzeit wird serverseitig in deutscher Zeit gerendert.
- Es werden bewusst keine Sekunden angezeigt, weil TeamSpeak Banner meist nur
  ungefahr alle 60 Sekunden neu ladt.
- Wenn TeamSpeak oder dein Client Bilder cached, kann die Uhrzeit verzogert
  aktualisieren. Der Endpoint selbst setzt sehr kurze Cache-Zeiten.
- Umlaute sind im Rendering manchmal je nach Font/Runtime empfindlich. Deshalb
  ist `Marz` absichtlich ohne Umlaut gehalten.
