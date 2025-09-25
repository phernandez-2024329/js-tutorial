/**
 * 
 *              Tipo de dato Number number
 * 
 */

//1. entero
const enter = 33
const decimal = 3.34
//2, notacion cientifica
const cientifixa = 5e4
//3. Infinito  y nan(no es un numero)
const infinito = Infinity
const noEsNumero = NaN

// Operaciones Aritmeticas
//1. suma , resta, multiplicacion y division
const suma = 5 + 6
const resta = 10 - 18
const multiplicacion = 3 * 4
const division = 16/4

//2. modulo y exponenciacion
const modulo = 16 % 8
const exponenciacion = 2**4

// L a presicion de java scrip
const resultado = 0.1 +0.2 //0.3
//console.log(resultado)
//console.log(resultado.toFixed(1))
//console.log(resultado.toFixed(1) == 0.3) //true


    //OPERACIONES AVANZADAS
const raizCuadrada = Math.sqrt(16)
const valorAbsoluto = Math.abs(-7)
const aleatorio = Math.trunc(Math.random()*20 -5)
//console.log(raizCuadrada)
//console.log(valorAbsoluto)
console.log(aleatorio)
 
//Lenguajes de programacion:
                                //Runtime Exception
//COMPILADOS: java (JVM -> .java _-_> .class)
//INTERPRETADOS: javascript -->  lee ejecuta

const numero = 2
const boolean = true
//Conversion implicita
console.log(numero+boolean)
