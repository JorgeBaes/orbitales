
let cos = 1
let sen = 1
let radius_lenght = 0.4
let caos = false
let color_set = {background:"#f55f22",second:"#9F0000",first:"#00009F"}
let animation_velocity = 0.5
let point_size = 0.75
let point_number = 0.5
let trace = 0.5
let mode = 'um'

let file_name = "file"
let width_canvas = 1080
let height_canvas = 1080
let animation_frames = 500

let download_velocity_mult = 0.5
document.querySelector("#download_velocity_range").value = download_velocity_mult

function replaceAll(s, c, r) {
    while (s.indexOf(c) != -1) {
        s = s.replace(c, r)
    }
    return s
}

let s = window.location.hash.slice(1)

s = replaceAll(s,"%22",'"')
s = replaceAll(s,"%60",'"')
s = replaceAll(s,"'" , '"')
s = replaceAll(s,"%20",' ')

    
    
let array_of_config_properties = 
[`"file_name"`,`"trace"`,`"mode"`,`"width"`,`"height"`,`"animation_frames"`,`"cos"`,`"sen"`,`"radius_lenght"`,`"caos"`,`"background"`,`"second"`,`"first"`,`"animation_velocity"`,`"point_size"`,`"point_number"`]

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

console.log(index_of_prop)
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


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = width_canvas//window.innerWidth
canvas.height = height_canvas//window.innerHeight

const cW = canvas.width
const cH = canvas.height

const mouse = {
    x: undefined,
    y: undefined
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
}
let particles = []    





let listaDeCor = generateColor(color_set.first, color_set.second, 20).map(el => "#"+el)

let my_gradient = c.createLinearGradient(cW* 0.45, cH * 0.05, cW * 0.55, cH * 0.15)
my_gradient.addColorStop(0, listaDeCor[0])
my_gradient.addColorStop(0.5, listaDeCor[~~(listaDeCor.length / 2 - 1)])
my_gradient.addColorStop(1, listaDeCor[listaDeCor.length - 1])


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

if(!caos){
    for(let part of particles){
        part.radius = radius_lenght*cW
        part.tam =  20 *point_size
        part.color = color_set.first
    }
}else{
    for (let part of particles) {
        part.radius = Math.random() * radius_lenght*cW
        part.tam = Math.random() * 20 *point_size                             
        part.color = corAleatoria()
    }
}
for(let i in particles){
    particles[i].update()
    particles[i].update()
}

c.fillStyle = `${color_set.background}`
c.fillRect(0, 0, cW, cH)



let counter_download = 1
function download_frame(){
    let canvasDataURL = canvas.toDataURL()
    let download = document.createElement('a')
    download.href = canvasDataURL
    download.download = `${file_name}${counter_download}`
    counter_download+=1
    download.click()
}


document.querySelector("#property_title_download_speed").innerText = `Download Vel | ${((download_velocity_mult-0.3)/0.7*9+1).toFixed(0)}`
function sub_download_speed(){
    if(parseFloat(document.querySelector("#download_velocity_range").value) - 0.05 >= 0.3){
        download_velocity_mult = parseFloat(document.querySelector("#download_velocity_range").value) - 0.05
    }
    document.querySelector("#download_velocity_range").value = download_velocity_mult
    document.querySelector("#property_title_download_speed").innerText = `Download Vel | ${((download_velocity_mult-0.3)/0.7*9+1).toFixed(0)}`
}
function add_download_speed(){
    if(parseFloat(document.querySelector("#download_velocity_range").value) + 0.05 <= 1){
        download_velocity_mult = parseFloat(document.querySelector("#download_velocity_range").value) + 0.05
    }
    document.querySelector("#download_velocity_range").value = download_velocity_mult
    document.querySelector("#property_title_download_speed").innerText = `Download Vel | ${((download_velocity_mult-0.3)/0.7*9+1).toFixed(0)}`
}
function update_download_speed(){
    download_velocity_mult = parseFloat(document.querySelector("#download_velocity_range").value)
    document.querySelector("#download_velocity_range").value = download_velocity_mult
    document.querySelector("#property_title_download_speed").innerText = `Download Vel | ${((download_velocity_mult-0.3)/0.7*9+1).toFixed(0)}`
}


function format_time(n){
    let sec = Math.floor(n%60)
    let min = Math.floor((n/60)%60)
    let hour = Math.floor(n/3600)

    return `${hour<10?"0"+hour:hour}:${min<10?"0"+min:min}:${sec<10?"0"+sec:sec}`
}



function animate() {  

    let hex = (parseInt((1-trace)*100)).toString(16)
    if(hex.length==1){
        hex = "0"+hex
    }
    console.log(trace)
    c.fillStyle = `${color_set.background}${hex}`
    c.fillRect(0, 0, cW, cH)      
    particles.forEach(particle => {
        particle.update()
    })   
    if( counter_download < animation_frames ){
        // download_frame()
    }
    document.querySelector("#property_title_counter").innerText = `File | ${counter_download}`
    document.querySelector("#property_title_max").innerText = `Last File | ${animation_frames}`
    document.querySelector("#property_title_time_left").innerText = `Time Left | ${format_time(3*(1.3-download_velocity_mult)*(animation_frames-counter_download))}`
    setTimeout(()=>{
        animate()            
    },3000 - 3000*(download_velocity_mult-0.3))
}



animate()


