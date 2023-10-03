(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const k=document.querySelectorAll(".dark-light");document.querySelector(".light-icon");document.querySelector(".dark-icon");const a=document.body;let d=a.className;const p=localStorage.getItem("theme");p==="dark-theme"?(a.classList.remove("light-theme"),a.classList.add(`${p}`)):a.classList.add(`${p}`);k.forEach(function(t){t.addEventListener("click",y)});function y(){a.classList.contains("light-theme")===!0?(d="dark-theme",a.classList.remove("light-theme"),a.classList.add("dark-theme"),localStorage.setItem("theme",d)):(d="light-theme",a.classList.add("light-theme"),a.classList.remove("dark-theme"),localStorage.setItem("theme",d))}const b=document.querySelector(".js-menu-container"),L=document.querySelector(".js-open-menu"),w=document.querySelector(".js-close-menu"),h=document.body;L.addEventListener("click",$);w.addEventListener("click",E);function $(){b.classList.add("is-open"),h.classList.add("no-scrolling-body")}function E(){b.classList.remove("is-open"),h.classList.remove("no-scrolling-body")}window.matchMedia("(min-width: 1280px)").addEventListener("change",t=>{t.matches&&(b.classList.remove("is-open"),h.classList.remove("no-scrolling-body"))});const g=document.querySelector(".header-nav-favorite"),l=document.querySelector(".header-link-nav-container"),u=document.querySelector(".arrow-header");g.addEventListener("click",M);document.body.addEventListener("click",S);function M(){if(!l.classList.contains("is-open-drop-down-menu")){l.classList.add("is-open-drop-down-menu"),u.classList.add("is-active-arrow");return}l.classList.remove("is-open-drop-down-menu"),u.classList.remove("is-active-arrow")}function S(t){t.target!==l&&t.target!==g&&t.target!==u&&(l.classList.remove("is-open-drop-down-menu"),u.classList.remove("is-active-arrow"))}const C=document.querySelector(".modal-nav-favorite"),m=document.querySelector(".link-modal-nav-container"),v=document.querySelector(".arrow-header-modal");C.addEventListener("click",I);function I(){if(!m.classList.contains("is-open-drop-down-modal-menu")){m.classList.add("is-open-drop-down-modal-menu"),v.classList.add("is-active-arrow");return}m.classList.remove("is-open-drop-down-modal-menu"),v.classList.remove("is-active-arrow")}const B={COCKTAILS:"favoriteCocktails",INGREDIENTS:"favoriteIngredients"},A="https://drinkify.b.goit.study/api/v1",r="/team-proj-01/assets/sprite-0ecfa07c.svg";function T(t,n){const o=t.map(s=>`<li class="cocktail-card" data-id="${s._id}">
            <img class="cocktail-card-img" src="${s.drinkThumb}" alt="${s.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${s.drink}</h3>
              <p class="cocktail-description">${s.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn learn-more-btn" data-modal-open>Learn More</button>
                  <button type="button" class="add-to-localstorage-btn">
                    <svg width="18px" height="18px" class="svg-icon-heart">
                      <use href="${r}#icon-heart"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`).join("");n.insertAdjacentHTML("beforeend",o)}function j(t,n){return t.map(o=>`<li class="cocktail-card" data-id="${o._id}">
            <img class="cocktail-card-img" src="${o.drinkThumb}" alt="${o.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${o.drink}</h3>
              <p class="cocktail-description">${o.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn">Learn More</button>
                  <button type="button" class="add-to-localstorage-btn remove-from-localstorage-btn">
                    <svg width="18px" height="18px" class="icon-trash">
                      <use href="${r}#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`).join("")}function x(t,n){const o=t.map(s=>`<li class="favorite-ingredient-item" data-id="${s._id}">
            <h3 class="fav-ingredient-title">${s.title}</h3>
            <h4 class="is-alcoholic-drink-title">${s.alcolol==="Yes"?"Alcoholic":"Non-Alcoholic"}</h4>
            <p class="fav-ingredient-description">
              ${s.description}
            </p>
            <div class="ingredient-card-btns">
              <button type="button" class="learn-more-ingredient-btn">learn more</button>
              <button type="button" class="remove-ingredient-btn remove-from-localstorage-btn" aria-label="remove from locale storage">
                <svg width="18px" height="18px" class="icon-trash">
                  <use href="${r}#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>`).join("");n.insertAdjacentHTML("beforeend",o)}function D(t){const n=f(),o=t.ingredients.map(q).join(""),s=`<div class="modal cocktail-modal" data-id="${t._id}">
                    <button type="button" class="modal-close-btn" aria-label="close modal window">
                      <svg class="modal-close-icon">
                        <use href="${r}#icon-close-modal"></use>
                      </svg>
                    </button>
                    <div class="cocktail-about-wrapper">
                      <img
                        class="cocktail-img"
                        src="${t.drinkThumb}"
                        alt="${t.drink}"
                        width="295"
                        height="277"
                      />
                      <div class="cocktail-ingredients-container">
                        <h3 class="cocktail-title">${t.drink}</h3>
                        <h4 class="cocktail-ingredients-title">Ingredients:</h4>
                        <h5 class="cocktail-per-cocktail">Per cocktail</h5>
                        <ul class="per-cocktail-ingredients-list">
                          ${o}
                        </ul>
                      </div>
                    </div>
                    <div class="cocktail-instruction-wrapper">
                      <h4 class="cocktail-instruction-title">Instructions:</h4>
                      <p class="cocktail-instruction">
                        ${t.instructions}
                      </p>
                    </div>
                    <div class="modal-btns">
                      <button
                        class="add-or-remove-btn"
                        type="button"
                        aria-label="add or remove cocktail"
                      >
                        add to favorite
                      </button>

                      <button
                        class="back-modal-close-btn"
                        type="button"
                        aria-label="close modal window"
                      >
                        BACK
                      </button>
                    </div>
                  </div>`;n.innerHTML=s}function O(t){const n=f(),o="not specified";let s="";if(t.description){const c=t.title.split(" ").length;s=t.description.split(" ").slice(c).join(" ")}let e="";t.flavour&&(e=t.flavour.split(""),e[0]=e[0].toUpperCase(),e=e.join(""));const i=`<div class="modal ingredient-modal" data-id="${t._id}">
                    <button
                      type="button"
                      class="modal-close-btn"
                      aria-label="close modal window"
                    >
                      <svg class="modal-close-icon">
                        <use href="${r}#icon-close-modal"></use>
                      </svg>
                    </button>
                    <h2 class="ingredient-title">${t.title}</h2>
                    <h3 class="ingredient-type">${t.type}</h3>
                    <p class="ingredient-description">
                      <span class="ingredient-description-name">${t.title}</span> ${s||o}
                    </p>
                    <ul class="ingredient-properties-list">
                      <li class="ingredient-properties-item">Type: ${t.type||o}</li>
                      <li class="ingredient-properties-item">Country of origin: ${t.country||o}</li>
                      <li class="ingredient-properties-item">
                        Alcohol by volume: ${t.abv||o}
                      </li>
                      <li class="ingredient-properties-item">
                        Flavour: ${e||o}
                      </li>
                    </ul>
                    <div class="modal-btns">
                      <button
                        class="add-or-remove-btn"
                        type="button"
                        aria-label="add or remove ingredient"
                      >
                        add to favorite
                      </button>
                      <button
                        class="back-modal-close-btn"
                        type="button"
                        aria-label="close modal window"
                      >
                        BACK
                      </button>
                    </div>
                  </div>`;n.innerHTML=i}function f(){document.body.classList.add("no-scrolling-body");const t=document.querySelector("[backdrop-modal]");return t.classList.add("backdrop"),t}function q(t){return`<li class="per-cocktail-ingredient-item">
            <button type="button" class="per-cocktail-ingredient-btn" data-id="${t.ingredientId}">${t.title}</button>
          </li>`}export{A as B,B as L,D as a,O as b,j as c,T as d,x as r};
