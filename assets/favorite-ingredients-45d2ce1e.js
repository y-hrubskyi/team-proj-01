import"./drop-down-modal-0ba19fc3.js";import{L as l,p as f,g as p,r as L,a as y,b as S,d}from"./tui-lib-pagination-65a7977a.js";const i=document.querySelector(".favorite-ingredients-list"),r=document.querySelector(".placeholder-empty-favorite-list");function h(){const o=JSON.parse(localStorage.getItem(l.INGREDIENTS))||[];if(!o.length){i.classList.add("visually-hidden"),r.classList.remove("visually-hidden"),r.closest(".favorite-section").classList.add("is-empty");return}const e=f(o,6,i,d);r.classList.add("visually-hidden"),r.closest(".favorite-section").classList.remove("is-empty"),i.classList.remove("visually-hidden"),i.addEventListener("click",s=>{P(s,e)})}function P(o,e){const s=o.target;s.closest(".remove-from-localstorage-btn")&&N(s,e),s.closest(".learn-more-btn")&&E(s,e)}async function E(o,e){const s=o.closest(".favorite-ingredient-item").dataset.id,t=await p(s);L(...t),y(),S(t,l.INGREDIENTS,d,e)}function N(o,e){var u;const s=o.closest(".favorite-ingredient-item").dataset.id;let t=JSON.parse(localStorage.getItem(l.INGREDIENTS))||[];const g=t.findIndex(I=>I._id===s);if(g!==-1&&(t.splice(g,1),localStorage.setItem(l.INGREDIENTS,JSON.stringify(t))),!t.length){i.classList.add("visually-hidden"),r.classList.remove("visually-hidden"),r.closest(".favorite-section").classList.add("is-empty");return}const v=document.querySelector("#tui-pagination-container");if(t.length<=((u=e==null?void 0:e._options)==null?void 0:u.itemsPerPage)){v.classList.add("is-hidden"),i.innerHTML=d(t);return}const n=e.getCurrentPage();console.log("currentPage: ",n);const a=e._options.itemsPerPage;console.log("itemsPerPage: ",a),e.setTotalItems(t.length);const c=e._options.totalItems;console.log("totalItems: ",c);const m=(n-1)*a;i.innerHTML=d(t.slice(m,m+a)),c%a===0&&(e.reset(t.length),n*a>c?e.movePageTo(n-1):e.movePageTo(n))}h();