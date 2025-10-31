package calc

import "fmt";

func Times(val1 float64, val2 float64) float64 {
  fmt.Printf("Times %v and %v\n", val1, val2);
  return val1 * val2;
}