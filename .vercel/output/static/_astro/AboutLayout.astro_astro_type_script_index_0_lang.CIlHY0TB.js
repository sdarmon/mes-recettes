import{a as l}from"./client.Bvy2CC_f.js";import{Marked as m}from"https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";const u=new m,p=document.getElementById("preview-btn"),r=document.getElementById("preview-container"),c=document.getElementById("preview-content"),s=document.getElementById("markdown-input"),g=document.querySelector('input[name="title"]'),b=document.querySelector('input[name="author"]'),v=document.querySelector('textarea[name="description"]'),x=document.querySelector('input[name="personnes"]'),y=document.querySelector('input[name="unite"]');p?.addEventListener("click",()=>{if(!r||!c||!s)return;r.classList.remove("hidden");let t=s.value.replace(/<C v="([\d.]+)" \/>/g,'<strong class="text-accent underline decoration-dotted">$1</strong>');const o=u.parse(t);c.innerHTML=`
      <!-- TITRE ET AUTEUR -->
      <h1 class="text-4xl font-bold text-accent mb-2">${g.value||"Titre de la recette"}</h1>
      <p class="italic text-lg mb-4 text-gray-600 dark:text-gray-400">Par ${b.value||"Auteur inconnu"}</p>
      
      <!-- DESCRIPTION -->
      <p class="text-xl mb-8 leading-relaxed border-l-4 border-accent pl-4 italic">
        ${v.value||"Pas de description renseignée."}
      </p>

      <!-- SIMULATION DU CALCULATEUR (Visuel uniquement) -->
      <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl mb-8 border border-gray-200 dark:border-zinc-700">
        <div class="flex items-center gap-2">
            <span class="text-sm font-bold uppercase tracking-wider">Quantité :</span>
            <div class="bg-white dark:bg-zinc-900 border border-accent px-4 py-1 rounded-lg font-bold text-accent">
                ${x.value||"0"}
            </div>
        </div>
        <span class="font-medium">${y.value||"unité"}</span>
        <span class="text-xs text-gray-400 ml-auto">(Simulé dans l'aperçu)</span>
      </div>

      <hr class="mb-8 border-dashed border-gray-300 dark:border-zinc-700" />
      
      <!-- CORPS DE LA RECETTE -->
      <div class="recipe-body">
        ${o}
      </div>
    `,r.scrollIntoView({behavior:"smooth"})});const f=new URLSearchParams(window.location.search),i=f.get("admin");if(i){const n=document.getElementById("admin-zone");n&&n.classList.remove("hidden");const t=document.getElementById("adminKeyInput");t&&(t.value=i)}const a=document.getElementById("recipe-form"),e=document.getElementById("msg");a?.addEventListener("submit",async n=>{n.preventDefault(),e&&(e.classList.remove("hidden"),e.textContent="Vérification et envoi en cours...",e.className="mt-4 p-3 rounded text-center bg-blue-100 text-blue-800");const t=new FormData(a),{data:o,error:d}=await l.addRecipe(t);e&&(d?(e.textContent="❌ "+d.message,e.className="mt-4 p-3 rounded text-center bg-red-100 text-red-800 font-bold"):(e.textContent="✅ Recette publiée !",e.className="mt-4 p-3 rounded text-center bg-green-100 text-green-800 font-bold",a.reset()))});
