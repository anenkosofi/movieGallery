const e=document.querySelector(".movie-list");function t(e){e.innerHTML=""}function a(t){const a=t.map((({id:e,posterPath:t,title:a,genres:n,voteAverage:o})=>`<li class="movie-list__item" data-id="${e}">\n            <img class="movie-image" src="${t}" alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">${a}</h2>\n              <p class="movie-info">${n} | <span class="vote-average">${o}</span></p>\n            </div>\n        </li>`)).join("");e.innerHTML=a}document.querySelector('[data-name="header-wrapper"]').addEventListener("click",(function(n){if("watched"===n.target.closest("button").dataset.name){const n="add-to-watched";t(e);a(JSON.parse(localStorage.getItem(n)))}else if("queue"===n.target.closest("button").dataset.name){const n="add-to-queue";t(e);a(JSON.parse(localStorage.getItem(n)))}}));
//# sourceMappingURL=my-library.1755ac17.js.map
