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

/* Menu mobile : carte déroulante blanche sous l'en-tête. */
if(bk&&mn){
  const hd=document.getElementById('hd')||document.querySelector('.hd');
  const inner=mn.querySelector('.w')||mn;
  const ico=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icons=[
    [/top|index/,'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'],
    [/service/,'<path d="M2 17h20"/><path d="M5 17V9h6v8"/><path d="M13 17l3-9 5 2-4 7"/>'],
    [/dispositif|expertise|advantage/,'<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 8 5-3 5 3-1.5-8"/>'],
    [/materi/,'<path d="M4 18l5-7 4 4 3-4 4 7z"/><path d="M4 21h16"/>'],
    [/apropos|about/,'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>'],
    [/contact/,'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>']
  ];
  mn.classList.add('mp');
  mn.setAttribute('aria-label','Menu principal');
  inner.classList.add('mp-card');
  inner.querySelectorAll('a:not(.b)').forEach((a,i)=>{
    const h=a.getAttribute('href')||'';
    const hit=icons.find(([re])=>re.test(h));
    a.classList.add('mp-l');
    a.innerHTML=`<span class="mp-i">${ico(hit?hit[1]:'<circle cx="12" cy="12" r="3"/>')}</span><span class="mp-t">${a.innerHTML}</span>${ico('<path d="M9 6l6 6-6 6"/>')}`;
    a.style.setProperty('--d',(i*35+60)+'ms');
  });
  const cta=inner.querySelector('a.b');
  if(cta){cta.classList.add('mp-cta');cta.insertAdjacentHTML('beforeend',ico('<path d="M5 12h14M13 6l6 6-6 6"/>'));}
  inner.insertAdjacentHTML('beforeend',`<div class="mp-ft"><a href="tel:+2290197988688">${ico('<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/>')}+229 01 97 98 86 88</a><span>${ico('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')}Lun – Sam · 7h – 18h</span></div>`);
  mn.insertAdjacentHTML('afterbegin','<div class="mp-bd" data-close></div>');
  document.body.appendChild(mn);
  bk.setAttribute('aria-controls','mn');
  bk.setAttribute('aria-expanded','false');
  bk.setAttribute('aria-label','Ouvrir le menu');
  let forcedSt=false;
  const place=()=>{if(hd)mn.style.setProperty('--mp-top',Math.max(0,hd.getBoundingClientRect().bottom)+'px')};
  const setOpen=open=>{
    if(open&&hd&&!hd.classList.contains('st')){hd.classList.add('st');forcedSt=true}
    if(open)place();
    mn.classList.toggle('on',open);
    bk.classList.toggle('x',open);
    if(hd)hd.classList.toggle('mp-open',open);
    bk.setAttribute('aria-expanded',String(open));
    bk.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
    document.documentElement.classList.toggle('mp-lock',open);
    if(!open&&forcedSt){hd.classList.remove('st');forcedSt=false;dispatchEvent(new Event('scroll'))}
  };
  bk.onclick=()=>setOpen(!mn.classList.contains('on'));
  mn.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>setOpen(false)));
  mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mn.classList.contains('on')){setOpen(false);bk.focus()}});
  addEventListener('resize',()=>{if(mn.classList.contains('on'))place()});
  matchMedia('(min-width:1200px)').addEventListener('change',e=>{if(e.matches&&mn.classList.contains('on'))setOpen(false)});
}



const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -60px'});

document.querySelectorAll('.rv').forEach(el=>io.observe(el));



/* Cascade automatique : les enfants d'un meme bloc apparaissent l'un apres l'autre.

   .band-g est volontairement exclu : le bandeau du hero vit dans le carrousel,

   il ne doit pas dependre d'un observateur au scroll. */

document.querySelectorAll('.svcs,.figs,.proc,.gal,.stats,.q-side,.cg,.fr').forEach(box=>{

  [...box.children].forEach((el,i)=>{el.classList.add('rv');io.observe(el);el.style.transitionDelay=(i%6)*90+'ms'});

});

const additionalRevealTargets=document.querySelectorAll(
  '.home-intro__grid>*,.home-stat,.approach-flow>*,.commitment-grid>*,.about-pillars>*,.ft-newsletter__inner>*,.ft-main__grid>*,.ft-bottom__inner>*,.ft-action'
);
additionalRevealTargets.forEach((element,index)=>{
  if(element.classList.contains('rv'))return;
  element.classList.add('rv');
  element.style.transitionDelay=`${(index%4)*80}ms`;
  io.observe(element);
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
const statistics=document.querySelector('[data-statistics]');
if(statistics){
  const counters=[...statistics.querySelectorAll('[data-stat-count]')];
  const formatter=new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0});
  const finishCounters=()=>{
    counters.forEach(counter=>{
      counter.textContent=formatter.format(Number(counter.dataset.statCount));
    });
  };
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reducedMotion||!('IntersectionObserver' in window)){
    finishCounters();
  }else{
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return;
      observer.unobserve(statistics);
      const duration=1800;
      const start=performance.now();
      const animate=now=>{
        const progress=Math.min((now-start)/duration,1);
        const eased=1-Math.pow(1-progress,3);
        counters.forEach(counter=>{
          const target=Number(counter.dataset.statCount);
          counter.textContent=formatter.format(Math.round(target*eased));
        });
        if(progress<1)requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    },{threshold:.25});
    observer.observe(statistics);
  }
}
const projectFilters=[...document.querySelectorAll('.project-filter')];
if(projectFilters.length){
  const projectSection=projectFilters[0].closest('section');
  const projects=[...projectSection.querySelectorAll('.g[data-category]')];
  projectFilters.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    projectFilters.forEach(item=>{
      const active=item===button;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    projects.forEach(project=>{
      project.hidden=filter!=='all'&&project.dataset.category!==filter;
    });
  }));
}
const homeCarousels=[...document.querySelectorAll('[data-home-carousel]')];
if(homeCarousels.length){
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  homeCarousels.forEach(carousel=>{
    const track=carousel.querySelector('.home-service__slides');
    const slides=[...track.querySelectorAll('.home-service__slide')];
    const dots=[...carousel.querySelectorAll('.home-service__pagination button')];
    const initialIndex=slides.findIndex(slide=>!slide.hidden);
    let activeIndex=initialIndex<0?0:initialIndex;
    let timer=null;
    let visible=false;
    let paused=false;
    let loopTarget=null;
    slides.forEach(slide=>slide.removeAttribute('hidden'));
    const firstClone=slides[0].cloneNode(true);
    const lastClone=slides[slides.length-1].cloneNode(true);
    [firstClone,lastClone].forEach(clone=>{
      clone.setAttribute('aria-hidden','true');
      clone.querySelector('img').loading='eager';
    });
    track.prepend(lastClone);
    track.append(firstClone);

    const positionTrack=(trackIndex,animate=true)=>{
      if(!animate)track.style.transition='none';
      track.style.transform=`translateX(-${trackIndex*carousel.clientWidth}px)`;
      if(!animate){
        track.offsetHeight;
        track.style.transition='';
      }
    };

    const show=(index,direction)=>{
      const previousIndex=activeIndex;
      activeIndex=(index+slides.length)%slides.length;
      if(direction===undefined){
        const forwardDistance=(activeIndex-previousIndex+slides.length)%slides.length;
        direction=forwardDistance<=slides.length/2?1:-1;
      }
      slides[activeIndex].querySelector('img').loading='eager';
      slides[(activeIndex+1)%slides.length].querySelector('img').loading='eager';
      let trackIndex=activeIndex+1;
      loopTarget=null;
      if(direction>0&&previousIndex===slides.length-1&&activeIndex===0){
        trackIndex=slides.length+1;
        loopTarget='first';
      }else if(direction<0&&previousIndex===0&&activeIndex===slides.length-1){
        trackIndex=0;
        loopTarget='last';
      }
      if(loopTarget&&reducedMotion.matches){
        trackIndex=activeIndex+1;
        loopTarget=null;
      }
      positionTrack(trackIndex);
      slides.forEach((slide,i)=>{
        slide.setAttribute('aria-hidden',String(i!==activeIndex));
      });
      dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===activeIndex)));
    };
    track.addEventListener('transitionend',event=>{
      if(event.target!==track||!loopTarget)return;
      const trackIndex=loopTarget==='first'?1:slides.length;
      loopTarget=null;
      positionTrack(trackIndex,false);
    });
    const stop=()=>{
      if(timer)clearInterval(timer);
      timer=null;
    };
    const schedule=()=>{
      stop();
      if(visible&&!paused&&!document.hidden&&!reducedMotion.matches){
        timer=setInterval(()=>show(activeIndex+1,1),4800);
      }
    };

    show(activeIndex);
    carousel.querySelector('.home-service__arrow--previous').addEventListener('click',()=>{
      show(activeIndex-1,-1);
      schedule();
    });
    carousel.querySelector('.home-service__arrow--next').addEventListener('click',()=>{
      show(activeIndex+1,1);
      schedule();
    });
    dots.forEach((dot,index)=>dot.addEventListener('click',()=>{
      show(index);
      schedule();
    }));
    carousel.addEventListener('pointerenter',event=>{
      if(event.pointerType!=='mouse')return;
      paused=true;
      stop();
    });
    carousel.addEventListener('pointerleave',event=>{
      if(event.pointerType!=='mouse')return;
      paused=false;
      schedule();
    });
    carousel.addEventListener('focusin',()=>{
      paused=true;
      stop();
    });
    carousel.addEventListener('focusout',event=>{
      if(!carousel.contains(event.relatedTarget)){
        paused=false;
        schedule();
      }
    });
    document.addEventListener('visibilitychange',schedule);
    reducedMotion.addEventListener('change',event=>{
      if(event.matches&&loopTarget){
        loopTarget=null;
        positionTrack(activeIndex+1);
      }
      schedule();
    });
    let resizeFrame=0;
    addEventListener('resize',()=>{
      cancelAnimationFrame(resizeFrame);
      resizeFrame=requestAnimationFrame(()=>{
        loopTarget=null;
        positionTrack(activeIndex+1,false);
      });
    });
    new IntersectionObserver(([entry])=>{
      visible=entry.isIntersecting;
      schedule();
    }).observe(carousel);
  });
}
const homeIntroVideo=document.querySelector('.home-intro__media video');
if(homeIntroVideo){
  const playbackStatus=document.querySelector('.home-intro__video-status');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false;
  const startPlayback=()=>{
    if(!visible||reducedMotion.matches||!homeIntroVideo.paused)return;
    homeIntroVideo.play().catch(()=>{
      playbackStatus.hidden=false;
    });
  };
  homeIntroVideo.addEventListener('playing',()=>{playbackStatus.hidden=true});
  homeIntroVideo.addEventListener('error',()=>{
    playbackStatus.textContent='La vidéo est indisponible. Vous pouvez consulter nos prestations.';
    playbackStatus.hidden=false;
  });
  new IntersectionObserver(([entry])=>{
    visible=entry.isIntersecting;
    if(visible)startPlayback();
  }).observe(homeIntroVideo);
  reducedMotion.addEventListener('change',event=>{
    if(event.matches){
      homeIntroVideo.removeAttribute('autoplay');
      homeIntroVideo.pause();
    }else{
      homeIntroVideo.setAttribute('autoplay','');
      startPlayback();
    }
  });
  if(reducedMotion.matches){
    homeIntroVideo.removeAttribute('autoplay');
    homeIntroVideo.pause();
  }
}
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


/* Video du hero : lecture garantie (muette, en boucle). Seul le mode
   "economie de donnees" la remplace par l'image de couverture. */
(()=>{
  const v=document.querySelector('.hero-video');
  if(!v)return;
  const c=navigator.connection||{};
  if(c.saveData){v.removeAttribute('autoplay');v.pause();v.preload='none';return;}
  v.muted=true;
  const go=()=>{if(!v.paused)return;const p=v.play();if(p&&p.catch)p.catch(()=>{})};
  go();
  ['loadeddata','canplay'].forEach(ev=>v.addEventListener(ev,go));
  document.addEventListener('visibilitychange',()=>{document.hidden?v.pause():go()});
  addEventListener('pageshow',go);
  ['pointerdown','touchstart','scroll','keydown'].forEach(ev=>addEventListener(ev,go,{once:true,passive:true}));
})();
