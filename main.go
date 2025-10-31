package main

import "fmt";
import "rosalind/calc";
import "rosalind/greetings";

func welcome() {
  fmt.Println("Greeting messages")
  fmt.Println(greetings.HelloWorld());
  greetings.Stars();
}

func calculate() {
  fmt.Println("Calculate val1 = 123, val2 = 222")
  var val1 float64 = 123;
  var val2 float64 = 222;
  fmt.Println(calc.Sum(val1, val2));
  fmt.Println(calc.Times(val1, val2));
}

func main() {
  welcome();
  calculate();
}