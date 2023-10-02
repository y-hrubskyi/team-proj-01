const d={COCKTAILS:"favoriteCocktails",INGREDIENTS:"favoriteIngredients"},p="https://drinkify.b.goit.study/api/v1",c="/team-proj-01/assets/sprite-0ecfa07c.svg";function u(t,a){const s=t.map(i=>`<li class="cocktail-card" data-id="${i._id}">
            <img class="cocktail-card-img" src="${i.drinkThumb}" alt="${i.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${i.drink}</h3>
              <p class="cocktail-description">${i.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn learn-more-btn" data-modal-open>Learn More</button>
                  <button type="button" class="add-to-localstorage-btn">
                    <svg width="18px" height="18px" class="svg-icon-heart">
                      <use href="${c}#icon-heart"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`).join("");a.insertAdjacentHTML("beforeend",s)}function b(t,a){const s=t.map(i=>`<li class="cocktail-card" data-id="${i._id}">
            <img class="cocktail-card-img" src="${i.drinkThumb}" alt="${i.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${i.drink}</h3>
              <p class="cocktail-description">${i.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn">Learn More</button>
                  <button type="button" class="add-to-localstorage-btn remove-from-localstorage-btn">
                    <svg width="18px" height="18px" class="icon-trash">
                      <use href="${c}#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`).join("");a.insertAdjacentHTML("beforeend",s)}function v(t){const a=e(),s=t.ingredients.map(r).join(""),i=`<div class="modal cocktail-modal" data-id="${t._id}">
                    <button type="button" class="modal-close-btn" aria-label="close modal window">
                      <svg class="modal-close-icon">
                        <use href="${c}#icon-close-modal"></use>
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
                  </div>`;a.innerHTML=i}function k(t){const a=e(),s="not specified";let i="";if(t.description){const n=t.title.split(" ").length;i=t.description.split(" ").slice(n).join(" ")}let o="";t.flavour&&(o=t.flavour.split(""),o[0]=o[0].toUpperCase(),o=o.join(""));const l=`<div class="modal ingredient-modal" data-id="${t._id}">
                    <button
                      type="button"
                      class="modal-close-btn"
                      aria-label="close modal window"
                    >
                      <svg class="modal-close-icon">
                        <use href="${c}#icon-close-modal"></use>
                      </svg>
                    </button>
                    <h2 class="ingredient-title">${t.title}</h2>
                    <h3 class="ingredient-type">${t.type}</h3>
                    <p class="ingredient-description">
                      <span class="ingredient-description-name">${t.title}</span> ${i||s}
                    </p>
                    <ul class="ingredient-properties-list">
                      <li class="ingredient-properties-item">Type: ${t.type||s}</li>
                      <li class="ingredient-properties-item">Country of origin: ${t.country||s}</li>
                      <li class="ingredient-properties-item">
                        Alcohol by volume: ${t.abv||s}
                      </li>
                      <li class="ingredient-properties-item">
                        Flavour: ${o||s}
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
                  </div>`;a.innerHTML=l}function e(){document.body.classList.add("no-scrolling-body");const t=document.querySelector("[backdrop-modal]");return t.classList.add("backdrop"),t}function r(t){return`<li class="per-cocktail-ingredient-item">
            <button type="button" class="per-cocktail-ingredient-btn" data-id="${t.ingredientId}">${t.title}</button>
          </li>`}export{p as B,d as L,v as a,k as b,u as c,b as r};
