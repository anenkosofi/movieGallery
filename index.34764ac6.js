var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},s=e.parcelRequired7c6;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,s.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=s),s("5KeTa");var i=s("5KeTa");async function o(e=1){const t=await fetch(`${i.BASE_URL}/trending/movie/day?api_key=${i.API_KEY}&page=${e}`);if(!t.ok)throw new Error(t.status);return await t.json()}var a=s("e2fFv");const r=document.querySelector(".movie-list");function l(e){const t=e.map((({id:e,poster_path:t,title:n,genre_ids:s,release_date:i})=>`<li class="movie-list__item" data-id="${e}">\n            <img class="movie-image" ${(0,a.checkImageSrc)(t)} alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">${n||"Unknown"}</h2>\n              <p class="movie-info"><span class="genre">${(0,a.genresIdConverter)(s)||"No information"} |</span><span>${(0,a.getFullYear)(i)||"No information"}</span></p>\n            </div>\n        </li>`)).join("");r.innerHTML=t}var c=s("9WIO2");const d=document.querySelector(".movie-list"),u=document.querySelector(".pagination-list"),m=document.querySelector(".pagination"),p=document.querySelector("body").getBoundingClientRect();function f(){[...document.querySelectorAll(".pagination-button")].map((e=>{if(e.classList.contains("active")){const t=Number(e.textContent)-1;o(t).then((({results:e})=>{l(e)})).catch((e=>console.log(e))),(0,c.clearMarkup)(u),b(t),v(t),y(t)}}))}function h(){[...document.querySelectorAll(".pagination-button")].map((e=>{if(e.classList.contains("active")){const t=Number(e.textContent)+1;o(t).then((({results:e})=>{l(e)})).catch((e=>console.log(e))),(0,c.clearMarkup)(u),b(t),v(t),y(t)}}))}function v(e){const t=m.firstElementChild,n=m.lastElementChild;1===e?(t.disabled="true",n.hasAttribute("disabled")&&n.removeAttribute("disabled")):20===e?(n.disabled="true",t.hasAttribute("disabled")&&t.removeAttribute("disabled")):(t.hasAttribute("disabled")&&t.removeAttribute("disabled"),n.hasAttribute("disabled")&&n.removeAttribute("disabled"))}function g(e){return e.map((e=>`<li class="pagination-item">\n          <button class="pagination-button" type="button">${e}</button>\n        </li>`)).join("")}function b(e){let t=[],n="",s=0;const i='<li class="pagination-item"><button class="pagination-button" type="button" disabled>...</button></li>',o='<li class="pagination-item"><button class="pagination-button" type="button">1</button></li>',a='<li class="pagination-item"><button class="pagination-button" type="button">20</button></li>';if(e>=1&&e<=3){s=5;for(let e=1;e<=s;e+=1)t.push(e);if(p.width<768){n=`${g(t)}`}else{n=`${g(t)} ${i} ${a}`}}else if(e>3&&e<18){s=e+2;for(let n=e-2;n<=s;n+=1)t.push(n);if(p.width<768){n=`${g(t)}`}else{n=`${o} ${i} ${g(t)} ${i} ${a}`}}else if(e>=18){for(let e=16;e<=20;e+=1)t.push(e);if(p.width<768){n=`${g(t)}`}else{n=`${o} ${i} ${g(t)}`}}u.innerHTML=n}function y(e){[...document.querySelectorAll(".pagination-button")].map((t=>{t.classList.contains("active")&&t.classList.remove("active"),Number(t.textContent)===e&&t.classList.add("active")}))}function L(e){if("BUTTON"===e.target.nodeName&&e.target.textContent){const t=Number(e.target.textContent);(0,c.clearMarkup)(d),o(t).then((({results:e})=>{l(e)})).catch((e=>console.log(e))),(0,c.clearMarkup)(u),b(t),v(t),y(t)}}const w=document.querySelector(".pagination-list");!function(){document.body.style.overflow="hidden";o().then((({results:e})=>l(e))).catch((e=>console.log(e))),b(1),v(1),y(1),w.addEventListener("click",L);const e=document.querySelector(".arrow-left"),t=document.querySelector(".arrow-right");e.classList.remove("is-hidden"),t.classList.remove("is-hidden"),e.addEventListener("click",f),t.addEventListener("click",h),document.querySelector(".loader-wrapper").classList.add("turn-off"),document.body.style.overflow="visible"}(),s("jxehG"),s("e2fFv"),s("hfwlf"),s("2UGQT"),s("5Gpz0"),s("jD5nR"),s("cCskP"),s("an6E8");i=s("5KeTa"),c=s("9WIO2"),a=s("e2fFv");var $=s("2UGQT"),S=s("5Gpz0");const q=document.querySelector(".movie-list"),k=document.querySelector(".pagination-list"),E=document.querySelector(".results-list"),_=document.querySelector(".error-message"),A=document.querySelector(".form");A.addEventListener("submit",(function(e){e.preventDefault();M(e.currentTarget.elements.searchQuery.value.trim().toLowerCase()).then((({results:e})=>{E.classList.add("is-hidden"),A.classList.remove("input-change"),l(e)})).catch((e=>console.log(e)));const t=document.querySelector(".arrow-left"),n=document.querySelector(".arrow-right");t.classList.add("is-hidden"),n.classList.add("is-hidden"),(0,c.clearMarkup)(k),A.reset()}));const T=document.querySelector(".form-input");async function M(e){const t=await fetch(`${i.BASE_URL}/search/movie?api_key=${i.API_KEY}&query=${e}`);if(!t.ok)throw new Error(t.status);return await t.json()}T.addEventListener("input",(function(e){const t=e.target.value.trim().toLowerCase();t?M(t).then((({results:e,total_results:t})=>{t?(_.classList.remove("is-shown"),A.classList.add("input-change"),E.classList.remove("is-hidden"),function(e){const t=e.map((({id:e,title:t})=>`<li class="results-item" data-id="${e}">\n          <span class="title">${t}</span>\n          <span class="delimeter">|</span>\n          <span class="year">2022</span>\n          <span class="vote">7.8</span>\n        </li>`)).join("");E.innerHTML=t}(e)):(_.classList.add("is-shown"),A.classList.remove("input-change"),E.classList.add("is-hidden"))})).catch((e=>console.log(e))):(A.classList.remove("input-change"),E.classList.add("is-hidden"));const n=document.querySelector(".arrow-left"),s=document.querySelector(".arrow-right");n.classList.add("is-hidden"),s.classList.add("is-hidden"),(0,c.clearMarkup)(k)})),T.addEventListener("blur",(function(){A.classList.remove("input-change"),E.classList.add("is-hidden")})),E.addEventListener("click",(function(e){if(!e.target.closest("li"))return;if(e.target.closest("li")){const t=e.target.closest("li").dataset.id;(0,$.fetchMovieDetails)(t).then((e=>function({id:e,poster_path:t,title:n,genres:s,release_date:i}){const o=`<li class="movie-list__item" data-id="${e}">\n            <img class="movie-image" ${(0,a.checkImageSrc)(t)} alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">${n||"Unknown"}</h2>\n              <p class="movie-info"><span class="genre">${(0,S.checkGenres)(s)||"No information"} |</span><span>${(0,a.getFullYear)(i)||"No information"}</span></p>\n            </div>\n        </li>`;q.innerHTML=o}(e))).catch((e=>console.log(e))),A.classList.remove("input-change"),E.classList.add("is-hidden"),A.reset()}}));
//# sourceMappingURL=index.34764ac6.js.map
