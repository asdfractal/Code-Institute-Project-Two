$(document).ready(function () {

    /* API URL generation */
    let urlStart = 'https://opentdb.com/api.php?amount=10'
    let urlSelection = ''
    let urlType = '&type=multiple'
    let triviaURL = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'

    /* Values to select category and difficulty of trivia */
    const triviaSelect = (categoryChoice) => ({
        'mythology': '&category=20',
        'books': '&category=10',
        'film': '&category=11',
        'television': '&category=14',
        'video-games': '&category=15',
        'science-nature': '&category=17',
        'sport': '&category=21',
        'history': '&category=23',
        'politics': '&category=24',
        'animals': '&category=27',
        'art': '&category=25',
        'geography': '&category=22',
        'vehicles': '&category=28',
        'music': '&category=12',
        'celebrities': '&category=26',
        'general-knowledge': '&category=9',
        'easy': '&difficulty=easy',
        'medium': '&difficulty=medium',
        'hard': '&difficulty=hard'
    })[categoryChoice]
    
    /* Click events for selecting category and difficulty of trivia */
    $('.game--category-select').click(function(event) {
        return triviaSelect($(this).attr('id'))
    })

    $('.game--category-select').click(function(event) {
        urlSelection = event.result
        console.log(urlSelection);
    })
    
    $('.game--difficulty-select').click(function(event) {
        return triviaSelect($(this).attr('id'))
    })

    $('.game--difficulty-select').click(function(event) {
        urlSelection = urlSelection + event.result
        console.log(urlSelection);
        triviaURL = urlStart + urlSelection + urlType
        console.log(triviaURL);
        userSelection();
    })


    // $('.game--category-select').click(function(e) {
    //     e.preventDefault();
        
    //     $('.game--categories').addClass('game--panel__hidden').removeClass('game--panel__shown');
    //     $('.game--difficulty').addClass('game--panel__shown').removeClass('game--panel__hidden');
    // });


    // $('.game--difficulty-select').click(function (e) {
    //     e.preventDefault();
    //     $('.game--difficulty').addClass('game--panel__hidden').removeClass('game--panel__shown');
    //     $('.game--display').addClass('game--panel__shown').removeClass('game--panel__hidden');
    // });

    
    let triviaQuestions = []
    let triviaAnswers = []
    let triviaCorrect = []
    /* Get data out of local scope */
    /* https://stackoverflow.com/a/44644532 */
    async function getTriviaData() {
        const res = await fetch(triviaURL);
        const data = await res.json();
        // console.log(data.results);
        return data.results;
    }
    
    function processTriviaData() {
        getTriviaData().then(triviaData => {
            // push all questions into array
            triviaData.forEach((question, index) => {
                triviaQuestions.push(triviaData[index].question)
            })
            // push correct answer into incorrect answers
            triviaData.forEach((answer, index) => {
                triviaData[index].incorrect_answers.push(triviaData[index].correct_answer)
            })
            // push all answer choices into array
            triviaData.forEach((allAnswers, index) => {
                triviaAnswers.push(triviaData[index].incorrect_answers)
            })
            // shuffle answer array
            for (i =0; i < triviaAnswers.length; i++) {
                // console.log(triviaAnswers[i]);
                triviaAnswers[i].sort(() => Math.random() - 0.5);
                // console.log(triviaAnswers[i]);
            }
            // push all correct answers into array
            triviaData.forEach((cAnswer, index) => {
                triviaCorrect.push(triviaData[index].correct_answer)
            })
            // iterate array to display questions
            triviaQuestions.forEach((question, index) => {
                document.getElementById(`trivia${index}Question`).innerHTML = triviaQuestions[index];
            })
            // iterate array to display answers
            triviaAnswers.forEach((answerArray, index1) => {
                    triviaAnswers[index1].forEach((answer, index2) => {
                        document.getElementById(`trivia${index1}Answer${index2}`).innerHTML = triviaAnswers[index1][index2]
                    })
            })
        })
    }

    async function displayTrivia() {
        await getTriviaData()
        processTriviaData()
        return triviaCorrect;
    }
    
    let correctArray = []
    async function userSelection() {
        correctArray = await displayTrivia()
        console.log(correctArray);
    }
    
    /* check correct answer */
    $('.game--answer--single').click(function() {
        console.log($(this).text());
        if ($(this).text() == correctArray[1]) {
            console.log('correct');
        } else {
            console.log('incorrect');
        }
    });

    /* Question about this */
    // let checkCorrect = () => console.log($(this));
    // let checkCorrect = () => ($(this).text() == correctArray[1]) ? console.log('correct') : console.log('incorrect')
    
    
    function getTriviaData2() {
        fetch(triviaURL)
        .then(res => res.json())
        .then(data => {
            let triviaData = data.results;
            let triviaQuestions = []
            let triviaAnswers = []
            let triviaCorrect = []
            // push all questions into array
            triviaData.forEach((question, index) => {
                triviaQuestions.push(triviaData[index].question)
            });
            // push correct answer into incorrect answers
            triviaData.forEach((answer, index) => {
                triviaData[index].incorrect_answers.push(triviaData[index].correct_answer)
            });
            // push all answer choices into array
            triviaData.forEach((allAnswers, index) => {
                triviaAnswers.push(triviaData[index].incorrect_answers)
            })
            // shuffle answer array
            for (i =0; i < triviaAnswers.length; i++) {
                // console.log(triviaAnswers[i]);
                triviaAnswers[i].sort(() => Math.random() - 0.5);
                // console.log(triviaAnswers[i]);
            }
            // push all correct answers into array
            triviaData.forEach((cAnswer, index) => {
                triviaCorrect.push(triviaData[index].correct_answer)
            })
            // iterate array to display questions
            triviaQuestions.forEach((question, index) => {
                document.getElementById(`trivia${index}Question`).innerHTML = triviaQuestions[index];
            })
            // iterate array to display answers
            triviaAnswers.forEach((answerArray, index1) => {
                    triviaAnswers[index1].forEach((answer, index2) => {
                        document.getElementById(`trivia${index1}Answer${index2}`).innerHTML = triviaAnswers[index1][index2]
                    })
            })
            // console.log(triviaCorrect);
            // console.log(triviaQuestions);
            // console.log(triviaAnswers);
            // triviaData[0].incorrect_answers.forEach(answer => {
            //     for (i = 0; i < triviaData[0].incorrect_answers.length; i++) {
            //         document.getElementById('triviaAnswer' + (i + 1)).innerHTML = triviaData[0].incorrect_answers[i]
            //         console.log(i);
            //     }
            // });
            // $('.game--answer--single').click(function (e) {
            //     e.preventDefault();
            //     // console.log('click');
            //     console.log($(this).text());
            //     // console.log('----');
            //     if ($(this).text() == currentCorrect) {
            //         console.log('correct');
            //     } else {
            //         console.log('incorrect');
            //     }
            // });
        });
    }
});
