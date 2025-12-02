//TIP With Search Everywhere, you can find any action, file, or symbol in your project. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/>, type in <b>terminal</b>, and press <shortcut actionId="EditorEnter"/>. Then run <shortcut raw="npm run dev"/> in the terminal and click the link in its output to open the app in the browser.
export function setupCounter(element) {
  //TIP Try <shortcut actionId="GotoDeclaration"/> on <shortcut raw="counter"/> to see its usages. You can also use this shortcut to jump to a declaration – try it on <shortcut raw="counter"/> on line 13.
  let counter = 0;

  const adjustCounterValue = value => {
    if (value >= 100) return value - 100;
    if (value <= -100) return value + 100;
    return value;
  };

  const setCounter = value => {
    counter = adjustCounterValue(value);
    element.innerHTML = `${counter}`;
  };

  document.getElementById('increaseByOne').addEventListener('click', () => setCounter(counter + 1));
  document.getElementById('decreaseByOne').addEventListener('click', () => setCounter(counter - 1));
  document.getElementById('increaseByTwo').addEventListener('click', () => setCounter(counter + 2));
  //TIP In the app running in the browser, you’ll find that clicking <b>-2</b> doesn't work. To fix that, rewrite it using the code from lines 19 - 21 as examples of the logic.
  document.getElementById('decreaseByTwo')

  //TIP Let’s see how to review and commit your changes. Press <shortcut actionId="GotoAction"/> and look for <b>commit</b>. Try checking the diff for a file – double-click main.js to do that.
  setCounter(0);
}

//TIP To find text strings in your project, you can use the <shortcut actionId="FindInPath"/> shortcut. Press it and type in <b>counter</b> – you’ll get all matches in one place.
setupCounter(document.getElementById('counter-value'));

//TIP There's much more in WebStorm to help you be more productive. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/> and search for <b>Learn WebStorm</b> to open our learning hub with more things for you to try.

// Añadido: si hay <p class="precio"> inmediatamente después de un h3.productos,
// lo movemos dentro del h3 como <span class="precio"> para facilitar el layout.
function hoistPrecioIntoH3(){
  document.querySelectorAll('p.precio').forEach(p => {
    const prev = p.previousElementSibling;
    if(prev && prev.matches && prev.matches('h3.productos')){
      const span = document.createElement('span');
      span.className = 'precio';
      span.textContent = p.textContent.trim();
      prev.appendChild(span);
      p.remove();
    }
  });
}

// Añadido: crear estructura interna en h3.productos: <span.nombre>nombre</span><span.puntos></span><span.precio>..
function injectLeaders(){
  document.querySelectorAll('h3.productos').forEach(h3 => {
    const precio = h3.querySelector('.precio');
    if(!precio) return;
    // si ya tiene estructura skip
    if(h3.querySelector('.nombre')) return;
    // Crear span.nombre y mover nodos de texto / nodos que no sean .precio dentro
    const nombre = document.createElement('span');
    nombre.className = 'nombre';
    // move child nodes except .precio into nombre
    Array.from(h3.childNodes).forEach(node => {
      if(node.nodeType === Node.ELEMENT_NODE && node.classList && node.classList.contains('precio')) return;
      nombre.appendChild(node);
    });
    // limpiar h3 y reinsertar nombre, puntos y precio
    h3.innerHTML = '';
    h3.appendChild(nombre);
    const puntos = document.createElement('span');
    puntos.className = 'puntos';
    h3.appendChild(puntos);
    h3.appendChild(precio);
  });
}

function addHasPriceClassFallback(){
  document.querySelectorAll('h3.productos').forEach(h3 => {
    if(h3.querySelector('.precio')) h3.classList.add('has-price');
  });
}

function setupScrollSpy(){
  const links = Array.from(document.querySelectorAll('#indice .menu_indice'));
  const idToLink = {};
  links.forEach(a => {
    const href = a.getAttribute('href');
    if(!href || !href.startsWith('#')) return;
    idToLink[href.slice(1)] = a;
    // establecer atributos útiles para accesibilidad y tooltip
    const text = (a.textContent || a.innerText || '').trim();
    if(!a.getAttribute('title')) a.setAttribute('title', `Ir a ${text}`);
    if(!a.getAttribute('aria-label')) a.setAttribute('aria-label', `${text} — ir a sección`);
  });

  const sections = Array.from(document.querySelectorAll('.main section[id], section[id]'));
  if(sections.length === 0) return;

  function setActive(id){
    links.forEach(l => {
      const isActive = (idToLink[id] === l);
      l.classList.toggle('active', isActive);
      if(isActive){
        l.setAttribute('aria-current', 'true');
      } else {
        l.removeAttribute('aria-current');
      }
    });
  }

  // quick response when clicking a link (prevent race with observer)
  links.forEach(a => a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      const id = href.slice(1);
      setActive(id);
    } else {
      // fallback
      links.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
      a.setAttribute('aria-current','true');
    }
  }));

  // update on load (if hash present)
  if(location.hash){
    const id = location.hash.replace('#','');
    if(idToLink[id]) setActive(id);
  }

  if('IntersectionObserver' in window){
    // IntersectionObserver: prefer the section that covers the center of the viewport
    const observer = new IntersectionObserver((entries) => {
      // pick the entry with highest intersectionRatio that is intersecting
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if(visible.length){
        const id = visible[0].target.id;
        setActive(id);
      }
    }, {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    sections.forEach(s => observer.observe(s));
  } else {
    // Fallback: compute most visible section on scroll/resize (throttled with rAF)
    let ticking = false;
    function computeMostVisible(){
      let best = null;
      let bestArea = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      sections.forEach(s => {
        const rect = s.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        if(visibleHeight > bestArea){
          bestArea = visibleHeight;
          best = s;
        }
      });
      if(best && best.id) setActive(best.id);
      ticking = false;
    }
    function onScrollOrResize(){
      if(!ticking){
        ticking = true;
        requestAnimationFrame(computeMostVisible);
      }
    }
    window.addEventListener('scroll', onScrollOrResize, {passive:true});
    window.addEventListener('resize', onScrollOrResize);
    // initial compute
    computeMostVisible();
  }
}

function initPrices(){
  hoistPrecioIntoH3();
  injectLeaders();
  addHasPriceClassFallback();
  setupScrollSpy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrices);
} else {
  initPrices();
}

// Sincronizar dinámicamente el padding-left del body con el ancho real del header
function setupHeaderPaddingSync(){
  const header = document.querySelector('header');
  if(!header) return;

  function apply(){
    const w = header.offsetWidth || header.getBoundingClientRect().width || 0;
    // aplicar solo si cambia para evitar repaints innecesarios
    const current = (document.body.style.paddingLeft || '').trim();
    const target = w ? (w + 'px') : '';
    if(current !== target){
      document.body.style.paddingLeft = target;
    }
    // además sincronizar la variable CSS --sidebar-offset en :root para el pseudo-elemento del footer
    const root = document.documentElement;
    const currentVar = getComputedStyle(root).getPropertyValue('--sidebar-offset').trim();
    const targetVar = w ? (w + 'px') : '';
    if(currentVar !== targetVar){
      root.style.setProperty('--sidebar-offset', targetVar || '0px');
    }
  }

  // aplicar inicialmente
  apply();

  // usar ResizeObserver si está disponible para observar cambios del header (por ejemplo por media queries o cambios dinámicos)
  if('ResizeObserver' in window){
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    // también observar cambios de fuente/ventana
    window.addEventListener('resize', apply, {passive:true});
  } else {
    // fallback
    window.addEventListener('resize', apply, {passive:true});
    // intentar con interval corto si no hay resize events confiables
    let last = header.offsetWidth;
    const iv = setInterval(() => {
      if(!document.body) { clearInterval(iv); return; }
      const now = header.offsetWidth;
      if(now !== last){ last = now; apply(); }
    }, 300);
    // limpiar al unload
    window.addEventListener('unload', () => clearInterval(iv));
  }
}

// Llamar al sync desde la inicialización
(function attachHeaderSync(){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupHeaderPaddingSync);
  } else {
    setupHeaderPaddingSync();
  }
})();
