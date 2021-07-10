$(() => {
    // WHOS THAT POKEMON GAME
    const showModal = () =>{
        $('#modal').show()
        wtpGame()
    }
    $('#close').on('click', () =>{
        $('#modal').hide()
    })
    //both play button will show the modal 
    $('#play-top').on('click', showModal)
    $('#play-bttm').on('click', showModal)
    //pokedex 
    $('.pokedex').hide()
        const pokedexSearch = (event) =>{
            const $userInput = $('.input-pokedex').val().toLowerCase()
            if($userInput === ''|| $userInput <= 0 || $userInput > 649){
                alert("SORRY WE COULDN'T CATCH THAT!\nDigit a number from 1-649 or the name of the pokemon.")
            }else{
                $('.box3').empty()
                $('.pokedex').show()
                $.ajax({
                    url: `https://pokeapi.co/api/v2/pokemon/${$userInput}`
                }).then(
                    (data)=>{
                        //deciding which color to use in the background depending on pokemon type 
                        const changeBackground = () =>{
                            if(data.types[0].type.name === 'normal'){
                                $('.box1').css('background', '#a9a877')
                                $('.box3').css('background', '#a9a877')
                            }else if(data.types[0].type.name === 'fire'){
                                $('.box1').css('background', '#f0802e')
                                $('.box3').css('background', '#f0802e')
                            }else if(data.types[0].type.name === 'water'){
                                $('.box1').css('background', '#6890f0')
                                $('.box3').css('background', '#6890f0')
                            }else if(data.types[0].type.name === 'grass'){
                                $('.box1').css('background', '#79c84f')
                                $('.box3').css('background', '#79c84f')
                            }else if(data.types[0].type.name === 'electric'){
                                $('.box1').css('background', '#f9d030')
                                $('.box3').css('background', '#f9d030')
                            }else if(data.types[0].type.name === 'ice'){
                                $('.box1').css('background', '#99d7d8')
                                $('.box3').css('background', '#99d7d8')
                            }else if(data.types[0].type.name === 'fighting'){
                                $('.box1').css('background', '#c03128')
                                $('.box3').css('background', '#c03128')
                            }else if(data.types[0].type.name === 'poison'){
                                $('.box1').css('background', '#9f419f')
                                $('.box3').css('background', '#9f419f')
                            }else if(data.types[0].type.name === 'ground'){
                                $('.box1').css('background', '#e1c068')
                                $('.box3').css('background', '#e1c068')
                            }else if(data.types[0].type.name === 'flying'){
                                $('.box1').css('background', '#a890f0')
                                $('.box3').css('background', '#a890f0')
                            }else if(data.types[0].type.name === 'psychic'){
                                $('.box1').css('background', '#f95887')
                                $('.box3').css('background', '#f95887')
                            }else if(data.types[0].type.name === 'bug'){
                                $('.box1').css('background', '#a9b720')
                                $('.box3').css('background', '#a9b720')
                            }else if(data.types[0].type.name === 'rock'){
                                $('.box1').css('background', '#b8a038')
                                $('.box3').css('background', '#b8a038')
                            }else if(data.types[0].type.name === 'ghost'){
                                $('.box1').css('background', '#705998')
                                $('.box3').css('background', '#705998')
                            }else if(data.types[0].type.name === 'dark'){
                                $('.box1').css('background', '#705848')
                                $('.box3').css('background', '#705848')
                            }else if(data.types[0].type.name === 'dragon'){
                                $('.box1').css('background', '#7138f8')
                                $('.box3').css('background', '#7138f8')
                            }else if(data.types[0].type.name === 'steel'){
                                $('.box1').css('background', '#b8b8d0')
                                $('.box3').css('background', '#b8b8d0')
                            }else if(data.types[0].type.name === 'fairy'){
                                $('.box1').css('background', '#efb5bc')
                                $('.box3').css('background', '#efb5bc')
                            }
                        }
                        changeBackground()
                        const $populateBox1 = (data)=>{
                            //Populating box1 
                            //pokemon img 
                            $('.photo').attr('src', data.sprites.other.dream_world.front_default)
                            //pokemon name and id number
                            $('.poke-name').text(data.name + "  " + '#' + data.id)
                            // pokemon type
                            $('.type-1').text(data.types[0].type.name)
                        }
                        $populateBox1(data)
                        $('.box3').empty()
                        //populating box3
                        const $populateBox3 = (data) =>{
                            //populate box 3 with info and values 
                            for(let i = 0;i < data.stats.length;i++){
                                let $div= $('<div>').addClass('poke-atributte').attr('id','attr' + i)
                                let $p = $('<p>').text(data.stats[i].stat.name + ':')
                                let $span = $('<span>').text(data.stats[i].base_stat)
                                $p.append($span)
                                $div.append($p)
                                $('.box3').append($div)
                            }
                        }
                        $populateBox3(data)
                        $.ajax({
                            url: `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
                        }).then(
                            (info)=>{
                                const $populateBox2 = () =>{
                                    for(let i = 0; i < 8; i++){
                                        const $div = $('<div>').attr('id', 'div' + i)
                                        const $p = $('<p>').attr('id', 'p' + i)
                                        const $span = $('<span>').attr('id', 'span' + i)
                                        $p.append($span)
                                        $div.append($p)
                                        $('.box2').append($div)
                                    }
                                    $('#p0').html(`Generation: <span>${info.generation.name.toUpperCase()}</span>`)
                                    let answer = ''
                                    if(info.is_legendary === false){
                                        answer = "no"
                                    }else{
                                        answer = "yes"
                                    }
                                    $('#p1').html(`Legendary: <span>${answer}</span>`)
                                    let $habitat = ''
                                    if(info.habitat == null){
                                        $habitat = 'undefined'
                                    }else{
                                        $habitat = info.habitat.name 
                                    }
                                    $('#p2').html(`Habitat: <span>${$habitat}</span>`)
                                    $('#p3').html(`Color: <span>${info.color.name}</span>`)
                                    $('#p4').html(`Shape:  <span>${info.shape.name}</span>`)
                                    $('#p5').html(`Happiness: <span>${info.base_happiness}%</span>`)
                                    $('#p6').html(`Capture rate: <span>${info.capture_rate}%</span>`)
                                    $('#p7').html(`Grownt rate: <span>${info.growth_rate.name}</span>`)
                                }
                                $populateBox2()

                            },
                            ()=>{
                                $('.pokedex').hide()
                                alert("SORRY WE COULDN'T CATCH THAT!\nDigit a number from 1-649 or the name of the pokemon.")
                                console.log('bad request 2')
                            }
                        )
                    },
                    () =>{
                        //theres is no data 
                        $('.pokedex').hide()
                        console.log('bad request')
                        alert("SORRY WE COULDN'T CATCH THAT!\nDigit a number from 1-649 or the name of the pokemon.")
                    }
                    
                )   

            }
        }
    // trigged enter key on pokedex input 
    $('.input-pokedex').keydown( (event) =>{
        if(event.keyCode === 13){
            pokedexSearch()
        }
    })
    // run pokedex when clicking on the button 
    $('.poke-search').on('click',pokedexSearch)
    //countdown
    const $countdown = () =>{
        let seconds = 4
        $('.countdown').show()
    const timer = setInterval(()=>{
        if(seconds > 0){
            $('.countdown').text(`Next pokemon in ${seconds}s`)
        }else{
            clearInterval(timer)
            $('.countdown').text('Go!')
            seconds = 4
            $('.countdown').text('')
        }
        seconds--
    }, 1000) 
    } 
    //game function 
    const wtpGame = () =>{
        $('.countdown').hide()
        const $num = Math.floor(Math.random() * 649  + 1)
        $.ajax({
           url: `https://pokeapi.co/api/v2/pokemon/${$num}`
        }).then(
            (poke)=>{
                console.log(poke)
                //populating game 
                $('#wtp').css('filter', 'brightness(0%)')
                $('.wtp-text').css('background', '#fff')
                $('#wtp').attr('src', `${poke.sprites.other.dream_world.front_default}`)
                $('h4').hide()
                $('h4').text(`${poke.name}  #${poke.id}`)
                $('.wtp-text').val('')
                // check if user is right or wrong and change background 
                const $checkAnswer = () =>{
                    const $inputAnswer = $('.wtp-text').val().toLowerCase()
                        if($inputAnswer === poke.name){
                            console.log('yes you got it right')
                            $('#wtp').css('filter', 'brightness(100%)')
                            $('h4').show()
                            $('.wtp-text').css('background', 'green')
                        }else{
                            console.log('no you got it wrong ')
                            $('#wtp').css('filter', 'brightness(100%)')
                            $('h4').show()
                            $('.wtp-text').css('background', 'red')
                    }$countdown()
                    setTimeout(wtpGame, 5000)
                    //remove past event listener
                    $('.reveal').off('click', $checkAnswer)
                    $('.idk').off('click', $checkAnswer)
                }//add event and call function 
                $('.reveal').on('click', $checkAnswer)
                $('.idk').on('click', $checkAnswer)
            },
            () =>{
                console.log('bad request')
            }
        )
    }

})
