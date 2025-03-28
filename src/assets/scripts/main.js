/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/* Leaflet - Ubicaciones en un mapa */
import 'leaflet/dist/leaflet.css';

/*AOS - Animaciones al hacer scroll*/
import AOS from 'aos';
import 'aos/dist/aos.css';

/* Rough.js - SVG que simulan trazos manuales */
import rough from 'roughjs/bundled/rough.esm.js';


/**
 * Write any other JavaScript below
 */

/* Config AOS */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.id === 'container') {
      AOS.init();
  }
});


/* Config Leaflet map with coordinates */

if (document.getElementById("map")) {
  import('leaflet').then(L => {

    const map = L.map('map').setView([4.698565495824532, -74.02305236050358], 30); 
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
  /* Personalized marker */
  
  const locationIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Marker_location.png?20190508151833',
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  
  /* Recommended places markers */
  const marker1 = L.marker([4.607411122711841, -74.07064033982745], { icon: locationIcon }).addTo(map); 
  marker1.bindPopup('Pastelería Florida').openPopup();
  
  const marker2 = L.marker([4.60705010284514, -74.07084464344362], { icon: locationIcon }).addTo(map); 
  marker2.bindPopup('Cafe y pandebono antojos vallunos').openPopup();

  const marker3 = L.marker([4.6476432638661915, -74.06003896713594], { icon: locationIcon }).addTo(map); 
  marker3.bindPopup('Metro Pandebono').openPopup();
  
});
}

/* Manual tracing around grid elements */

document.querySelectorAll('.pan-ingredients__item').forEach((el) => {
  /* Create an SVG DOM element */
  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", el.offsetWidth);
  svgEl.setAttribute("height", el.offsetHeight);
  svgEl.style.position = "absolute";
  svgEl.style.top = 0;
  svgEl.style.left = 0;
  svgEl.style.pointerEvents = "none";
  svgEl.style.zIndex = "1";

  /* Create a 'rough SVG' wrapper with SVG element */
  const rc = rough.svg(svgEl);

  /* Trace the rectangle as 'hand-traced' */
  const node = rc.rectangle(0, 0, el.offsetWidth, el.offsetHeight, {
    roughness: 2,
    stroke: "#222",
  
  });

  /* Append the rectangle to the svg */
  svgEl.appendChild(node);

  /* Set position 'relative' in container */
  el.style.position = "relative";
  el.appendChild(svgEl);
});


document.querySelectorAll('.pan-recipe__step').forEach((el) => {
  /* Create an SVG DOM element */
  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", el.offsetWidth);
  svgEl.setAttribute("height", el.offsetHeight);
  svgEl.style.position = "absolute";
  svgEl.style.top = 0;
  svgEl.style.left = 0;
  svgEl.style.pointerEvents = "none";
  svgEl.style.zIndex = "0";

  /* Create a 'rough SVG' wrapper with SVG element */
  const rc = rough.svg(svgEl);

  /* Trace the rectangle as 'hand-traced' */
  const node = rc.rectangle(0, 0, el.offsetWidth, el.offsetHeight, {
    roughness: 2,
    stroke: "#222",
  
  });

  /* Append the rectangle to the svg */
  svgEl.appendChild(node);

  /* Set position 'relative' in container */
  el.style.position = "relative";
  el.appendChild(svgEl);
});