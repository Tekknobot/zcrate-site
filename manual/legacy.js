import {pages,legacyRoutes} from './content.mjs';
const hash=location.hash.slice(1);
const privacy=location.pathname.endsWith('/privacy.html');
const parts=hash.split('--');
const privacySections={scope:'scope','local-processing':'local',collection:'local',storage:'control','other-services':'scope',changes:'control'};
const route=privacy?'privacy'+(parts[0]==='privacy'&&parts[1]?'/'+parts[1]:privacySections[hash]?'/'+privacySections[hash]:''):legacyRoutes[hash]||(pages[parts[0]]?parts.join('/'):(hash.startsWith('/')?hash.slice(1):'quickstart'));
location.replace('./#/'+route);
