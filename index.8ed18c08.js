const t=document.querySelector(".movie-list"),e=document.querySelector(".pagination-list");async function n(t=1){const e=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=bfcd7a06a5bb09fb5aafe756d2f60f73&page=${t}`);if(!e.ok)throw new Error(e.status);return await e.json()}n().then((({results:t})=>{a(t),s(1),r(1),e.addEventListener("click",l)})).catch((t=>console.log(t)));const i={12:"Adventure",14:"Fantasy",16:"Animation",18:"Drama",27:"Horror",28:"Action",35:"Comedy",36:"History",37:"Western",53:"Thriller",80:"Crime",99:"Documentary",878:"Science Fiction",9648:"Mystery",10402:"Music",10749:"Romance",10751:"Family",10752:"War",10770:"TV Movie"};function a(e){const n=e.map((({poster_path:t,title:e,genre_ids:n,release_date:a})=>{return`<li class="movie-list__item">\n          <a class="movie-link" href="" data-modal-open>\n            <img class="movie-image" src="https://image.tmdb.org/t/p/w500${t}" alt="" width="375" />\n            <div class="movie-descr">\n              <h2 class="movie-title">${e}</h2>\n              <p class="movie-info">${s=n,s.map((t=>i[t])).slice(0,2).join(", ")} | ${o=a,new Date(o).getFullYear()}</p>\n            </div>\n          </a>\n        </li>`;var o,s})).join("");t.innerHTML=n}function o(t){return markup=t.map((t=>`<li class="pagination-item">\n          <button class="pagination-button" type="button">${t}</button>\n        </li>`)).join("")}function s(t){let n=[],i="",a=0;const s='<li class="pagination-item"><button class="pagination-button" type="button">...</button></li>';if(1===t){a=4;for(let e=t;e<=a;e+=1)n.push(e);i=`${o(n)} ${s}`}if(t>1&&t<17){a=t+3;for(let e=t;e<=a;e+=1)n.push(e);i=`${s} ${o(n)} ${s}`}if(t>=17){for(let e=t;e<=20;e+=1)n.push(e);i=`${s} ${o(n)}`}e.innerHTML=i}function r(t){[...document.querySelectorAll(".pagination-button")].map((e=>{e.classList.contains("active")&&e.classList.remove("active"),e.textContent==t&&e.classList.add("active")}))}function c(t){t.innerHTML=""}function l(i){console.dir(i.target),"BUTTON"===i.target.nodeName&&i.target.textContent&&(pageNumber=Number(i.target.textContent),c(t),n(pageNumber).then((({results:t})=>{a(t)})).catch((t=>console.log(t))),c(e),s(pageNumber),r(pageNumber))}
//# sourceMappingURL=index.8ed18c08.js.map
