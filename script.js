$('document').ready(function(){
	

	$("#main").fadeIn(1000);
		
	var StartNum = 0;   			//переменная сообщения о старте игры
	var fMenu = false;				//переменная для считывания статуса меню для отгадывания
	var sMenu = false;				//переменная для считывания статуса меню для загадывания
	var game = false;				//переменная для считывания статуса: "запущена ли игра?"
	var blockBtnShow = false;		//переменная для блокировки повторного моментального нажатия(для кнопки "Показать окно")


	//анимация конфетти
	function confetti(){			
			
		$("#confetti").fadeIn(100);
		var flakes = '', randomColor;
    	for(var i = 0, len = 400; i < len; i++){

        	randomColor = Math.floor(Math.random()*16777215).toString(16);
        	flakes += '<div class="ball" style="background: #'+randomColor;
       		flakes += '; animation-duration: '+(Math.random() * 9 + 2)+'s; animation-delay: ';
       		flakes += (Math.random() * 2 + 0)+'s;"></div>';
   		}

    	document.getElementById('confetti').innerHTML = flakes;
		setTimeout(function() {$("#confetti").fadeOut(1000);}, 6000);
	}

	//звук победы
	var sound = new Audio();
	sound.src = "winning.mp3";



	//показать цифры
	$('#start').on('click',function(){				

		$("div[class^='Numbers']").show('normal')
	});

	//скрыть цифры
	$('#buttonClose').on('click',function(){

		$("div[class^='Numbers']").hide('normal')
	});	


	//кнопка "Начать игру"
	$('#start').on('click',function(){

		document.getElementById('start').innerHTML='Продолжжить игру';
		game = true;
		if(sMenu == false){
			fMenu = true;
			if(StartNum == 0){
				setTimeout(function() {
					$(alert('Выберите число, задуманное компьютером'));
				}, 500);
				StartNum++ ;
			}
			$('#main').animate({'height':'650'},400);
		}else{
			fMenu = true;
			if(StartNum == 0){
				setTimeout(function() {
					$(alert('Выберите число, задуманное компьютером'));
				}, 500);
				StartNum++ ;
			}
			$('#main').animate({'height':'865'},400);
		}
	}); 

	//кнопка "Закрыть"
	$('#buttonClose').on('click',function(){
		if(sMenu == false){
			fMenu = false;
			$('#main').animate({'height':''},850);
		}else{
			fMenu = false;
			$('#main').animate({'height':'676'},345);
		}
	}); 


	//кнопка "Показать окно"
	$('#buttonShow').on('click',function(){
		if(sMenu == false){
			if(fMenu == false && blockBtnShow == false){
				blockBtnShow = true;
				$('#main').animate({'height':'676'},400);
				$("div[class^='DivTextArea']").show('normal')
				setTimeout(function(){
					$("#broom").fadeIn(100);
				}, 500);
				document.getElementById('changeText').innerHTML='Скрыть диалоговое окно';
				sMenu = true;
				setTimeout(function(){
					blockBtnShow = false;
				}, 850);
			}else if(blockBtnShow == false){
				$('#main').animate({'height':'865'},400);
				$("div[class^='DivTextArea']").show('normal')
				setTimeout(function() {
					$("#broom").fadeIn(100);
				}, 500);
				document.getElementById('changeText').innerHTML='Скрыть диалоговое окно';
				sMenu = true;
			}
		}else{
			if(fMenu == false && blockBtnShow == false){
				blockBtnShow = true;
				$("#broom").fadeOut(10);
				setTimeout(function(){
					$('#main').animate({'height':''},850);
					$("div[class^='DivTextArea']").hide('normal')
					document.getElementById('changeText').innerHTML='Показать диалоговое окно';
					sMenu = false;
					setTimeout(function(){
						blockBtnShow = false;
					}, 850);
				}, 50);
			}else if(blockBtnShow == false){
				$("#broom").fadeOut(10);
				setTimeout(function(){
					$('#main').animate({'height':'650'},850);
					$("div[class^='DivTextArea']").hide('normal')
					document.getElementById('changeText').innerHTML='Показать диалоговое окно';
					sMenu = false;
				}, 50);
			}
		}
	});
		
		
	var n = Math.floor(Math.random() * 17) + 1; 	//переменная, в которой хранится загаданное число компьютером

	//ф-ция описывающая работу кнопок 1-17
	function clickButtons(x) {						
  			
  		if(game == true){	
			setTimeout(function() {
				if(n > x){
					alert('Задуманное число больше ' + x);
				}					
				if(n < x){
					alert('Задуманное число меньше ' + x);
				}
				if(n == x){
					confetti();
					n = Math.floor(Math.random() * 17) + 1;
					document.getElementById('start').innerHTML='Начать игру!';
					game = false;
					sound.play();
				}
			}, 150);
		}else{
			alert('Начните игру!');
		}
	}

	//описание работы ф-ции для угадывания чисел компьютером для 2-ого алгоритма(продвинутого)
	function guessNumbers(number){

		if(number == 1){
			alert(inum + '. Ваше число: ' + number);
			document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + number + '\n';
			document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Число было отгадано с 1-ой попытки' + '\n';
		}
		if(number == 2){
			document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не 1' + '\n';
			alert(inum + '. Ваше число: ' + number);
			document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + number + '\n';
		}
		if(number == 3){
			for(var i = 1; i < number; i++){
				document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 1, 2' + '\n';
			}
			alert(inum + '. Ваше число: ' + number);
			document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + number + '\n';
		}
		if(number == 4){
			for(var i = 1; i < number; i++){
				document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 1, 2, 3' + '\n';
			}
			alert(inum + '. Ваше число: ' + number);
			document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + number + '\n';
		}
		if(number > 4){
			for(var i = 1; i < number; i++){
				Val1 = number - 1;
				document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 1, 2 ... ' + Val1 + '\n';
			}
			alert(inum + '. Ваше число: ' + number);
			document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + number + '\n';
		}
	}


	//кнопки от 1 до 17 из первого меню
	$('#1').on('click', function(){

		clickButtons(1);
	});
	$('#2').on('click', function(){

		clickButtons(2);
	});
	$('#3').on('click', function(){

		clickButtons(3);
	});
	$('#4').on('click', function(){

		clickButtons(4);
	});
	$('#5').on('click', function(){

		clickButtons(5);
	});
	$('#6').on('click', function(){

		clickButtons(6);
	});
	$('#7').on('click', function(){

		clickButtons(7);
	});
	$('#8').on('click', function(){

		clickButtons(8);
	});
	$('#9').on('click', function(){

		clickButtons(9);
	});
	$('#10').on('click', function(){

		clickButtons(10);
	});
	$('#11').on('click', function(){

		clickButtons(11);
	});
	$('#12').on('click', function(){

		clickButtons(12);
	});
	$('#13').on('click', function(){

		clickButtons(13);
	});
	$('#14').on('click', function(){

		clickButtons(14);
	});
	$('#15').on('click', function(){

		clickButtons(15);
	});
	$('#16').on('click', function(){

		clickButtons(16);
	});
	$('#17').on('click', function(){

		clickButtons(17);
	});
		

	
	
	
	var broom = document.getElementById('textFromFirst').value;			//переменные для очищения текстовых полей
	var broom2 = document.getElementById('textFromSecond').value;		
	
	var inum = 0;														//переменная - счетчик

	var v = document.getElementById('textFromFirst').value;				//переменные, в которых хранится содержимое полей 
	var v2 = document.getElementById('textFromSecond').value;			

	
	$('#buttonGuess').on('click', function(){
		
		//переменные, которые сначала используются для контроля ввода в инпут "inputNum", а также для 
		//храения этого самого значения и хранения значения радио-инпута "formId"
		var Val1 = 0;										
		var Val2;
	
	
		$("#inputNum").keyup(function () {
			Val2 = $(this).val();
		}).keyup();
		
		Val2 = parseInt(Val2);
		
		if(isNaN(Val2)){
			Val2 = 0;
		}
		
		Val1 = Val1 + Val2;
		
		if(Val1 < 1){
			alert('Введите число от 1 до 17!');
		}if(Val1 > 17){
			alert('Введите число от 1 до 17!');
		}
		
		if(Val1 > 0 && Val1 < 18){

			inum++;
			Val2 = $('#formId input:radio:checked').val();
			
			//первый алгоритм угадывания(примитивный)
			if(Val2 == 1){

				if(Val1==1){
					guessNumbers(1);
				}
				if(Val1==2){
					guessNumbers(2);
				}
				if(Val1==3){
					guessNumbers(3);
				}
				if(Val1==4){
					guessNumbers(4);
				}
				if(Val1==5){
					guessNumbers(5);
				}
				if(Val1==6){
					guessNumbers(6);
				}
				if(Val1==7){
					guessNumbers(7);
				}
				if(Val1==8){
					guessNumbers(8);
				}
				if(Val1==9){
					guessNumbers(9);
				}
				if(Val1==10){
					guessNumbers(10);
				}
				if(Val1==11){
					guessNumbers(11);
				}
				if(Val1==12){
					guessNumbers(12);
				}
				if(Val1==13){
					guessNumbers(13);
				}
				if(Val1==14){
					guessNumbers(14);
				}
				if(Val1==15){
					guessNumbers(15);
				}
				if(Val1==16){
					guessNumbers(16);
				}
				if(Val1==17){
					guessNumbers(17);
				}
			}
			
			//второй алгоритм угадывания(продвинутый)
			if(Val2 == 2){
				
				//вспомогательная переменная для работы с 2 алгоритмом угадывания, хранит число, с котором надо проверить загаданное
				var Val3 = 9;						

				if(Val3 == Val1){
					alert(inum + '. Ваше число: ' + Val3);
					document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
					document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Число было отгадано с 1-ой попытки' + '\n';
				}
				if(Val3 > Val1){
					Val3 = 5;
					if(Val3 == Val1){
						alert(inum + '. Ваше число: ' + Val3);
						document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
						document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9' + '\n';
					}
					if(Val3 > Val1){
						Val3 = 3;
						if(Val3 == Val1){
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5' + '\n';
						}
						if(Val3 > Val1){
							Val3 = 2;
							if(Val3 == Val1){
								alert(inum + '. Ваше число: ' + Val3);
								document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
								document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5, 3' + '\n';
							}
							if(Val3 > Val1){
								Val3 = 1;
								alert(inum + '. Ваше число: ' + Val3);
								document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
								document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5, 3' + '\n';
							}
						}
						if(Val3 < Val1){
							Val3 = 4;
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5, 3' + '\n';
						}
					}
					if(Val3 < Val1){
						Val3 = 7;
						if(Val3 == Val1){
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5' + '\n';
						}
						if(Val3 > Val1){
							Val3 = 6;
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5' + '\n';
						}
						if(Val3 < Val1){
							Val3 = 8;
							alert(inum + '. Ваше число: ' + Val3)
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 5' + '\n';
						}
					}
				}
				if(Val3 < Val1){
					Val3 = 13;
					if(Val3 == Val1){
						alert(inum + '. Ваше число: ' + Val3);
						document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
						document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 13' + '\n';
					}
					if(Val3 > Val1){
						Val3 = 11;
						if(Val3 == Val1){
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13' + '\n';
						}
						if(Val3 > Val1){
							Val3 = 10;
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13' + '\n';
						}
						if(Val3 < Val1){
							Val3 = 12;
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13' + '\n';
						}
					}
					if(Val3 < Val1){
						Val3 = 15;
						if(Val3 == Val1){
							alert(inum + '. Ваше число: ' + Val3);
							document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
							document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13' + '\n';
						}
						if(Val3 > Val1){
							Val3 = 14;
							if(Val3 == Val1){
								alert(inum + '. Ваше число: ' + Val3);
								document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
								document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13, 15' + '\n';
							}
						}
						if(Val3 < Val1){
							Val3 = 16;
							if(Val3 == Val1){
								alert(inum + '. Ваше число: ' + Val3);
								document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
								document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13, 15' + '\n';
							}
							if(Val3<Val1){
								Val3 = 17;
								alert(inum + '. Ваше число: ' + Val3);
								document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val3 + '\n';
								document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Ваше число не: 9, 13, 15' + '\n';
							}
						}
					}
				}	
			}
			
			//третий алгоритм угадывания(читерский)
			if(Val2 == 3){
				alert(inum + '. Ваше число: ' + Val1);
				
				document.getElementById('textFromFirst').innerHTML=v + '  ' + inum + '.  Ваше число: ' + Val1 + '\n';
				document.getElementById('textFromSecond').innerHTML=v2 + '  ' + inum + '.  Число было отгадано с 1-ой попытки' + '\n';
			}
			v = document.getElementById('textFromFirst').value;
			v2 = document.getElementById('textFromSecond').value;

		}

		document.getElementById('inputNum').value="";
	});


	//смена текстовых полей
	$('#theFirstArea').on('click',function(){

		$("#broom").fadeOut(10);
		setTimeout(function() {
			$("div[id^='theFirstArea']").hide('normal')
			$("div[id^='theSecondArea']").show('normal')
		}, 50);
		setTimeout(function() {
			$("#broom").fadeIn(10);
		}, 500);
	});
	$('#theSecondArea').on('click',function(){

		$("#broom").fadeOut(10);
		setTimeout(function() {
			$("div[id^='theSecondArea']").hide('normal')
			$("div[id^='theFirstArea']").show('normal')
		}, 50);
		setTimeout(function() {
			$("#broom").fadeIn(10);
		}, 500);
	});

	//кнопка очищения полей(метла)
	$('#broom').on('click',function(){

		document.getElementById('textFromFirst').innerHTML='';
		document.getElementById('textFromSecond').innerHTML='';
		Val1 = 0;
		inum = 0;
		v = broom;
		v2 = broom2;
	});

});