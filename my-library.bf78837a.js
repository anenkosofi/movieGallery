!function(){var e=document.querySelector(".movie-list");function t(e){e.innerHTML=""}function a(t){var a=t.map((function(e){var t=e.id,a=e.posterPath,n=e.title,o=e.genres,c=e.voteAverage;return'<li class="movie-list__item" data-id="'.concat(t,'">\n            <img class="movie-image" src="').concat(a,'" alt="Movie poster" loading="lazy" />\n            <div class="movie-descr">\n              <h2 class="movie-title">').concat(n,'</h2>\n              <p class="movie-info">').concat(o,' | <span class="vote-average">').concat(c,"</span></p>\n            </div>\n        </li>")})).join("");e.innerHTML=a}document.querySelector('[data-name="header-wrapper"]').addEventListener("click",(function(n){if("watched"===n.target.closest("button").dataset.name){t(e),a(JSON.parse(localStorage.getItem("add-to-watched")))}else if("queue"===n.target.closest("button").dataset.name){t(e),a(JSON.parse(localStorage.getItem("add-to-queue")))}}))}();
//# sourceMappingURL=my-library.bf78837a.js.map
