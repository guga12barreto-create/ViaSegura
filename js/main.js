(function(){
const root=document.documentElement;
try{const t=localStorage.getItem('tema');if(t)root.dataset.theme=t;}catch(e){}
const tb=document.getElementById('theme-btn');
if(tb){if(root.dataset.theme==='dark')tb.textContent='Tema claro';
tb.onclick=()=>{const d=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=d;try{localStorage.setItem('tema',d)}catch(e){}tb.textContent=d==='dark'?'Tema claro':'Tema escuro'};}
const mb=document.getElementById('menu-btn'),nav=document.getElementById('nav');
if(mb)mb.onclick=()=>{const c=nav.classList.toggle('closed');mb.setAttribute('aria-expanded',!c)};
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 const p=b.dataset.perfil;
 document.querySelectorAll('.tip').forEach(t=>t.hidden=!(p==='todos'||t.dataset.perfil===p));
});
const sp=document.getElementById('vel');
if(sp){const f=()=>{const v=+sp.value,r=v/3.6*0.75,b=v*v/(254*0.7);
 document.getElementById('vel-out').textContent=v;
 document.getElementById('d-total').textContent=Math.round(r+b);
 document.getElementById('d-det').textContent=`${Math.round(r)} m de reação + ${Math.round(b)} m de frenagem`};
 sp.oninput=f;f();}
const box=document.getElementById('quiz');
if(box){
const Q=[
{q:'Qual é o principal risco de usar o celular ao dirigir?',o:['Gasta a bateria mais rápido','Desvia olhos, mãos e atenção da via','Só é perigoso em alta velocidade','Não afeta quem usa o viva-voz'],a:1,e:'Olhar, digitar ou conversar tira a atenção da via, e em segundos o veículo percorre dezenas de metros sem controle.'},
{q:'Se a velocidade dobra, o que acontece com a distância de frenagem?',o:['Também dobra','Fica igual','Aumenta cerca de quatro vezes','Diminui pela metade'],a:2,e:'A distância de frenagem cresce com o quadrado da velocidade: o dobro da velocidade exige cerca de quatro vezes mais espaço para parar.'},
{q:'Qual é a atitude mais segura em relação a bebida alcoólica e direção?',o:['Beber pouco e dirigir devagar','Tomar café para passar o efeito','Se beber, não dirigir','Dirigir só em trajetos curtos'],a:2,e:'O álcool reduz reflexos e julgamento mesmo em pequenas quantidades. A Lei Seca brasileira adota tolerância zero.'},
{q:'Como manter distância segura do veículo da frente?',o:['Regra dos 3 segundos','Colar para evitar ultrapassagens','Seguir o ritmo do carro de trás','Ficar a um metro por 10 km/h'],a:0,e:'Escolha um ponto fixo na via: o carro da frente passa por ele e você deve levar ao menos 3 segundos para chegar lá.'},
{q:'Como o pedestre deve atravessar a rua com segurança?',o:['Entre dois carros parados','Correndo, sem olhar','Na faixa, olhando os dois lados e buscando contato visual','Olhando só o celular'],a:2,e:'Use a faixa ou passarela, olhe para os dois lados e confirme que o motorista viu você antes de atravessar.'}];
let i=0,pts=0;
const $=id=>document.getElementById(id);
function show(){
 const c=Q[i];
 $('prog').style.width=(i/Q.length*100)+'%';
 $('prog-wrap').setAttribute('aria-valuenow',i);
 $('count').textContent=`Pergunta ${i+1} de ${Q.length}`;
 $('area').innerHTML=`<fieldset><legend>${c.q}</legend>`+c.o.map((t,k)=>`<label class="opt"><input type="radio" name="r" value="${k}"> ${String.fromCharCode(65+k)}) ${t}</label>`).join('')+'</fieldset>';
 $('fb').hidden=true;$('send').hidden=false;$('next').hidden=true;
}
$('send').onclick=()=>{
 const s=document.querySelector('input[name=r]:checked');
 if(!s){$('fb').hidden=false;$('fb').textContent='Escolha uma alternativa antes de enviar.';return}
 const c=Q[i],k=+s.value,ok=k===c.a;if(ok)pts++;
 document.querySelectorAll('.opt').forEach((l,n)=>{l.classList.toggle('ok',n===c.a);l.classList.toggle('bad',n===k&&!ok);l.querySelector('input').disabled=true});
 $('fb').hidden=false;$('fb').textContent=(ok?'Correto! ':'Não foi dessa vez. ')+c.e;
 $('send').hidden=true;$('next').hidden=false;$('next').textContent=i===Q.length-1?'Ver resultado':'Próxima pergunta';
};
$('next').onclick=()=>{i++;if(i<Q.length)return show();
 $('prog').style.width='100%';$('area').innerHTML=`<h2>Resultado</h2><p class="big">${pts} de ${Q.length} acertos</p><p>${pts>=4?'Excelente! Compartilhe o que aprendeu.':pts>=3?'Bom resultado. Revise o guia de segurança.':'Vale revisar os fatores de risco e o guia.'}</p><p><a class="btn" href="guia.html">Ver guia de segurança</a> <button class="btn alt" id="again">Refazer quiz</button></p>`;
 $('fb').hidden=true;$('send').hidden=true;$('next').hidden=true;$('count').textContent='Quiz concluído';
 $('again').onclick=()=>{i=0;pts=0;show()}};
show();
}
})();
