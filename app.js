var main = function (toDoObjects) {
	"use strict";
	// как main имеет доступ к списку задач!
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание этой задачи
		return toDo.description;
	});
	// сейчас весь старый код должен работать как раньше!
	$("document").ready( function(){

	$(".tabs a span").toArray().forEach(function (element) { 
		// создаем обработчик щелчков для этого элемента 
		$(element).on("click", function () {
			// поскольку мы используем версию элемента jQuery,
			// нужно создать временную переменную,
			// чтобы избежать постоянного обновления
			var $element = $(element);
			$(".tabs a span").removeClass("active"); 
			$(element).addClass("active");
			$("main .content").empty();
			$("main .photos").empty();
			if ($element.parent().is(":nth-child(1)")) { 
				for (var i = toDos.length-1; i > -1; i--) { 
					$(".content").append($("<li>").text(toDos[i]));
				}
			} 
			else if ($element.parent().is(":nth-child(2)")) { 
				toDos.forEach(function (todo) { 
					$(".content").append($("<li>").text(todo));
				});
			} 
			else if ($element.parent().is(":nth-child(3)")) { 
				// ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ 
				console.log("Щелчок на вкладке Теги");
				// organizeByTag(toDoObjects);
				var organizedByTag = organizeByTags(toDoObjects);
				
				 organizedByTag.forEach(function (tag) { 
					var $tagName = $("<h3>").text(tag.name), 
					$content = $("<ul>"); 
					tag.toDos.forEach(function (description) { 
						var $li = $("<li>").text(description); 
						$content.append($li);
					});
					$("main .content").append($tagName); 
					$("main .content").append($content);
				});


			} 
			else if ($element.parent().is(":nth-child(4)")) { 
				var $input = $("<input>").addClass("description"), 
					$inputLabel = $("<p>").text("Новая задача: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Тэги: "),
					$button = $("<button>").text("+");
				$button.on("click", function () {
					var description = $input.val(),
					// разделение в соответствии с запятыми
					tags = $tagInput.val().split(","); 
					toDoObjects.push({"description":description, "tags":tags}); 
					// обновление toDos
					toDos = toDoObjects.map(function (toDo) {
						return toDo.description;
					});
					$input.val("");
					$tagInput.val("");
				});
				$("main .content").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button); 
			}
			else if ($element.parent().is(":nth-child(5)")) { 
				var js = document.createElement('script');
				js.src = "zadanie_app.js";
				document.body.appendChild(js);
			}
			return false;
		})
	})
	$(".tabs a:first-child span").trigger("click");

	})
};	

$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
	// вызов функции main с аргументом в виде объекта toDoObjects 
		main(toDoObjects);
	});
});