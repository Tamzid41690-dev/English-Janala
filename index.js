const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLessons(data.data))
}

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const lessonDiv = document.createElement("div");
       
        lessonDiv.innerHTML = `
           <button class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>Learn-${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(lessonDiv);
        console.log(lesson);
    });
}
loadLessons();