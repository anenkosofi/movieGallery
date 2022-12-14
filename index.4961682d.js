function t(t,e,n,o){Object.defineProperty(t,e,{get:n,set:o,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},i={},a=n.parcelRequired7c6;null==a&&((a=function(t){if(t in o)return o[t].exports;if(t in i){var e=i[t];delete i[t];var n={id:t,exports:{}};return o[t]=n,e.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){i[t]=e},n.parcelRequired7c6=a),a.register("kyEFX",(function(e,n){var o,i;t(e.exports,"register",(function(){return o}),(function(t){return o=t})),t(e.exports,"resolve",(function(){return i}),(function(t){return i=t}));var a={};o=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)a[e[n]]=t[e[n]]},i=function(t){var e=a[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),a("kyEFX").register(JSON.parse('{"5ZPII":"index.4961682d.js","frxiO":"placeholder.2262f4e0.png"}'));var r;r=new URL(a("kyEFX").resolve("frxiO"),import.meta.url).toString();const s=document.querySelector(".movie-list"),l=document.querySelector(".pagination-list"),c=document.querySelector(".pagination"),d=document.querySelector("body").getBoundingClientRect(),u=document.querySelector(".modal"),m=document.querySelector(".backdrop"),p=document.querySelector(".close-button");function v(){[...document.querySelectorAll(".pagination-button")].map((t=>{if(t.classList.contains("active")){const e=Number(t.textContent)-1;g(e).then((({results:t})=>{S(t)})).catch((t=>console.log(t))),_(l),q(e),b(e),k(e)}}))}function f(){[...document.querySelectorAll(".pagination-button")].map((t=>{if(t.classList.contains("active")){const e=Number(t.textContent)+1;g(e).then((({results:t})=>{S(t)})).catch((t=>console.log(t))),_(l),q(e),b(e),k(e)}}))}function b(t){const e=c.firstElementChild,n=c.lastElementChild;1===t?(e.disabled="true",n.hasAttribute("disabled")&&n.removeAttribute("disabled")):20===t?(n.disabled="true",e.hasAttribute("disabled")&&e.removeAttribute("disabled")):(e.hasAttribute("disabled")&&(console.log(e.hasAttribute("disabled")),e.removeAttribute("disabled")),n.hasAttribute("disabled")&&n.removeAttribute("disabled"))}async function g(t=1){const e=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=bfcd7a06a5bb09fb5aafe756d2f60f73&page=${t}`);if(!e.ok)throw new Error(e.status);return await e.json()}s.addEventListener("click",(function(t){let e=0;t.target.closest("li")&&(e=t.target.closest("li").dataset.id);const n=document.querySelector(".information");n&&n.remove();(async function(t){const e=await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=bfcd7a06a5bb09fb5aafe756d2f60f73`);if(!e.ok)throw new Error(e.status);return await e.json()})(e).then((t=>{!function({id:t,genres:e,original_title:n,overview:o,popularity:i,poster_path:a,title:r,vote_average:s,vote_count:l}){const c=`<div class="information" data-id="${t}"><img ${w(a)} alt="Movie poster" data-name="poster-path" />\n    <div class="movie-details">\n      <h3 class="movie-heading" data-name="title">${r}</h3>\n      <ul class="movie-list-info">\n        <li class="movie-list-info__item">\n          <p class="movie-testimonial">Vote / Votes</p>\n          <p class="movie-mark">\n            <span class="rating" data-name="vote-average">${y(s)}</span><span class="delimeter">/</span\n            ><span class="quantity" data-name="vote-count">${l}</span>\n          </p>\n        </li>\n        <li class="movie-list-info__item">\n          <p class="movie-testimonial">Popularity</p>\n          <p class="movie-mark" data-name="popularity">${y(i)}</p>\n        </li>\n        <li class="movie-list-info__item">\n          <p class="movie-testimonial">Original Title</p>\n          <p class="movie-mark movie-mark--original-title" data-name="original-title">${n}</p>\n        </li>\n        <li class="movie-list-info__item">\n          <p class="movie-testimonial">Genre</p>\n          <p class="movie-mark" data-name="genres">${e.map((t=>t.name)).join(", ")}</p>\n        </li>\n      </ul>\n      <p class="about">About</p>\n      <p class="about-descr" data-name="overview">${o}</p>\n      <div class="button-wrapper button-wrapper--modal">\n      <button class="button modal-button" type="button" data-action="watched">\n        Add to watched\n      </button>\n      <button\n        class="button modal-button"\n        type="button"\n        data-action="queue"\n      >\n        Add to queue\n      </button>\n    </div>\n  </div>\n</div>`;u.firstElementChild.insertAdjacentHTML("afterend",c)}(t);document.querySelector('[data-action="watched"]').addEventListener("click",E)})).catch((t=>console.log(t))),m.classList.remove("is-hidden"),document.addEventListener("keydown",A)})),p.addEventListener("click",x),m.addEventListener("click",(function(t){t.currentTarget===t.target&&x()})),g().then((({results:t})=>{S(t),q(1),b(1),k(1),l.addEventListener("click",L);const e=document.querySelector(".arrow-left"),n=document.querySelector(".arrow-right");e.classList.remove("is-hidden"),n.classList.remove("is-hidden"),e.addEventListener("click",v),n.addEventListener("click",f)})).catch((t=>console.log(t)));const h={12:"Adventure",14:"Fantasy",16:"Animation",18:"Drama",27:"Horror",28:"Action",35:"Comedy",36:"History",37:"Western",53:"Thriller",80:"Crime",99:"Documentary",878:"Sci-Fi",9648:"Mystery",10402:"Music",10749:"Romance",10751:"Family",10752:"War",10770:"TV Movie"};function y(t){return t.toFixed(1)}function w(t){return t?`src="https://image.tmdb.org/t/p/w500${t}"`:`src="${e(r)}"`}function S(t){const e=t.map((({id:t,poster_path:e,title:n,genre_ids:o,release_date:i})=>{return`<li class="movie-list__item" data-id="${t}">\n            <img class="movie-image" ${w(e)} alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">${n||"Unknown"}</h2>\n              <p class="movie-info">${r=o,r.map((t=>h[t])).slice(0,3).join(", ")||"Other"} | ${a=i,new Date(a).getFullYear()||"Unknown"}</p>\n            </div>\n        </li>`;var a,r})).join("");s.innerHTML=e}function $(t){return t.map((t=>`<li class="pagination-item">\n          <button class="pagination-button" type="button">${t}</button>\n        </li>`)).join("")}function q(t){let e=[],n="",o=0;const i='<li class="pagination-item"><button class="pagination-button" type="button">...</button></li>',a='<li class="pagination-item"><button class="pagination-button" type="button">1</button></li>',r='<li class="pagination-item"><button class="pagination-button" type="button">20</button></li>';if(t>=1&&t<=3){o=5;for(let t=1;t<=o;t+=1)e.push(t);if(d.width<768){n=`${$(e)}`}else{n=`${$(e)} ${i} ${r}`}}else if(t>3&&t<18){o=t+2;for(let n=t-2;n<=o;n+=1)e.push(n);if(d.width<768){n=`${$(e)}`}else{n=`${a} ${i} ${$(e)} ${i} ${r}`}}else if(t>=18){for(let t=16;t<=20;t+=1)e.push(t);if(d.width<768){n=`${$(e)}`}else{n=`${a} ${i} ${$(e)}`}}l.innerHTML=n}function k(t){[...document.querySelectorAll(".pagination-button")].map((e=>{e.classList.contains("active")&&e.classList.remove("active"),Number(e.textContent)===t&&e.classList.add("active")}))}function _(t){t.innerHTML=""}function L(t){if("BUTTON"===t.target.nodeName&&t.target.textContent){const e=Number(t.target.textContent);_(s),g(e).then((({results:t})=>{S(t)})).catch((t=>console.log(t))),_(l),q(e),b(e),k(e)}}function E(){const t=document.querySelector(".information").dataset.id,e=document.querySelector('[data-name="genres"]').textContent,n=document.querySelector('[data-name="original-title"]').textContent,o=document.querySelector('[data-name="overview"]').textContent,i=document.querySelector('[data-name="popularity"]').textContent,a=document.querySelector('[data-name="poster-path"]').src,r=document.querySelector('[data-name="title"]').textContent,s=document.querySelector('[data-name="vote-average"]').textContent,l=document.querySelector('[data-name="vote-count"]').textContent,c="addToWatched";let d=JSON.parse(localStorage.getItem(c));if(d){const u=[...d],m={id:t,genres:e,originalTitle:n,overview:o,popularity:i,poster_path:a,title:r,voteAverage:s,voteCount:l};u.push(m),localStorage.setItem(c,JSON.stringify(u))}else{const d=[],u={id:t,genres:e,originalTitle:n,overview:o,popularity:i,poster_path:a,title:r,voteAverage:s,voteCount:l};d.push(u),localStorage.setItem(c,JSON.stringify(d))}}function x(){m.classList.add("is-hidden")}function A(t){"Escape"===t.code&&(document.removeEventListener("keydown",A),x())}const C=document.querySelector('[data-page="home"]');document.querySelector('[data-page="library"]');C.addEventListener("click",(function(){g().then((({results:t})=>S(t))).catch((t=>console.log(t))),q(1),b(1),k(1),l.addEventListener("click",L);const t=document.querySelector(".arrow-left"),e=document.querySelector(".arrow-right");t.addEventListener("click",v),e.addEventListener("click",f)}));
//# sourceMappingURL=index.4961682d.js.map
