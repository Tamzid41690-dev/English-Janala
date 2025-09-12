
const createElements = (arr) =>{
    const htmlElements = arr.map(el=> `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}

const manageInfinity = (status) =>{
    if(status==true){
        document.getElementById('infinity').classList.remove("hidden");
        document.getElementById('word-container').classList.add("hidden");
    }
    else{
        document.getElementById('infinity').classList.add("hidden");
        document.getElementById('word-container').classList.remove("hidden");
    }
}


const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLessons(data.data))
}
const removeActiveClass = () =>{
    const lessonBtns = document.querySelectorAll(".btn-active");
    lessonBtns.forEach(btn => btn.classList.remove("btn-active"));
}

const loadWords = (id) =>{
    manageInfinity(true)
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const lessonBtns = document.getElementById(`lesson-btn-${id}`);
        lessonBtns.classList.add("btn-active");
         displayloadwords(data.data);
    })
}

const loadWordDetails = async(id) =>{
        const url = `https://openapi.programming-hero.com/api/word/${id}`
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetails(details.data);
}
const displayWordDetails = (word) =>{
    console.log(word)
    const modalContainer = document.getElementById("details-container");
    modalContainer.innerHTML = `<h1 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h1>
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold">Example :</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bangla font-bold" >সমার্থক শব্দ গুলো</h2>
        <div>${createElements(word.synonyms)}</div>
      </div>
`;
    document.getElementById("my_modal").showModal();

}


const displayloadwords = (words) =>{
    const wordContainer = document.getElementById("word-container");
   wordContainer.innerHTML = "";
    if(words.length === 0){
        wordContainer.innerHTML = `<div class="text-center  col-span-full space-y-6 p-10">
      <img src="./assets/alert-error.png" alt="" class="w-24 h-24 mx-auto">
      <p class="text-[#79716b] font-bangla font-semibold text-2xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-4xl font-bold font-bangla">নেক্সট Lesson এ যান</h2>
    </div>`;
    manageInfinity(false);
    return;
    }


    words.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
            <div class="bg-white rounded-2xl py-10 px-5 shadow-sm text-center space-y-5">
          <h2 class="font-bold text-2xl font-bangla">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">Meaning/Pronounciation</p>
          <div class="font-bangla text-2xl font-medium ">${word.meaning ? word.meaning : "কোন অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "কোন উচ্চারণ পাওয়া যায়নি"}</div>
          <div class="flex justify-between items-center mt-5">
            <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff99]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff99]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `;
        wordContainer.appendChild(wordDiv);
        manageInfinity(false);
        
    });
}

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const lessonDiv = document.createElement("div");
       
        lessonDiv.innerHTML = `
           <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>Learn-${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(lessonDiv);
        
    });
}

loadLessons();