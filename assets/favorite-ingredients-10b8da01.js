import{L as r,p as v,g as I,r as u,a as f,b as L,d as c}from"./tui-lib-pagination-22a949a9.js";const i=document.querySelector(".favorite-ingredients-list"),n=document.querySelector(".placeholder-empty-favorite-list");function p(){const o=JSON.parse(localStorage.getItem(r.INGREDIENTS))||[];if(!o.length){i.classList.add("visually-hidden"),n.classList.remove("visually-hidden"),n.closest(".favorite-section").classList.add("is-empty");return}const e=v(o,6,i,c);console.log(e),n.classList.add("visually-hidden"),n.closest(".favorite-section").classList.remove("is-empty"),i.classList.remove("visually-hidden"),i.addEventListener("click",s=>{y(s,e)})}function y(o,e){const s=o.target;s.closest(".remove-from-localstorage-btn")&&h(s,e),s.closest(".learn-more-btn")&&S(s,e)}async function S(o,e){const s=o.closest(".favorite-ingredient-item").dataset.id,t=await I(s);u(...t),f(),L(t,r.INGREDIENTS,c,e)}function h(o,e){const s=o.closest(".favorite-ingredient-item").dataset.id;let t=JSON.parse(localStorage.getItem(r.INGREDIENTS))||[];const d=t.findIndex(a=>a._id===s);if(d!==-1&&(t.splice(d,1),localStorage.setItem(r.INGREDIENTS,JSON.stringify(t))),!t.length)i.classList.add("visually-hidden"),n.classList.remove("visually-hidden"),n.closest(".favorite-section").classList.add("is-empty");else{console.log(e);const a=e.getCurrentPage();console.log("curPage: ",a);const l=e._options.itemsPerPage;console.log("itemsPerPage: ",l),e.setTotalItems(t.length);const g=e._options.totalItems;console.log("totalItems ",g);const m=(a-1)*l;i.innerHTML=c(t.slice(m,m+l)),g%l===0&&(e.reset(t.length),e.movePageTo(a-1)),console.log("products: ",t)}}p();
