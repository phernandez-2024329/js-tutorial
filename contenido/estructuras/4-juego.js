/**
 *      Se solicita un numero a un usuario para adivinar un numero secreto
 *      que sera generado aleatoriamente entre el rango de 1 y 10.
 * 
 * 
 */

const numeroSecreto = Math.floor(Math.random() * 11 - 1)
const numeroJugador = parseInt(prompt("Adivina el nimero entre el 1 al 10"))

console.log('Es numero que ingresastes fue: ${numeroJugador}')

if (numeroJugador === numeroSecreto) {
    console.log("!Felicidades ganaste, adivinastes el numero secreto")
} else if (numeroJugador< numeroSecreto){
    console.log("El numero secreto es mayor")
} else {
    console.log("El numero secreto es menor al ingresado")
}

console.log('El numero secreto era: ${numeroSecreto}')