import{L as o,e as a,b as c,d as l,a as g}from"./drinkify-api-service-1ea9aee7.js";const s=document.querySelector(".favorite-ingredients-list"),n=document.querySelector(".placeholder-empty-favorite-list");function m(){const e=JSON.parse(localStorage.getItem(o.INGREDIENTS))||[];e.length&&(n.classList.add("visually-hidden"),n.closest(".favorite-section").classList.remove("is-empty"),s.classList.remove("visually-hidden"),s.innerHTML=a(e),s.addEventListener("click",v))}function v(e){const t=e.target;t.closest(".remove-from-localstorage-btn")&&I(t),t.closest(".learn-more-btn")&&f(t)}async function f(e){const t=e.closest(".favorite-ingredient-item").dataset.id,i=await c(t);l(...i),g()}function I(e){const t=e.closest(".favorite-ingredient-item").dataset.id;let i=JSON.parse(localStorage.getItem(o.INGREDIENTS))||[];const r=i.findIndex(d=>d._id===t);r!==-1&&(i.splice(r,1),localStorage.setItem(o.INGREDIENTS,JSON.stringify(i))),i.length?s.innerHTML=a(i):(n.classList.remove("visually-hidden"),n.closest(".favorite-section").classList.add("is-empty"),s.classList.add("visually-hidden"))}m();
