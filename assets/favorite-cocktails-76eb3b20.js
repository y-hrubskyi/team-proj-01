import{L as i,c as l}from"./render-functions-38182389.js";const t=document.querySelector(".favorite-cocktails-list"),s=document.querySelector(".placeholder-empty-favorite-list"),c=JSON.parse(localStorage.getItem(i.COCKTAILS))||[];c.length&&(s.classList.add("visually-hidden"),s.closest(".favorite-section").classList.remove("is-empty"),t.classList.remove("visually-hidden"),t.innerHTML=l(c));function m(r){const o=r.target.closest(".remove-from-localstorage-btn");if(!o)return;const d=o.closest(".cocktail-card").dataset.id;let e=JSON.parse(localStorage.getItem(i.COCKTAILS))||[];const a=e.findIndex(n=>n._id===d);a!==-1&&(e.splice(a,1),localStorage.setItem(i.COCKTAILS,JSON.stringify(e))),e.length?t.innerHTML=l(e):(s.classList.remove("visually-hidden"),s.closest(".favorite-section").classList.add("is-empty"),t.classList.add("visually-hidden"))}t.addEventListener("click",m);
