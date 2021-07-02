let input = document.querySelector("input");

input.addEventListener("change", myFunction);

function myFunction() {
  let files = input.files;
  if (files.length == 0) return;
  const file = files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    let data = document.getElementById("cont");
    data.innerHTML = e.target.result;

    wordArr = data.innerHTML.split(" ");
    console.log(wordArr);
    params = {
      method: "POST",
      Headers: {
        "content-type": "application/json",
      },
      body: {},
    };
    var par = fetch(
      `https://api.textgears.com/spelling?text=${data.innerHTML} 
        &language=en-GB&whitelist=&dictionary_id=&key=X9hubDbZggjqgLV8`,
      params
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.response);
        var err = [];
        for (i = 0; i < data.response.errors.length; i++) {
          err.push(data.response.errors[i].bad);
        }
        console.log(err);
        wordArr.forEach((word, index) => {
          if (err.includes(word)) {
            console.log(word, index);
            wordArr[index] = `<span style="color:red">${word}</span>`;
          }
        });
        console.log(wordArr);
        var res = wordArr.join(" ");
        console.log(wordArr.join(" "));
        document.getElementById("cont").innerHTML = res;

        var err2d = [];
        for (j = 0; j < data.response.errors.length; j++) {
          err2d.push(data.response.errors[j].better);
        }
        
        // i = 0;
        // var changed = [];
        // wordArr.forEach((word, index) => {
        //   if (word.includes("</span>")) {
        //     changed.push(word);
            
        //     document.getElementById("contain").innerHTML = err2d[i];
        //     console.log(err2d[i]);
        //     i++;
        //   }
        // });
        // console.log(err2d);
        // console.log(changed);
        // var vicky=changed.join(' ')
        // console.log(vicky)
        // document.getElementById("contain").innerHTML=vicky;
      //   for(i=0;i<data.response.errors.length;i++){
      //   document.getElementsByTagName("span")[i].addEventListener('click',shownum()
      //  )
      //  function shownum(){
      //   document.getElementById('spell').innerHTML=err2d[i]
      //  }

      //   }
        
        for (j = 0; j < data.response.errors.length; j++) {
          document
            .getElementsByTagName("span")
            [0].addEventListener("click",() =>{
              recur=data.response.errors[0].better.join(' ');
              document.getElementById("contain").innerHTML =
              recur
            });
            
        }
      });
  };

  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(file);
}
