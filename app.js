$(document).ready(function() {
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",function(response){
    for(let i = 0; i < response.length; i++) {  
        const section = $("#questions");
        const questionWrapper = $("<div>");
        const que = $("<h3>").html("Q" + (i + 1) +"." + response[i].question);
        questionWrapper.append(que);
         for(let j = 0; j < response[i].options.length; j++){
             const radio = $("<input type='radio'>").attr({
                 "id": "Q"+ (i + 1)  + (j + 1),
                 "name": i + 1,
                 "value": response[i].options[j]
                });
             const label = $("<label>").attr("for","Q"+ (i + 1) + (j + 1)).html(response[i].options[j]);
             const optionWrapper = $("<p>").addClass("Q"+ (i + 1)  +  (j + 1)).append(radio, label);  
            questionWrapper.append(optionWrapper);
         }
        questionWrapper.addClass("question-wrapper")
        questionWrapper.insertBefore("#submit");
      }
      $("#submit").click(function() {
          let marks = 0;
        for(let i = 0; i < response.length; i++){
         if ($(`input[name= '${i + 1}']:checked`).val() === response[i].options[response[i].answer - 1]) {
            marks += 1;
            const correct = $("<i>").addClass("fa fa-check").css("color","green");
            const id = $(`input[name= '${i + 1}']:checked`).attr("id");
            $(`.${id}`).append(correct);
                        
         } else {
            const wrong = $("<i>").addClass("fa fa-times").css("color","red");
            const id = $(`input[name= '${i + 1}']:checked`).attr("id");
            $(`.${id}`).append(wrong);
            for(let j = 0; j < $(`input[name= '${i + 1}']`).length; j++) {
                const arr = $(`input[name= '${i + 1}']`);
            if(arr[j].value === response[i].options[response[i].answer - 1]) {
                const correct = $("<i>").addClass("fa fa-check").css("color","green");
                const id = arr[j].id;
                $(`.${id}`).append(correct);
            }
            }
         }
         } 
        $("#marks").html(marks);
    })
    })
   
})
