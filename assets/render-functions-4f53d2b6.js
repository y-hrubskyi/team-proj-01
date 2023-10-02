(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const g=document.querySelectorAll(".dark-light");document.querySelector(".light-icon");document.querySelector(".dark-icon");const a=document.body;let r=a.className;const m=localStorage.getItem("theme");m==="dark-theme"?(a.classList.remove("light-theme"),a.classList.add(`${m}`)):a.classList.add(`${m}`);g.forEach(function(t){t.addEventListener("click",y)});function y(){a.classList.contains("light-theme")===!0?(r="dark-theme",a.classList.remove("light-theme"),a.classList.add("dark-theme"),localStorage.setItem("theme",r)):(r="light-theme",a.classList.add("light-theme"),a.classList.remove("dark-theme"),localStorage.setItem("theme",r))}const b=document.querySelector(".js-menu-container"),L=document.querySelector(".js-open-menu"),w=document.querySelector(".js-close-menu"),v=document.body;L.addEventListener("click",$);w.addEventListener("click",E);function $(){b.classList.add("is-open"),v.classList.add("no-scrolling-body")}function E(){b.classList.remove("is-open"),v.classList.remove("no-scrolling-body")}window.matchMedia("(min-width: 1280px)").addEventListener("change",t=>{t.matches&&(b.classList.remove("is-open"),v.classList.remove("no-scrolling-body"))});const k=document.querySelector(".header-nav-favorite"),l=document.querySelector(".header-link-nav-container"),d=document.querySelector(".arrow-header");k.addEventListener("click",S);document.body.addEventListener("click",M);function S(){if(!l.classList.contains("is-open-drop-down-menu")){l.classList.add("is-open-drop-down-menu"),d.classList.add("is-active-arrow");return}l.classList.remove("is-open-drop-down-menu"),d.classList.remove("is-active-arrow")}function M(t){t.target!==l&&t.target!==k&&t.target!==d&&(l.classList.remove("is-open-drop-down-menu"),d.classList.remove("is-active-arrow"))}const C=document.querySelector(".modal-nav-favorite"),p=document.querySelector(".link-modal-nav-container"),h=document.querySelector(".arrow-header-modal");C.addEventListener("click",q);function q(){if(!p.classList.contains("is-open-drop-down-modal-menu")){p.classList.add("is-open-drop-down-modal-menu"),h.classList.add("is-active-arrow");return}p.classList.remove("is-open-drop-down-modal-menu"),h.classList.remove("is-active-arrow")}const I={COCKTAILS:"favoriteCocktails",INGREDIENTS:"favoriteIngredients"},T="https://drinkify.b.goit.study/api/v1",u="/team-proj-01/assets/sprite-0ecfa07c.svg";function j(t,n){const s=t.map(o=>`<li class="cocktail-card" data-id="${o._id}">
            <img class="cocktail-card-img" src="${o.drinkThumb}" alt="${o.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${o.drink}</h3>
              <p class="cocktail-description">${o.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn learn-more-btn" data-modal-open>Learn More</button>
                  <button type="button" class="add-to-localstorage-btn">
                    <svg width="18px" height="18px" class="svg-icon-heart">
                      <use href="${u}#icon-heart"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`).join("");n.insertAdjacentHTML("beforeend",s)}function A(t,n){const s=t.map(o=>`<li class="cocktail-card" data-id="${o._id}">
            <img class="cocktail-card-img" src="${o.drinkThumb}" alt="${o.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${o.drink}</h3>
              <p class="cocktail-description">${o.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn">Learn More</button>
                  <button type="button" class="add-to-localstorage-btn remove-from-localstorage-btn">
                    <svg width="18px" height="18px" class="icon-trash">
                      <use href="${u}#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`).join("");n.insertAdjacentHTML("beforeend",s)}function D(t){const n=f(),s=t.ingredients.map(B).join(""),o=`<div class="modal cocktail-modal" data-id="${t._id}">
                    <button type="button" class="modal-close-btn" aria-label="close modal window">
                      <svg class="modal-close-icon">
                        <use href="${u}#icon-close-modal"></use>
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
                          ${s}
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
                  </div>`;n.innerHTML=o}function O(t){const n=f(),s="not specified";let o="";if(t.description){const c=t.title.split(" ").length;o=t.description.split(" ").slice(c).join(" ")}let e="";t.flavour&&(e=t.flavour.split(""),e[0]=e[0].toUpperCase(),e=e.join(""));const i=`<div class="modal ingredient-modal" data-id="${t._id}">
                    <button
                      type="button"
                      class="modal-close-btn"
                      aria-label="close modal window"
                    >
                      <svg class="modal-close-icon">
                        <use href="${u}#icon-close-modal"></use>
                      </svg>
                    </button>
                    <h2 class="ingredient-title">${t.title}</h2>
                    <h3 class="ingredient-type">${t.type}</h3>
                    <p class="ingredient-description">
                      <span class="ingredient-description-name">${t.title}</span> ${o||s}
                    </p>
                    <ul class="ingredient-properties-list">
                      <li class="ingredient-properties-item">Type: ${t.type||s}</li>
                      <li class="ingredient-properties-item">Country of origin: ${t.country||s}</li>
                      <li class="ingredient-properties-item">
                        Alcohol by volume: ${t.abv||s}
                      </li>
                      <li class="ingredient-properties-item">
                        Flavour: ${e||s}
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
                  </div>`;n.innerHTML=i}function f(){document.body.classList.add("no-scrolling-body");const t=document.querySelector("[backdrop-modal]");return t.classList.add("backdrop"),t}function B(t){return`<li class="per-cocktail-ingredient-item">
            <button type="button" class="per-cocktail-ingredient-btn" data-id="${t.ingredientId}">${t.title}</button>
          </li>`}export{T as B,I as L,D as a,O as b,j as c,A as r};
