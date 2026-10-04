const hd=document.getElementById('hd');

const wa=document.querySelector('.wa');
const impactHero=document.querySelector('.impact-hero');
const sc=()=>{
  const atTop=scrollY<=40&&document.body.dataset.page==='home';
  const atImpactTop=scrollY<=40&&!!impactHero;
  if(hd)hd.classList.toggle('st',scrollY>40);
  if(wa){
    wa.classList.toggle('hero-low',atTop);
    wa.classList.toggle('impact-low',atImpactTop);
  }
};

sc();addEventListener('scroll',sc);



/* Mesure la hauteur reelle du bandeau + header pour que le contenu du hero

   ne passe jamais derri?re, a n'importe quel ecran. */

const bd=document.querySelector('.band');

const syncVars=()=>{

  const b=bd?Math.round(bd.getBoundingClientRect().height):0;

  const t=Math.round(document.getElementById('tb').getBoundingClientRect().height);

  const h=Math.round(hd.getBoundingClientRect().height);

  if(bd)document.documentElement.style.setProperty('--bandH',b+'px');

  document.documentElement.style.setProperty('--hdH',(t+h)+'px');

  /* Les ancres doivent s'arreter SOUS le header fixe, pas 20px plus haut

     comme le faisait une valeur codee en dur. */

  document.documentElement.style.scrollPaddingTop=(t+h+16)+'px';

};

syncVars();

addEventListener('load',syncVars);

addEventListener('resize',syncVars);

if(document.fonts&&document.fonts.ready)document.fonts.ready.then(syncVars);



const bk=document.getElementById('bk'),mn=document.getElementById('mn');

if(bk&&mn){bk.onclick=()=>{bk.classList.toggle('x');mn.classList.toggle('on')};mn.querySelectorAll('a').forEach(a=>a.onclick=()=>{bk.classList.remove('x');mn.classList.remove('on')});}



const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -60px'});

document.querySelectorAll('.rv').forEach(el=>io.observe(el));



/* Cascade automatique : les enfants d'un meme bloc apparaissent l'un apres l'autre.

   .band-g est volontairement exclu : le bandeau du hero vit dans le carrousel,

   il ne doit pas dependre d'un observateur au scroll. */

document.querySelectorAll('.svcs,.figs,.proc,.gal,.stats,.q-side,.cg,.fr').forEach(box=>{

  [...box.children].forEach((el,i)=>{el.classList.add('rv');io.observe(el);el.style.transitionDelay=(i%6)*90+'ms'});

});



/* Compteurs de chiffres : incrementation quand le bloc entre dans l'ecran. */

const cio=new IntersectionObserver(es=>es.forEach(e=>{

  if(!e.isIntersecting)return;

  cio.unobserve(e.target);

  const el=e.target,to=+el.dataset.count,sfx=el.dataset.suffix||'',t0=performance.now(),dur=1500;

  let done=false;

  const set=v=>{if(!done){done=true;el.textContent=v+sfx}};

  const step=t=>{

    const p=Math.min((t-t0)/dur,1);

    el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+sfx;

    if(p<1)requestAnimationFrame(step);else set(to);

  };

  requestAnimationFrame(step);

  /* Filet de sécurité : si rAF est bridée (onglet en arrière-plan),

     on affiche quand même la valeur finale au lieu de rester bloquée. */

  setTimeout(()=>set(to),dur+400);

}),{threshold:.4});

const cntEls=[...document.querySelectorAll('[data-count]')];

cntEls.forEach(el=>cio.observe(el));

/* Si un compteur est deja visible au chargement, on l'anime aussitot. */

addEventListener('load',()=>{

  cntEls.forEach(el=>{

    const r=el.getBoundingClientRect();

    if(r.top<innerHeight&&r.bottom>0)cio.unobserve(el),el.textContent=el.dataset.count+(el.dataset.suffix||'');

  });

});



/* Barre de progression du scroll : initialisee des le chargement. */

const sp=document.getElementById('sprog');

const setProg=()=>{

  const h=document.documentElement.scrollHeight-innerHeight;

  if(sp)sp.style.width=(h>0 ? Math.min(100, Math.max(0, scrollY)/h*100) : 0)+'%';

};

addEventListener('scroll',setProg,{passive:true});

addEventListener('resize',setProg);

addEventListener('load',setProg);

setProg();



/* Parallaxe douce des images de fond. */

const plxEls=[...document.querySelectorAll('.plx')];

addEventListener('scroll',()=>{

  const y=scrollY;

  plxEls.forEach(el=>{

    const r=el.parentElement.getBoundingClientRect();

    if(r.bottom<0||r.top>innerHeight)return;

    const o=(r.top+r.height/2-innerHeight/2)/innerHeight;

    el.style.transform=`scale(1.14) translateY(${-o*38}px)`;

  });

},{passive:true});



/* Lignes du tableau des matériaux : entrée décalée. */

const rio=new IntersectionObserver(es=>es.forEach(e=>{

  if(!e.isIntersecting)return;

  rio.unobserve(e.target);

  [...e.target.querySelectorAll('tbody tr')].forEach((r,i)=>setTimeout(()=>r.classList.add('in'),i*70));

}),{threshold:.15});

document.querySelectorAll('table').forEach(t=>rio.observe(t));



/* Filet de sécurité : si l'observateur n'a pas déclenché au bout de 3 s,

   on révèle manuellement ce qui est déjà à l'écran (jamais ce qui est plus bas,

   pour ne pas casser l'animation au scroll). */

setTimeout(()=>{

  document.querySelectorAll('.rv:not(.in)').forEach(e=>{

    const r=e.getBoundingClientRect();

    if(r.top<innerHeight*1.2&&r.bottom>-innerHeight*.2)e.classList.add('in');

  });

  document.querySelectorAll('table tbody tr:not(.in)').forEach(r=>{

    const b=r.getBoundingClientRect();

    if(b.top<innerHeight*1.2&&b.bottom>-innerHeight*.2)r.classList.add('in');

  });

},3000);



document.querySelectorAll('nav a[data-page]').forEach(link=>link.classList.toggle('on',link.dataset.page===document.body.dataset.page));

const fab=document.getElementById('fab');

addEventListener('scroll',()=>fab.classList.toggle('on',scrollY>600));

const mediaShowcase=document.querySelector('.media-showcase');
if(mediaShowcase){
  const showcaseObserver=new IntersectionObserver(([entry])=>{
    document.body.classList.toggle('media-showcase-visible',entry.isIntersecting);
  },{threshold:.05});
  showcaseObserver.observe(mediaShowcase);
}


/* Validation du formulaire : sans elle, un envoi vide affichait quand meme

   le message de succes. On controle puis on affiche les erreurs sous les champs. */

const form=document.getElementById('devis'),okBox=document.getElementById('ok');
if(form&&okBox){


const setErr=(el,msg)=>{

  const fd=el.closest('.fd');

  let e=fd.querySelector('.ferr');

  if(msg){

    if(!e){e=document.createElement('small');e.className='ferr';e.setAttribute('role','alert');fd.appendChild(e)}

    e.textContent=msg;

    el.setAttribute('aria-invalid','true');

  }else{

    if(e)e.remove();

    el.removeAttribute('aria-invalid');

  }

};

const checkField=el=>{

  const v=el.value.trim();

  if(el.hasAttribute('required')&&!v)return setErr(el,'Champ obligatoire');

  if(el.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v))return setErr(el,'Email invalide');

  if(el.type==='tel'&&v&&!/^[+0-9 ().\-]{6,}$/.test(v))return setErr(el,'Numero invalide');

  setErr(el,'');

  return true;

};

form.querySelectorAll('input,select,textarea').forEach(el=>{

  el.addEventListener('blur',()=>checkField(el));

  el.addEventListener('input',()=>{if(el.getAttribute('aria-invalid'))checkField(el)});

});

form.addEventListener('submit',e=>{

  e.preventDefault();

  const fields=[...form.querySelectorAll('input,select,textarea')];

  let first=null;

  fields.forEach(el=>{if(!checkField(el)&&!first)first=el});

  if(first){okBox.style.display='none';first.focus();return}

  /* Envoi reel : on ouvre le client mail du visiteur avec le recap des champs.

     Seul moyen d'envoyer sans serveur ni service tiers (Formspree, etc.). */

  const MAIL='cricriguidibi@gmail.com';

  const val=id=>{const el=document.getElementById(id);return el?el.value.trim():''};

  const L=[['Nom et prénom',val('n')],['Téléphone',val('t')],['Email',val('e')],['Lieu du chantier',val('l')],['Prestation',val('s')],['Volume estimé',val('v')],['Détails du chantier',val('m')]];

  const corps=L.filter(([,v])=>v).map(([k,v])=>k+' : '+v).join('\n');

  const lien=document.createElement('a');

  lien.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Demande de devis - Cannan-Minning')+'&body='+encodeURIComponent(corps);

  document.body.appendChild(lien);lien.click();lien.remove();

  okBox.style.display='block';

  form.reset();

  fields.forEach(el=>setErr(el,''));

});

}
const year=document.getElementById('yr');if(year)year.textContent=new Date().getFullYear();



/* Liens de remplissage (reseaux sociaux) : href="#" faisait remonter

   toute la page en haut. On les neutralise proprement. */

document.querySelectorAll('a[href="#"]').forEach(a=>{

  a.setAttribute('aria-disabled','true');

  a.addEventListener('click',ev=>ev.preventDefault());

});



if(document.getElementById('carT')){
const ct=document.getElementById('carT'),cs=[...ct.children],cd=document.getElementById('carD'),cn=document.getElementById('carN');

const LBL=[['Carrières et agrégats','Fourniture et rotation continue','Gestion des flux en accès contraint'],

          ['Curage','Curage de lits et de berges','Transfert de volumes et reprofilage'],

          ['Vente de sable et petites roches','Matériaux triés et calibrés','0/4 · 0/6 · 0/20 · 10/20 · 20/40']];

let ci=0,tm=null;

const pad=n=>String(n).padStart(2,'0');

const tx=document.getElementById('carTxt');

const go=i=>{ci=(i+cs.length)%cs.length;ct.style.transform=`translateX(-${ci*100}%)`;

  [...cd.children].forEach((d,k)=>{d.classList.toggle('on',k===ci);d.setAttribute('aria-current', k===ci ? 'true' : 'false');});

  cn.textContent=pad(ci+1)+' / '+pad(cs.length);

  const l=LBL[ci];if(l)tx.innerHTML=`<em>${l[0]}</em><b>${l[1]}</b><span>${l[2]}</span>`;

  cs.forEach((s,k)=>{const g=s.querySelector('img');g.style.animation='none';if(k===ci){void g.offsetWidth;g.style.animation=''}});};

const play=()=>{tm=setInterval(()=>go(ci+1),5200)};

/* Pastilles : vrais <button> pour etre atteignables au clavier et au lecteur d'ecran. */

cs.forEach((_,i)=>{

  const d=document.createElement('button');

  d.type='button';

  d.setAttribute('aria-label','Aller a la diapositive '+(i+1));

  d.onclick=()=>{go(i);reset()};

  cd.appendChild(d);

});

const reset=()=>{clearInterval(tm);play()};

document.querySelectorAll('.car-b').forEach(b=>b.onclick=()=>{go(ci+ +b.dataset.d);reset()});

const car=document.getElementById('car');

car.addEventListener('mouseenter',()=>clearInterval(tm));

car.addEventListener('mouseleave',play);

let sx=0,dx=0;

car.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;dx=0;clearInterval(tm)},{passive:true});

car.addEventListener('touchmove',e=>{dx=e.touches[0].clientX-sx},{passive:true});

car.addEventListener('touchend',()=>{if(Math.abs(dx)>50)go(ci + (dx < 0 ? -1 : 1));play();});

go(0);play();
}
