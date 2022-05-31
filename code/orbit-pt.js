const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 600//window.innerWidth
canvas.height = 600//window.innerHeight


let cW = canvas.width
let cH = canvas.height

const mouse = {
    x: undefined,
    y: undefined
} 

const mode_list = ["um","dois","tres","quatro","cinco","seis","sete","oito","nove"]

let clear_active = true
let cos = 1
let sen = 1
let radius_lenght = 0.4
let caos = false
let color_set = {background:"#f55f22",second:"#9F0000",first:"#00009F"}
let animation_velocity = 0.9
let point_size = 0.75
let point_number = 0.5
let mode = 'um'
let trace = 0.5

let file_name = "Arquivo"
let width_canvas = 1080
let height_canvas = 1080
let animation_frames = 500


color_set.background = random_color()
color_set.first = random_color()
color_set.second = random_color()

cos = ~~(Math.random()*10)+1
sen = ~~(Math.random()*10)+1
caos = (Math.random() > 0.5)
mode = mode_list[~~(Math.random()*mode_list.length)]
point_size = Math.random()*0.9+0.1
point_number = Math.random()*0.9+0.1
radius_lenght = Math.random()*0.9+0.1
trace = Math.random()

for(let i = 1; i <= 9; i++){
    document.getElementById(`modes-button-${i}`).style.background = "#000000a3"
}
document.getElementById(`modes-button-${mode_list.indexOf(mode)+1}`).style.background = "#ffffff6f"


document.querySelector("#sen_range").value = sen
document.querySelector("#cos_range").value = cos
document.querySelector("#lenght_range").value = radius_lenght
document.querySelector("#background_color").value = color_set.background 
document.querySelector("#principal_color").value = color_set.first 
document.querySelector("#second_color").value = color_set.second 
document.querySelector("#animation_velocity").value = animation_velocity
document.querySelector("#point_size").value = point_size
document.querySelector("#point_number").value = point_number
document.querySelector("#width_canvas").value = width_canvas
document.querySelector("#height_canvas").value = height_canvas
document.querySelector("#file_name").value = file_name
document.querySelector("#animation_frames").value = animation_frames
document.querySelector("#trace").value = trace

let listaDeCor = generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)

let my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
my_gradient.addColorStop(0, listaDeCor[0])
my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])



function atribute_span_values(){
    document.querySelector("#property_title_sen").innerText = `Sen ${(sen)}`
    document.querySelector("#property_title_cos").innerText = `Cos ${(cos)}`
    document.querySelector("#property_title_lenght").innerText = `Telescópio ${((parseFloat(radius_lenght)-0.05)/1.95*99+1).toFixed(0)}`
    document.querySelector("#property_title_animation_velocity").innerText = `Tempo ${(parseFloat(animation_velocity)*99+1).toFixed(0)}`
    document.querySelector("#property_title_point_size").innerText = `Meteoro ${((parseFloat(point_size-0.05)/1.45)*9+1).toFixed(0)}`
    document.querySelector("#property_title_point_number").innerText = `Órbitas ${parseFloat(point_number*1000).toFixed(0)}`
    document.querySelector("#property_title_trace").innerText = `Cauda ${(parseFloat(trace)*99+1).toFixed(0)}`

    document.getElementById("caos-button").classList.remove("btn-light")
    document.getElementById("caos-button").classList.remove("btn-dark")
    if(caos){
        document.getElementById("caos-button").classList.add("btn-light")
        document.getElementById("caos-button").style.background = `linear-gradient(to right, ${color_set.first} , ${color_set.second})`
    }else{
        document.getElementById("caos-button").classList.add("btn-dark")
        document.getElementById("caos-button").style.background = `#33333355`
    }
}


function change_clear(){
    const clear_button = document.querySelector("#change-clear-button")
    if(clear_active){
        clear_button.classList.remove("btn-light")
        clear_button.classList.add("btn-dark")
        clear_button.innerHTML = "Limpar | OFF"
        clear_button.style.boxShadow = "0px 0px 10px #ffffff"
        clear_active = false
    }else{
        clear_button.classList.remove("btn-dark")
        clear_button.classList.add("btn-light")
        clear_button.innerHTML = "Limpar | ON&nbsp;"
        clear_button.style.boxShadow = "0px 0px 10px #000000"
        clear_active = true
    }
}
function clear(){
    if(clear_active){
        c.fillStyle = `${color_set.background}`
        c.fillRect(0, 0, cW, cH) 
        setTimeout(()=>{
            c.fillStyle = `${color_set.background}`
            c.fillRect(0, 0, cW, cH) 
        },150)
    }
}

function update_sen(){
    sen = parseFloat(document.querySelector("#sen_range").value)
    clear()
    atribute_span_values()
}
function sub_sen(){
    if(sen>0 && sen<=314){
        sen-=1
    }
    document.querySelector("#sen_range").value = sen
    clear()
    atribute_span_values()
}
function add_sen(){
    if(sen>=0 && sen<=314){
        sen+=1
    } 
    document.querySelector("#sen_range").value = sen   
    clear()
    atribute_span_values()
}


function update_cos(){
    cos = parseFloat(document.querySelector("#cos_range").value)
    clear()
    atribute_span_values()
}
function sub_cos(){
    if(cos>0 && cos<=314){
        cos-=1
    }
    document.querySelector("#cos_range").value = cos
    clear()
    atribute_span_values()
}
function add_cos(){
    if(cos>=0 && cos<=314){
        cos+=1
    } 
    document.querySelector("#cos_range").value = cos  
    clear()
    atribute_span_values()
}


function update_lenght_range(){
    radius_lenght = parseFloat(document.querySelector("#lenght_range").value)
    if(!caos){
        for(let part of particles){
            part.radius = radius_lenght*cW
        }
    }else{
        for (let part of particles) {
            part.radius = Math.random() * radius_lenght*cW
        }
    }
    for(let i in particles){
        particles[i].update_no_stroke()
    }
    atribute_span_values()
    clear()
}
function sub_lenght(){
    if(parseFloat(document.querySelector("#lenght_range").value)-0.01>=0.05){
        radius_lenght = parseFloat(document.querySelector("#lenght_range").value)-0.01
        if(!caos){
            for(let part of particles){
                part.radius = radius_lenght*cW
            }
        }else{
            for (let part of particles) {
                part.radius = Math.random() * radius_lenght*cW
            }
        }
        for(let i in particles){
            particles[i].update_no_stroke()
        }
        document.querySelector("#lenght_range").value = radius_lenght
        atribute_span_values()
        clear()
    }
}
function add_lenght(){
    if(parseFloat(document.querySelector("#lenght_range").value)+0.01<=2){
        radius_lenght = (parseFloat(document.querySelector("#lenght_range").value)+0.01)
        if(!caos){
            for(let part of particles){
                part.radius = radius_lenght*cW
            }
        }else{
            for (let part of particles) {
                part.radius = Math.random() * radius_lenght*cW
            }
        }
        for(let i in particles){
            particles[i].update_no_stroke()
        }
        document.querySelector("#lenght_range").value = radius_lenght
        atribute_span_values()
        clear()
    }
}


function update_caos_checkbox(){
    caos = !caos
    radius_lenght = (parseFloat(document.querySelector("#lenght_range").value))
        
    if(!caos){
        for(let part of particles){
            part.radius = radius_lenght*cW
            part.tam =  20 *point_size
            part.color = color_set.first
        }
    }else{
        listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
        my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
        my_gradient.addColorStop(0, listaDeCor[0])
        my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
        my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
        for (let part of particles) {
            part.radius = Math.random() * radius_lenght*cW
            part.tam = Math.random() * 20 *point_size                           
            part.color = corAleatoria()
        }
    }
    for(let i in particles){
        particles[i].update_no_stroke()
    }
    atribute_span_values()
    clear()
}
function update_colors(){
    color_set.background = document.querySelector("#background_color").value
    color_set.first = document.querySelector("#principal_color").value
    color_set.second = document.querySelector("#second_color").value
    radius_lenght = (parseFloat(document.querySelector("#lenght_range").value))
        
    
    listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
    if(!caos){
        for(let part of particles){
            part.color = color_set.first
        }
    }else{
        for (let part of particles) {                            
            part.color = corAleatoria()
        }
    }
    atribute_span_values()
    clear()
    
}


function update_animation_velocity(){
    animation_velocity = parseFloat(document.querySelector("#animation_velocity").value)
    atribute_span_values()
    clear()
}
function sub_animation_velocity(){
    if(parseFloat(document.querySelector("#animation_velocity").value)-0.05>=0){
        animation_velocity -= 0.05
        document.querySelector("#animation_velocity").value = animation_velocity
    }
    atribute_span_values()
    clear()
}
function add_animation_velocity(){
    if(parseFloat(document.querySelector("#animation_velocity").value)+0.05<=1){
        animation_velocity += 0.05
        document.querySelector("#animation_velocity").value = animation_velocity
    }
    atribute_span_values()
    clear()
}


function update_trace(){
    trace = parseFloat(document.querySelector("#trace").value)
    atribute_span_values()
    clear()
}
function sub_trace(){
    if(parseFloat(document.querySelector("#trace").value)-0.005>=0){
        trace -= 0.005
        document.querySelector("#trace").value = trace
    }
    atribute_span_values()
    clear()
}
function add_trace(){
    if(parseFloat(document.querySelector("#trace").value)+0.005<=1){
        trace += 0.005
        document.querySelector("#trace").value = trace
    }
    atribute_span_values()
    clear()
}


function update_point_size(){
    point_size = parseFloat(document.querySelector("#point_size").value)
    for (let part of particles) {
        if(caos){
            part.tam = Math.random() * 20 *point_size          
        }else{
            part.tam = 20 *point_size  
        }
    }
    atribute_span_values()
    clear()
}
function sub_point_size(){
    if(parseFloat(document.querySelector("#point_size").value)-0.005>=0.05){
        point_size -= 0.005
        document.querySelector("#point_size").value = point_size
    }
    for (let part of particles) {
        if(caos){
            part.tam = Math.random() * 20 *point_size          
        }else{
            part.tam = 20 *point_size  
        }
    }
    atribute_span_values()
    clear()
}
function add_point_size(){
    if(parseFloat(document.querySelector("#point_size").value)+0.005<=1.5){
        point_size += 0.005
        document.querySelector("#point_size").value = point_size
    }
    for (let part of particles) {
        if(caos){
            part.tam = Math.random() * 20 *point_size          
        }else{
            part.tam = 20 *point_size  
        }
    }
    atribute_span_values()
    clear()
}


function update_point_number(){
    const prev_point_number = point_number
    point_number = parseFloat(document.querySelector("#point_number").value)

    color_set.background = document.querySelector("#background_color").value
    color_set.first = document.querySelector("#principal_color").value
    color_set.second = document.querySelector("#second_color").value
    
    listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
    
    if(prev_point_number < point_number){
        for (let i = 0; i < 1000*Math.abs(prev_point_number-point_number); i++) {
            const x = cW/2
            const y = cH/2
            const radius = radius_lenght*cW
            const color = color_set.first
            const new_particle = new Particle(x, y, radius, color)
            if(!caos){
                new_particle.tam =  20 *point_size
               
            }else{
                new_particle.tam = Math.random() * 20 *point_size      
                new_particle.radius = Math.random() * radius_lenght*cW                      
                new_particle.color = corAleatoria()
            }
            particles.push(new_particle)
        }
    }else{
        particles.splice(0,1000*Math.abs(prev_point_number-point_number))
    }

    for(let i in particles){
        particles[i].update_no_stroke()
    }
    
    atribute_span_values()
    clear()
}
function sub_point_number(){
    const prev_point_number = point_number
    if(parseFloat(document.querySelector("#point_number").value)-0.01>=0.01){
        point_number -= 0.01
        document.querySelector("#point_number").value = point_number
    }
    point_number = parseFloat(document.querySelector("#point_number").value)

    color_set.background = document.querySelector("#background_color").value
    color_set.first = document.querySelector("#principal_color").value
    color_set.second = document.querySelector("#second_color").value
    
    listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
    
    if(prev_point_number < point_number){
        for (let i = 0; i < 1000*Math.abs(prev_point_number-point_number); i++) {
            const x = cW/2
            const y = cH/2
            const radius = radius_lenght*cW
            const color = color_set.first
            const new_particle = new Particle(x, y, radius, color)
            if(!caos){
                new_particle.tam =  20 *point_size
               
            }else{
                new_particle.tam = Math.random() * 20 *point_size      
                new_particle.radius = Math.random() * radius_lenght*cW                      
                new_particle.color = corAleatoria()
            }
            particles.push(new_particle)
        }
    }else{
        particles.splice(0,1000*Math.abs(prev_point_number-point_number))
    }

    for(let i in particles){
        particles[i].update_no_stroke()
    }
    
    atribute_span_values()
    clear()
}
function add_point_number(){
    const prev_point_number = point_number
    if(parseFloat(document.querySelector("#point_number").value)+0.01<=1){
        point_number += 0.01
        document.querySelector("#point_number").value = point_number
    }
    point_number = parseFloat(document.querySelector("#point_number").value)

    color_set.background = document.querySelector("#background_color").value
    color_set.first = document.querySelector("#principal_color").value
    color_set.second = document.querySelector("#second_color").value
    
    listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
    
    if(prev_point_number < point_number){
        for (let i = 0; i < 1000*Math.abs(prev_point_number-point_number); i++) {
            const x = cW/2
            const y = cH/2
            const radius = radius_lenght*cW
            const color = color_set.first
            const new_particle = new Particle(x, y, radius, color)
            if(!caos){
                new_particle.tam =  20 *point_size
               
            }else{
                new_particle.tam = Math.random() * 20 *point_size      
                new_particle.radius = Math.random() * radius_lenght*cW                      
                new_particle.color = corAleatoria()
            }
            particles.push(new_particle)
        }
    }else{
        particles.splice(0,1000*Math.abs(prev_point_number-point_number))
    }

    for(let i in particles){
        particles[i].update_no_stroke()
    }
    
    atribute_span_values()
    clear()
}


function update_width_height(){
    height_canvas = parseInt(document.querySelector("#height_canvas").value)
    if(height_canvas>1920){
        height_canvas =1920 
    }
    if(height_canvas<200){
        height_canvas =200 
    }

    width_canvas = parseInt(document.querySelector("#width_canvas").value)
    if(width_canvas>1920){
        width_canvas =1920 
    }
    if(width_canvas<200){
        width_canvas =200 
    }
    document.querySelector("#width_canvas").value = width_canvas
    document.querySelector("#height_canvas").value = height_canvas
}
function update_animation_frames(){
    animation_frames = parseInt(document.querySelector("#animation_frames").value)
    if( animation_frames < 10){
        animation_frames = 10
    }
    document.querySelector("#animation_frames").value = animation_frames
}
function update_file_name(){
    let string = document.querySelector("#file_name").value
    const allowed_caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_1234567890 '
    for(let c of string){
        if(allowed_caracters.indexOf(c) == -1){
            window.alert('Invalid file name. Only letters, numbers, spacebars and "_" are allowed.')
            string = replaceAll(string,c,"")
            break;
        }
    }
    document.querySelector("#file_name").value = string
    file_name = string
}



function start_download(){
    let string = 
`
{    
    "file_name":"${file_name}",
    "mode":"${mode}",
    "width":${width_canvas},
    "height":${height_canvas},
    "animation_frames":${animation_frames},
    "cos":${cos},
    "sen":${sen},
    "radius_lenght":${radius_lenght},
    "trace":${trace},
    "caos":"${caos}",
    "background":"${color_set.background}",
    "second":"${color_set.second}",
    "first":"${color_set.first}",
    "animation_velocity":${animation_velocity},
    "point_size":${point_size},
    "point_number":${point_number}
}
`
    window.open(`code/orbit_downloader.html#${string}`)
}
let draw_canvas = document.getElementById("draw-canvas")
let print_canvas = document.getElementById("print-canvas")


let printCanvasContext = print_canvas.getContext('2d')


function print_image(){
    print_canvas.width = width_canvas
    print_canvas.height = height_canvas
    let drawImageData = draw_canvas.toDataURL("image/png")
    let destinationImage = new Image
    destinationImage.onload = function(){
        printCanvasContext.drawImage(destinationImage,0,0)
    }
    printCanvasContext.scale(width_canvas/cW,height_canvas/cH)
    
    destinationImage.src = drawImageData

    setTimeout( ()=> {
        let canvasDataURL = print_canvas.toDataURL("image/png")
        let download = document.createElement('a')
        download.href = canvasDataURL
        download.download = `${file_name}`
        download.click()

    },500)
}


function update_screen_width_height_canvas(){
    let auxcW = document.querySelector("#screen_width_canvas").value
    let auxcH = document.querySelector("#screen_height_canvas").value
    if(auxcW < 200){
        document.querySelector("#screen_width_canvas").value = 200
    }
    if(auxcW > 1920){
        document.querySelector("#screen_width_canvas").value = 1920
    }
    if(auxcH < 200){
        document.querySelector("#screen_height_canvas").value = 200
    }
    if(auxcH > 1920){
        document.querySelector("#screen_height_canvas").value = 1920
    }
}
function update_screen_width_height(){
    cW = document.querySelector("#screen_width_canvas").value
    cH = document.querySelector("#screen_height_canvas").value
    if(cW >= 200 && cW <= 1920 && cH >= 200 && cH <= 1920){
        canvas.width = cW
        canvas.height = cH
    }else{
        cW = canvas.width
        cH = canvas.height
    }
    $('#modal-config').modal('toggle')
}
function set_width_height_values_to_inputs(){
    document.querySelector("#screen_width_canvas").value = cW
    document.querySelector("#screen_height_canvas").value = cH
}
function copy_settings() {
    let string = 
`
{    
    "file_name":"${file_name}",
    "mode":"${mode}",
    "width":${width_canvas},
    "height":${height_canvas},
    "animation_frames":${animation_frames},
    "cos":${cos},
    "sen":${sen},
    "radius_lenght":${(radius_lenght).toFixed(2)},
    "trace":${(trace).toFixed(2)},
    "caos":"${caos}",
    "background":"${color_set.background}",
    "second":"${color_set.second}",
    "first":"${color_set.first}",
    "animation_velocity":${animation_velocity},
    "point_size":${(point_size).toFixed(2)},
    "point_number":${(point_number).toFixed(2)}
}
`

    let aux = document.createElement('textarea')
    aux.value = string
    aux.setAttribute('readonly', '')
    aux.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    $('#modal-config').modal('toggle')
}
function replaceAll(s, c, r) {
    while (s.indexOf(c) != -1) {
        s = s.replace(c, r)
    }
    return s
}
function apply_configuration() {
    let s = document.querySelector("#apply_configuration").value
    
    let array_of_config_properties = 
    [`"file_name"`,`"mode"`,`"width"`,`"height"`,`"animation_frames"`,`"cos"`,`"sen"`,`"radius_lenght"`,`"caos"`,`"background"`,`"second"`,`"first"`,`"animation_velocity"`,`"point_size"`,`"point_number"`,`"trace"`]

    let index_of_prop = array_of_config_properties.map(el => {
    let index_obj = {
        property: replaceAll(el, `"`, ""),
        initial_prop_index: s.indexOf(el),
        last_prop_index: s.indexOf(el) + el.length,
        initial_value_index: 0,
        last_value_index: 0,
        value: null
    }
    if(s.indexOf(el)!= -1){
        index_obj.initial_value_index = s.indexOf(":", index_obj.last_prop_index) + 1
        let initial_test = index_obj.initial_value_index
        while (s[initial_test] != "," && s[initial_test] != "}") {
            initial_test += 1
        }
        index_obj.last_value_index = initial_test
        index_obj.value = replaceAll(s.slice(index_obj.initial_value_index, index_obj.last_value_index), `"`, "")
    }
    return index_obj
    })
    
    
    let index = index_of_prop.findIndex( el => el.property == "file_name")
    if(index!=-1 && index_of_prop[index].value!=null){
        file_name = index_of_prop[index].value
    }
    index = index_of_prop.findIndex( el => el.property == "mode")
    if(index!=-1 && index_of_prop[index].value!=null){
        mode = replaceAll(index_of_prop[index].value," ","")
    }
    index = index_of_prop.findIndex( el => el.property == "caos")
    if(index!=-1 && index_of_prop[index].value!=null){
       caos = index_of_prop[index].value=="true"
    }
    index = index_of_prop.findIndex( el => el.property == "width")
    if(index!=-1 && index_of_prop[index].value!=null){
       width_canvas = parseInt(index_of_prop[index].value)
    }    
    index = index_of_prop.findIndex( el => el.property == "height")
    if(index!=-1 && index_of_prop[index].value!=null){
       height_canvas = parseInt(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "cos")
    if(index!=-1 && index_of_prop[index].value!=null){
       cos = parseFloat(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "sen")
    if(index!=-1 && index_of_prop[index].value!=null){
       sen = parseFloat(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "radius_lenght")
    if(index!=-1 && index_of_prop[index].value!=null){
       radius_lenght = parseFloat(index_of_prop[index].value)
    }   
    index = index_of_prop.findIndex( el => el.property == "trace")
    if(index!=-1 && index_of_prop[index].value!=null){
       trace = parseFloat(index_of_prop[index].value)
    } 
    index = index_of_prop.findIndex( el => el.property == "animation_velocity")
    if(index!=-1 && index_of_prop[index].value!=null){
       animation_velocity = parseFloat(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "point_size")
    if(index!=-1 && index_of_prop[index].value!=null){
       point_size = parseFloat(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "point_number")
    if(index!=-1 && index_of_prop[index].value!=null){
       point_number = parseFloat(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "animation_frames")
    if(index!=-1 && index_of_prop[index].value!=null){
       animation_frames = parseFloat(index_of_prop[index].value)
    }
    index = index_of_prop.findIndex( el => el.property == "background")
    if(index!=-1 && index_of_prop[index].value!=null){
       color_set.background = index_of_prop[index].value
    }
    index = index_of_prop.findIndex( el => el.property == "second")
    if(index!=-1 && index_of_prop[index].value!=null){
       color_set.second = index_of_prop[index].value
    }
    index = index_of_prop.findIndex( el => el.property == "first")
    if(index!=-1 && index_of_prop[index].value!=null){
       color_set.first = index_of_prop[index].value
    }
    

    document.querySelector("#sen_range").value = sen
    document.querySelector("#cos_range").value = cos
    document.querySelector("#lenght_range").value = radius_lenght
    document.querySelector("#trace").value = trace
    document.querySelector("#background_color").value = color_set.background 
    document.querySelector("#principal_color").value = color_set.first 
    document.querySelector("#second_color").value = color_set.second 
    document.querySelector("#animation_velocity").value = animation_velocity
    document.querySelector("#point_size").value = point_size
    document.querySelector("#point_number").value = point_number
    document.querySelector("#width_canvas").value = width_canvas
    document.querySelector("#height_canvas").value = height_canvas 
    
    
    color_set.background = document.querySelector("#background_color").value
    color_set.first = document.querySelector("#principal_color").value
    color_set.second = document.querySelector("#second_color").value
    
    listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
    
    document.querySelector("#apply_configuration").value = ""
    const prev_point_number = point_number
    point_number = parseFloat(document.querySelector("#point_number").value)

    color_set.background = document.querySelector("#background_color").value
    color_set.first = document.querySelector("#principal_color").value
    color_set.second = document.querySelector("#second_color").value
    
    listaDeCor =  generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)
    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])
    
    particles = []
    for (let i = 0; i < 1000*point_number; i++) {
        const x = cW/2
        const y = cH/2
        const radius = radius_lenght*cW
        const color = color_set.first
        const new_particle = new Particle(x, y, radius, color)
        if(!caos){
            new_particle.tam =  20 *point_size            
        }else{
            new_particle.tam = Math.random() * 20 *point_size      
            new_particle.radius = Math.random() * radius_lenght*cW                      
            new_particle.color = corAleatoria()
        }
        particles.push(new_particle)
    }
    
    $('#modal-config').modal('toggle')
    atribute_span_values()
    clear()
}


function change_mode(key){
    if (key === 1) {
        mode = 'um'                    
    }
    if (key === 2) {
        mode = 'dois'
    }
    if (key === 3) {                    
        mode = 'tres'
    }
    if (key === 4) {                                        
        mode = 'quatro'
    }
    if (key === 5) {
        mode = 'cinco'
    }
    if (key === 6) { 
        mode = 'seis'                   
    }
    if (key === 7) {                    
        mode = 'sete'  
    }
    if (key === 8) {                    
        mode = 'oito'  
    }
    if (key === 9) {
        mode = 'nove'  
    }
    for(let i = 1; i <= 9; i++){
        document.getElementById(`modes-button-${i}`).style.background = "#000000a3"
    }
    document.getElementById(`modes-button-${key}`).style.background = "#ffffff6f"
    clear()
}

function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.radians = Math.random()*2*Math.PI
    this.velocity = 0.01*Math.random()
    this.color = color
    this.tam = 5
    this.anterior = { x: this.x, y: this.y }
    

    this.update = function(){
        this.anterior = {x:this.x,y:this.y}
        this.radians+=this.velocity    
        if(this.radians>40*Math.PI){this.radians = 0}                            
        if(mode=='um'){
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.cos(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.sin(sen * this.radians) ** 2
        }else if(mode=='dois'){
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.sin(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.sin(sen * this.radians) ** 2
        }else if (mode == 'tres') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.sin(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.cos(sen * this.radians) ** 2
        } else if (mode == 'quatro') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.cos(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.cos(sen * this.radians) ** 2
        } else if (mode == 'cinco') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians))*Math.abs(Math.sin(sen * this.radians))
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.abs(Math.cos(sen * this.radians)) * Math.abs(Math.sin(cos * this.radians))
        } else if (mode == 'seis') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians) ** 1.1) * Math.abs(Math.sin(cos * this.radians) ** 1.1)
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.abs(Math.cos(sen * this.radians) ** 1.6) * Math.abs(Math.sin(sen * this.radians) ** 1.6)
        } else if (mode == 'sete') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians) ) * Math.abs(Math.sin(cos * this.radians) )
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians) ) * Math.abs(Math.sin(sen * this.radians) )
        } else if (mode == 'oito') {
            this.x = cW*0.5 + Math.cos(this.radians) * this.radius * Math.abs(Math.log(0.5*this.radians)) * Math.abs(Math.sin(cos * this.radians/5))
            this.y = cH*0.5 + Math.sin(this.radians) * this.radius * Math.abs(Math.log(0.5*this.radians)) * Math.abs(Math.cos(sen * this.radians/5))
        } else if (mode == 'nove') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.sin(Math.log(0.5*this.radians + Math.sin(cos))) * Math.abs(Math.sin(cos * this.radians / 5))
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.cos(Math.log(0.5*this.radians + Math.cos(sen))) * Math.abs(Math.cos(sen * this.radians / 5))
        }

        c.strokeStyle = this.color
        c.lineWidth = this.tam
        c.beginPath()
        c.moveTo(this.anterior.x,this.anterior.y)
        c.lineTo(this.x,this.y)
        c.stroke()
        c.closePath()
    }
    this.update_no_stroke = function(){
        // this.anterior = {x:this.x,y:this.y}
        // this.radians+=this.velocity    
        if(this.radians>40*Math.PI){this.radians = 0}                            
        if(mode=='um'){
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.cos(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.sin(sen * this.radians) ** 2
        }else if(mode=='dois'){
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.sin(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.sin(sen * this.radians) ** 2
        }else if (mode == 'tres') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.sin(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.cos(sen * this.radians) ** 2
        } else if (mode == 'quatro') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.cos(cos * this.radians) ** 2
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.cos(sen * this.radians) ** 2
        } else if (mode == 'cinco') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians))*Math.abs(Math.sin(sen * this.radians))
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.abs(Math.cos(sen * this.radians)) * Math.abs(Math.sin(cos * this.radians))
        } else if (mode == 'seis') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians) ** 1.1) * Math.abs(Math.sin(cos * this.radians) ** 1.1)
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.abs(Math.cos(sen * this.radians) ** 1.6) * Math.abs(Math.sin(sen * this.radians) ** 1.6)
        } else if (mode == 'sete') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians) ) * Math.abs(Math.sin(cos * this.radians) )
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.abs(Math.cos(cos * this.radians) ) * Math.abs(Math.sin(sen * this.radians) )
        } else if (mode == 'oito') {
            this.x = cW*0.5 + Math.cos(this.radians) * this.radius * Math.abs(Math.log(0.5*this.radians)) * Math.abs(Math.sin(cos * this.radians/5))
            this.y = cH*0.5 + Math.sin(this.radians) * this.radius * Math.abs(Math.log(0.5*this.radians)) * Math.abs(Math.cos(sen * this.radians/5))
        } else if (mode == 'nove') {
            this.x = cW*0.5+Math.cos(this.radians) * this.radius * Math.sin(Math.log(0.5*this.radians + Math.sin(cos))) * Math.abs(Math.sin(cos * this.radians / 5))
            this.y = cH*0.5+Math.sin(this.radians) * this.radius * Math.cos(Math.log(0.5*this.radians + Math.cos(sen))) * Math.abs(Math.cos(sen * this.radians / 5))
        }

    }
}
let particles = []


function animate() {
    let hex = (parseInt((1-trace)*255)).toString(16)
    if(hex.length==1){
        hex = "0"+hex
    }
    c.fillStyle = `${color_set.background}${hex}`
    c.fillRect(0, 0, cW, cH)      
    particles.forEach(particle => {
        particle.update()
    }) 
    setTimeout(()=>{
        animate()            
    },300*(1-animation_velocity)**3)
}
for (let i = 0; i < 1000*point_number; i++) {
    const x = cW/2
    const y = cH/2
    const radius = radius_lenght*cW
    const color = color_set.first
    particles.push(new Particle(x, y, radius, color))
}
for(let i in particles){
    particles[i].update()
}


function random_orbitales(){
    color_set.background = random_color()
    color_set.first = random_color()
    color_set.second = random_color()

    cos = ~~(Math.random()*10)+1
    sen = ~~(Math.random()*10)+1
    caos = (Math.random() > 0.5)
    mode = mode_list[~~(Math.random()*mode_list.length)]
    point_size = Math.random()*0.9+0.1
    point_number = Math.random()*0.9+0.1
    radius_lenght = Math.random()*0.9+0.1
    trace = Math.random()

    for(let i = 1; i <= 9; i++){
        document.getElementById(`modes-button-${i}`).style.background = "#000000a3"
    }
    document.getElementById(`modes-button-${mode_list.indexOf(mode)+1}`).style.background = "#ffffff6f"
    
    document.querySelector("#sen_range").value = sen
    document.querySelector("#cos_range").value = cos
    document.querySelector("#lenght_range").value = radius_lenght
    document.querySelector("#background_color").value = color_set.background 
    document.querySelector("#principal_color").value = color_set.first 
    document.querySelector("#second_color").value = color_set.second 
    document.querySelector("#animation_velocity").value = animation_velocity
    document.querySelector("#point_size").value = point_size
    document.querySelector("#point_number").value = point_number
    document.querySelector("#width_canvas").value = width_canvas
    document.querySelector("#height_canvas").value = height_canvas
    document.querySelector("#file_name").value = file_name
    document.querySelector("#animation_frames").value = animation_frames
    document.querySelector("#trace").value = trace

    listaDeCor = generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)

    my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
    my_gradient.addColorStop(0, listaDeCor[0])
    my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
    my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])

    particles = []
    for (let i = 0; i < 1000*point_number; i++) {
        const x = cW/2
        const y = cH/2
        const radius = radius_lenght*cW
        const color = color_set.first
        const new_particle = new Particle(x, y, radius, color)
        if(!caos){
            new_particle.tam =  20 *point_size            
        }else{
            new_particle.tam = Math.random() * 20 *point_size      
            new_particle.radius = Math.random() * radius_lenght*cW                      
            new_particle.color = corAleatoria()
        }
        particles.push(new_particle)
    }

    clear()
    atribute_span_values()
    }



animate()
update_colors()
atribute_span_values()